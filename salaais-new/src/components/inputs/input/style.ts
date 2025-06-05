import styled from "styled-components"
import type { InputProps, LabelProps } from "./interfaces"
import { Color } from "../../../global"

// Define a interface para as props usadas nos componentes

export const Content = styled.div<InputProps>`
  position: relative;
    ${({ size }) => {
    switch (size) {
      case "sm":
        return `width: 200px;`
      case "md":
        return `width: 250px;`
      case "lg":
        return `width: 300px;`
      case "full":
        return `width: 100%;`
      default:
        return `width: 100%;`
    }
  }}
  // padding: 30px 0 0 0;
`

export const Input = styled.input<InputProps>`
  border: 2px solid #00000000;
  border-radius: 10px;
  background-color: ${({ background }) => background || Color.Primary};
  padding: 10px;
  font-size: 16px;
  color: var(--txt-secondary);
  ${({ size }) => {
    switch (size) {
      case "sm":
        return `width: 200px;`
      case "md":
        return `width: 250px;`
      case "lg":
        return `width: 300px;`
      case "full":
        return `width: 100%;`
      default:
        return `width: 100%;`
    }
  }}
  &:focus + label {
    transform: translateY(-1.5rem);
    // font-size: 0.8rem;
    color: var(--primary-color);
  }
  &:focus {
    border: 2px solid var(--primary-color);
  }
  &:focus,
  &:valid {
    outline: none;
  }

  &:placeholder-shown + label {
    transform: translateY(1rem);
    // font-size: 1rem;
    background: var(--danger-primary);
  }
  &:-webkit-autofill + label {
    animation-name: onAutoFillStart;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    background: #0000;
  }

  // background
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px var(--bg-primary) inset;
    border: 1.5px solid var(--txt-primary);
  }

  // text
  &:-webkit-autofill {
    -webkit-text-fill-color: var(--txt-secondary) !important;
  }
  // icon calendar
  &[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(75%);
  }

  @keyframes onAutoFillStart {
    from {
      opacity: 0;
    }
    to {
      transform: translateY(-1.5rem);
    }
  }
`

export const Textarea = styled.textarea<InputProps>`
  resize: vertical;
  border: 2px solid #00000000;
  border-radius: 10px;
  height: 130px;
  background-color: ${({ background }) => background || Color.Primary};
  padding: 10px;
  font-size: 16px;
  color: var(--txt-secondary);
  ${({ size }) => {
    switch (size) {
      case "sm":
        return `width: 200px;`
      case "md":
        return `width: 250px;`
      case "lg":
        return `width: 300px;`
      case "full":
        return `width: 100%;`
      default:
        return `width: 100%;`
    }
  }}
  &:focus + label {
    transform: translateY(-1.5rem);
    // font-size: 0.8rem;
    color: var(--primary-color);
  }
  &:focus {
    border: 2px solid var(--primary-color);
  }
  &:focus,
  &:valid {
    outline: none;
  }

  &:placeholder-shown + label {
    transform: translateY(1rem);
    // font-size: 1rem;
    background: var(--danger-primary);
  }
  &:-webkit-autofill + label {
    animation-name: onAutoFillStart;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    background: #0000;
  }

  // background
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px var(--bg-primary) inset;
    border: 1.5px solid var(--txt-primary);
  }

  // text
  &:-webkit-autofill {
    -webkit-text-fill-color: var(--txt-secondary) !important;
  }
  // icon calendar
  &[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(75%);
  }

  @keyframes onAutoFillStart {
    from {
      opacity: 0;
    }
    to {
      transform: translateY(-1.5rem);
    }
  }
`

export const Label = styled.label<LabelProps>`
  font-weight: 500;
  position: absolute;
  left: 15px;
  color: var(--txt-primary);
  pointer-events: none;
  transform: ${({ isFocus }) =>
    isFocus ? "translateY(-1.5rem)" : "translateY(10px)"};
  background: transparent;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  // font-size: ${({ isFocus }) => (isFocus ? "0.8rem" : "1rem")};
`

export const TogglePassword = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--txt-secondary);
`

