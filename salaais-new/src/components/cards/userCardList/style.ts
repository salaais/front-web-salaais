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
  margin-bottom: ${({ expanded }) => (expanded ? "20px" : "0")};
  width: 100%;
  transition: margin-bottom 0.3s ease;
  transition-delay: ${({ expanded }) => (expanded ? "0s" : "0.9s")};
`

export const FlexColumn = styled.div`
  display: flex;
  gap:5px;
  flex-direction:column;
`

export const SecondContent = styled.div<Expandable>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  max-height: ${({ expanded }) => (expanded ? "1000px" : "0px")};
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  transform: translateY(${({ expanded }) => (expanded ? "0px" : "-20px")});
  transition: all 1s ease-in-out;
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
  overflow: hidden;
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

export const Flex = styled.div`
display: flex;
gap:5px
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


