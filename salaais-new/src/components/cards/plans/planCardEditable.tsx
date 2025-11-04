// components/PlanCardEditable.tsx
import { useRef, useEffect, useState, useCallback } from 'react'
import * as Styled from './style'
import { Icon } from "../../icon"
import { IconType } from "../../icon/models"
import { Color, Size } from "../../../global"
import type { EditPlanRequest, GetPlansResponse } from '../../../services/apis/salaais/models'
import { isAdmin } from '../../../global/utils/localStorage'
import { Text } from '../../text'
import { InputCheckBox } from '../../inputs/checkBox'
import { editPlan } from '../../../services/apis/salaais'


interface EditableProps {
    plan: GetPlansResponse
    onFieldChange: (field: keyof GetPlansResponse, value: unknown) => void
    onMoveDetailUp: (index: number) => void
    onMoveDetailDown: (index: number) => void
    isExpanded: boolean
    onExpandToggle: () => void
    onCancelEdit: () => void
}

export function PlanCardEditable({
    plan,
    onFieldChange,
    isExpanded,
    onExpandToggle,
    onMoveDetailUp,
    onMoveDetailDown,
    onCancelEdit,
}: EditableProps) {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const [, setNextFocusIndex] = useState<number | null>(null)
    const [localTopicos, setLocalTopicos] = useState<string[]>(plan.topicos_do_plano)
    const visibleDetails = isExpanded ? localTopicos : localTopicos.slice(0, 2)
    const [inputTitulo, setInputTitulo] = useState(plan.titulo)
    const [inputPreco, setInputPreco] = useState<number | null>(plan.preco)
    const [inputPrecoAntigo, setInputPrecoAntigo] = useState<string>(plan.preco_antigo?.toString())
    const [inputTipoPagamento, setInputTipoPagamento] = useState<string | undefined>(plan.tipo_pagamento || "");
    const [inputDuracaoPlanoEmDias, setInputDuracaoPlanoEmDias] = useState<string>(plan.duracao_plano_em_dias?.toString());
    const [inputIdPrecoStripe, setInputIdPrecoStripe] = useState<string | undefined>(plan.stripe_price_id || "");
    const [inputCompravel, setInputCompravel] = useState<boolean>(plan.compravel);
    const [inputPublico, setInputPublico] = useState<boolean>(plan.publico);

    const setInputRef = useCallback((el: HTMLInputElement | null, index: number) => {
        if (el) {
            inputRefs.current[index] = el
        }
    }, [])

    useEffect(() => {
        setInputTitulo(plan.titulo)
    }, [plan.titulo])

    useEffect(() => {
        setInputPreco(plan.preco)
    }, [plan.preco])

    useEffect(() => {
        setInputPrecoAntigo(plan.preco_antigo?.toString())
    }, [plan.preco_antigo])

    useEffect(() => {
        setInputTipoPagamento(plan.tipo_pagamento?.toString())
    }, [plan.tipo_pagamento])

    useEffect(() => {
        setInputDuracaoPlanoEmDias(plan.duracao_plano_em_dias?.toString())
    }, [plan.duracao_plano_em_dias])

    useEffect(() => {
        setInputIdPrecoStripe(plan.stripe_price_id)
    }, [plan.stripe_price_id])

    useEffect(() => {
        setInputCompravel(plan.compravel)
    }, [plan.compravel])

    useEffect(() => {
        setInputPublico(plan.publico)
    }, [plan.publico])

    useEffect(() => {
        setLocalTopicos(plan.topicos_do_plano)
    }, [plan.topicos_do_plano])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const isBackspace = e.key === 'Backspace'
        const isEnter = e.key === 'Enter'
        const inputValue = localTopicos[index]

        if (isBackspace && inputValue === '') {
            e.preventDefault()

            const newDetails = [...localTopicos]
            newDetails.splice(index, 1)

            setLocalTopicos(newDetails)
            setNextFocusIndex(index > 0 ? index - 1 : 0)
            return
        }

        if (isEnter) {
            e.preventDefault()
            const newDetails = [...localTopicos]
            newDetails.splice(index + 1, 0, '')
            setLocalTopicos(newDetails)
            setNextFocusIndex(index + 1)
        }
    }

    const handleDetailInput = (i: number, value: string) => {
        const updated = [...localTopicos]
        updated[i] = value
        setLocalTopicos(updated)
    }

    const handleDetailBlur = () => {
        onFieldChange("topicos_do_plano", localTopicos)
    }

    const handleAddTopic = () => {
        setLocalTopicos(prev => {
            const newDetails = [...prev, ""]
            setNextFocusIndex(newDetails.length - 1)
            return newDetails
        })
    }



    const handleEditPlan = async () => {

        const editRequest: EditPlanRequest = {
            titulo: inputTitulo,
            stripe_price_id: inputIdPrecoStripe || null,
            topicos_do_plano: localTopicos || [],
            preco_antigo: inputPrecoAntigo !== null && inputPrecoAntigo !== ""
                ? parseFloat(inputPrecoAntigo)
                : null,
            tipo_pagamento: inputTipoPagamento || null,
            duracao_plano_em_dias: inputDuracaoPlanoEmDias !== null && inputDuracaoPlanoEmDias !== ""
                ? parseInt(inputDuracaoPlanoEmDias)
                : null,
            publico: inputPublico,
            compravel: inputCompravel,
        }

        await editPlan(plan.id, editRequest)
    }


    return (
        <Styled.AllContent opacity={(plan.publico && plan.compravel) || (plan.publico === null || plan.compravel === null)}>
            <Styled.ContentImage>
                <Styled.Image src={plan.url_imagem} alt={plan.titulo} />
            </Styled.ContentImage>
            <Styled.Content>
                <Styled.Top>
                    <input
                        value={inputTitulo}
                        onChange={(e) => setInputTitulo(e.target.value)}
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
                            onClick={handleEditPlan}
                        />
                    </Styled.FlexIconCloseAndCheck>
                </Styled.Top>


                <Styled.PlanDetailsContainer $expanded={isExpanded}>
                    {visibleDetails.map((detail, i) => (
                        <Styled.PlanDetails key={i}>
                            <Icon iconType={IconType.Check} color={Color.Green} padding="0" />

                            <input
                                ref={(el) => setInputRef(el, i)}
                                value={localTopicos[i]}
                                onChange={(e) => handleDetailInput(i, e.target.value)}
                                onBlur={handleDetailBlur}
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

                <div>
                    <input
                        type="number"
                        placeholder="Preço antigo"
                        value={inputPrecoAntigo || ""}
                        onChange={(e) => {
                            setInputPrecoAntigo(e.target.value)
                        }}
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
                            value={inputPreco || ""}
                            readOnly
                            // onChange={(e) => {
                            //     const value = e.target.value
                            //     setInputPreco(value === "" ? null : parseFloat(value))
                            // }}
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: Color.PlanPrimaryColor,
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid #ccc',
                                outline: 'none',
                                width: '100%',
                                pointerEvents: 'none', // impede clique
                                opacity: 0.3,          // visual de "desativado"'
                            }}
                        />
                        <input
                            placeholder='Modo pagamento'
                            value={inputTipoPagamento}
                            onChange={(e) => {
                                setInputTipoPagamento(e.target.value)
                            }}
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
                </div>


                <InputCheckBox
                    value={inputCompravel}
                    onChange={(checked) => {
                        setInputCompravel(checked)
                        onFieldChange("compravel", checked)
                    }}
                    text="Visível para comprar"
                />

                <InputCheckBox
                    value={inputPublico}
                    onChange={(checked) => {
                        setInputPublico(checked)
                        onFieldChange("publico", checked)
                    }}
                    text="Visível no perfil do usuário"
                />

                <input
                    type='number'
                    value={inputDuracaoPlanoEmDias || ""}
                    onChange={(e) => {
                        setInputDuracaoPlanoEmDias(e.target.value)
                    }}
                    placeholder='Duracão plano em dias'
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
                    placeholder='Id preço stripe'
                    value={inputIdPrecoStripe || ""}
                    onChange={(e) => {
                        setInputIdPrecoStripe(e.target.value)
                    }}
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
                {plan.preco !== 0 &&
                    <Styled.Button>Assinar</Styled.Button>
                }
            </Styled.Content>
        </Styled.AllContent>
    )
}