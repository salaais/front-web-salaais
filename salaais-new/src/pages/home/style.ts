import styled from "styled-components";

export const Content = styled.div`
  display:flex;
  justify-content: center;
`;

export const Inner = styled.div`
    display: flex;
    align-items:center;
    flex-direction:column;
    padding: 20px 0;
`;

export const Cards = styled.div`
    display: flex;
    justify-content:center;
    gap:20px;
    width: 100%;

    @media(max-width:768px){
      flex-direction:column;
    }
`;

