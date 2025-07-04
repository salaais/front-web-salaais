import styled, { css } from "styled-components"
import { Color, cssVarToRgba } from "../../global";
import { getActiveColor } from ".";


const backgroundColorItem = (isActive?: boolean, color?: string, isHover = false) => {
  if (!color) return "transparent"

  // Regra especial: hover em item ativo com TxtPrimary
  if (isHover && isActive && color === Color.TxtPrimary) {
    return cssVarToRgba(Color.Primary, 0.3)
  }

  if (isActive) {
    const finalColor = color === Color.TxtPrimary ? Color.Primary : color
    return cssVarToRgba(finalColor, 0.3)
  }

  // Hover inativo ou geral
  if (isHover) {
    return cssVarToRgba(color, 0.3)
  }

  return "transparent"
}

export const ContentWrapper = styled.div`
  flex: 1 0 auto; /* cresce e ocupa espaço disponível */
`

// Novo contêiner geral
export const PageContent = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column; /* coluna para o layout vertical */
  min-height: 100vh; /* altura mínima da tela */
  padding: 20px;
  transition: margin-left 0.4s ease;

  @media (min-width: 768px) {
    margin-left: ${({ isOpen }) => (isOpen ? "220px" : "65px")};
  }
`

export const PageContentWithOutTitle = styled.div`
  display:flex;
  flex-direction:column;
  padding: 50px 0px 10px 0px;
  gap:15px;
  width: 100%;
  justify-content:center;
  align-items:center;
  
  @media (max-width: 767px) {
    margin-left: 0;
    flex-direction: column;
  }
`;

export const PageTitle = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 20px;
  font-weight: 600;
  color: var(--txt-primary);
  cursor:pointer;
  user-select: none;
  @media (max-width: 768px) {
    margin: 0 0 0 60px;
  }
  & a, p{
      text-decoration: inline;
    font-size: 24px;
    font-weight: 700;
    color: var(--txt-primary);
    &:hover{
      opacity:.8;
    }
  }
`

// Container do menu inteiro
export const MenuContainer = styled.div`
  @media (min-width: 767px) {
    padding-top:15px;
    padding-left:15px;
    padding-right:15px ;
  }
`

// Botão do menu mobile
export const MenuMobileButton = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 15px;
  left: 20px;
  cursor: pointer;
  z-index: 999;
  border-radius: 50%;
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--txt-primary);
  font-weight: 700;
  font-size: 15px;
  display: ${({ isOpen }) => (isOpen ? 'none' : 'flex')};
  @media (min-width: 769px) {
    display: none;
  }
`
// Link dentro do item
export const MenuLink = styled.div`
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: inherit;
  &.admin {
    color: var(--admin-color);

    &:hover {
      background-color: var(--admin-secondary-color);
    }
  }

  &#logout {
    color: var(--danger-primary);

    &:hover {
      background-color: var(--danger-secondary);
    }

    @media (min-width: 769px) and (max-height: 499px) {
      margin-bottom: 10px;
    }
  }
`

// Lista de navegação (ul)
export const MenuList = styled.ul<{ isOpen: boolean }>`
  position: fixed;
  height: fit-content;
  max-height: 100%;
  z-index: 5;
  user-select: none;
  transition: 0.5s;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: auto;
  text-decoration: none;
  font-size: 18px;
  background-color: var(--bg-secondary);
  border-radius: 10px;
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 10px;
  width: ${({ isOpen }) => (isOpen ? "200px" : "45px")};
  transition: ${({ isOpen }) => isOpen ? 'all 0.35s ease' : 'all 0.35s ease'};
  span{
    margin-left:10px;
  }
  @media (max-width: 767px) {
    width: ${({ isOpen }) => (isOpen ? "220px" : "0")};
    height: 100%;
    border-radius: ${({ isOpen }) => (isOpen ? "0 20px 20px 0" : "0")};
    padding: ${({ isOpen }) => (isOpen ? "12px 10px 0 10px" : "12px 0 0 0")};
    justify-content: flex-start;
    gap:2px;
  }

  @media (min-width: 769px) and (max-height: 499px) {
    min-width: 60px;
    justify-content: flex-start;
    gap: 10px;
    height: auto;
    padding:10px
  }
`

interface MenuItemProps {
  color: string;
  isActive?: boolean;
  isOpenMenu: boolean;
}

// Itens da lista (li)
export const MenuItem = styled.li<MenuItemProps>`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0;
  list-style: none;
  text-decoration: none;
  color: ${({ color }) => color};
  background-color: ${({ isActive, color }) => backgroundColorItem(isActive, color)};
  border-radius: 5px;

& ${MenuLink} span {
  color: ${({ isActive, color }) => getActiveColor(isActive, color)};
  font-weight: ${({ isActive }) => (isActive ? "700" : "500")};
}
  
  &:hover {
    background-color: ${({ isActive, color }) =>
    backgroundColorItem(isActive, color, true)};
}
@media (max-width: 768px) {
  padding: 5px;
}
`

// Ícone (container flex para o SVG)
export const IconWrapper = styled.div`
  display: flex;
  min-width: 33px;
  justify-content: center;
`

// Controla rotação do botão mobile
export const MenuMobileButtonIcon = styled.div<{ isOpen: boolean }>`
  transition: 0.5s;
`

// Para simular a classe active do NavLink (exemplo)
export const ActiveMenuItem = css`
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border-radius: 5px;

  a {
    font-weight: 700;
  }
`