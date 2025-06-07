import { useEffect, useRef, useState } from "react"
import { Login, Register } from "../../components"
import * as Styled from './style'
import { useNavigate } from "react-router-dom";
import { loginWithAppleValidateAccessToken } from "../../services";

export function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const didRun = useRef(false);// evitar a duplicidade do stricmode

  const handleSwitchForm = () => {
    setIsRegistering((prev) => !prev);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session_token = urlParams.get("session_token");
    if (didRun.current) return; // se já rodou, ignora
    didRun.current = true;// evitar a duplicidade do stricmode

    if (session_token) {
      loginWithAppleValidateAccessToken({
        sessionToken: session_token,
        navigate: navigate,
        setIsLoading: setIsLoading,
      });
    }
  }, []);

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
