import { Achievement } from ".."
import { IconType, Size } from "../../../global"
import { Text } from "../../text"
import { AchievementType } from "../models"
import * as Styled from "./style"

const achievementList = [
  {
    iconType: IconType.UserSettings,
    achievementType: AchievementType.Comum,
    descricao: "Check-in Feito - Complete o perfil do seu usuário"
  },
  {
    iconType: IconType.Users,
    achievementType: AchievementType.Comum,
    descricao: "Blogueirinho - Consiga seus primeiros 5 seguidores"
  },
  {
    iconType: IconType.AirplaneDown,
    achievementType: AchievementType.Comum,
    descricao: "Avião turbulento - Tire uma nota abaixo de 30%"
  },
  {
    iconType: IconType.Login,
    achievementType: AchievementType.Comum,
    descricao: "Primeiro acesso - faça login pela primeira vez"
  },
  {
    iconType: IconType.Bug,
    achievementType: AchievementType.Comum,
    descricao: "Bug Report - identificou um bug e reportou"
  },
  {
    iconType: IconType.Bookmark,
    achievementType: AchievementType.Comum,
    descricao: "Navegação Básica – Concluiu o primeiro módulo de estudo."
  },
  {
    iconType: IconType.Star,
    achievementType: AchievementType.Comum,
    descricao: "100 Pés de Conhecimento – Acumulou 100 pontos no sistema."
  },
  {
    iconType: IconType.Clock,
    achievementType: AchievementType.Comum,
    descricao: "Ninguém me pega - Finalizou uma prova com mais de 10 minutos de sobra."
  },
  {
    iconType: IconType.AssigmentCheck,
    achievementType: AchievementType.Comum,
    descricao: "Prova Completa – Concluiu uma prova sem deixar questões em branco."
  },
  {
    iconType: IconType.Clock,
    achievementType: AchievementType.Raro,
    descricao: "Em ar puros - finalizou a prova faltando menos de 10 segundos."
  },
  {
    iconType: IconType.Rank,
    achievementType: AchievementType.Raro,
    descricao: "Ficou em top 3 no rank"
  },
  {
    iconType: IconType.Eagle,
    achievementType: AchievementType.Raro,
    descricao: "Olhos de águia - Encontrou o “easter egg” visual no site."
  },
  {
    iconType: IconType.Brain,
    achievementType: AchievementType.Raro,
    descricao: "Super Gênio - Estudou todo o conteúdo dispponível"
  },
  {
    iconType: IconType.Manager,
    achievementType: AchievementType.Raro,
    descricao: "Engenheiro do Céu - Sugeriu uma melhoria que foi implementada no sistema."
  },
  {
    iconType: IconType.Phoenix,
    achievementType: AchievementType.Lendario,
    descricao: "Fênix Lendária – Reprovou na prova ANAC e depois gabaritou a mesma."
  },
  {
    iconType: IconType.Wing,
    achievementType: AchievementType.Lendario,
    descricao: "Asas Lendárias – Fez sua primeira hora de voo prático (confirmado pelo admin)."
  },
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
