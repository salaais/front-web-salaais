import styled from "styled-components"
import { Color } from "../../../global";

export const AllContent = styled.div`
  display: flex;
  border-radius:15px;
  padding:20px;
  width: 100%;
  max-width: 320px;
  height: fit-content;
  flex-direction: column;
  background: ${Color.BgSecondary};
  box-shadow:${Color.Shadow};

  @media(max-width:768px){
    max-width: 100%;
  }
`

export const InputsContent = styled.div`
  margin-top: 20px;
  display: flex;
  gap:10px;
  flex-direction:column;
`