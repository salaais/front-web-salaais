import { ThemeType } from "../../../../global"
import type { IconProps } from "../interfaces"
import * as Styled from "./style"

export function Icon({ type = ThemeType.Primary, children }: IconProps) {
  return <Styled.ContentIcon type={type}>{children}</Styled.ContentIcon>
}
