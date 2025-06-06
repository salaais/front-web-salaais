import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { LoginResponse, LoginGoogleParams, RegisterRequest, LoginAppleParams } from "./models";
import { toast } from "react-toastify";
import { setCookie } from "../../../global";

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
      setCookie("access_token", response.data.access_token, 7)
      navigate("/profile")
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

  } catch (error: any) {
    const errorMessage = error?.response?.data?.errors_description[0]

    if (errorMessage) {
      toast.error(errorMessage)
    } else {
      toast.error(errorMessage || "Erro ao fazer cadastro")
    }

    console.error("Erro ao fazer cadastro:", error)
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
    callback: async (googleResponse: any) => {
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
          navigate("/profile")
        }
        setCookie("access_token", data.access_token, 7);

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

    const authUrl = `https://appleid.apple.com/auth/authorize?` +
      `client_id=${import.meta.env.VITE_APPLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(import.meta.env.VITE_APPLE_REDIRECT_URL)}&` +
      `response_type=code&` +
      `response_mode=form_post&` +
      `scope=name email&` +
      `state=${state}`;

    window.location.href = authUrl;
    toast.success("Bem vindo!")
  } catch (err) {
    toast.error("Erro ao redirecionar para Apple.");
    console.error(err);
  } finally {
    setIsLoading(false); // essa linha nunca será executada por causa do redirect
  }
};






