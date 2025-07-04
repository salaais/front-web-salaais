import styled from "styled-components";

export const Content = styled.div`
display: flex;
flex-direction:column;
gap:20px;
align-items: stretch;
height: fit-content;
width:100%;
max-width:420px;
@media (max-width: 768px) {
    max-width:100%;
}
`

export const ContentNoWrap = styled.div`
display: flex;
flex-wrap:nowrap;
gap:20px;
align-items: stretch;
height: fit-content;
width:100%;
`

export const ContentNoWrapGrid = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;

  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); // base

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); // até 3 colunas fixas
    justify-content:center;
  }
`;