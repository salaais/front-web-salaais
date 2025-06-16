import styled, { keyframes } from "styled-components"
import { Loading } from "../../../assets/icons"
import type { ButtonProps } from "./interfaces"
import { Color, ThemeType } from "../../../global"

export const Button = styled.button<ButtonProps>`
  height: fit-content;
  width: fit-content;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  * svg{
    width: 1em;
    height: 1em;
    fill:red;
    color: red;
  }

  ${({ type, color, background, textColor }) => {
    switch (type) {
      case ThemeType.Primary:
        return `
          color: var(--bg-secondary);
          background-color: var(--primary-color);
          padding: 8px;
          border-radius: 10px;
          border: 3px solid var(--primary-color);
        `;
      case ThemeType.Secondary:
        return `
          color: var(--primary-color);
          background-color: transparent;
          padding: 8px;
          border-radius: 10px;
          border: 3px solid var(--primary-color);
        `;
      case ThemeType.Lite:
        return `
          color: var(--text-solid);
          display: flex;
          height: 100%;
          align-items: center;
          background-color: var(--bg-secondary-color);
          padding: 0 5px;
          gap: 20px;
          border-radius: 12px;
          border: none;
        `;
      case ThemeType.Outlined:
        return `
          color: ${color ?? "var(--text-solid)"};
          color: ${textColor};
          align-items: center;
          background-color: ${background ?? "transparent"};
          padding: 2px 8px;
          gap: 10px;
          border-radius: 32px;
          border: 2px solid ${color ?? "var(--text-solid)"};
          svg {

          }
        `;
      default:
        return "";
    }
  }}

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.8;
    cursor: default;
  }
`;


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

  color: ${({ type }) => {
    switch (type) {
      case ThemeType.Primary:
        return 'var(--primary-color)';
      case ThemeType.Secondary:
        return 'var(--secondary-color)';
      case ThemeType.Lite:
        return 'var(--text-solid)';
      case ThemeType.Outlined:
        return 'red';
      case ThemeType.Error:
        return 'var(--danger-color)';
      default:
        return 'var(--text-solid)';
    }
  }};
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
