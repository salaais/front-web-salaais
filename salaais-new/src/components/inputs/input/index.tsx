import { useState, useEffect } from "react"
import type { FocusEvent } from "react"

import * as Styled from "./style"
import { InputType } from "./interfaces"
import type { InputComponentProps } from "./interfaces"
import { Icon } from "../../icon"
import { IconType } from "../../icon/models"
import { Color } from "../../../global"

export function Input({
  text,
  type = InputType.Text, // Default type to 'text'
  size,
  value,
  onChange,
  placeholder,
  onKeyDown,
  name,
  error,
  background = Color.BgPrimary
}: InputComponentProps) {
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const isPassword = type === "password"
  const inputType = isPassword && showPassword ? "text" : type

  useEffect(() => {
    if (value || type === "date") {
      setIsInputFocus(true)
    } else {
      setIsInputFocus(false)
    }
  }, [value, type])

  const handleInputBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isInputFocus && event.target.value === "") {
      setIsInputFocus(false)
    }
    if (type === "date" && event.target.value === "") {
      setIsInputFocus(true)
    }
  }

  return (
    <Styled.Content>
      {type === "textarea" ? (
        <>
          <Styled.Textarea
            required
            size={size}
            id={text}
            value={value}
            error={error}
            name={name || text}
            autoComplete="off"
            onFocus={() => setIsInputFocus(true)}
            onBlur={handleInputBlur}
            onChange={onChange}
            isFocus={isInputFocus}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            background={background}
          />
          <Styled.Label htmlFor={text} isFocus={isInputFocus}>
            {text}
          </Styled.Label>
        </>
      ) : (
        <>
          <Styled.Input
            required
            type={inputType}
            size={size}
            id={text}
            value={value}
            error={error}
            name={name || text}
            autoComplete="off"
            onFocus={() => setIsInputFocus(true)}
            onBlur={handleInputBlur}
            onChange={onChange}
            isFocus={isInputFocus}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            background={background}
          />
          <Styled.Label htmlFor={text} isFocus={isInputFocus}>
            {text}
          </Styled.Label>

          {isPassword && (
            <Styled.TogglePassword onClick={() => setShowPassword(!showPassword)}>
              {showPassword ?
                <Icon iconType={IconType.Eye} color={Color.TxtPrimary} />
                :
                <Icon iconType={IconType.EyeOff} color={Color.TxtPrimary} />
              }

            </Styled.TogglePassword>
          )}
        </>
      )}
    </Styled.Content>
  )
}
