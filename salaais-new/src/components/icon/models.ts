import type { ReactNode } from "react"
import * as Icons from "../../assets/icons"
import { Size, Color, ThemeType } from "../../global"

export interface IconContentProps {
  themeType?: ThemeType
  children?: ReactNode
  iconType?: IconType
  size?: Size
  startAnimation?: StartAnimation
  animationType?: AnimationType
  interval?: number
  background?: Color
  color?: Color
  padding?: string
  onClick?: any
}

export interface IconProps {
  themeType?: ThemeType
  children?: ReactNode
  iconType?: IconType
  size?: Size
  color?: Color
}

export const StartAnimation = {
  Hover: "hover",
  HoverInfinite: "hover_infinite",
  Click: "click",
  Press: "press",
  Infinite: "infinite",
} as const
export type StartAnimation = typeof StartAnimation[keyof typeof StartAnimation];

export const AnimationType = {
  Bounce: "bounce",
  Float: "float",
  Slide: "slide",
  RotateMiddle: "rotate_middle",
  Rotate: "rotate",
} as const
export type AnimationType = typeof AnimationType[keyof typeof AnimationType];

export const IconType = {
  Admin: "admin",
  Airplane: "air_plane",
  ArrowDown: "arrow_down",
  ArrowLeft: "arrow_left",
  ArrowRight: "arrow_right",
  ArrowUp: "arrow_up",
  Bookmark: "bookmark",
  Bookmarks: "bookmarks",
  Check: "check",
  Circles: "circles",
  ClockLoading: "clock_loading",
  Clock: "clock",
  Code: "code",
  Formation: "formation",
  Lamp: "lamp",
  LineChart: "line_chart",
  Medal: "medal",
  LogOut: "log_out",
  Loading: "loading",
  Menu: "menu",
  Mouse: "mouse",
  Save: "save",
  Star: "star",
  Thunder: "thunder",
  UserInsideShield: "user_inside_shield",
  Linkedin: "linkedin",
  Whatsapp: "whatsapp",
  Email: "email",
  Github: "github",
  Close: "close",
  Trash: "trash",
  Key: "key",
  Refresh: "Refresh",
  Eye: "Eye",
  EyeOff: "EyeOff",
} as const
export type IconType = typeof IconType[keyof typeof IconType];

export const iconMap = {
  [IconType.Admin]: Icons.Admin,
  [IconType.Airplane]: Icons.Airplane,
  [IconType.ArrowDown]: Icons.ArrowDown,
  [IconType.ArrowLeft]: Icons.ArrowLeft,
  [IconType.ArrowRight]: Icons.ArrowRight,
  [IconType.ArrowUp]: Icons.ArrowUp,
  [IconType.Bookmark]: Icons.Bookmark,
  [IconType.Bookmarks]: Icons.Bookmarks,
  [IconType.Check]: Icons.Check,
  [IconType.Circles]: Icons.Circles,
  [IconType.ClockLoading]: Icons.ClockLoading,
  [IconType.Clock]: Icons.Clock,
  [IconType.Code]: Icons.Code,
  [IconType.Formation]: Icons.Formation,
  [IconType.Lamp]: Icons.Lamp,
  [IconType.LineChart]: Icons.LineChart,
  [IconType.Medal]: Icons.Medal,
  [IconType.LogOut]: Icons.LogOut,
  [IconType.Loading]: Icons.Loading,
  [IconType.Menu]: Icons.Menu,
  [IconType.Mouse]: Icons.Mouse,
  [IconType.Save]: Icons.Save,
  [IconType.Star]: Icons.Star,
  [IconType.Thunder]: Icons.Thunder,
  [IconType.UserInsideShield]: Icons.UserInsideShield,
  [IconType.Linkedin]: Icons.Linkedin,
  [IconType.Whatsapp]: Icons.Whatsapp,
  [IconType.Email]: Icons.Email,
  [IconType.Github]: Icons.Github,
  [IconType.Close]: Icons.Close,
  [IconType.Trash]: Icons.Trash,
  [IconType.Key]: Icons.Key,
  [IconType.Refresh]: Icons.Refresh,
  [IconType.Eye]: Icons.Eye,
  [IconType.EyeOff]: Icons.EyeOff,
}
