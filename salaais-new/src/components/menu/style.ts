import styled, { css } from "styled-components"
import { Color, cssVarToRgba } from "../../global";

// Container do menu inteiro
export const MenuContainer = styled.div``

// Botão do menu mobile
export const MenuMobileButton = styled.div`
  position: fixed;
  top: 15px;
  left: 15px;
  cursor: pointer;
  z-index: 999;
  border-radius: 50%;
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  color: var(--txt-primary);
  font-weight: 700;
  font-size: 25px;

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
  border-radius: 15px;
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 10px;
  width: ${({ isOpen }) => (isOpen ? "200px" : "53px")};
  & ${MenuLink} span {
    color: ${({ isOpen }) => (isOpen ? "inherit" : Color.BgSecondary)};
  }

  @media (max-width: 767px) {
    width: ${({ isOpen }) => (isOpen ? "320px" : "0")};
    height: 100%;
    border-radius: ${({ isOpen }) => (isOpen ? "0 20px 20px 0" : "0")};
    padding: ${({ isOpen }) => (isOpen ? "10px 20px 20px 30px" : "10px 0 0 0")};
    justify-content: flex-start;
    gap: 20px;
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
  background-color: ${({ isActive }) =>
    isActive ? cssVarToRgba(Color.Primary, 0.3) : "transparent"};

  & ${MenuLink} span {
    ${({ isActive, isOpenMenu }) => isActive && isOpenMenu && css`
      color: ${Color.Primary};
    `}
    font-weight: ${({ isActive }) => (isActive ? "700" : "500")};
  }

  @media (max-width: 768px) {
    font-size: 25px;
    padding: 10px 5px;
  }

  &:hover {
    /* const hex = getCssVariableValue("--txt-primary"); */
    /* const rgba = hexToRgba(hex, 0.3); // → "rgba(143, 141, 152, 0.3)" */
    background-color: ${({ color }) => cssVarToRgba(color, .3)}}; /* cor com ~30% opacidade */
    border-radius: 5px;
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
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
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
