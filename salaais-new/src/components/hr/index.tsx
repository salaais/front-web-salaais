import * as Styled from "./style"
import { HrProps } from "./interfaces"

export function Hr({ bg='red', width='100%', height='5px', margin }: HrProps) {
  return <Styled.Hr bg={bg} width={width} height={height} margin={margin} />
}
