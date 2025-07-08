import { Size } from '../../../global'
import { Text } from '../../text'
import * as Styled from './style'
import { AchievementList } from '../../achievement/list'

export interface CardProgressItemProps {
    text?: string
    grid?: number
}

export function CardProgressAchievement({
    text,
    grid = 1
}: CardProgressItemProps) {

    return (
        <Styled.Content grid={grid}>
            <Styled.Top>
                <Text
                    text={text}
                    size={Size.S}
                    bold
                />
            </Styled.Top>

            <Styled.ScrollableList>
                <AchievementList hideTitles />
            </Styled.ScrollableList>
        </Styled.Content>
    )
}