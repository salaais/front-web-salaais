import styled from "styled-components";
import { Color } from "../../global";

export const ContentList = styled.div`
display: flex; 
gap: 40px;
flex-wrap: wrap;
width:100%;
@media(max-width:768px){
    justify-content:center;
}
`

export const AllContent = styled.div`
  display: flex;
  position: relative;  // <-- necessário para posicionar o ContentImage
  width: 100%;
  max-width: 250px;
  flex-direction: column;
  align-items: center;
  padding-top: 95px;  // espaço para a imagem flutuante
  @media(max-width:768px){
    max-width: 340px;
  }
`

export const ContentImage = styled.div`
  display: flex;
  justify-content: center;
  background: #e0e0e0;
  padding: 20px 20px 70px 20px;
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

export const PlanDetails = styled.div`
 display:flex;
 gap:5px;
 align-items:center;
`

export const MoneyInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
`

export const Button = styled.button`
background: #000000;
width: 100%;
font-size:14px;
padding: 15px;
color: white;
border-radius: 40px;
cursor: pointer;
text-decoration:underline;
`