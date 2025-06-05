export interface AlignProps {
  gap?: string
  width?: string
  margin?: string
  column?: boolean
  alignEnd?: boolean
  alignCenter?: boolean
  justify?: JustifyType
  children?: any
  reponsive?: boolean
  padding?: string
}

export const JustifyType = {
  Between: "between",
  Around: "around",
  Center: "center",
  Evenly: "evenly",
} as const

export type JustifyType = typeof JustifyType[keyof typeof JustifyType];