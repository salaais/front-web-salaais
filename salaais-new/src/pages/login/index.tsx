import { useEffect, useRef, useState } from "react"
import { Login, Register } from "../../components"
import * as Styled from './style'
import { useNavigate } from "react-router-dom";
import { loginWithAppleValidateAccessToken } from "../../services";
import { getAuthUserByToken } from "../../services/apis/salaais";
import { Cookie, getCookie } from "../../global";

export function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const didRun = useRef(false);

  const handleSwitchForm = () => {
    setIsRegistering((prev) => !prev);
  };

  useEffect(() => {
    const checkExistingSession = async () => {
      const token = getCookie(Cookie.access_token);

      if (token) {
        const user = await getAuthUserByToken();
        if (user) {
          console.log("Usuário autenticado, pronto para redirecionar");
          setIsLogged(true);
          return;
        }
      }

      const urlParams = new URLSearchParams(window.location.search);
      const session_token = urlParams.get("session_token");

      if (session_token) {
        loginWithAppleValidateAccessToken({
          sessionToken: session_token,
          navigate,
          setIsLoading,
        });
      }
    };

    if (!didRun.current) {
      didRun.current = true;
      checkExistingSession();
    }
  }, []);

  // Redireciona depois de confirmar login
  useEffect(() => {
    if (isLogged) {
      navigate("/home", { replace: true });
    }
  }, [isLogged, navigate]);

  return (
    <Styled.Content>
      <Styled.Inner>
        {isRegistering ? (
          <Register onSwitchForm={handleSwitchForm} />
        ) : (
          <Login onSwitchForm={handleSwitchForm} />
        )}
      </Styled.Inner>
    </Styled.Content>
  );
}