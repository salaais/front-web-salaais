import styled from "styled-components";

export const Content = styled.div`
display: flex;
flex-wrap:wrap;
gap:20px;
align-items: stretch;
height: fit-content;

@media(max-width:768px){
    flex-wrap: nowrap;
}
`