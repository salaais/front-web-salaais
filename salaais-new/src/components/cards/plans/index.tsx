import "react-toastify/dist/ReactToastify.css"
import * as Styled from './style'
import { Text, TextDecoration } from "../../text"
import { Icon } from "../../icon"
import { Color, Size } from "../../../global"
import { IconType } from "../../icon/models"
import { useState } from "react"

const mockPlans: Plan[] = [
  {
    title: "Bronze",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png",
    planDetails: [
      "30 dias",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
    ],
    preco_antigo: null,
    price: 25.90,
    paymentType: "/à vista"
  },
  {
    title: "Prata",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png",
    planDetails: [
      "60 dias",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
    ],
    preco_antigo: 50.90,
    price: 42.90,
    paymentType: "/à vista"
  },
  {
    title: "Ouro",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png",
    planDetails: [
      "90 dias",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
    ],
    preco_antigo: 50.90,
    price: 59.90,
    paymentType: "/à vista"
  },
  {
    title: "Premium",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Diamond_2.png",
    planDetails: [
      "120 dias",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
    ],
    preco_antigo: null,
    price: 79.90,
    paymentType: "/à vista"
  }
]

export interface Plan {
  title: string
  image: string
  planDetails: string[]
  preco_antigo: number | null
  price: number
  paymentType: string
}

interface PlansListProps {
  plans?: Plan[]
}

export function PlansList({ plans = mockPlans }: PlansListProps) {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([])

  const toggleExpand = (index: number) => {
    setExpandedIndexes(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <Styled.ContentList>
      {plans.map((plan, index) => {
        const isExpanded = expandedIndexes.includes(index)
        const visibleDetails = isExpanded ? plan.planDetails : plan.planDetails.slice(0, 2)

        return (
          <Styled.AllContent key={index}>
            <Styled.ContentImage>
              <Styled.Image src={plan.image} alt={plan.title} />
            </Styled.ContentImage>
            <Styled.Content>
              <Text text={plan.title} bold size={Size.Xl} color={Color.TxtPrimary} />

              <Styled.PlanDetailsContainer $expanded={isExpanded}>
                {visibleDetails.map((detail, i) => (
                  <Styled.PlanDetails key={i}>
                    <Icon iconType={IconType.Check} color={Color.Green} padding="0" />
                    <Text text={detail} size={Size.S} color={Color.PlanTextColor} />
                  </Styled.PlanDetails>
                ))}
              </Styled.PlanDetailsContainer>

              <Icon
                iconType={IconType.ArrowDown}
                padding="0"
                width="100%"
                onClick={() => toggleExpand(index)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 1s',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              />

              <Styled.MoneyInfo>
                {plan.preco_antigo && (
                  <Text
                    text={`R$${plan.preco_antigo.toFixed(2)}`}
                    size={Size.S}
                    color={Color.TxtSecondary}
                    textDecoration={TextDecoration["line-through"]}
                  />
                )}
                <Styled.FlexPrices>
                  <Text text={`R$${plan.price.toFixed(2)}`} size={Size.Xl} color={Color.PlanPrimaryColor} />
                  <Text text={plan.paymentType} size={Size.S} color={Color.PlanTextColor} bold />
                </Styled.FlexPrices>
              </Styled.MoneyInfo>

              <Styled.Button>Assinar</Styled.Button>
            </Styled.Content>
          </Styled.AllContent>
        )
      })}
    </Styled.ContentList>
  )
}
