import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type {
  LoginResponse,
  LoginGoogleParams,
  RegisterRequest,
  LoginAppleParams,
  LoginAppleSessionTokenParams,
  ErrorRegisterResponse,
  loginWithGoogleResponse,
  UserCardResponse,
  UserCardsResponse,
  FullUserCardResponse,
  AccessTokenResponse,
  DadosUsuarioPorTokenResponse,
  CreateUserPermissionRequest,
  getPermissaoResponse,
  UserDataByTokenResponse,
  GetPlansResponse,
  EditPlanRequest
} from "./models";
import { toast } from "react-toastify";
import { getCookie, LocalStorage, setCookie, setLocalStorage } from "../../../global";
import './google.d.ts';
import { Cookie } from "../../../global/utils/cookie/index.tsx";
import { Duration } from "../../../global/utils/time/index.ts";

export function getApiSalaAis() {

  return axios.create({
    baseURL: import.meta.env.VITE_SALA_AIS_API,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const paymentPlan = async (
  accessToken: string,
  priceId: string) => {
  try {
    const apiSalaAis = getApiSalaAis();
    const { data } = await apiSalaAis.get(
      `stripe/pagamento-web?price_id=${encodeURIComponent(priceId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar pagamento");
  }
};

// login apple, login google, login normal
export const finalizarLogin = async (access_token: string, navigate: (path: string) => void) => {
  toast.success("Bem-vindo!");
  setCookie("access_token", access_token, '7d');
  await getPermissionsByToken();
  navigate("/home");
};

export const loginAction = async (
  email: string,
  password: string,
  navigate: ReturnType<typeof useNavigate>
) => {
  try {
    const apiSalaAis = getApiSalaAis();
    const requestData = { email, password }
    const response = await apiSalaAis.post<LoginResponse>("auth/login", requestData)
    if (response.status === 200) {
      await finalizarLogin(response.data.access_token, navigate);
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    toast.error("email ou senha incorretos")
  }
};

export const registerAction = async (
  registerRequest: RegisterRequest,
  onSwitchForm: () => void) => {
  try {
    const apiSalaAis = getApiSalaAis();
    const requestData = {
      ...registerRequest,
      bio: "Olá, estou usando SalaAis!",
      tipo_login: "sala_ais",
    }

    const response = await apiSalaAis.post("usuario/criar", requestData)

    if (response.status === 201) {
      toast.success("Usuário cadastrado, faça o login!")
      onSwitchForm()
    }

  } catch (error: unknown) {
    if (axios.isAxiosError<ErrorRegisterResponse>(error)) {
      const axiosError = error as AxiosError<ErrorRegisterResponse>;
      const message = axiosError.response?.data?.errors_description?.[0];

      if (message) {
        toast.error(message);
      } else {
        toast.error("Erro ao fazer cadastro");
      }
    } else {
      toast.error("Erro inesperado");
    }
  }
};

export const loginWithGoogle = async ({
  setIsLoading,
  navigate,
}: LoginGoogleParams) => {

  if (!window.google?.accounts?.oauth2) {
    console.error("Google OAuth não está carregado.");
    toast.error("O Google está com problema no momento.")
    return;
  }

  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID_WEB,
    scope: import.meta.env.VITE_GOOGLE_URL_LOGIN,
    callback: async (googleResponse: loginWithGoogleResponse) => {
      const apiSalaAis = getApiSalaAis();
      if (!googleResponse?.access_token) {
        toast.error("Falha login Google.");
        return;
      }

      try {
        setIsLoading(true);
        const apiResponse = await apiSalaAis.post(
          "auth/login-google-web",
          {},
          {
            headers: {
              Authorization: `Bearer ${googleResponse.access_token}`,
            },
          }
        );

        if (apiResponse.status >= 200 && apiResponse.status < 300) {
          const data = apiResponse.data;
          await finalizarLogin(data.access_token, navigate);
        }

      } catch (error) {
        toast.error("Erro ao fazer login com Google.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });


  client.requestAccessToken();
};

//login inicio apple
export const loginWithApple = async ({
  setIsLoading,
}: LoginAppleParams) => {
  try {
    setIsLoading(true);
    const state = crypto.randomUUID();
    //5 minutos
    setCookie(Cookie.login_state_apple, state, '2m');

    //ADICIONAR REQUEST para minha api salvar login_state_apple

    const authUrl = `https://appleid.apple.com/auth/authorize?` +
      `client_id=${import.meta.env.VITE_APPLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(import.meta.env.VITE_APPLE_REDIRECT_URL)}&` +
      `response_type=code&` +
      `response_mode=form_post&` +
      `scope=name email&` +
      `state=${state}`;

    window.location.href = authUrl;
  } catch (err) {
    toast.error("Erro ao redirecionar para Apple.");
    console.error(err);
  } finally {
    setIsLoading(false); // essa linha nunca será executada por causa do redirect
  }
};

//login final apple
export const loginWithAppleValidateAccessToken = async (
  params: LoginAppleSessionTokenParams
) => {
  const { sessionToken, navigate, setIsLoading } = params;
  const apiSalaAis = getApiSalaAis();

  setIsLoading(true);
  try {
    if (!sessionToken) {
      toast.error("O login apple falhou");
      console.log("Token de sessão ausente inválido.");
      return;
    }

    const response = await apiSalaAis.post("/auth/login-apple-web/validate-session-code", {
      session_token: sessionToken,
    });

    const { access_token } = response.data;
    if (!access_token) {
      toast.error("O login apple falhou");
      console.log("Token de acesso não retornado.");
      return;
    }

    // Limpar a URL (remove os parâmetros da query)
    window.history.replaceState({}, document.title, "/login");

    await finalizarLogin(access_token, navigate);

  } catch (error) {
    console.error("Erro ao validar token de sessão da Apple:", error);
    toast.error("Erro ao fazer login Apple.");
  }
};

export const getUsers = async (
  string_de_busca: string,
  page: number = 1,
  options?: { signal?: AbortSignal }
): Promise<{ data: UserCardResponse[]; total: number }> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>("access_token");

  if (!access_token) {
    toast.error("Faça login e tente novamente");
    console.error(`Token de sessão ausente ou inválido: ${access_token}`);
    return { data: [], total: 0 };
  }

  try {
    const promise = apiSalaAis.get<UserCardsResponse>(
      `usuario?string_de_busca=${encodeURIComponent(string_de_busca)}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        signal: options?.signal,
      }
    );

    const { data } = options?.signal
      ? await promise
      : await toast.promise(promise, {
        pending: "Carregando usuários...",
        success: "Usuários carregados!",
        error: "Erro ao carregar usuários.",
      });

    return {
      data: Array.isArray(data.data) ? data.data : [],
      total: data.total ?? 0,
    };
  } catch (error: unknown) {
    if (
      error instanceof DOMException &&
      (error.name === "CanceledError" || error.name === "AbortError")
    ) {
      return { data: [], total: 0 };
    }

    console.error("Erro ao buscar usuários:", error);
    if (!options?.signal) {
      toast.error("Erro ao carregar usuários.");
    }
    return { data: [], total: 0 };
  }
};

export const getUserInfo = async (id_usuario: number): Promise<FullUserCardResponse> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>("access_token");

  if (!access_token) {
    toast.error("Faça login e tente novamente");
    console.error("Token de sessão ausente ou inválido.");
    return {} as FullUserCardResponse;
  }

  try {
    const { data } = await apiSalaAis.get<FullUserCardResponse>(
      `usuario/info/${id_usuario}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return {} as FullUserCardResponse;
  }
};

export const getAuthUserByToken = async (): Promise<UserDataByTokenResponse | null> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>("access_token");

  if (!access_token) {
    console.error("Token de sessão ausente ou inválido.");
    return null;
  }

  try {
    const { data } = await apiSalaAis.get<UserDataByTokenResponse>(
      `auth/dados-usuario-por-token`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário por token:", error);
    return null;
  }
};

export const startToFollow = async (id_usuario_seguir: number): Promise<void> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>("access_token");

  if (!access_token) {
    toast.error("Faça login e tente novamente");
    console.error("Token de sessão ausente ou inválido.");
    return;
  }

  try {
    await apiSalaAis.post(
      `usuario/seguir/${id_usuario_seguir}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  } catch (error) {
    console.error("Erro ao seguir usuário: ", error);
    toast.error("Erro ao seguir usuário. Tente novamente.");
  }
};

export const stopToFollow = async (id_usuario_seguido: number): Promise<void> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>("access_token");

  if (!access_token) {
    toast.error("Faça login e tente novamente");
    console.error("Token de sessão ausente ou inválido.");
    return;
  }

  try {
    await apiSalaAis.post(
      `usuario/parar-de-seguir/${id_usuario_seguido}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  } catch (error) {
    console.error("Erro ao seguir usuário: ", error);
    toast.error("Erro ao seguir usuário. Tente novamente.");
  }
};

export const deleteUser = async (id_usuario_seguido: number): Promise<void> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>("access_token");

  if (!access_token) {
    // Aqui ainda faz sentido mostrar erro diretamente
    toast.error("Faça login e tente novamente");
    throw new Error("Token de sessão ausente ou inválido.");
  }

  const response = await apiSalaAis.delete(
    `usuario/${id_usuario_seguido}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  // Se o backend estiver retornando status 204 ou 200, isso já é sucesso
  // Mas se por algum motivo não for, você pode verificar:
  if (!response || response.status >= 400) {
    throw new Error("Erro inesperado ao deletar usuário.");
  }
};

export const adminLoginComUsuario = async (id_usuario: number): Promise<void> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>(Cookie.access_token);

  if (!access_token) {
    toast.error("Faça login e tente novamente");
    console.error("Token de sessão ausente ou inválido.");
    return;
  }

  // Envolve com toast.promise
  await toast.promise(
    apiSalaAis
      .post<AccessTokenResponse>(
        `auth/gerar-token-usuario`,
        { id_usuario },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(async ({ data }) => {
        if (data?.access_token) {
          setCookie(Cookie.access_token, data.access_token, Duration["7d"]);
          await getPermissionsByToken();
          setTimeout(() => { window.location.reload() }, 2000);
        } else {
          throw new Error("Token ausente na resposta.");
        }
      }),

    {
      pending: "Carregando login com usuário...",
      success: "Login realizado!",
      error: "Erro ao fazer login. Permissão ou usuário inválido.",
    }
  );
};

//adicionado e nao usado
export const getPermissionsByToken = async (): Promise<void> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>(Cookie.access_token);

  if (!access_token) {
    toast.error("Faça login e tente novamente");
    console.error("Token de sessão ausente ou inválido.");
    return;
  }

  try {
    const { data } = await apiSalaAis.get<DadosUsuarioPorTokenResponse>(
      `auth/permissoes-por-token`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (data.permissoes_ativas) {
      setLocalStorage(LocalStorage.permissions, data.permissoes_ativas);
    } else {
      throw new Error("Erro ao conseguir permissoes.");
    }
  } catch (error) {
    console.error("Erro ao gerar token do usuário:", error);
    toast.error("Erro ao fazer login. Verifique sua permissão.");
  }
};

export const deletePermission = async (id_usuario: number): Promise<void> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>("access_token");

  if (!access_token) {
    toast.error("Faça login e tente novamente");
    throw new Error("Token de sessão ausente ou inválido.");
  }

  const response = await apiSalaAis.delete(
    `permissao/permissao-usuario/${id_usuario}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  // Se o backend estiver retornando status 204 ou 200, isso já é sucesso
  // Mas se por algum motivo não for, você pode verificar:
  if (!response || response.status >= 400) {
    throw new Error("Erro inesperado ao deletar usuário.");
  }
};

export const createUserPermission = async (
  body: CreateUserPermissionRequest
): Promise<void> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>("access_token");

  if (!access_token) {
    toast.error("Faça login e tente novamente");
    throw new Error("Token de sessão ausente ou inválido.");
  }

  const response = await apiSalaAis.post(
    `permissao/permissao-usuario`,
    body,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!response || response.status >= 400) {
    throw new Error("Erro ao adicionar permissão.");
  }
};

// @Get('/permissao') query 'string_busca' // se estiver definido

export const getPermissaoOptions = async (busca: string = ""): Promise<{ label: string, value: string }[]> => {
  const apiSalaAis = getApiSalaAis();
  const access_token = getCookie<string>("access_token");

  if (!access_token) {
    toast.error("Faça login e tente novamente");
    throw new Error("Token de sessão ausente ou inválido.");
  }

  const response = await apiSalaAis.get<getPermissaoResponse[]>(
    `permissao?string_busca=${busca}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!response || response.status >= 400) {
    throw new Error("Erro ao buscar permissões.");
  }

  // Transforma para o formato aceito pelo componente
  return response.data.map((item) => ({
    label: item.key,
    value: item.name,
  }));
};

export const getPlans = async (): Promise<GetPlansResponse[] | void> => {
  const apiSalaAis = getApiSalaAis()
  const access_token = getCookie<string>(Cookie.access_token)

  if (!access_token) {
    console.error("Token de sessão ausente ou inválido.")
    return
  }

  try {
    const response = await apiSalaAis.get<GetPlansResponse[]>(
      `permissao/planos`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error("Erro ao buscar dados do usuário por token:", error)
    return []
  }
}

export const editPlan = async (
  id_permissao: number,
  editPlanRequest: EditPlanRequest
): Promise<void> => {
  const apiSalaAis = getApiSalaAis()
  const access_token = getCookie<string>(Cookie.access_token)

  if (!access_token) {
    console.error("Token de sessão ausente ou inválido.")
    return
  }

  try {
    await toast.promise(
      apiSalaAis.put<void>(
        `permissao/plano/${id_permissao}`,
        editPlanRequest,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      ),
      {
        pending: 'Editando Plano...',
        success: 'Plano editado!',
        error: 'Erro ao editar plano.',
      }
    )
  } catch (error) {
    console.error("Erro ao editar o plano:", error)
  }
}
