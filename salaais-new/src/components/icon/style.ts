import styled, { css, keyframes } from "styled-components"
import { AnimationType, iconMap, StartAnimation, type IconContentProps, type IconProps, type IconType } from "./models"
import { Color, Size, type EnumType } from "../../global"

// Define keyframes for animations
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15%);
  }
  60% {
    transform: translateY(5%);
  }
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15%);
  }
  100% {
    transform: translateY(0);
  }
`

const slide = keyframes`
  0% {
    transform: translateX(15%);
  }
  20%{
    transform: translateX(10%);
  }
  50% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(-15%);
  }
`

const rotateMiddle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`

const shake = keyframes`
  0% { transform: rotate(0); }
  25% { transform: rotate(-12deg); }
  75% { transform: rotate(12deg); }
  100% { transform: rotate(0); }
`;

const shakeWithPause = keyframes`
  0% { transform: rotate(-15deg); }
  10% { transform: rotate(15deg); }
  20% { transform: rotate(-15deg); }
  25% { transform: rotate(0); }
  100% { transform: rotate(0); } // 90% de pausa
`;

const zoomInOutWithPause = keyframes`
  0% { transform: scale(1); }
  10% { transform: scale(1.05); }
  20% { transform: scale(1.1); }
  25% { transform: scale(1.05); }
  100% { transform: scale(1); } // pausa entre 25% e 100%
`;

// Function to get styled icon component
export function getStyledIcon(iconType: EnumType<typeof IconType>) {
  const IconComponent = iconMap[iconType];

  if (!IconComponent) {
    return null;
  }

  return styled(IconComponent) <IconProps>`
    ${({ size }) => {
      switch (size) {
        case Size.Xs:
          return "width: 20px; height: 20px;";
        case Size.S:
          return "width: 24px; height: 24px;";
        case Size.M:
          return "width: 32px; height: 32px;";
        case Size.L:
          return "width: 40px; height: 40px;";
        case Size.Xl:
          return "width: 48px; height: 48px;";
        default:
          return "width: 20px; height: 20px;";
      }
    }};

    & * {
      
    ${({ color, themeType }) => {
      if (color) {
        return `fill: ${color};`
      }

      switch (themeType) {
        case "primary": return "fill: var(--text-button);"
        case "secondary": return "fill: var(--accent-color);"
        case "lite": return "fill: var(--text-solid);"
        case "outlined": return "fill: var(--admin-color);"
        default: return "fill: var(--success-color);"
      }
    }}
    }
  `;
}

export const ContentIcon = styled.div<IconContentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  padding: ${({ padding }) => padding || '10px'};
  height: fit-content;
  width: ${props => props.width};
  background-color: ${({ background }) => background || 'transparent'};
  box-shadow: ${({ shadow }) => shadow ? Color.Shadow : 'none'};
  border-radius: ${({ borderRadius }) => borderRadius != null ? `${borderRadius}` : '100%'};
  margin: ${({ margin }) => margin || '0'};
  border: ${({ border }) => border || 'none'};
  
  ${({ startAnimation, animationType, animationDuration }) => {
    const animationDurationSeconds = animationDuration ? `${animationDuration}s` : "1s"

    if (startAnimation === StartAnimation.Click) {
      return css`
        svg {
          animation: ${animationType === AnimationType.Bounce
          ? bounce
          : animationType === AnimationType.Rotate
            ? rotate
            : animationType === AnimationType.Float
              ? float
              : animationType === AnimationType.Slide
                ? slide
                : animationType === AnimationType.RotateMiddle
                  ? rotateMiddle
                  : animationType === AnimationType.Shake
                    ? shake
                    : animationType === AnimationType.ShakeWithPause
                      ? shakeWithPause
                      : animationType === AnimationType.ZoomInOutWithPause
                        ? zoomInOutWithPause
                        : "none"}
            ${animationDurationSeconds} linear alternate;//linear alternate
          animation-fill-mode: forwards;
        }
      `
    }

    if (startAnimation === StartAnimation.Hover) {
      return css`
        &:hover svg {
          animation: ${animationType === AnimationType.Bounce
          ? bounce
          : animationType === AnimationType.Rotate
            ? rotate
            : animationType === AnimationType.Float
              ? float
              : animationType === AnimationType.Slide
                ? slide
                : animationType === AnimationType.RotateMiddle
                  ? rotateMiddle
                  : animationType === AnimationType.Shake
                    ? shake
                    : animationType === AnimationType.ShakeWithPause
                      ? shakeWithPause
                      : animationType === AnimationType.ZoomInOutWithPause
                        ? zoomInOutWithPause
                        : "none"}
            ${animationDurationSeconds} ease-in-out;
          animation-fill-mode: forwards;
        }
      `
    }

    if (startAnimation === StartAnimation.HoverInfinite) {
      return css`
        &:hover svg {
          animation: ${animationType === AnimationType.Bounce
          ? bounce
          : animationType === AnimationType.Rotate
            ? rotate
            : animationType === AnimationType.Float
              ? float
              : animationType === AnimationType.Slide
                ? slide
                : animationType === AnimationType.RotateMiddle
                  ? rotateMiddle
                  : animationType === AnimationType.Shake
                    ? shake
                    : animationType === AnimationType.ShakeWithPause
                      ? shakeWithPause
                      : animationType === AnimationType.ZoomInOutWithPause
                        ? zoomInOutWithPause
                        : "none"}
            ${animationDurationSeconds} infinite;
        }
      `
    }

    if (startAnimation === StartAnimation.Press) {
      return css`
        &:active svg {
          animation: ${animationType === AnimationType.Bounce
          ? bounce
          : animationType === AnimationType.Rotate
            ? rotate
            : animationType === AnimationType.Float
              ? float
              : animationType === AnimationType.Slide
                ? slide
                : animationType === AnimationType.RotateMiddle
                  ? rotateMiddle
                  : animationType === AnimationType.Shake
                    ? shake
                    : animationType === AnimationType.ShakeWithPause
                      ? shakeWithPause
                      : animationType === AnimationType.ZoomInOutWithPause
                        ? zoomInOutWithPause
                        : "none"}
            ${animationDurationSeconds} infinite;
        }
      `
    }

    if (startAnimation === StartAnimation.Infinite) {
      return css`
        svg {
          animation: ${animationType === AnimationType.Bounce
          ? bounce
          : animationType === AnimationType.Rotate
            ? rotate
            : animationType === AnimationType.Float
              ? float
              : animationType === AnimationType.Slide
                ? slide
                : animationType === AnimationType.RotateMiddle
                  ? rotateMiddle
                  : animationType === AnimationType.Shake
                    ? shake
                    : animationType === AnimationType.ShakeWithPause
                      ? shakeWithPause
                      : animationType === AnimationType.ZoomInOutWithPause
                        ? zoomInOutWithPause
                        : "none"}
            ${animationDurationSeconds} linear infinite;
        }
      `
    }

    return css`
      svg {
        animation: none;
      }
    `
  }}
`
