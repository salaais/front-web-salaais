import styled, { keyframes } from "styled-components"
import { Loading, Google } from "../../../assets/icons"
import type { ButtonProps } from "./interfaces"

export const Button = styled.button<ButtonProps>`
  height:fit-content;
  color: var(--txt-tertiary);
  background-color: var(--bg-secondary);
  padding: 8px;
  border-radius: 10px;
  border: 3px solid var(--bg-primary);
  width: fit-content;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    opacity: 0.7;
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

  & * {
    fill:var(--txt-secondary);
  }
`

export const GoogleIcon = styled(Google) <ButtonProps>`
  cursor: default;
  width:20px;
  height:20px;
  /* & * {
    fill:white;
  } */
`
