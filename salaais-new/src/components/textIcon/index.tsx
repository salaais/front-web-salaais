import { Text } from '../text'
import { Icon } from '../icon'
import { Align } from '../align'
import { IconType } from '../icon/models'
import { Color, Size, type EnumType } from '../../global'
import { JustifyType } from '../align/interfaces'
import * as Styled from './style'

interface TextIconProps {
  text: string
  type?: 'delete' | 'edit' | 'save' | 'cancel'
  align?: 'left' | 'center' | 'right'
  onClick?: () => void
  size?: EnumType<typeof Size>
}

const iconMap: Record<string, EnumType<typeof IconType>> = {
  delete: IconType.Trash,
  edit: IconType.Edit,
  save: IconType.Save,
  cancel: IconType.Close,
}

const colorMap: Record<string, EnumType<typeof Color>> = {
  delete: Color.Red,
  edit: Color.Primary,
  save: Color.Primary,
  cancel: Color.TxtSecondary,
}

export function TextIcon({
  text,
  type = 'edit',
  align = 'left',
  onClick,
  size = Size.S,
}: TextIconProps) {
  const iconType = iconMap[type] || IconType.Edit
  const iconColor = colorMap[type] || Color.Primary

  return (
    <Styled.Container align={align} onClick={onClick} pointer={!!onClick}>
      <Align
        gap="8px"
        alignCenter={align === 'center'}
        alignEnd={align === 'right'}
        justify={align === 'center' ? JustifyType.Center : undefined}
      >
        <Icon iconType={iconType} size={size} color={iconColor} />
        <Text text={text} size={size} pointer={!!onClick} color={iconColor} />
      </Align>
    </Styled.Container>
  )
}
