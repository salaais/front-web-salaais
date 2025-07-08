import { useEffect, useState } from 'react'
import { Color, Size, type EnumType } from '../../../../global'
import { Text } from '../../../text'
import * as Styled from './style'
import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

export interface CardRadarProps {
    title?: string
    values?: ValuesProps[]
    grid?: number
}

export interface ValuesProps {
    materia: string
    descricao: string
    nota: number
}

export function CardProgressRadar({
    title = 'Título',
    values = [],
    grid = 1
}: CardRadarProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)

    const categorias = values.map((v) => v.descricao) // usado no gráfico (tooltip)
    const siglas = values.map((v) => v.materia) // usado visualmente no card
    const notas = values.map((v) => v.nota) // usado para o gráfico
    const highlightSeries = values.map((_, index) =>
        index === currentIndex ? notas[index] : null
    )

    const chartSeries = [
        {
            name: 'Acerto',
            data: notas,
        },
        {
            name: 'Atual',
            data: highlightSeries,
        },
    ]

    const chartOptions: ApexOptions = {
        chart: {
            type: 'radar',
            toolbar: { show: false },
            sparkline: { enabled: true },
            offsetX: 0,
            offsetY: 0,
            //animations: { enabled: false }, // opcional: desativa transição
        },
        xaxis: {
            categories: categorias, // hover do gráfico
        },
        stroke: {
            width: 2,
            colors: ['transparent', Color.Blue],
        },
        fill: {
            opacity: 0.3,
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: (val: number) => `${val}%`,
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0, // remove todos os pontos da série principal
            hover: { sizeOffset: 3 },
        },
        plotOptions: {
            radar: {
                polygons: {
                    strokeColors: Color.BgPrimary, // ou qualquer cor que você quiser
                    connectorColors: Color.BgPrimary, // cor das linhas conectando os pontos
                    fill: {
                        colors: ['transparent'], // ou uma cor leve de fundo
                    },
                },
            },
        },
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % values.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [values.length])

    const currentSigla = siglas[currentIndex]
    const currentNota = notas[currentIndex]

    const getColor = (value: number): EnumType<typeof Color> => {
        if (value >= 70) return Color.Green
        if (value >= 60) return Color.Orange
        return Color.Red
    }

    return (
        <Styled.Content grid={grid} onClick={() => setIsExpanded((prev) => !prev)}>
            <Styled.Top>
                <Text text={title} size={Size.S} bold />
                {!isExpanded &&
                    <Styled.TopSpaceBetween>
                        <Text text={currentSigla} size={Size.Xs} bold />
                        <Text
                            text={`${currentNota}%`}
                            size={Size.Xs}
                            bold
                            color={getColor(currentNota)}
                            background
                        />
                    </Styled.TopSpaceBetween>
                }
            </Styled.Top>
            {isExpanded ? (
                <Styled.ListWrapper>
                    {values.map((v, i) => (
                        <Styled.ListItem key={i}>
                            <Text text={`${v.materia}`} size={Size.Xs} bold />
                            <Text
                                text={`${v.nota}%`}
                                size={Size.Xs}
                                bold
                                color={getColor(v.nota)}
                                background
                            />
                        </Styled.ListItem>
                    ))}
                </Styled.ListWrapper>
            ) : (
                <Styled.ChartWrapper>
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="radar"
                        width="100%"
                        height="100%"
                    />
                </Styled.ChartWrapper>
            )}
        </Styled.Content>
    )
}
