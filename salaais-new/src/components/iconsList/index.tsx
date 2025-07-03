// components/icons/IconsList.tsx

import { Color, Size, type EnumType } from '../../global'
import { Icon } from '../icon'
import { AnimationType, IconType, StartAnimation } from '../icon/models'
import { Text } from '../text'
import * as Styled from './style'

interface IconItemProps {
  text: string
  icon: EnumType<typeof IconType>
}

const items: IconItemProps[] = [
  {
    text: "Prova ANAC",
    icon: IconType.BookA
  },
  {
    text: "Prova Blocos",
    icon: IconType.Tests
  },
  {
    text: "Prova Matérias",
    icon: IconType.Test
  },
  {
    text: "Provas Realizadas",
    icon: IconType.TestCheck
  },
  {
    text: "Materias de Estudo",
    icon: IconType.Formation
  },
  {
    text: "Pagamentos",
    icon: IconType.Payment
  },
  {
    text: "Planos",
    icon: IconType.ShoppingCart
  }
]

export function IconItem({ text, icon }: IconItemProps) {
  return (
    <Styled.ContentItem>
      <Icon
        iconType={icon}
        color={Color.TxtPrimary}
        size={Size.S}
        animationType={AnimationType.Float}
        startAnimation={StartAnimation.Hover}
        padding="15px"
        background={Color.BgSecondary}
        borderRadius='10px'
        shadow
      />
      <Text text={text} size={Size.S} center />
    </Styled.ContentItem>
  )
}

export function IconsList() {
  return (
    <Styled.ContentList>
      {items.map((item, index) => (
        <IconItem key={index} text={item.text} icon={item.icon} />
      ))}
    </Styled.ContentList>
  )
}
