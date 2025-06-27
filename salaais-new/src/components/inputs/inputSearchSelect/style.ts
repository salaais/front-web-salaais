import styled from "styled-components"; // ajuste esse caminho conforme sua estrutura
import { Color } from "../../../global";

export const Content = styled.div`
  position: relative;
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid ${Color.TxtTertiary};
  outline: none;
  transition: border 0.2s ease;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: ${Color.TxtTertiary};
    opacity: 1;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: #777;
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: ${Color.BgSecondary};
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
`;

export const Option = styled.li`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background: ${Color.BgPrimary};
  }
`;

export const NoOptions = styled.div`
  font-size:15px;
  padding: 15px;
  color: ${Color.Blue};
  text-align: center;
`;
