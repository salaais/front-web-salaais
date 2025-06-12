import { useState } from "react"
import * as Styles from "./style"
import { Align } from '../../align'
import type { ButtonProps } from "./interfaces"
import { Icon } from "./icon"
import { JustifyType } from "../../align/interfaces"
import { type EnumType, Size, ThemeType } from "../../../global"
import { loginWithApple } from "../../../services"


export function ButtonApple({
  text,
  size = Size.M,
  htmlFor,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [buttonType] = useState<EnumType<typeof ThemeType>>(ThemeType.Primary)
  const [, setError] = useState<string | null>(null)

  const handleClick = async () => {
    if (isLoading) return; // bloqueia cliques múltiplos
    setIsLoading(true)
    try {
      await loginWithApple({
        setIsLoading,
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
      onClick={isLoading ? () => { } : handleClick}
      disabled={isLoading}
      htmlFor={htmlFor}
    >
      {isLoading ? (
        <Icon type={buttonType}>
          <Styles.LoadingIcon type={buttonType} />
        </Icon>
      ) : (
        <Align gap="10px" alignCenter justify={JustifyType.Center}>
            <Styles.AppleIcon />
          {text && <span>{text}</span>}
        </Align>
      )}
    </Styles.Button>
  )
}
