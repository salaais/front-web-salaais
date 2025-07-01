// components/PlanCardEditable.tsx
import { useRef, useEffect, useState } from 'react'
import * as Styled from './style'
import { Icon } from "../../icon"
import { IconType } from "../../icon/models"
import { Color, Size } from "../../../global"
import type { Plan } from './plansList'


interface EditableProps {
    plan: Plan
    onFieldChange: (field: keyof Plan, value: unknown) => void
    onDetailChange: (index: number, value: string) => void
    onMoveDetailUp: (index: number) => void
    onMoveDetailDown: (index: number) => void
    isExpanded: boolean
    onExpandToggle: () => void
    onEditToggle: () => void
    onCancelEdit: () => void
}

export function PlanCardEditable({ plan, onFieldChange, onDetailChange, isExpanded, onExpandToggle, onEditToggle, onMoveDetailUp, onMoveDetailDown, onCancelEdit }: EditableProps) {
    const visibleDetails = isExpanded ? plan.planDetails : plan.planDetails.slice(0, 2)
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const [nextFocusIndex, setNextFocusIndex] = useState<number | null>(null)
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, plan.planDetails.length)
    }, [plan.planDetails.length])

    useEffect(() => {
        if (nextFocusIndex !== null) {
            inputRefs.current[nextFocusIndex]?.focus()
            setNextFocusIndex(null)
        }
    }, [plan.planDetails, nextFocusIndex])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const newDetails = [...plan.planDetails]
            newDetails.splice(index + 1, 0, "")
            onFieldChange("planDetails", newDetails)
            setNextFocusIndex(index + 1)
        }
    }


    const handleDetailInput = (i: number, value: string) => {
        if (value === "") {
            const newDetails = [...plan.planDetails]
            newDetails.splice(i, 1)
            onFieldChange("planDetails", newDetails)
        } else {
            onDetailChange(i, value)
        }
    }

    return (
        <Styled.AllContent>
            <Styled.ContentImage>
                <Styled.Image src={plan.image} alt={plan.title} />
            </Styled.ContentImage>
            <Styled.Content>
                <Styled.Top>
                    <input
                        value={plan.title}
                        onChange={(e) => onFieldChange("title", e.target.value)}
                        style={{
                            fontSize: '23px',
                            fontWeight: 'bold',
                            color: Color.TxtPrimary,
                            background: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid #ccc',
                            outline: 'none',
                            width: '100%',
                        }}
                    />
                    <Styled.FlexIconCloseAndCheck>
                        <Icon
                            iconType={IconType.Close}
                            color={Color.Red}
                            padding="0px"
                            onClick={onCancelEdit}
                        />
                        <Icon
                            iconType={IconType.Check}
                            color={Color.Green}
                            padding="0px"
                            onClick={onEditToggle}
                        />
                    </Styled.FlexIconCloseAndCheck>
                </Styled.Top>

                <Styled.PlanDetailsContainer $expanded={isExpanded}>
                    {visibleDetails.map((detail, i) => (
                        <Styled.PlanDetails key={i}>
                            <Icon iconType={IconType.Check} color={Color.Green} padding="0" />

                            <input
                                ref={(el) => { inputRefs.current[i] = el }}
                                value={plan.planDetails[i]}
                                onChange={e => handleDetailInput(i, e.target.value)}
                                onKeyDown={e => handleKeyDown(e, i)}
                                style={{
                                    fontSize: '12px',
                                    color: Color.PlanTextColor,
                                    fontFamily: 'inherit',
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '1px solid #ccc',
                                    outline: 'none',
                                    width: '100%',
                                }}
                            />

                            {/* Botões de mover item ↑ ↓ */}
                            <Styled.ArrowButtons>
                                <Icon
                                    iconType={IconType.ArrowUp}
                                    padding="0px"
                                    size={Size.S}
                                    onClick={() => onMoveDetailUp(i)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <Icon
                                    iconType={IconType.ArrowDown}
                                    padding="0px"
                                    size={Size.S}
                                    onClick={() => onMoveDetailDown(i)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Styled.ArrowButtons>
                        </Styled.PlanDetails>
                    ))}

                </Styled.PlanDetailsContainer>

                {plan.planDetails.length > 2 && (
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
                    <input
                        type="number"
                        placeholder="Preço antigo"
                        value={plan.preco_antigo ?? ""}
                        onChange={(e) =>
                            onFieldChange("preco_antigo", e.target.value ? parseFloat(e.target.value) : null)
                        }
                        style={{
                            fontSize: '12px',
                            color: Color.TxtSecondary,
                            background: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid #ccc',
                            outline: 'none',
                            width: '100%',
                        }}
                    />

                    <Styled.FlexPrices>
                        <input
                            type="number"
                            placeholder="Preço"
                            value={plan.price}
                            onChange={(e) => onFieldChange("price", parseFloat(e.target.value))}
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: Color.PlanPrimaryColor,
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid #ccc',
                                outline: 'none',
                                width: '100%',
                            }}
                        />
                        <input
                            value={plan.paymentType}
                            placeholder='Modo pagamento'
                            onChange={(e) => onFieldChange("paymentType", e.target.value)}
                            style={{
                                fontSize: '12px',
                                color: Color.PlanTextColor,
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid #ccc',
                                outline: 'none',
                                width: '100%',
                            }}
                        />
                    </Styled.FlexPrices>
                </Styled.MoneyInfo>
                <input
                    value={plan.stripe_price_id}
                    placeholder='Id preço stripe'
                    onChange={(e) => onFieldChange("stripe_price_id", e.target.value)}
                    style={{
                        fontSize: '12px',
                        color: Color.PlanTextColor,
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #ccc',
                        outline: 'none',
                        width: '100%',
                    }}
                />
                <Styled.Button>Assinar</Styled.Button>
            </Styled.Content>
        </Styled.AllContent>
    )
}