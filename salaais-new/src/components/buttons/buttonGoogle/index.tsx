import { useState } from "react";
import { Align } from "../../align";
import type { ButtonProps } from "./interfaces";
import { Icon } from "./icon";
import { JustifyType } from "../../align/interfaces";
import { Size } from "../../../global";
import * as Styles from "./style";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../../services/apis/salaais";

export function ButtonGoogle({
  text,
  size = Size.M,
  htmlFor,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (isLoading) return; // bloqueia cliques múltiplos
    setIsLoading(true)
    try {
      await loginWithGoogle({
        setIsLoading,
        navigate,
      });
    } catch (error) {
      console.log(error)
      setError('Erro ao fazer login com Apple')
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Styles.Button
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      htmlFor={htmlFor}
    >
      {isLoading ? (
        <Icon>
          <Styles.LoadingIcon />
        </Icon>
      ) : (
        <Align gap="10px" alignCenter justify={JustifyType.Center}>
          <Styles.GoogleIcon />
          {text && <span>{text}</span>}
        </Align>
      )}
    </Styles.Button>
  );
}
