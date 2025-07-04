import { useEffect, useState } from 'react'
import { Color, Size, type EnumType } from '../../../../global'
import { Icon } from '../../../icon'
import { AnimationType, IconType, StartAnimation } from '../../../icon/models'
import { Text } from '../../../text'
import * as Styled from './style'

export interface CardProgressItemProps {
    number?: number
    numberSufix?: string
    text?: string
    iconType?: EnumType<typeof IconType>
    iconColor?: EnumType<typeof Color>
    animationType?: EnumType<typeof AnimationType>
}

export function CardProgressItem({
    number = 0,
    text,
    numberSufix = '',
    iconType = IconType.Fire,
    iconColor,
    animationType,
}: CardProgressItemProps) {
    const [displayedNumber, setDisplayedNumber] = useState(0)

    useEffect(() => {
        let start = 0
        const duration = 1000 // ms total
        const frameRate = 30 // ms entre cada incremento
        const steps = Math.ceil(duration / frameRate)
        const increment = number / steps

        const interval = setInterval(() => {
            start += increment
            if (start >= number) {
                start = number
                clearInterval(interval)
            }
            setDisplayedNumber(Math.round(start))
        }, frameRate)

        return () => clearInterval(interval)
    }, [number])

    return (
        <Styled.Content>
            <Styled.Top>
                <Text
                    text={`${displayedNumber}${numberSufix}`}
                    size={Size.Xl}
                    bold
                />
                <Text text={text} size={Size.S} />
            </Styled.Top>

            <Icon
                iconType={iconType}
                size={Size.L}
                color={iconColor}
                startAnimation={StartAnimation.Infinite}
                animationType={animationType}
                animationDuration={2}
                border={`4px solid ${Color.BgPrimary}`}
            />
        </Styled.Content>
    )
}