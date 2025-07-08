import { Color } from '../../../global'
import { CardProgressAchievement } from '../../cards/progressAchievements'
import { CardProgressColumn } from '../../cards/progressColumn'
import { CardProgressLineCurve } from '../../cards/progressLineCurve'
import { CardProgressRow } from '../../cards/progressRow'
import { CardProgressRadar, type CardRadarProps } from '../../cards/radar/item'
import { AnimationType, IconType } from '../../icon/models'
import * as Styled from './styled'

const example: CardRadarProps = {
    title: 'Última Prova',
    values: [
        {
            materia: 'EME',
            descricao: 'BLOCO 1 - Emergências a Bordo (EME)',
            nota: 90,
        },
        {
            materia: 'SBV',
            descricao: 'BLOCO 1 - Sobrevivência (SBV)',
            nota: 10,
        },
        {
            materia: 'FHU',
            descricao: 'BLOCO 2 - Fatores Humanos na Aviação (FHU)',
            nota: 20,
        },
        {
            materia: 'SAC',
            descricao: 'BLOCO 2 - Sistema de Aviação Civil (SAC)',
            nota: 30,
        },
        {
            materia: 'RAC',
            descricao: 'BLOCO 2 - Regulamentação da Aviação Civil (RAC)',
            nota: 50,
        },
        {
            materia: 'RPA',
            descricao: 'BLOCO 2 - Regulamentação da Profissão do Aeronáutica (RPA)',
            nota: 40,
        },
        {
            materia: 'SVO',
            descricao: 'BLOCO 2 - Segurança de Voo (SVO)',
            nota: 30,
        },
        {
            materia: 'AFI',
            descricao: 'BLOCO 3 - Aspectos Fisiológicos (AFI)',
            nota: 70,
        },
        {
            materia: 'PSS',
            descricao: 'BLOCO 3 - Primeiros Socorros (PSS)',
            nota: 90,
        },
        {
            materia: 'AER',
            descricao: 'BLOCO 4 - Conhecimentos Básicos sobre Aeronave (AER)',
            nota: 95,
        },
        {
            materia: 'NAV',
            descricao: 'BLOCO 4 - Navegação Aérea (NAV)',
            nota: 10,
        },
        {
            materia: 'MET',
            descricao: 'BLOCO 4 - Meteorologia (MET)',
            nota: 0,
        },
    ],
}

export function DashboardProfile() {
    return (
        <Styled.Grid>
            <CardProgressRow
                text='Pontos'

                number={700}
                grid={3}
                iconType={IconType.Trophy}
                iconColor={Color.Yellow}
                animationType={AnimationType.Float}
            />
            <CardProgressColumn
                text='Provas Realizadas'
                grid={1}
                number={10}
                iconType={IconType.Fire}
                iconColor={Color.Blue}
                animationType={AnimationType.ZoomInOutWithPause}
            />
            <CardProgressColumn
                text='Nota máxima'
                grid={1}
                number={80}
                numberSufix='%'
                iconType={IconType.Fire}
                iconColor={Color.Orange}
                animationType={AnimationType.ZoomInOutWithPause}
            />
            <CardProgressColumn
                text='Progrersso nos estudos'
                grid={1}
                number={80}
                numberSufix='%'
                iconType={IconType.Fire}
                iconColor={Color.Red}
                animationType={AnimationType.ZoomInOutWithPause}
            />
            <CardProgressLineCurve
                title="Evolução das notas"
                grid={3}
                values={[
                    { materia: 'Matemática', descricao: 'Álgebra', nota: 80, data: '2025-06-01' },
                    { materia: 'Português', descricao: 'Leitura', nota: 65, data: '2025-06-08' },
                    { materia: 'História', descricao: 'Idade Média', nota: 70, data: '2025-06-15' },
                    { materia: 'Geografia', descricao: 'Biomas', nota: 75, data: '2025-06-22' },
                    { materia: 'Química', descricao: 'Ligações', nota: 90, data: '2025-06-29' },
                ]}
            />
            <CardProgressRadar
                grid={1}
                {...example}
            />
            <CardProgressAchievement
                text={'Conquistas'}
                grid={2}
            />
        </Styled.Grid>
    )
}