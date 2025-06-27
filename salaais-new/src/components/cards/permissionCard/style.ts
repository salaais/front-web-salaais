import styled from "styled-components";
import { Color } from "../../../global";

export const CardItem = styled.div`
    display: flex;
    flex-direction:column;
    border-radius: 10px;
    box-shadow: ${Color.Shadow};
    padding: 5px;
    width: fit-content;
    height: fit-content;
    align-items:center;
`

export const CardList = styled.div`
    display: flex;
    justify-content:center;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
`

export const Image = styled.img`
width: 100%;
height: 100%;
max-width:60px;
max-height:60px;
height:auto;
/* margin-bottom:px; */
`

export const FlexEndIcon = styled.div`
    display: flex;
    width:100%;
    justify-content:flex-end;
`