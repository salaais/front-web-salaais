import styled from "styled-components";
import { Color } from "../../../global";

export const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const ConfirmButton = styled.button`
  padding: 5px 10px;
  background-color: ${Color.Green};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
`;

export const ContentModal = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
`
