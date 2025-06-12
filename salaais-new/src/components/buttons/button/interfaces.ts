import type { ReactNode } from "react"
import type { ThemeType } from "../../../global/types/componentTheme"
import type { EnumType } from "../../../global"

export interface ButtonProps {
  background?: string
  text?: string
  borderColor?: string
  size?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void> | undefined;
  secondary?: boolean
  icon?: ReactNode
  type?: EnumType<typeof ThemeType>
  color?: string
  response?: number
  htmlFor?: string
}

export interface IconProps {
  type?: EnumType<typeof ThemeType>
  children?: ReactNode
}
