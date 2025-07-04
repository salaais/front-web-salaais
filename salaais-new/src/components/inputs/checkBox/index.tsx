import { Text } from '../../text'
import * as Styled from './style'
import { Size, type EnumType } from '../../../global'
import type { ChangeEvent } from 'react'

interface InputCheckBoxProps {
    value?: boolean
    onChange?: (checked: boolean) => void
    text?: string
    size?: EnumType<typeof Size>
}

export function InputCheckBox({
    value = false,
    onChange,
    text = 'text',
    size = Size.S
}: InputCheckBoxProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked)
    }

    return (
        <Styled.Content as="label" style={{ cursor: 'pointer' }}>
            <input
                type="checkbox"
                checked={value}
                onChange={handleChange}
                style={{ marginRight: '8px', cursor: 'pointer' }}
            />
            <Text text={text} size={size} />
        </Styled.Content>
    )
}
