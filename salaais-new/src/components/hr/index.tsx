import type { HrProps } from "./interfaces"
import * as Styled from "./style"

export function Hr({ bg, width, height, margin, left, center, right }: HrProps) {
  return (
    <Styled.Content left={left} center={center} right={right}>
      <Styled.Hr bg={bg} width={width} height={height} margin={margin} />
    </Styled.Content>
  );
}
