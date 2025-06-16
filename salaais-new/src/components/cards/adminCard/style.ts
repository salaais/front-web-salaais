import styled from "styled-components"
import { Color } from "../../../global"

export const ContentCards = styled.div`
  display: flex;
  gap:15px;
  flex-wrap: wrap;
  justify-content:center;
  width: 100%;
`

export const ShowMore = styled.span`
  cursor: pointer;
  color: ${Color.Blue};
  margin-left: 5px;
  font-weight: 600;
`;

export const ContentCard = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  max-width: 310px;
  height: fit-content;
  min-height:100px;
  padding: 10px;
  gap: 10px;
  background: var(--bg-secondary);
  border-radius: clamp(8px, 1.5vw, 20px);
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${Color.Admin};

    p, span {
      color: ${Color.BgPrimary};
    }
  }

  @media(max-width: 768px){
    max-width: none;
  }
`

export const ContentText = styled.div`
  display: flex;
  gap:5px;
  flex-direction:column;
`
