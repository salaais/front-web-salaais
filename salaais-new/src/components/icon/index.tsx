import { useState, useCallback } from "react"
import { IconType, StartAnimation, type IconContentProps } from "./models"
import { Color, Size, ThemeType } from "../../global"
import * as Styled from "./style"

export function Icon({
  themeType = ThemeType.Primary,
  iconType = IconType.ClockLoading,
  size = Size.S,
  startAnimation,
  margin = "0",
  animationType,
  color = Color.TxtPrimary,
  animationDuration,
  background,
  padding,
  onClick,
  borderRadius = '100%',
  border,
  width = "fit-content",
  style,
  shadow = false,
}: IconContentProps) {
  const [animate, setAnimate] = useState(false)
  const StyledIcon = Styled.getStyledIcon(iconType)

  const handleMouseDown = useCallback(() => {
    if (startAnimation === StartAnimation.Click) {
      setAnimate(true)
      const timer = setTimeout(() => {
        setAnimate(false)
      }, animationDuration) // Ensure animation class is removed after animation duration
      return () => clearTimeout(timer) // Cleanup timer on component unmount or re-render
    }
  }, [startAnimation, animationDuration])

  return (
    <Styled.ContentIcon
      size={size}
      startAnimation={startAnimation}
      animationType={animationType}
      animationDuration={animationDuration}
      className={animate ? "animate" : ""}
      onMouseDown={handleMouseDown}
      background={background}
      padding={padding}
      onClick={onClick}
      borderRadius={borderRadius}
      border={border}
      width={width}
      margin={margin}
      style={style}
      shadow={shadow}
    >
      {StyledIcon ? (
        <StyledIcon color={color} themeType={themeType} size={size} />
      ) : null}
    </Styled.ContentIcon>
  )
}