import { useState } from "react"
import * as Styles from "./style"
import { Align } from '../../align'
import type { ButtonProps } from "./interfaces"
import { Icon } from "./icon"
import { JustifyType } from "../../align/interfaces"
import { Color, ThemeType, type EnumType } from "../../../global"


export function Button({
  background,
  text='Button',
  borderColor,
  size,
  onClick,
  secondary = false,
  icon,
  type=ThemeType.Primary,
  color=Color.Primary,
  response,
  htmlFor,
  textColor,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [buttonType, setButtonType] = useState<EnumType<typeof ThemeType>>(ThemeType.Primary)
  const [, setError] = useState<string | null>(null)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return // Se `onClick` não estiver definido, não faça nada.
    if (!e) return;

    if (isLoading) {
      e.preventDefault();
      return;
    }
    setIsLoading(true)
    setError(null)
    let timer: ReturnType<typeof setTimeout> | undefined

    try {
      const result = onClick(e)
      if (result instanceof Promise) {
        await result
      }
    } catch (err) {
      setButtonType(ThemeType.Error)
      console.log(err)
      timer = setTimeout(() => {
        setButtonType(ThemeType.Error)
      }, 2000)
    } finally {
      setIsLoading(false)
      if (response && (response < 200 || response >= 300)) {
        setButtonType(ThemeType.Error)
        timer = setTimeout(() => {
          setButtonType(ThemeType.Error)
        }, 2000)
      }
    }

    if (timer) {
      clearTimeout(timer)
    }
  }

  return (
    <Styles.Button
      secondary={secondary}
      background={background}
      borderColor={borderColor}
      size={size}
      onClick={isLoading ? undefined : handleClick}//bloquear totalmente o clique sem fazer nada
      disabled={isLoading}
      type={type}
      color={color}
      htmlFor={htmlFor}
      textColor={textColor}
    >
      {isLoading ? (
        <Icon type={buttonType}>
          <Styles.LoadingIcon type={buttonType} />
        </Icon>
      ) : (
        <Align gap="4px" alignCenter justify={JustifyType.Center}>
          {icon && <Icon type={buttonType}>{icon}</Icon>}
          {text && <span>{text}</span>}
        </Align>
      )}
    </Styles.Button>
  )
}
