import { makeEnum, type EnumType } from "../../global"

export interface AlignProps {
  gap?: string
  width?: string
  margin?: string
  column?: boolean
  alignEnd?: boolean
  alignCenter?: boolean
  justify?: EnumType<typeof JustifyType>
  children?: React.ReactNode
  reponsive?: boolean
  padding?: string
}

export const JustifyType = makeEnum({
  Between: "between",
  Around: "around",
  Center: "center",
  Evenly: "evenly",
})