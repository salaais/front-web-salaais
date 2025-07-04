import type { ReactNode } from "react"
import { Size, Color, ThemeType, type EnumType, makeEnum } from "../../global"
import * as Icons from "../../assets/icons"
export interface IconContentProps {
  themeType?: EnumType<typeof ThemeType>
  children?: ReactNode
  iconType?: EnumType<typeof IconType>
  margin?: string
  size?: EnumType<typeof Size>
  startAnimation?: EnumType<typeof StartAnimation>
  animationType?: EnumType<typeof AnimationType>
  animationDuration?: number
  background?: EnumType<typeof Color>
  color?: EnumType<typeof Color> | string
  padding?: string
  borderRadius?: string
  border?: string
  onClick?: React.MouseEventHandler
  width?: string
  style?: React.CSSProperties
  shadow?: boolean
}

export interface IconProps {
  themeType?: EnumType<typeof ThemeType>
  children?: ReactNode
  iconType?: EnumType<typeof IconType>
  size?: EnumType<typeof Size>
  color?: EnumType<typeof Color>
}

export const StartAnimation = makeEnum({
  Hover: "hover",
  HoverInfinite: "hover_infinite",
  Click: "click",
  Press: "press",
  Infinite: "infinite",
})

export const AnimationType = makeEnum({
  Bounce: "Bounce",
  Float: "Float",
  Slide: "Slide",
  Shake: "Shake",
  ZoomInOutWithPause: "ZoomInOutWithPause",
  ShakeWithPause: 'ShakeWithPause',
  RotateMiddle: "RotateMiddle",
  Rotate: "Rotate",
})

export const IconType = makeEnum({
  ShieldAdmin: "ShieldAdmin",
  Airplane: "Airplane",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  ArrowUp: "ArrowUp",
  Bookmark: "Bookmark",
  Bookmarks: "Bookmarks",
  Check: "Check",
  Circles: "Circles",
  ClockLoading: "ClockLoading",
  Clock: "Clock",
  Code: "Code",
  Formation: "Formation",
  Lamp: "Lamp",
  LineChart: "LineChart",
  Medal: "Medal",
  LogOut: "LogOut",
  Loading: "Loading",
  Menu: "Menu",
  Mouse: "Mouse",
  Save: "Save",
  Star: "Star",
  Thunder: "Thunder",
  UserInsideShield: "UserInsideShield",
  Linkedin: "Linkedin",
  Whatsapp: "Whatsapp",
  Email: "Email",
  Github: "Github",
  Close: "Close",
  Trash: "Trash",
  Key: "Key",
  Refresh: "Refresh",
  Eye: "Eye",
  EyeOff: "EyeOff",
  Grid: "Grid",
  Home: "Home",
  Search: "Search",
  Settings: "Settings",
  User: "User",
  Users: "Users",
  Notification: "Notification",
  Payments: "Payments",
  Instagram: "Instagram",
  Facebook: "Facebook",
  Trophy: "Trophy",
  Checklist: "Checklist",
  Assigment: "Assigment",
  Bug: "Bug",
  AssigmentCheck: "AssigmentCheck",
  Rank: "Rank",
  Phoenix: "Phoenix",
  Eagle: "Eagle",
  Manager: "Manager",
  Login: "Login",
  UserSettings: "UserSettings",
  AirplaneDown: "AirplaneDown",
  Brain: "Brain",
  Wing: "Wing",

  Fire: "Fire",
  BookA: "BookA",
  Test: "Test",
  Tests: "Tests",
  Edit: "Edit",
  ShoppingCart: "ShoppingCart",
  Payment: "Payment",
  ShoppingBag: "ShoppingBag",
  Add: "Add",
  TestCheck: "TestCheck",
})

export const iconMap = {
  [IconType.ShieldAdmin]: Icons.ShieldAdmin,
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
  [IconType.Grid]: Icons.Grid,
  [IconType.Home]: Icons.Home,
  [IconType.Search]: Icons.Search,
  [IconType.Settings]: Icons.Settings,
  [IconType.User]: Icons.User,
  [IconType.Users]: Icons.Users,
  [IconType.Notification]: Icons.Notification,
  [IconType.Payments]: Icons.Payments,
  [IconType.Instagram]: Icons.Instagram,
  [IconType.Facebook]: Icons.Facebook,
  [IconType.Trophy]: Icons.Trophy,
  [IconType.Checklist]: Icons.Checklist,
  [IconType.Assigment]: Icons.Assigment,
  [IconType.Bug]: Icons.Bug,
  [IconType.AssigmentCheck]: Icons.AssigmentCheck,
  [IconType.Rank]: Icons.Rank,
  [IconType.Phoenix]: Icons.Phoenix,
  [IconType.Eagle]: Icons.Eagle,
  [IconType.Manager]: Icons.Manager,
  [IconType.Login]: Icons.Login,
  [IconType.UserSettings]: Icons.UserSettings,
  [IconType.AirplaneDown]: Icons.AirplaneDown,
  [IconType.Brain]: Icons.Brain,
  [IconType.Wing]: Icons.Wing,
  [IconType.Fire]: Icons.Fire,
  [IconType.BookA]: Icons.BookA,
  [IconType.Test]: Icons.Test,
  [IconType.Tests]: Icons.Tests,
  [IconType.Edit]: Icons.Edit,
  [IconType.ShoppingCart]: Icons.ShoppingCart,
  [IconType.Payment]: Icons.Payment,
  [IconType.ShoppingBag]: Icons.ShoppingBag,
  [IconType.Add]: Icons.Add,
  [IconType.TestCheck]: Icons.TestCheck,
}
