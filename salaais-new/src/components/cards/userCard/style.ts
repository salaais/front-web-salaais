import styled from "styled-components"
import { Color } from "../../../global"

type Expandable = {
  expanded: boolean
}

export const ContentCards = styled.div`
  display: flex;
  gap:15px;
  flex-wrap: wrap;
  justify-content:center;
  width: 100%;
`

export const ContentCard = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  max-width: 310px;
  height: fit-content;
  min-height:100px;
  padding: 10px;
  flex-direction:column;
  background: ${Color.BgSecondary};
  border-radius: clamp(8px, 1.5vw, 20px);
  align-items: center;
  transition: background-color 0.3s ease;

  @media(max-width: 768px){
    max-width: none;
  }
`

export const FirstContent = styled.div<Expandable>`
  display: flex;
  justify-content: space-between;
  margin-bottom:0;
  width: 100%;
  transition: margin-bottom 0.3s ease;
`

export const FlexColumn = styled.div`
  display: flex;
  gap:5px;
  flex-direction:column;
`

export const FlexColumnIcons = styled.div`
  display: flex;
  gap:5px;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

export const FlexIcons = styled.div`
  display: flex;
  align-items:center;
  gap:5px;
`

export const SecondContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  max-height: fit-content;
`

export const IconAndtext = styled.div`
  display: flex;
  gap:5px;
  align-items:center;
  flex-direction:column;
  width: 100%;
`

export const ImgPerfil = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ContentFollwers = styled.div`
display: flex;
width:100%;
max-width:200px;
justify-content:space-between;
`

export const ImageAndText = styled.div`
display: flex;
gap:15px;
align-items:center;
`

export const ButtonsRight = styled.div`
display: flex;
gap:15px;
flex-direction:column;
align-items:flex-end;
`

export const SocialMedia = styled.div`
display: flex;
gap:20px;
margin: 10px 0 20px 0;
`

export const InitialsPlaceholder = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${Color.BgPrimary};
  color: ${Color.TxtPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  user-select: none;
  letter-spacing: 2px;
`


