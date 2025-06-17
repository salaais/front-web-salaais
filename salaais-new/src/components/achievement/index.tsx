// Achievements.tsx
import { useState } from "react"
import { AchievementType, type IconContentProps } from "./models"
import { IconType } from "../../global"
import * as Styled from "./style"

export function Achievement({
  iconType = IconType.ClockLoading,
  onClick,
  achievementType = AchievementType.Lendario,
  disabled = false,
}: IconContentProps) {
  const [animate, ] = useState(false)

  const StyledIcon = Styled.getStyledIcon(iconType, achievementType)

  return (
    <Styled.ContentBackground achievementType={achievementType} disabled={disabled} onClick={onClick}>
      <Styled.ContentIcon className={animate ? "animate" : ""}>
        {StyledIcon ? 
          <StyledIcon 
            iconType={iconType} 
            achievementType={achievementType} 
            disabled={disabled} 
           /> : null}
      </Styled.ContentIcon>
    </Styled.ContentBackground>
  )
}