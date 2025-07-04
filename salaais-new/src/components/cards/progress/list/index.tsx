import { Color } from '../../../../global'
import { AnimationType, IconType } from '../../../icon/models'
import { CardProgressItem, type CardProgressItemProps } from '../item'
import * as Styled from './style'

const list: CardProgressItemProps[] = [
    {
        number: 10,
        numberSufix: '',
        inlineCard: false,
        text: 'Provas realizadas',
        iconType: IconType.Fire,
        iconColor: Color.Blue,
        animationType: AnimationType.ZoomInOutWithPause
    },
    {
        number: 80,
        numberSufix: '%',
        inlineCard: false,
        text: 'Nota máxima',
        iconType: IconType.Fire,
        iconColor: Color.Orange,
        animationType: AnimationType.ZoomInOutWithPause
    },
    {
        number: 80,
        numberSufix: '%',
        inlineCard: false,
        text: 'Progrersso nos estudos',
        iconType: IconType.Fire,
        iconColor: Color.Red,
        animationType: AnimationType.ZoomInOutWithPause
    }
]

const listInline: CardProgressItemProps[] = [
    {
        number: 700,
        numberSufix: '',
        inlineCard: true,
        text: 'Pontos',
        iconType: IconType.Trophy,
        iconColor: Color.Primary,
        animationType: AnimationType.ZoomInOutWithPause
    },
]


export function CardProgressList() {
    return (
        <Styled.Content>
            <Styled.ContentNoWrap>

                {listInline.map((item, index) => (
                    <CardProgressItem key={index} {...item} />
                ))}
            </Styled.ContentNoWrap>

            <Styled.ContentNoWrapGrid>
                {
                    list.map((item, index) => (
                        <CardProgressItem key={index} {...item} />
                    ))
                }
            </Styled.ContentNoWrapGrid>
        </Styled.Content>
    )
}