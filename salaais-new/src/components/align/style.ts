import styled from "styled-components"
import type { AlignProps } from "./interfaces"
import { JustifyType } from "./interfaces"

export const Align = styled.div<AlignProps>`
  display: flex;
  ${(props) => (props.reponsive ? `flex-wrap:wrap;` : "")};
  gap: ${(props) => (props.gap ? `${props.gap}` : "0")} !important;
  width: ${(props) => (props.width ? `${props.width}` : "100%")};
  margin: ${(props) => (props.margin ? `${props.margin}` : "")};
  padding: ${(props) => (props.padding ? `${props.padding}` : "")};
  ${(props) => (props.column ? `flex-direction: column;` : "")};
  ${(props) => (props.alignEnd ? `align-items: flex-end;` : "")};
  ${(props) => (props.alignCenter ? `align-items: center;` : "")};
  ${(props) => {
    switch (props.justify) {
      case JustifyType.Between:
        return `justify-content: space-between;`
      case JustifyType.Around:
        return `justify-content: space-around;`
      case JustifyType.Center:
        return `justify-content: center;`
      case JustifyType.Evenly:
        return `justify-content: space-evenly;`
      default:
        return ``
    }
  }};
`
