import { InputCheckBox } from '../inputs/checkBox'
import { Size, type EnumType } from '../../global'

interface SwitchProps {
  enabled: string[]
  value?: boolean
  onChange?: (checked: boolean) => void
  size?: EnumType<typeof Size>
}

export function Switch({
  enabled,
  value = false,
  onChange,
  size = Size.S,
}: SwitchProps) {
  const label = enabled.length > 1 ? enabled.join(' / ') : enabled[0]

  return (
    <InputCheckBox text={label} value={value} onChange={onChange} size={size} />
  )
}
