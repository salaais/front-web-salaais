import React, { useEffect, useState, type ReactNode } from "react";
import { AnimationType, Color, getLocalStorage, IconType, LocalStorage, setLocalStorage, Size, StartAnimation, type EnumType } from "../../global"
import { Icon } from "../icon"
import * as Styled from "./style"
import { useNavigate, useLocation, Link } from "react-router-dom";


type MenuItem = {
  nome: string
  link: string
  icone: EnumType<typeof IconType>
  color: EnumType<typeof Color>
  is_handle: boolean
}

const defaultItems: MenuItem[] = [
  {
    nome: "Admin",
    link: "/admin",
    icone: IconType.ShieldAdmin,
    color: Color.Admin,
    is_handle: true,
  },
  {
    nome: "Home",
    link: "/home",
    icone: IconType.Grid,
    color: Color.TxtPrimary,
    is_handle: true,
  },
  {
    nome: "Estudos",
    link: "/estudos",
    icone: IconType.Formation,
    color: Color.TxtPrimary,
    is_handle: true,
  },
  {
    nome: "Usuários",
    link: "/usuarios",
    icone: IconType.Users,
    color: Color.TxtPrimary,
    is_handle: true,
  },
  {
    nome: "Configurações",
    link: "/configuracoes",
    icone: IconType.Settings,
    color: Color.TxtPrimary,
    is_handle: true,
  },
  {
    nome: "Sair",
    link: "/login",
    icone: IconType.LogOut,
    color: Color.Red,
    is_handle: true,
  },
]

export interface MenuProps {
  items?: MenuItem[]
  children?: ReactNode
}

export function useResponsiveIconSize() {
  const [size, setSize] = useState<EnumType<typeof Size>>(Size.S)

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      if (width >= 768) setSize(Size.S)
      else if (width < 768) setSize(Size.L)
      else setSize(Size.S)
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return size
}

export function Menu(props: MenuProps) {
  const navigate = useNavigate()
  const items = props.items ?? defaultItems
  const sizeIcons = useResponsiveIconSize()
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(() => {
    const saved = getLocalStorage<boolean>(LocalStorage.isMenuOpen)
    return saved !== null ? saved : false
  })

  const toggleIsOpen = () => {
    setIsOpen(prev => {
      const next = !prev
      setLocalStorage<boolean>(LocalStorage.isMenuOpen, next)
      return next
    })
  }


  return (
    <Styled.Global>
      <Styled.MenuContainer>
        <Styled.MenuMobileButton id={isOpen ? "iMenuOpen" : "iMenuClose"} onClick={toggleIsOpen}>
          <Styled.MenuMobileButtonIcon isOpen={isOpen}>
            <Icon iconType={IconType.ArrowRight} color={Color.TxtPrimary} size={Size.L} padding="10px" />
          </Styled.MenuMobileButtonIcon>
        </Styled.MenuMobileButton>

        <Styled.MenuList isOpen={isOpen}>
          <Styled.MenuItem key={'closeOpen'} color={Color.TxtPrimary} onClick={toggleIsOpen} isOpenMenu={isOpen}>
            <Styled.MenuLink>
              <Styled.IconWrapper>
                <Icon iconType={IconType.ArrowLeft} color={Color.TxtPrimary} size={sizeIcons} animationType={AnimationType.Float} startAnimation={StartAnimation.Hover} padding="5px" />
              </Styled.IconWrapper>
            </Styled.MenuLink>
          </Styled.MenuItem>

          {items.filter(item => item.is_handle).map((item, index) => {
            const isActive = location.pathname.startsWith(item.link);
            return (
              <Styled.MenuItem key={index} color={item.color} isActive={isActive} isOpenMenu={isOpen} onClick={() => { navigate(item.link) }}>
                <Styled.MenuLink>
                  <Styled.IconWrapper>
                    <Icon iconType={item.icone} color={isActive ? Color.Primary : item.color} size={sizeIcons} animationType={AnimationType.Float} startAnimation={StartAnimation.Hover} padding="5px" />
                  </Styled.IconWrapper>
                  <span>{item.nome}</span>
                </Styled.MenuLink>
              </Styled.MenuItem>
            );
          })}
        </Styled.MenuList>
      </Styled.MenuContainer>

      <Styled.MenuWrapper isOpen={isOpen}>
        <div style={{ width: "100%" }}>
          <PageTitle />
          {props.children}
        </div>
      </Styled.MenuWrapper>
    </Styled.Global>
  )
}


export function PageTitle() {
  const location = useLocation()
  const pathParts = location.pathname.split("/").filter(Boolean)

  const formatLabel = (part: string, isFirst: boolean) => {
    const formatted = part.replace(/-/g, " ")
    return isFirst
      ? formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase()
      : formatted.toLowerCase()
  }

  return (
    <Styled.PageTitle>
      {pathParts.map((part, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>/</span>}
          <a>{formatLabel(part, index === 0)}</a>
        </React.Fragment>
      ))}
    </Styled.PageTitle>
  )
}

