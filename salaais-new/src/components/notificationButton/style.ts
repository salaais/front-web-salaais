import styled from "styled-components"
import { Color } from "../../global";

export const Content = styled.div`
  position: relative;
  display: inline-block;
  width: fit-content;
`;

export const NotificaionNumber = styled.div`
  position: absolute;
  top: 5px;
  left: 50%; /* fixa o ponto inicial à direita do ícone */
  transform: translateX(0); /* você pode usar -50% se quiser sobrepor um pouco */
  display: flex;
  padding: 0 5px;
  justify-content: center;
  align-items: center;
  min-width: 16px;
  height: 16px;
  background: ${Color.Orange};
  border-radius: 999px;
  z-index: 1;
  font-size: 10px;
`;

