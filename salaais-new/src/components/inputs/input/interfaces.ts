import { ChangeEvent, KeyboardEvent } from "react"
import { Color, Size } from "../../../global"

export const InputType = {
  Text:"text",
  Textarea:"textarea",
  Date:"date",
  Password:"password",
} as const
export type InputType = typeof InputType[keyof typeof InputType];

export interface InputComponentProps {
  text?: string
  type?: InputType // Optional, defaults to 'text'
  size?: Size
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
  name?:string
  isFocus?: boolean // Optional
  background?: Color
}

export interface InputProps {
  size?: Size
  error?: boolean
  isFocus?: boolean
  background?: Color
}

export interface LabelProps {
  isFocus: boolean
}
