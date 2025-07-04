import { Color } from '../../../../global'
import { AnimationType, IconType } from '../../../icon/models'
import { CardProgressItem, type CardProgressItemProps } from '../item'
import * as Styled from './style'

const list: CardProgressItemProps[] = [

    {
        number: 10,
        numberSufix: '',
        text: 'Provas realizadas',
        iconType: IconType.Fire,
        iconColor: Color.Blue,
        animationType: AnimationType.ZoomInOutWithPause
    },
    {
        number: 80,
        numberSufix: '%',
        text: 'Nota máxima',
        iconType: IconType.Fire,
        iconColor: Color.Orange,
        animationType: AnimationType.ZoomInOutWithPause
    },
    {
        number: 80,
        numberSufix: '%',
        text: 'Progrersso nos estudos',
        iconType: IconType.Fire,
        iconColor: Color.Red,
        animationType: AnimationType.ZoomInOutWithPause
    }
]



export function CardProgressList() {
    return (
        <Styled.Content>
            {list.map((item, index) => (
                <CardProgressItem key={index} {...item} />
            ))}
        </Styled.Content>
    )
}