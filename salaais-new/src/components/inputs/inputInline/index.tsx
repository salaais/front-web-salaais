import type { ChangeEvent } from 'react';
import { Color, Size } from '../../../global';
import { Text } from '../../text';
import * as Styled from './style';

export interface InputInlineProps {
    label?: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    widthLabel?: string
    value?: string
}

export function InputInline({
    label = 'Label',
    placeholder = 'vazio',
    onChange,
    disabled = false,
    widthLabel = '130px',
    value
}: InputInlineProps) {
    return (
        <Styled.Content>
            <Text text={label} size={Size.S} color={Color.TxtPrimary} bold width={widthLabel} />
            <Styled.Input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                value={value}
            />
        </Styled.Content>
    );
}
