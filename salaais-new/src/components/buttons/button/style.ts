import styled, { keyframes } from "styled-components"
import { Loading } from "../../../assets/icons"
import type { ButtonProps } from "./interfaces"
import { ThemeType } from "../../../global"

export const Button = styled.button<ButtonProps>`
height:fit-content;
  ${({ type }) => {
    switch (type) {
      case "primary":
        return `
          color: var(--bg-secondary);
          background-color: var(--primary-color);
          padding: 8px;
          border-radius: 10px;
          border: 3px solid var(--primary-color);
        `
      case "secondary":
        return `
          color: var(--primary-color);
          background-color: transparent;
          padding: 8px;
          border-radius: 10px;
          border: 3px solid var(--primary-color);
        `
      case "lite":
        return `
          color: var(--text-solid);
          display: flex;
          height: 100%;
          align-items: center;
          background-color: var(--bg-secondary-color);
          padding: 0 5px 0 5px;
          gap: 20px;
          border-radius: 12px;
          border: none;
        `
      case "outlined":
        return `
          color: var(--admin-color);
          display: flex;
          height: 50%;
          align-items: center;
          background-color: var(--admin-color-opacity);
          padding: 0 5px 0 5px;
          gap: 10px;
          border-radius: 32px;
          border: 3px solid var(--admin-color);
        `
      case "error":
        return `
          color: var(--text-button);
          background-color: var(--error-color);
          padding: 8px;
          border-radius: 5px;
          border: 4px solid var(--error-color);
        `
      default:
        return "none"
    }
  }}
  width: fit-content;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.8;
    cursor: default;
  }
`

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const LoadingIcon = styled(Loading) <ButtonProps>`
  cursor: default;
  font-size: 16px;
  animation: ${spinAnimation} 2s linear infinite;
  color: var(--bg-secondary);
  ${({ type }) => {
    switch (type) {
      case ThemeType.Primary:
        return `
          fill: var(--bg-secondary);
        `
      case ThemeType.Secondary:
        return `
          fill: var(--primary-color);
        `
      case ThemeType.Lite:
        return `
          fill: var(--text-solid);
        `
      case ThemeType.Outlined:
        return `
          fill: var(--admin-color);
        `
      default:
        return "none"
    }
  }}
`

export const ContentIcon = styled.div<ButtonProps>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  & * {
    ${({ type }) => {
    switch (type) {
      case ThemeType.Primary:
        return `
            fill: red;
          `
      case ThemeType.Secondary:
        return `
            fill: var(--primary-color);
          `
      case ThemeType.Lite:
        return `
            fill: var(--text-solid);
          `
      case ThemeType.Outlined:
        return `
            fill: var(--admin-color);
          `
      default:
        return "fill: var(--bg-secondary);"
    }
  }}
  }
`
