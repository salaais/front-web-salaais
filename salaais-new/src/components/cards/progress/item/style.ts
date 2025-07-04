import styled from "styled-components";
import { Color } from "../../../../global";

export const Content = styled.div`
display: flex;
flex-direction:column;
justify-content:space-between;
padding: 10px 15px;
width:100%;
max-width:110px;
height: auto;
background: ${Color.BgSecondary};
box-shadow: ${Color.Shadow};
border-radius:15px;
align-items:center;

@media(max-width:768px){
    max-width: 100%;
}
`

export const Top = styled.div`
display: flex;
flex-direction:column;
width: 100%;
margin-bottom:15px;
`