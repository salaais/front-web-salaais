
import type { ChangeEvent, KeyboardEvent } from "react"
import { Color, Size, type EnumType } from '../../../global'

export interface InputComponentProps {
    text?: string
    type?: string // Optional, defaults to 'text'
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
