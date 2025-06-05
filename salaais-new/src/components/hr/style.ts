import styled from "styled-components"
import type { HrProps } from "./interfaces"

export const Hr = styled.div<HrProps>`
  opacity: 0.3;
  background: ${(props) => props.bg || "var(--txt-tertiary-color)"};
  border-radius: 20px;
  height: ${(props) => props.height || "2px"};
  width: ${(props) => props.width || "100%"};
  margin: ${(props) => props.margin || "0"};
`;
