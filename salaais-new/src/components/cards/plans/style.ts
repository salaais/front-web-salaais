import styled from "styled-components";
import { Color } from "../../../global";

export const ContentList = styled.div`
display: flex; 
gap: 40px;
flex-wrap: wrap;
width:100%;
@media(max-width:768px){
    justify-content:center;
}
`

interface ContentProps {
  opacity?: boolean;
}


export const AllContent = styled.div<ContentProps>`
  display: flex;
  position: relative;  // <-- necessário para posicionar o ContentImage
  width: 100%;
  max-width: 250px;
  flex-direction: column;
  align-items: center;
  padding-top: 95px;  // espaço para a imagem flutuante

  opacity: ${(props) => (props.opacity ? "1" : ".6")};
  @media(max-width:768px){
    max-width: 340px;
  }
`

export const ContentImage = styled.div`
  display: flex;
  justify-content: center;
  background: ${Color.PlanBackgroundImageColor};
  padding: 20px 20px 120px 20px;
  border-radius: 20px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
  cursor:pointer;
  ${AllContent}:hover & {
    transform: translateY(-20px);
  }
`

export const Image = styled.img`
width: 100%;
max-width:80px;
height:auto;
`

export const Content = styled.div`
 display:flex;
 padding: 20px;
 background: ${Color.BgSecondary};
 border-radius:20px;
 flex-direction:column;
 gap:10px;
 width: 100%;
 box-shadow: var(--shadow);
 position:relative;
`

export const Top = styled.div`
display: flex; 
gap: 40px;
justify-content:space-between;
`

export const FlexIconCloseAndCheck = styled.div`
display: flex;
gap:2px;
align-items:center;
`

export const PlanDetails = styled.div`
 display:flex;
 gap:5px;
 align-items:center;
`

export const FlexPrices = styled.div`
  display: flex;
  gap:10px;
  align-items:baseline;
`

export const Button = styled.button`
background: ${Color.PlanPrimaryColor};
width: 100%;
font-size:14px;
padding: 15px;
height: 50px;
color: ${Color.BgPrimary};
border-radius: 40px;
cursor: pointer;
text-decoration:underline;
transition:0.3s;
&:hover{
  font-size:16px;
}
`

export const PlanDetailsContainer = styled.div<{ $expanded: boolean }>`
  max-height: ${(props) => (props.$expanded ? "500px" : "90px")};
  overflow: hidden;
  transition: max-height 2s ease-in-out;
  display: flex;
  flex-direction: column;
`

export const ArrowButtons = styled.div`
  display: flex;
  flex-direction: column;
`;
