import { useState, useCallback } from "react"
import {
  IconType,
  StartAnimation,
} from "./models"
import type {IconContentProps} from "./models"
import * as Styled from "./style"
import { Size, ThemeType } from "../../global"

export function Icon({
  themeType = ThemeType.Primary,
  iconType = IconType.ClockLoading,
  size = Size.S,
  startAnimation,
  animationType,
  interval,
  color,
  background,
  padding,
  onClick,
}: IconContentProps) {
  const [animate, setAnimate] = useState(false)
  const StyledIcon = Styled.getStyledIcon(iconType)

  const handleMouseDown = useCallback(() => {
    if (startAnimation === StartAnimation.Click) {
      setAnimate(true)
      const timer = setTimeout(() => {
        setAnimate(false)
      }, interval) // Ensure animation class is removed after animation duration
      return () => clearTimeout(timer) // Cleanup timer on component unmount or re-render
    }
  }, [startAnimation, interval])

  return (
    <Styled.ContentIcon
      size={size}
      startAnimation={startAnimation}
      animationType={animationType}
      interval={interval}
      className={animate ? "animate" : ""}
      onMouseDown={handleMouseDown}
      background={background}
      padding={padding}
      onClick={onClick}
    >
      {StyledIcon ? (
        <StyledIcon color={color} themeType={themeType} size={size} />
      ) : null}
    </Styled.ContentIcon>
  )
}
