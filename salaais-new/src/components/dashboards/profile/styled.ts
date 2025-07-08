import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding: 16px;
  @media(max-width:768px){
    grid-template-columns: repeat(3, 1fr);
  }
`