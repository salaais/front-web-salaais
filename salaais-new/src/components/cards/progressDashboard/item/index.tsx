import { useEffect, useState } from 'react'
import { Color, Size, type EnumType } from '../../../../global'
import { Text } from '../../../text'
import * as Styled from './style'
import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

export interface CardDashboardItemProps {
    title?: string
    values?: ValuesProps[]
}

export interface ValuesProps {
    materia: string
    descricao: string
    nota: number
}

export function CardProgressDashboardItem({
    title = 'Título',
    values = [],
}: CardDashboardItemProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const categorias = values.map((v) => v.descricao) // usado no gráfico (tooltip)
    const siglas = values.map((v) => v.materia) // usado visualmente no card
    const notas = values.map((v) => v.nota) // usado para o gráfico

    const chartSeries = [
        {
            name: 'Acerto',
            data: notas,
        },
    ]

    const chartOptions: ApexOptions = {
        chart: {
            type: 'radar',
            toolbar: { show: false },
            sparkline: { enabled: true },
        },
        xaxis: {
            categories: categorias, // hover do gráfico
        },
        stroke: {
            width: 2,
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
        <Styled.Content>
            <Styled.Top>
                <Text text={title} size={Size.S} bold />
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
            </Styled.Top>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="radar"
                height={110}
                width={110}
            />
        </Styled.Content>
    )
}
