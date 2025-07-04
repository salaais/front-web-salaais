import styled from "styled-components";
import { Color } from "../../../../global";

export const Content = styled.div<{inlineCard: boolean}>`
display: flex;
flex-direction: ${({ inlineCard }) => (inlineCard ? 'row' : 'column')};
justify-content:space-between;
padding: 10px 15px;
width:100%;
height: ${({ inlineCard }) => (inlineCard ? '120px' : 'auto')};
background: ${Color.BgSecondary};
box-shadow: ${Color.Shadow};
border-radius:15px;
align-items:center;
`

export const Top = styled.div`
display: flex;
flex-direction:column;
width: 100%;
margin-bottom:15px;
`