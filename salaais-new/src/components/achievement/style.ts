// style.ts
import styled, { css, keyframes } from "styled-components"
import { AchievementType, type IconProps } from "./models"
import { Color, iconMap, type EnumType } from "../../global"

// Define keyframes para animação da cor do ícone lendário
const legendaryColorCycle = keyframes`
  0% { fill: #EB6CFF; }
  50% { fill: #FDED49; }
  25% { fill: #5AFFE4; }
  75% { fill: #5BB1FF; }
  100% { fill: #EB6CFF; }
`

const legendaryShadow = keyframes`
  0% { box-shadow: 0 0 6px 2px #EB6CFF; }
  25% { box-shadow: 0 0 6px 2px #FDED49; }
  50% { box-shadow: 0 0 6px 2px #FDED49; }
  75% { box-shadow: 0 0 6px 2px #FDED49; }
  100% { box-shadow: 0 0 6px 2px #EB6CFF; }
`

const rareShadow = keyframes`
  0% { box-shadow: 0 0 6px 2px #FF863A; }
  25% { box-shadow: 0 0 6px 2px #FF6347; }
  50% { box-shadow: 0 0 6px 2px #FF6347; }
  75% { box-shadow: 0 0 6px 2px #FFB347; }
  100% { box-shadow: 0 0 6px 2px #FF6347; }
`

export const AchievementWrapper = styled.div`
  margin: 8px;
  display: inline-block;
`

export const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 12px;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export function getStyledIcon(
  iconType?: IconProps["iconType"],
  achievementType?: IconProps["achievementType"],
  disabled?: IconProps["disabled"],
) {
  if (!iconType || !achievementType) return null

  const IconComponent = iconMap[iconType]
  if (!IconComponent) return null

  return styled(IconComponent)<IconProps>`
    width: 24px;
    height: 24px;
    stroke: none !important;
    opacity: 1 !important;

    & * {
      ${({ achievementType, disabled }) => {
const fillColor = disabled
  ? Color.AchievementDisabled
  : achievementType === AchievementType.Comum
  ? Color.AchievementComum
  : achievementType === AchievementType.Raro
  ? Color.AchievementRare // ← aqui trocamos
  : "var(--success-color)" // lendário

        const lendarioAnimation =
          achievementType === AchievementType.Lendario
            ? css`
                animation: ${legendaryColorCycle} 4s linear infinite;
              `
            : ""

        return css`
          fill: ${fillColor};
          ${lendarioAnimation}
        `
      }}
    }
  `
}


export const ContentBackground = styled.div<{ achievementType?: EnumType<typeof AchievementType>, disabled: boolean }>`
  position: relative;
  width: fit-content;
  padding: 3px;
  border-radius: 12px;
  overflow: hidden;
  background: transparent;
  opacity: ${({ disabled }) => (disabled ? .6 : 1)};
  ${({ achievementType, disabled }) => {
    switch (achievementType) {
      case AchievementType.Comum:
        return css`
          background: ${disabled ? Color.AchievementDisabled : Color.AchievementComum};
        `
      case AchievementType.Raro:
        return css`
          background: transparent;
          /* animation: ${rareShadow} 4s linear infinite; */
          &::before {
            content: "";
            position: absolute;
            top: -20%; left: -20%; right: -20%; bottom: -20%;
            border-radius: 50%;
            background: ${disabled ? Color.AchievementDisabled : Color.AchievementRaroBackground};
            animation: ${rotate360} 3s linear infinite;
            z-index: 0;
          }
        `
      case AchievementType.Lendario:
        return css`
          background: transparent;
          ${!disabled && css`animation: ${legendaryShadow} 4s linear infinite;`};
          
          &::before {
            content: "";
            position: absolute;
            top: -20%; left: -20%; right: -20%; bottom: -20%;
            border-radius: 50%;
            background: ${disabled ? Color.AchievementDisabled : Color.AchievementLendarioBackground};
            animation: ${rotate360} 3s linear infinite;
            z-index: 0;
          }
        `
      default:
        return css`
          background: ${Color.TxtPrimary};
        `
    }
  }}
`

export const ContentIcon = styled.div`
  position: relative; /* para ficar acima do ::before */
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  padding: 7px;
  height: fit-content;
  width: fit-content;
  border-radius: 10px;
  background-color: ${Color.BgSecondary};
`
