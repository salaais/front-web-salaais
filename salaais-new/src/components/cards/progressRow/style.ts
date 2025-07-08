import styled from "styled-components";
import { Color } from "../../../global";

export const Content = styled.div<{grid:number}>`
display: flex;
flex-direction:row;
justify-content:space-between;
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