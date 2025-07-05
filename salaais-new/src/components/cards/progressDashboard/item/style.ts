import styled from "styled-components";
import { Color } from "../../../../global";

export const Content = styled.div`
display: flex;
flex-direction: column;
justify-content:space-between;
padding: 10px 15px;
width:100%;
height: 180px;
max-width:130px;
background: ${Color.BgSecondary};
box-shadow: ${Color.Shadow};
border-radius:15px;
align-items:center;
`

export const Top = styled.div`
display: flex;
flex-direction:column;
gap:5px;
width: 100%;
height: 100%;
`

export const TopSpaceBetween = styled.div`
display: flex;
justify-content:space-between;
`