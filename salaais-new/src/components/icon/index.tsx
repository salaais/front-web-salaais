import { useState, useCallback } from "react"
import { IconType, StartAnimation, type IconContentProps } from "./models"
import { Color, Size, ThemeType } from "../../global"
import * as Styled from "./style"

export function Icon({
  themeType = ThemeType.Primary,
  iconType = IconType.ClockLoading,
  size = Size.S,
  startAnimation,
  margin= "0",
  animationType,
  interval,
  color = Color.TxtPrimary,
  background,
  padding,
  onClick,
  borderRadius = '100%',
  width="fit-content",
  style,
  shadow = false
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
      borderRadius={borderRadius}
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