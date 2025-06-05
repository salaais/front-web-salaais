export const ThemeType = {
  Primary: "primary",
  Secondary: "secondary",
  Lite: "lite",
  Outlined: "outlined",
  Error: "error",
} as const
export type ThemeType = typeof ThemeType[keyof typeof ThemeType];