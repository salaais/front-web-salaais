import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Content = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const ContentLogged = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`

export const Gap = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
`

export const ButtonLink = styled(NavLink)`
  width: 100%;
  display: block;
  text-decoration: none;

  button {
    width: 100%;
    padding: 10px;
  }
`
