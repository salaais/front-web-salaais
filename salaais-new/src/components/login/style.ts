import styled from "styled-components"
import { Color } from "../../global"

export const All = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h2`
  color: var(--txt-primary);
  padding: 0 0 3px 20px;
`

export const Text = styled.p`
  color: var(--txt-primary);
  text-align: center;
`

export const Img = styled.img`
  width: 50%;
  padding-bottom: 40px;
`

export const ImgContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export const A = styled.a`
  text-decoration: none;
  color: ${Color.TxtPrimary};
  font-weight: bold;
`

export const BackgroundCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  background-color: var(--bg-secondary);
  width: fit-content;
  height: fit-content;
  border-radius: 32px;
  gap: 40px;
  padding: 30px;

  /* Conditionally apply styles based on the mobile prop */
  width: auto;
  max-width: 400px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
  }
`
