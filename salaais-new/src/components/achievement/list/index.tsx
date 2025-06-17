import { Achievement } from ".."
import { IconType, Size } from "../../../global"
import { Text } from "../../text"
import { AchievementType } from "../models"
import * as Styled from "./style"

const achievementList = [
  { iconType: IconType.Star, achievementType: AchievementType.Comum },
  { iconType: IconType.Star, achievementType: AchievementType.Comum },
  { iconType: IconType.Star, achievementType: AchievementType.Comum },
  { iconType: IconType.Trophy, achievementType: AchievementType.Raro },
  { iconType: IconType.Trophy, achievementType: AchievementType.Raro },
  { iconType: IconType.Trophy, achievementType: AchievementType.Raro },
  { iconType: IconType.ClockLoading, achievementType: AchievementType.Lendario },
  { iconType: IconType.ClockLoading, achievementType: AchievementType.Lendario },
  { iconType: IconType.ClockLoading, achievementType: AchievementType.Lendario },
]

export function AchievementList() {
  const grouped = {
    [AchievementType.Comum]: achievementList.filter(a => a.achievementType === AchievementType.Comum),
    [AchievementType.Raro]: achievementList.filter(a => a.achievementType === AchievementType.Raro),
    [AchievementType.Lendario]: achievementList.filter(a => a.achievementType === AchievementType.Lendario),
  }

  return (
    <Styled.Content>
      {Object.entries(grouped).map(([type, items]) => (
        <Styled.Group key={type}>
          <Text text={type} bold size={Size.L} />
          <Styled.GroupList>
            {items.map((item, index) => (
              <Achievement
                key={index}
                iconType={item.iconType}
                achievementType={item.achievementType}
                onClick={() => console.log("Clique no item", index)}
              />
            ))}
          </Styled.GroupList>
        </Styled.Group>
      ))}
    </Styled.Content>
  )
}
