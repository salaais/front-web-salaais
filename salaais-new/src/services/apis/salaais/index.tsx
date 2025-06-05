import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginResponse, LoginWithGoogleParams, RegisterRequest } from "./models";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "../../../global";

export const apiSalaAis = axios.create({
  baseURL: import.meta.env.VITE_SALA_AIS_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const paymentPlan = async (
  accessToken: string,
  priceId: string) => {
  try {
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
    const requestData = { email, password }
    const response = await apiSalaAis.post<LoginResponse>("auth/login", requestData)
    if (response.status === 200) {
      toast.success("Bem-vindo!")
      setCookie("access_token", response.data.access_token, 7)
      console.log(getCookie("access_token"))
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

export const loginWithGoogle = ({
  setIsLoading,
  setError,
  navigate,
}: LoginWithGoogleParams) => {
  if (!window.google?.accounts?.oauth2) {
    console.error("Google OAuth não está carregado.");
    return;
  }

  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_CLIENT_ID_GOOGLE_WEB,
    scope: import.meta.env.VITE_URL_LOGIN_GOOGLE,
    callback: async (googleResponse: any) => {
      if (!googleResponse?.access_token) {
        setError("Falha ao obter token do Google.");
        return;
      }

      try {
        setIsLoading(true);

        // Enviar token para a API usando axios (apiSalaAis)
        const apiResponse = await apiSalaAis.post(
          "auth/login-web",
          {}, // corpo vazio se necessário
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
        setError("Erro ao fazer login com Google.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });


  client.requestAccessToken();
};


