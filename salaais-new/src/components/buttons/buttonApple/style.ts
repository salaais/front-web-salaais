import styled, { keyframes } from "styled-components"
import { Loading, Apple } from "../../../assets/icons"
import type { ButtonProps } from "./interfaces"
import { ThemeType } from "../../../global"

export const Button = styled.button<ButtonProps>`
  height:fit-content;
  color: var(--bg-secondary);
  background-color: #272727;
  padding: 8px;
  border-radius: 10px;
  border: 3px solid #272727;
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

export const AppleIcon = styled(Apple) <ButtonProps>`
  cursor: default;
  width:20px;
  height:20px;
  & * {
    fill:white;
  }
`