import styled from "styled-components"
import type { HrProps } from "./interfaces"
import { Color } from "../../global";

export const Hr = styled.div<HrProps>`
  background: ${(props) => props.bg || Color.TxtTertiary};
  border-radius: 20px;
  height: ${(props) => props.height || "1px"};
  width: ${(props) => props.width || "100%"};
  margin: ${(props) => props.margin || "0"};
`;

export const Content = styled.div<HrProps>`
  display: flex;
  width: 100%;

  justify-content: ${({ left, center, right }) => {
    if (center) return "center";
    if (right) return "flex-end";
    if (left) return "flex-start";
    return "center"; // default
  }};
`;
