import { Color, IconType, Size, type EnumType } from "../../../global"
import { Icon } from "../../icon"
import { Text } from "../../text"
import * as Styled from "./style"

type AdminCard = {
  icon: EnumType<typeof IconType>
  title: string
  description: string
}

const defaultCards: AdminCard[] = [
  {
    icon: IconType.Formation,
    title: "Estudo",
    description: "Provas, questões e materias de estudo",
  },
  {
    icon: IconType.Users,
    title: "Usuários",
    description: "Editar, buscar, gerenciar",
  },
  {
    icon: IconType.Notification,
    title: "Notificações",
    description: "Email, notificações dentro do app",
  },
  {
    icon: IconType.Payments,
    title: "Pagamentos",
    description: "Histórico e filtros",
  },
]

type AdminCardsProps = {
  cards?: AdminCard[] // prop opcional, com fallback
}

export function AdminCards({ cards = defaultCards }: AdminCardsProps) {
  return (
    <Styled.ContentCards>
      {cards.map((card, index) => (
        <Styled.ContentCard key={index}>
          <Icon size={Size.M} iconType={card.icon} color={Color.Admin} background={Color.BgPrimary} />
          <Styled.ContentText>
            <Text text={card.title} bold />
            <Text size={Size.M} text={card.description} textLimit={40} showMore />
          </Styled.ContentText>
        </Styled.ContentCard>
      ))}
    </Styled.ContentCards>
  )
}