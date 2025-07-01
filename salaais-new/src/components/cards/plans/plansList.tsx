// components/PlansList.tsx
import { useState } from "react"
import { PlanCard } from "./planCard"
import { PlanCardEditable } from "./planCardEditable"
import { isAdmin } from "../../../global/utils/localStorage"
import * as Styled from './style'

export interface Plan {
  title: string
  image: string
  stripe_price_id: string
  planDetails: string[]
  preco_antigo: number | null
  price: number
  paymentType: string
}

export const mockPlans: Plan[] = [
  {
    title: "Bronze",
    image: "https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png",
    stripe_price_id:'price_hjunsiniuaa',
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
    stripe_price_id:'price_hjunsiniuaa',
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
    stripe_price_id:'price_hjunsiniuaa',
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
    stripe_price_id:'price_hjunsiniuaa',
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


export function PlansList({ plans = mockPlans }: { plans?: Plan[] }) {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editedPlans, setEditedPlans] = useState<Plan[]>(plans)
  const [originalPlans, setOriginalPlans] = useState<Plan[]>(plans)

  const moveDetailUp = (planIdx: number, detailIdx: number) => {
    if (detailIdx <= 0) return

    setEditedPlans(prev => {
      const updated = [...prev]
      const details = [...updated[planIdx].planDetails]

        ;[details[detailIdx - 1], details[detailIdx]] = [details[detailIdx], details[detailIdx - 1]]

      updated[planIdx] = { ...updated[planIdx], planDetails: details }
      return updated
    })
  }

  const moveDetailDown = (planIdx: number, detailIdx: number) => {
    const plan = editedPlans[planIdx]
    if (detailIdx >= plan.planDetails.length - 1) return

    setEditedPlans(prev => {
      const updated = [...prev]
      const details = [...updated[planIdx].planDetails]

        ;[details[detailIdx], details[detailIdx + 1]] = [details[detailIdx + 1], details[detailIdx]]

      updated[planIdx] = { ...updated[planIdx], planDetails: details }
      return updated
    })
  }
  const toggleExpand = (index: number) => {
    setExpandedIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const toggleEdit = (index: number) => {
    setOriginalPlans(editedPlans) // Salva estado atual
    setEditingIndex(prev => (prev === index ? null : index))
  }

  const handleCancelEdit = () => {
    setEditedPlans(originalPlans) // Restaura os dados anteriores
    setEditingIndex(null) // Sai do modo de edição
  }


  const handleFieldChange = (planIdx: number, field: keyof Plan, value: unknown) => {
    setEditedPlans(prev => {
      const updated = [...prev]
      updated[planIdx] = { ...updated[planIdx], [field]: value }
      return updated
    })
  }

  const handleDetailChange = (planIdx: number, detailIdx: number, value: string) => {
    setEditedPlans(prev => {
      const updated = [...prev]
      const newDetails = [...updated[planIdx].planDetails]

      if (value.trim() === "") {
        // Remove o item da lista se estiver vazio
        newDetails.splice(detailIdx, 1)
      } else {
        // Atualiza o valor normalmente
        newDetails[detailIdx] = value
      }

      updated[planIdx] = { ...updated[planIdx], planDetails: newDetails }
      return updated
    })
  }

  return (
    <Styled.ContentList>
      {editedPlans.map((plan, index) =>
        editingIndex === index ? (
          <PlanCardEditable
            key={index}
            plan={plan}
            isExpanded={expandedIndexes.includes(index)}
            onExpandToggle={() => toggleExpand(index)}
            onFieldChange={(field, value) => handleFieldChange(index, field, value)}
            onDetailChange={(detailIdx, value) => handleDetailChange(index, detailIdx, value)}
            onEditToggle={() => toggleEdit(index)}
            onMoveDetailUp={(detailIdx) => moveDetailUp(index, detailIdx)}
            onMoveDetailDown={(detailIdx) => moveDetailDown(index, detailIdx)}
            onCancelEdit={handleCancelEdit}
          />
        ) : (
          <PlanCard
            key={index}
            plan={plan}
            isExpanded={expandedIndexes.includes(index)}
            onExpandToggle={() => toggleExpand(index)}
            onEditToggle={() => toggleEdit(index)}
            isAdmin={isAdmin}
          />
        )
      )}
    </Styled.ContentList>
  )
}
