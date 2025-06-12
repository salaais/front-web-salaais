import type { ReactNode } from "react"
import { Size, Color, ThemeType, type EnumType } from "../../global"
import type { AnimationType, IconType, StartAnimation } from "../../global/types/icon"

export interface IconContentProps {
  themeType?: EnumType<typeof ThemeType>
  children?: ReactNode
  iconType?: EnumType<typeof IconType>
  size?: EnumType<typeof Size>
  startAnimation?: EnumType<typeof StartAnimation>
  animationType?: EnumType<typeof AnimationType>
  interval?: number
  background?: EnumType<typeof Color>
  color?: EnumType<typeof Color> | string
  padding?: string
  onClick?: React.MouseEventHandler
}

export interface IconProps {
  themeType?: EnumType<typeof ThemeType>
  children?: ReactNode
  iconType?: EnumType<typeof IconType>
  size?: EnumType<typeof Size>
  color?: EnumType<typeof Color>
}
