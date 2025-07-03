import styled from "styled-components"
import { Color } from "../../global";

export const Content = styled.div`
  position: relative;
  display: inline-block;
  width: fit-content;
`;

export const NotificaionNumber = styled.div`
  position: absolute;
  top: 9px;
  right: 6px;
  display: flex;
  justify-content: center;
  align-items:flex-end;
  width: 15px;
  height: 15px;
  background: ${Color.Orange};
  border-radius: 50%;
  z-index: 1;
`;
