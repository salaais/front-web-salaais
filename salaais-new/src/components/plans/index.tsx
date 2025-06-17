import "react-toastify/dist/ReactToastify.css"
import * as Styled from './style'
import { Text } from "../text"
import { Icon } from "../icon"
import { Color, IconType, Size } from "../../global"

const mockPlans: Plan[] = [
  {
    title: "Bronze",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png",
    planDetails: [
      "30 dias",
      "Provas ANAC, por bloco e por matéria",
    ],
    price: 25.90,
    paymentType: "/à vista"
  },
  {
    title: "Prata",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png",
    planDetails: [
      "60 dias",
      "Provas ANAC, por bloco e por matéria",
    ],
    price: 42.90,
    paymentType: "/à vista"
  },
  {
    title: "Ouro",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png",
    planDetails: [
      "90 dias",
      "Provas ANAC, por bloco e por matéria",
    ],
    price: 59.90,
    paymentType: "/à vista"
  },
   {
    title: "Premium",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Diamond_2.png",
    planDetails: [
      "120 dias",
      "Provas ANAC, por bloco e por matéria",
    ],
    price: 79.90,
    paymentType: "/à vista"
  }
]


export interface Plan {
  title: string
  image: string // Ex: https://...
  planDetails: string[]
  price: number
  paymentType: string // Ex: "pagamento único", "à vista", etc
}

interface PlansListProps {
  plans?: Plan[]
}

export function PlansList({ plans = mockPlans }: PlansListProps) {
  return (
    <Styled.ContentList>
      {plans.map((plan, index) => (
        <Styled.AllContent key={index}>
          <Styled.ContentImage>
            <Styled.Image src={plan.image} alt={plan.title} />
          </Styled.ContentImage>
          <Styled.Content>

            <Text text={plan.title} bold size={Size.Xl} color="#4B5563" />

            <div>
              {plan.planDetails.map((detail, i) => (
                <Styled.PlanDetails key={i}>
                  <Icon iconType={IconType.Check} color={Color.Green} padding="0" />
                  <Text text={detail} size={Size.S} color="#6B7280" />
                </Styled.PlanDetails>
              ))}
            </div>

            <Styled.MoneyInfo>
              <Text text={`R$${plan.price.toFixed(2)}`} size={Size.Xxl} color="#000000" />
              <Text text={plan.paymentType} size={Size.S} color="#6B7280" bold />
            </Styled.MoneyInfo>

            <Styled.Button>
              Juntar-se
            </Styled.Button>
          </Styled.Content>
        </Styled.AllContent>
      ))}
    </Styled.ContentList>
  )
}
