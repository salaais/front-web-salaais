// components/PlanCard.tsx
import * as Styled from './style'
import { Text, TextDecoration } from '../../text'
import { Icon } from '../../icon'
import { IconType } from '../../icon/models'
import { Color, Size } from '../../../global'
import type { GetPlansResponse } from '../../../services/apis/salaais/models'
import { pagamentoWeb } from '../../../services/apis/salaais'
import { useState } from 'react'
import { Align } from '../../align'
import { JustifyType } from '../../align/interfaces'

interface PlanCardProps {
  plan: GetPlansResponse
  isExpanded: boolean
  onExpandToggle: () => void
  onEditToggle?: () => void
  isAdmin?: boolean
}

// Cores específicas por tipo de plano
const planColors: Record<string, string> = {
  BRONZE: '#CD7F32',
  PRATA: '#999B9B',
  OURO: '#FFD700',
  PREMIUM: '#FF5722',
}

// Função para obter a cor do plano baseado no título
const getPlanColor = (titulo: string): string => {
  const upperTitle = titulo.toUpperCase()
  return planColors[upperTitle] || '#FFCD00' // Cor primária padrão
}

export function PlanCard({
  plan,
  isExpanded,
  onExpandToggle,
  onEditToggle,
  isAdmin,
}: PlanCardProps) {
  const visibleDetails = isExpanded
    ? plan.topicos_do_plano
    : plan.topicos_do_plano.slice(0, 2)
  const [coupon, setCoupon] = useState('')
  const planColor = getPlanColor(plan.titulo)

  const handlePayment = async () => {
    await pagamentoWeb(plan.id, coupon)
  }

  // Formata o preço como R$XX,XX
  const formatPrice = (price: number): string => {
    return `R$${price.toFixed(2).replace('.', ',')}`
  }

  return (
    <Styled.AllContent
      opacity={
        (plan.publico && plan.compravel) ||
        plan.publico === null ||
        plan.compravel === null
      }
    >
      <Styled.Content>
        <Styled.Top>
          <Styled.TrophyRow>
            <Icon
              iconType={IconType.Trophy}
              size={Size.L}
              color={planColor}
              padding="0"
            />
            <Styled.PlanTitle style={{ color: planColor }}>
              {plan.titulo}
            </Styled.PlanTitle>
          </Styled.TrophyRow>
          {isAdmin && onEditToggle && (
            <Icon
              size={Size.Xs}
              iconType={IconType.Edit}
              color={Color.Admin}
              padding="0"
              onClick={onEditToggle}
            />
          )}
        </Styled.Top>

        <Styled.PlanDetailsContainer $expanded={isExpanded}>
          {visibleDetails.map((detail, i) => (
            <Styled.PlanDetails key={i}>
              <Icon iconType={IconType.Check} color={Color.Green} padding="0" />
              <Text text={detail} size={Size.S} color={Color.PlanTextColor} />
            </Styled.PlanDetails>
          ))}
        </Styled.PlanDetailsContainer>

        {plan.topicos_do_plano.length > 2 && (
          <Icon
            iconType={IconType.ArrowDown}
            padding="0"
            width="100%"
            onClick={onExpandToggle}
            style={{
              cursor: 'pointer',
              transition: 'transform 1s',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}

        <div>
          {plan.preco_antigo !== null && plan.preco_antigo !== 0 && (
            <Text
              text={`R$${plan.preco_antigo?.toFixed(2)}`}
              size={Size.S}
              color={Color.TxtSecondary}
              textDecoration={TextDecoration['line-through']}
            />
          )}
          <Styled.FlexPrices>
            <Text
              text={`R$${plan.preco?.toFixed(2) || 0}`}
              size={Size.Xl}
              color={Color.PlanPrimaryColor}
            />
            <Text
              text={plan.tipo_pagamento}
              size={Size.S}
              color={Color.PlanTextColor}
              bold
            />
          </Styled.FlexPrices>
        </div>

        {isAdmin && plan.stripe_price_id !== null && (
          <Text
            text={`${plan.stripe_price_id}`}
            size={Size.S}
            color={Color.TxtSecondary}
            center
          />
        )}

        {/* 🔹 Campo de cupom opcional */}
        {plan.preco !== 0 && (
          <div style={{ marginTop: '10px', width: '100%' }}>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Cupom de desconto"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginBottom: '10px',
                outline: 'none',
              }}
            />
            <Styled.Button onClick={handlePayment}>
              <Align gap="8px" alignCenter justify={JustifyType.Center}>
                <Icon
                  iconType={IconType.Payment}
                  size={Size.S}
                  color={Color.BgPrimary}
                  padding="0"
                />
                <span>{formatPrice(plan.preco)} - Contratar</span>
              </Align>
            </Styled.Button>
          </div>
        )}
      </Styled.Content>
    </Styled.AllContent>
  )
}
