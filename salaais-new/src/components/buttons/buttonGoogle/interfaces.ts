import type { ReactNode } from "react"
import type { ThemeType } from "../../../global/types/componentTheme"

export interface ButtonProps {
  background?: string
  text?: string
  borderColor?: string
  size?: string
  onClick?: any
  secondary?: boolean
  icon?: React.ReactNode
  type?: ThemeType
  color?: string
  response?: number
  htmlFor?: string
}

export interface IconProps {
  type?: ThemeType
  children?: ReactNode
}
