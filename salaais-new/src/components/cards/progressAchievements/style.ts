import styled from "styled-components";
import { Color } from "../../../global";

export const Content = styled.div<{grid:number}>`
display: flex;
flex-direction:column;
padding: 10px 15px;
width:100%;
height: 100%;
min-height:130px;
background: ${Color.BgSecondary};
box-shadow: ${Color.Shadow};
border-radius:15px;
align-items:center;
grid-column: span ${props => props.grid || 1};
`

export const Top = styled.div`
display: flex;
flex-direction:column;
width: 100%;
margin-bottom:15px;
`

export const ScrollableList = styled.div`
  width: 100%;
  max-height: 160px; // ajuste conforme seu design
  overflow-y: auto;
  padding-right: 4px; // espaço para barra de rolagem
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: ${Color.Secondary} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${Color.Secondary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`
