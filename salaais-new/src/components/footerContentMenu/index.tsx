import type { ReactElement } from "react"
import * as Styled from "./style"

interface FooterProps {
    children: ReactElement
}

export function FooterContentMenu(props: FooterProps) {
    return (
        <Styled.Footer>{props.children}</Styled.Footer>
    )
}
