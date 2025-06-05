import * as Styled from "./style"
import type { AlignProps } from "./interfaces"

export function Align({
  gap,
  width,
  margin,
  column,
  alignEnd,
  alignCenter,
  justify,
  children,
  reponsive,
  padding,
}: AlignProps) {
  return (
    <Styled.Align
      gap={gap}
      width={width}
      margin={margin}
      column={column}
      alignEnd={alignEnd}
      alignCenter={alignCenter}
      justify={justify}
      reponsive={reponsive}
      padding={padding}
    >
      {children}
    </Styled.Align>
  )
}
