import styled from "styled-components"
import { TextDecoration, type TextProps } from "."
import { Color } from "../../global/types/color"
import { Size } from "../../global/types/size"
import type { EnumType } from "../../global"

interface TitleProps {
  center?: boolean
  size?: string
  color?: EnumType<typeof Color>
  margin?: string
}

export const ShowMore = styled.span`
  color: ${Color.Primary};
  font-weight: 600;
  cursor: pointer;
  margin-left: 4px;
  user-select: none;
`

export const Title = styled.h3<TitleProps>`
  font-size: 30px;
  margin: 70px 0 70px 0;
  margin: ${(props) => (props.margin ? props.margin : "70px 0 70px 0")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  color: ${(props) => (props.color ? `${props.color}` : Color.TxtPrimary)};
`

interface AProps {
  size?: string
  color?: EnumType<typeof Color>
  margin?: string
}

export const A = styled.a<AProps>`
  font-size: ${(props) => (props.size ? `${props.size}` : "17px")};
  color: ${(props) => (props.color ? `${props.color}` : Color.Primary)};
  font-weight: 600;
  margin: ${(props) => (props.margin ? props.margin : "0")};
`

export const Text = styled.p<TextProps>`
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  margin: ${(props) => (props.margin ? props.margin : "0")};
  font-size: ${(props) => {
    switch (props.size) {
      case Size.Xs:
        return "12px"
      case Size.S:
        return "14px"
      case Size.M:
        return "16px"
      case Size.L:
        return "20px"
      case Size.Xl:
        return "25px"
      case Size.Xxl:
        return "40px"
      default:
        return "18px" // Valor padrão
    }
  }};
   text-decoration: ${(props) => {
    switch (props.textDecoration) {
      case TextDecoration.none:
        return 'none';
      case TextDecoration.underline:
        return 'underline';
      case TextDecoration.overline:
        return 'overline';
      case TextDecoration['line-through']:
        return 'line-through';
      case TextDecoration.blink:
        return 'blink';
      case TextDecoration.inherit:
        return 'inherit';
      case TextDecoration.initial:
        return 'initial';
      case TextDecoration.revert:
        return 'revert';
      case TextDecoration.unset:
        return 'unset';
      default:
        return 'none'; // valor padrão
    }
  }};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  color: ${(props) =>
    props.color
      ? `${props.color}`
      : props.bold
        ? Color.TxtPrimary
        : Color.TxtSecondary};
  text-align: ${(props) => (props.center ? "center" : "")};

  max-width: ${(props) => (props.maxW ? `${props.maxW}` : "none")};
  width: ${(props) => (props.maxW ? "100%" : "auto")};

  ${(props) =>
    props.responsive &&
    `
    width: 200px;
    @media (max-width: 768px) {
      width: auto;
      max-width: 100%;
    }
  `}
`

interface SpaceProps {
  space?: number
}

export const StyledSpace = styled.div<SpaceProps>`
  height: ${(props) => (props.space ? `${props.space}px` : "0")};
`

export const StyledText = styled.div`
  /* Adicione aqui os estilos específicos para o componente StyledText */
`
