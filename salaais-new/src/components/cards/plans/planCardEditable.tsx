// components/PlanCardEditable.tsx
import { useRef, useEffect, useState } from 'react'
import * as Styled from './style'
import { Icon } from "../../icon"
import { IconType } from "../../icon/models"
import { Color, Size } from "../../../global"
import type { GetPlansResponse } from '../../../services/apis/salaais/models'
import { isAdmin } from '../../../global/utils/localStorage'
import { Text } from '../../text'
import { InputCheckBox } from '../../inputs/checkBox'


interface EditableProps {
    plan: GetPlansResponse
    onFieldChange: (field: keyof GetPlansResponse, value: unknown) => void
    onDetailChange: (index: number, value: string) => void
    onMoveDetailUp: (index: number) => void
    onMoveDetailDown: (index: number) => void
    isExpanded: boolean
    onExpandToggle: () => void
    onEditToggle: () => void
    onCancelEdit: () => void
}

export function PlanCardEditable({ plan, onFieldChange, onDetailChange, isExpanded, onExpandToggle, onEditToggle, onMoveDetailUp, onMoveDetailDown, onCancelEdit }: EditableProps) {
    const visibleDetails = isExpanded ? plan.topicos_do_plano : plan.topicos_do_plano.slice(0, 2)
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const [nextFocusIndex, setNextFocusIndex] = useState<number | null>(null)
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, plan.topicos_do_plano.length)
    }, [plan.topicos_do_plano.length])

    useEffect(() => {
        if (nextFocusIndex !== null) {
            inputRefs.current[nextFocusIndex]?.focus()
            setNextFocusIndex(null)
        }
    }, [plan.topicos_do_plano, nextFocusIndex])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const isBackspace = e.key === 'Backspace'
        const inputValue = plan.topicos_do_plano[index]

        // Se o campo está vazio e usuário apertou Backspace, remover item
        if (isBackspace && inputValue === '') {
            e.preventDefault()
            const newDetails = [...plan.topicos_do_plano]
            newDetails.splice(index, 1)
            onFieldChange("topicos_do_plano", newDetails)

            // Foca no item anterior (se houver)
            setNextFocusIndex(index > 0 ? index - 1 : null)
            return
        }

        if (e.key === 'Enter') {
            e.preventDefault()
            const newDetails = [...plan.topicos_do_plano]
            newDetails.splice(index + 1, 0, "")
            onFieldChange("topicos_do_plano", newDetails)
            setNextFocusIndex(index + 1)
        }
    }

    const handleDetailInput = (i: number, value: string) => {
        onDetailChange(i, value)
    }


    // const handleDetailInput = (i: number, value: string) => {
    //     if (value === "") {
    //         const newDetails = [...plan.topicos_do_plano]
    //         newDetails.splice(i, 1)
    //         onFieldChange("topicos_do_plano", newDetails)
    //     } else {
    //         onDetailChange(i, value)
    //     }
    // }

    const handleAddTopic = () => {
        const newDetails = [...plan.topicos_do_plano, ""]
        onFieldChange("topicos_do_plano", newDetails)
        setNextFocusIndex(newDetails.length - 1)
    }



    return (
        <Styled.AllContent>
            <Styled.ContentImage>
                <Styled.Image src={plan.url_imagem} alt={plan.titulo} />
            </Styled.ContentImage>
            <Styled.Content>
                <Styled.Top>
                    <input
                        value={plan.titulo}
                        onChange={(e) => onFieldChange("titulo", e.target.value)}
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
                                value={plan.topicos_do_plano[i]}
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
                                />
                                <Icon
                                    iconType={IconType.ArrowDown}
                                    padding="0px"
                                    size={Size.S}
                                    onClick={() => onMoveDetailDown(i)}
                                />
                            </Styled.ArrowButtons>
                        </Styled.PlanDetails>
                    ))}

                    {isAdmin && visibleDetails.length === 0 &&
                        <Text
                            text="adicionar topicos"
                            size={Size.S}
                            center
                        />
                    }
                    {isAdmin &&
                        <Icon
                            iconType={IconType.Add}
                            color={Color.Green}
                            padding="0 5px"
                            size={Size.Xs}
                            onClick={handleAddTopic}
                            width='100%'
                        />
                    }

                </Styled.PlanDetailsContainer>

                {plan.topicos_do_plano.length > 1 && (
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
                            value={plan.preco || ''}
                            onChange={(e) => onFieldChange("preco", parseFloat(e.target.value))}
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
                            value={plan.tipo_pagamento}
                            placeholder='Modo pagamento'
                            onChange={(e) => onFieldChange("tipo_pagamento", e.target.value)}
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


                <InputCheckBox
                    value={plan.compravel}
                    onChange={(checked) => onFieldChange("compravel", checked)}
                    text="Visível para comprar"
                />

                <InputCheckBox
                    value={plan.publico}
                    onChange={(checked) => onFieldChange("publico", checked)}
                    text="Visível para o usuário"
                />

                <input
                    type='number'
                    value={plan.duracao_plano_em_dias}
                    placeholder='Duracão plano em dias'
                    onChange={(e) => onFieldChange("duracao_plano_em_dias", parseFloat(e.target.value))}
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
                {plan.preco !== null &&
                    <Styled.Button>Assinar</Styled.Button>
                }
            </Styled.Content>
        </Styled.AllContent>
    )
}