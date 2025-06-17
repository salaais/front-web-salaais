// Achievements.tsx
import { useState, useCallback } from "react"
import { AchievementType, type IconContentProps } from "./models"
import { IconType } from "../../global"
import * as Styled from "./style"

export function Achievement({
  iconType = IconType.ClockLoading,
  onClick,
  achievementType = AchievementType.Lendario,
}: IconContentProps) {
  const [animate, setAnimate] = useState(false)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setAnimate(true)
      onClick?.(e)

      // Exemplo: parar animação após 1s
      setTimeout(() => {
        setAnimate(false)
      }, 1000)
    },
    [onClick]
  )

  const StyledIcon = Styled.getStyledIcon(iconType, achievementType)

  return (
    <Styled.ContentBackground achievementType={achievementType}>
      <Styled.ContentIcon className={animate ? "animate" : ""} onClick={handleClick}>
        {StyledIcon ? <StyledIcon iconType={iconType} achievementType={achievementType} /> : null}
      </Styled.ContentIcon>
    </Styled.ContentBackground>
  )
}