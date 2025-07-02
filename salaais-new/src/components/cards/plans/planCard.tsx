// components/PlanCard.tsx
import * as Styled from './style'
import { Text, TextDecoration } from "../../text"
import { Icon } from "../../icon"
import { IconType } from "../../icon/models"
import { Color, Size } from "../../../global"
import type { GetPlansResponse } from '../../../services/apis/salaais/models'

interface PlanCardProps {
    plan: GetPlansResponse
    isExpanded: boolean
    onExpandToggle: () => void
    onEditToggle?: () => void
    isAdmin?: boolean
}

export function PlanCard({ plan, isExpanded, onExpandToggle, onEditToggle, isAdmin }: PlanCardProps) {
    const visibleDetails = isExpanded ? plan.topicos_do_plano : plan.topicos_do_plano.slice(0, 2)

    return (
        <Styled.AllContent>
            <Styled.ContentImage>
                <Styled.Image src={plan.url_imagem} alt={plan.titulo} />
            </Styled.ContentImage>
            <Styled.Content>
                <Styled.Top>
                    <Text text={plan.titulo} bold size={Size.Xl} color={Color.TxtPrimary} />
                    {isAdmin && onEditToggle &&
                        <Icon
                            size={Size.Xs}
                            iconType={IconType.Edit}
                            color={Color.Admin}
                            padding="0"
                            onClick={onEditToggle}
                        />}
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
                        <Text text={`R$${plan.preco?.toFixed(2) || 0}`} size={Size.Xl} color={Color.PlanPrimaryColor} />
                        <Text text={plan.tipo_pagamento} size={Size.S} color={Color.PlanTextColor} bold />
                    </Styled.FlexPrices>
                </Styled.MoneyInfo>
                {isAdmin && <Text
                    text={`${plan.stripe_price_id}`}
                    size={Size.S}
                    color={Color.TxtSecondary}
                    center
                />}

                {plan.preco !== null &&
                    <Styled.Button>Assinar</Styled.Button>
                }
            </Styled.Content>
        </Styled.AllContent>
    )
}
