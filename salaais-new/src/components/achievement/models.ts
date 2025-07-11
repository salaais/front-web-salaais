// models.ts
import { ThemeType, type EnumType, makeEnum } from "../../global"
import type { IconType } from "../icon/models"

export const AchievementType = makeEnum({
  Comum: "Comum",
  Raro: "Raro",
  Lendario: "Lendario",
})

export interface IconContentProps {
  iconType?: EnumType<typeof IconType>
  achievementType?: EnumType<typeof AchievementType>
  onClick?: React.MouseEventHandler
  disabled: boolean,
}

export interface IconProps {
  themeType?: EnumType<typeof ThemeType>
  iconType?: EnumType<typeof IconType>
  achievementType?: EnumType<typeof AchievementType>
  disabled: boolean,
}
