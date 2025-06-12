import { type ChangeEvent, type KeyboardEvent } from "react"
import { Color, makeEnum, Size, type EnumType } from "../../../global"

export const InputType = makeEnum({
  Text: "text",
  Textarea: "textarea",
  Date: "date",
  Password: "password",
})

export interface InputComponentProps {
  text?: string
  type?: EnumType<typeof InputType>
  size?: EnumType<typeof Size>
  value?: string
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  placeholder?: string
  // name?:string
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  error?: boolean
  name?: string
  isFocus?: boolean // Optional
  background?: EnumType<typeof Color>
}

export interface InputProps {
  size?: EnumType<typeof Size>
  error?: boolean
  isFocus?: boolean
  background?: EnumType<typeof Color>
}

export interface LabelProps {
  isFocus: boolean
}
