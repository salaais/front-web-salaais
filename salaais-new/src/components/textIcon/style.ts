import styled from 'styled-components'

interface ContainerProps {
  align?: 'left' | 'center' | 'right'
  pointer?: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${({ align }) =>
    align === 'center'
      ? 'center'
      : align === 'right'
        ? 'flex-end'
        : 'flex-start'};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'default')};
  width: 100%;
`
