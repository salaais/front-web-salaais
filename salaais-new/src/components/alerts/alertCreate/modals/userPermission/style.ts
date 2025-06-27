// components/alerts/alertCreate/style.ts
import styled from "styled-components";
import { Color } from "../../../../../global";

export const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 1rem;
`;

export const Input = styled.input`
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
    opacity:1; //forca o nagevador a renderizar
  }
`;

export const ConfirmButton = styled.button`
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #0056b3;
  }
`;
