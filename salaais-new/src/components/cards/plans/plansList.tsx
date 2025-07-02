// components/PlansList.tsx
import { useEffect, useState } from "react"
import { PlanCard } from "./planCard"
import { PlanCardEditable } from "./planCardEditable"
import { isAdmin } from "../../../global/utils/localStorage"
import * as Styled from './style'
import type { GetPlansResponse } from "../../../services/apis/salaais/models"
import { getPlans } from "../../../services/apis/salaais"
import { Icon } from "../../icon"
import { AnimationType, IconType, StartAnimation } from "../../icon/models"
import { Size } from "../../../global"
// import { getPlans } from "../../../services/apis/salaais"

// export interface Plan {
//   titulo: string
//   url_imagem: string
//   stripe_price_id: string
//   topicos_do_plano: string[]
//   preco_antigo: number | null
//   preco: number | null
//   tipo_pagamento: string
// }

export const mockPlans: GetPlansResponse[] = [
  {
    key: 'BRONZE',
    titulo: "Bronze",
    url_imagem: "https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png",
    stripe_price_id: 'price_hjunsiniuaa',
    moeda: 'R$',
    topicos_do_plano: [
      "30 dias",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
      "Provas ANAC, por bloco e por matéria",
    ],
    preco_antigo: null,
    preco: 25.90,
    tipo_pagamento: "/à vista",
    duracao_plano_em_dias: 30,
    publico: true,
    compravel: true,
  },
]

export function PlansList({ plans = mockPlans }: { plans?: GetPlansResponse[] }) {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([])
  const [editedPlans, setEditedPlans] = useState<GetPlansResponse[]>(plans)
  const [originalPlans, setOriginalPlans] = useState<GetPlansResponse[]>(plans)
  const [editingIndexes, setEditingIndexes] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getPlans().then(data => {
      if (data) {
        setEditedPlans(data)
        setOriginalPlans(data)
      }
      setLoading(false)
    })
  }, [])

  const moveDetailUp = (planIdx: number, detailIdx: number) => {
    if (detailIdx <= 0) return

    setEditedPlans(prev => {
      const updated = [...prev]
      const details = [...updated[planIdx].topicos_do_plano]

        ;[details[detailIdx - 1], details[detailIdx]] = [details[detailIdx], details[detailIdx - 1]]

      updated[planIdx] = { ...updated[planIdx], topicos_do_plano: details }
      return updated
    })
  }

  const moveDetailDown = (planIdx: number, detailIdx: number) => {
    const plan = editedPlans[planIdx]
    if (detailIdx >= plan.topicos_do_plano.length - 1) return

    setEditedPlans(prev => {
      const updated = [...prev]
      const details = [...updated[planIdx].topicos_do_plano]

        ;[details[detailIdx], details[detailIdx + 1]] = [details[detailIdx + 1], details[detailIdx]]

      updated[planIdx] = { ...updated[planIdx], topicos_do_plano: details }
      return updated
    })
  }
  const toggleExpand = (index: number) => {
    setExpandedIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const toggleEdit = (index: number) => {
    setEditingIndexes(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index) // desativa edição
        : [...prev, index]             // ativa edição
    )
  }

  const handleCancelEdit = (index: number) => {
    setEditedPlans(originalPlans) // você pode ajustar para restaurar apenas um plano se quiser
    setEditingIndexes(prev => prev.filter(i => i !== index))
  }

  const handleFieldChange = (planIdx: number, field: keyof GetPlansResponse, value: unknown) => {
    setEditedPlans(prev => {
      const updated = [...prev]
      updated[planIdx] = { ...updated[planIdx], [field]: value }
      return updated
    })
  }

  const handleDetailChange = (planIdx: number, detailIdx: number, value: string) => {
    setEditedPlans(prev => {
      const updated = [...prev]
      const newDetails = [...updated[planIdx].topicos_do_plano]

      if (value.trim() === "") {
        // Remove o item da lista se estiver vazio
        newDetails.splice(detailIdx, 1)
      } else {
        // Atualiza o valor normalmente
        newDetails[detailIdx] = value
      }

      updated[planIdx] = { ...updated[planIdx], topicos_do_plano: newDetails }
      return updated
    })
  }

  if (loading) {
    return (
      <Styled.ContentList>
        <Icon
          iconType={IconType.Loading}
          size={Size.S}
          animationType={AnimationType.Rotate}
          startAnimation={StartAnimation.Infinite}
          width="100%"
        />
      </Styled.ContentList>
    )
  }

  return (
    <Styled.ContentList>
      {editedPlans.map((plan, index) =>
        editingIndexes.includes(index) ? (
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
            onCancelEdit={() => handleCancelEdit(index)}
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
