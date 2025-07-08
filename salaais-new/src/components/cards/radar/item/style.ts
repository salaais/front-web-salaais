import styled from "styled-components";
import { Color } from "../../../../global";

export const Content = styled.div<{ grid: number }>`
cursor:pointer;
display: flex;
flex-direction: column;
justify-content:space-between;
padding: 10px 15px;
width:auto;
height: 100%;
min-height: 180px;
background: ${Color.BgSecondary};
box-shadow: ${Color.Shadow};
border-radius:15px;
align-items:center;
grid-column: span ${props => props.grid};
`

export const Top = styled.div`
display: flex;
flex-direction:column;
gap:5px;
/* height:100%; */
width: 100%;
`

export const TopSpaceBetween = styled.div`
display: flex;
justify-content:space-between;
`

export const ChartWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 120px;
  justify-content: center;
  align-items: center;
  overflow: hidden; // EVITA estouro do grid

  .apexcharts-canvas {
    width: 100% !important;
    max-width: 100%;
    max-height: 100%;
  }

  svg {
    width: 100% !important;
    height: 100% !important;
    max-width: 100%;
    max-height: 100%;
  }
`

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 10px;
  overflow-y: auto;
  height: 100%;
  max-height: 120px;
`

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
