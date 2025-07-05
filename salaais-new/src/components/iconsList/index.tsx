// components/icons/IconsList.tsx

import { Color, Size, type EnumType } from '../../global'
import { Icon } from '../icon'
import { AnimationType, IconType, StartAnimation } from '../icon/models'
import { Text } from '../text'
import * as Styled from './style'
import { useNavigate } from 'react-router-dom'

interface IconItemProps {
  text: string
  icon: EnumType<typeof IconType>
  navigate: string
}

const items: IconItemProps[] = [
  {
    text: "Prova ANAC",
    icon: IconType.BookA,
    navigate: '/home/provas/anac'
  },
  {
    text: "Prova Blocos",
    icon: IconType.Tests,
    navigate: '/home/provas/blocos'
  },
  {
    text: "Prova Matérias",
    icon: IconType.Test,
    navigate: '/home/provas/materia'
  },
  {
    text: "Provas Realizadas",
    icon: IconType.TestCheck,
    navigate: '/home/provas/realizadas'
  },
  {
    text: "Estudos",
    icon: IconType.Formation,
    navigate: '/home/estudos'
  },
  {
    text: "Pagamentos",
    icon: IconType.Payment,
    navigate: '/home/pagamentos'
  },
  {
    text: "Planos",
    icon: IconType.ShoppingCart,
    navigate: '/home/planos'
  },
  {
    text: "Ranking",
    icon: IconType.Trophy,
    navigate: '/home/ranking'
  },
  {
    text: "Configurações",
    icon: IconType.Settings,
    navigate: '/home/configuracoes'
  },
  {
    text: "Conquistas",
    icon: IconType.Checklist,
    navigate: '/home/conquistas'
  },
  {
    text: "Usuários",
    icon: IconType.Users,
    navigate: '/home/usuarios'
  }
]

export function IconItem({ text, icon, navigate: to }: IconItemProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to)
  }

  return (
    <Styled.ContentItem onClick={handleClick}>
      <Icon
        iconType={icon}
        color={Color.TxtPrimary}
        size={Size.S}
        animationType={AnimationType.Float}
        startAnimation={StartAnimation.Hover}
        padding="20px"
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
    <>
      <Text text='Acesso Rápido' bold margin='20px 0 0 0'/>
      <Styled.ContentList>
        {items.map((item, index) => (
          <IconItem
            key={index}
            text={item.text}
            icon={item.icon}
            navigate={item.navigate}
          />
        ))}
      </Styled.ContentList>
    </>
  )
}
