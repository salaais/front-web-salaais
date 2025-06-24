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
  FullUserCardResponse
} from "./models";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "../../../global";
import './google.d.ts';

export function getApiSalaAis() {

  return axios.create({
    baseURL: import.meta.env.VITE_SALA_AIS_API,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

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
      toast.success("Bem-vindo!")
      setCookie("access_token", response.data.access_token, '7d')
      navigate("/home")
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    toast.error("email ou senha incorretos")
  }
}

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
}

export const loginWithGoogle = async ({
  setIsLoading,
  navigate,
}: LoginGoogleParams) => {

  if (!window.google?.accounts?.oauth2) {
    console.error("Google OAuth não está carregado.");
    return;
  }

  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID_WEB,
    scope: import.meta.env.VITE_GOOGLE_URL_LOGIN,
    callback: async (googleResponse: loginWithGoogleResponse) => {
      const apiSalaAis = getApiSalaAis();
      if (!googleResponse?.access_token) {
        toast.error("Falha ao obter token do Google.");
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

        const data = apiResponse.data;
        if (apiResponse.status === 200) {
          toast.success("Bem-vindo!")
          navigate("/home")
        }
        setCookie("access_token", data.access_token, '7d');

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

export const loginWithApple = async ({
  setIsLoading,
}: LoginAppleParams) => {
  try {
    setIsLoading(true);
    const state = crypto.randomUUID();
    //5 minutos
    setCookie("login_state_apple", state, '2m');

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

export const loginWithAppleValidateAccessToken = async (
  params: LoginAppleSessionTokenParams
) => {
  //http://localhost:5173/login?session_token=mskssoiam
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

    setCookie("access_token", access_token, '7d'); // 7 dias de validade
    toast.success("Bem vindo!");
    // Limpar a URL (remove os parâmetros da query)
    window.history.replaceState({}, document.title, "/login");
    navigate("/home")

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
    console.error("Token de sessão ausente ou inválido.");
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