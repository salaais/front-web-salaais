import { Color, Size } from '../../../global'
import { Text } from '../../text'
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
    data: string // exemplo: '2025-07-01'
}

export function CardProgressLineCurve({
    title = 'Título',
    values = [],
    grid = 3
}: CardRadarProps) {
    const datas = values.map((v) => v.data)
    const notas = values.map((v) => v.nota)

    const chartSeries = [
        {
            name: 'Acerto',
            data: notas,
        },
    ]

    const chartOptions: ApexOptions = {
        chart: {
            type: 'area',
            toolbar: { show: false },
            sparkline: { enabled: false },
        },
        xaxis: {
            categories: datas,
            type: 'category',
            axisTicks: {
                show: false, // ❌ oculta os risquinhos do eixo X
            },
            axisBorder: {
                show: false, // ❌ oculta a linha do eixo X
            },
            labels: {
                show: false, // ❌ oculta os textos (datas)
            },
        },

        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 5,
            axisTicks: {
                show: true, // ✅ mostra risquinhos do eixo Y
                color: Color.Blue, // opcional: personaliza a cor dos ticks
            },
            axisBorder: {
                show: false, // opcional: oculta a linha lateral
            },
            labels: {
                show: true, // ✅ mostra os números do eixo Y
                formatter: (val) => `${val}%`,
                style: {
                    fontSize: '10px',
                    colors: Color.TxtPrimary, // opcional: cor dos números
                },
            },
        },

        stroke: {
            curve: 'smooth',
            width: 2,
            colors: [Color.Blue],
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0,
                stops: [0, 90, 100],
            },
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
            size: 4,
            hover: { sizeOffset: 3 },
        },
    }

    return (
        <Styled.Content grid={grid}>
            <Styled.Top>
                <Text text={title} size={Size.S} bold />
            </Styled.Top>
            <Styled.ChartWrapper>
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="area"
                    width="100%"
                    height="100%"
                />
            </Styled.ChartWrapper>
        </Styled.Content>
    )
}
