// components/PlansList.tsx
import { useEffect, useState } from "react"
import { PlanCard } from "./planCard"
import { PlanCardEditable } from "./planCardEditable"
import { isAdmin } from "../../../global/utils/localStorage"
import * as Styled from './style'
import type { EditPlanRequest, GetPlansResponse } from "../../../services/apis/salaais/models"
import { editPlan, getPlans } from "../../../services/apis/salaais"
import { Icon } from "../../icon"
import { AnimationType, IconType, StartAnimation } from "../../icon/models"
import { Size } from "../../../global"
import { toast } from "react-toastify"

// export const mockPlans: GetPlansResponse[] = [
//   {
//     id: 5,
//     titulo: "Bronze",
//     url_imagem: "https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png",
//     stripe_price_id: 'price_hjunsiniuaa',
//     moeda: 'R$',
//     topicos_do_plano: [
//       "30 dias",
//       "Provas ANAC, por bloco e por matéria",
//       "Provas ANAC, por bloco e por matéria",
//       "Provas ANAC, por bloco e por matéria",
//       "Provas ANAC, por bloco e por matéria",
//     ],
//     preco_antigo: null,
//     preco: 25.90,
//     tipo_pagamento: "/à vista",
//     duracao_plano_em_dias: 30,
//     publico: true,
//     compravel: true,
//   },
// ]

export function PlansList({ plans = [] }: { plans?: GetPlansResponse[] }) {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([])
  const [editedPlans, setEditedPlans] = useState<GetPlansResponse[]>(plans)
  const [originalPlans, setOriginalPlans] = useState<GetPlansResponse[]>(plans)
  const [editingIndexes, setEditingIndexes] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    toast.promise(
      (async () => {
        const data = await getPlans()

        if (!data || !Array.isArray(data)) {
          throw new Error("Dados inválidos ou nulos")
        }

        setEditedPlans(data)
        setOriginalPlans(data)
        setLoading(false)
      })(),
      {
        pending: 'Carregando planos...',
        success: 'Planos carregados com sucesso!',
        error: 'Erro ao carregar planos.'
      }
    )
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
    if (editingIndexes.includes(index)) {
      // Se já está editando, ao clicar no ícone "Check", deve salvar
      handleSaveEdit(index)
    } else {
      // Ativa o modo edição
      setEditingIndexes(prev => [...prev, index])
    }
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

  const handleSaveEdit = async (index: number) => {
    const planToSave = editedPlans[index]
    const id_permission = originalPlans[index]?.id

    // Monta o objeto EditPlanRequest conforme esperado pela API
    const editRequest: EditPlanRequest = {
      titulo: planToSave.titulo,
      stripe_price_id: planToSave.stripe_price_id || null,
      topicos_do_plano: planToSave.topicos_do_plano || [],
      preco_antigo: planToSave.preco_antigo || null,
      preco: planToSave.preco || null,
      tipo_pagamento: planToSave.tipo_pagamento,
      duracao_plano_em_dias: planToSave.duracao_plano_em_dias || null,
      publico: planToSave.publico,
      compravel: planToSave.compravel,
    }

    try {
      await editPlan(id_permission, editRequest)
      // Remove o plano da lista de edição (fecha o modo edição)
      setEditingIndexes(prev => prev.filter(i => i !== index))
      // Atualiza a lista original para refletir a edição salva
      setOriginalPlans(prev => {
        const updated = [...prev]
        updated[index] = planToSave
        return updated
      })
    } catch (error) {
      console.error('Falha ao salvar plano:', error)
      // Pode mostrar uma notificação de erro para o usuário aqui
    }
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
