export const Size = {
  Xs: "xs",
  S: "sm",
  M: "md",
  L: "lg",
  Xl: "xl",
  Full: "full",
} as const
export type Size = typeof Size[keyof typeof Size];