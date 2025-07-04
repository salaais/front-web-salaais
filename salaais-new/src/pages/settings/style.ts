import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    gap:20px;
    width: 100%;
    justify-content:center;

    @media(max-width:768px){
      flex-direction:column;
    }
  `;
