import styled from "styled-components";
import { Color } from "../../../global";

export const Content = styled.div`
  display: flex;
  width:100%;
  gap: 4px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: ${Color.TxtSecondary};
  font-size: 14px;
  font-family: inherit;
  width: 100%;

  &::placeholder {
    color: ${Color.TxtSecondary};
    opacity: 1;
  }

  &:disabled {
    color: ${Color.TxtSecondary};
  }
`;