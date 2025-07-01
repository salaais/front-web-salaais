import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Color, getLocalStorage, LocalStorage, Permission, setLocalStorage, Size, type EnumType } from "../../global";
import { Icon } from "../icon";
import * as Styled from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { FooterContentMenu } from "../footerContentMenu";
import { AnimationType, IconType, StartAnimation } from "../icon/models";
import { Cookie, deleteCookie } from "../../global/utils/cookie";

type MenuItem = {
  nome: string;
  link: string;
  icone: EnumType<typeof IconType>;
  color: EnumType<typeof Color>;
  is_handle: boolean;
};

export interface MenuProps {
  items?: MenuItem[];
  children?: ReactNode;
}

export function useResponsiveIconSize() {
  const [size, setSize] = useState<EnumType<typeof Size>>(Size.S);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width >= 768) setSize(Size.S);
      else setSize(Size.L);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export function PageTitle() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  const formatLabel = (part: string, isFirst: boolean) =>
    isFirst ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part.toLowerCase();

  const buildHref = (index: number) => `/${pathParts.slice(0, index + 1).join("/")}`;

  return (
    <Styled.PageTitle>
      {pathParts.map((part, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>/</span>}
          <a href={buildHref(index)}>{formatLabel(part, index === 0)}</a>
        </React.Fragment>
      ))}
    </Styled.PageTitle>
  );
}

export function getActiveColor(isActive: boolean | undefined, color: string) {
  return isActive && color === Color.TxtPrimary ? Color.Primary : color;
}

export function Menu(props: MenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const sizeIcons = useResponsiveIconSize();
  const menuRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(() => {
    const saved = getLocalStorage<boolean>(LocalStorage.isMenuOpen);
    return saved !== null ? saved : false;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const permissoes = getLocalStorage<string[]>(LocalStorage.permissions) ?? [];
    return permissoes.includes(Permission.ADMIN);
  });

  useEffect(() => {
    const atualizarPermissoes = async () => {
      // await dadosUsuarioPorToken();
      const permissoesAtualizadas = getLocalStorage<string[]>(LocalStorage.permissions) ?? [];
      setIsAdmin(permissoesAtualizadas.includes(Permission.ADMIN));
    };

    atualizarPermissoes();
  }, []);

  const toggleIsOpen = () => {
    setIsOpen(prev => {
      const next = !prev;
      setLocalStorage(LocalStorage.isMenuOpen, next);
      return next;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile || !isOpen) return;
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setLocalStorage(LocalStorage.isMenuOpen, false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const menuItems: MenuItem[] = useMemo(() => {
    const comuns: MenuItem[] = [
      {
        nome: "Home",
        link: "/home",
        icone: IconType.Grid,
        color: Color.TxtPrimary,
        is_handle: true,
      },
      {
        nome: "Planos",
        link: "/planos",
        icone: IconType.ShoppingCart,
        color: Color.TxtPrimary,
        is_handle: true,
      },
      {
        nome: "Ranking",
        link: "/ranking",
        icone: IconType.Trophy,
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
        nome: "Conquistas",
        link: "/conquistas",
        icone: IconType.Checklist,
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
    ];

    const admin: MenuItem = {
      nome: "Admin",
      link: "/admin",
      icone: IconType.ShieldAdmin,
      color: Color.Admin,
      is_handle: true,
    };

    return isAdmin ? [admin, ...comuns] : comuns;
  }, [isAdmin]);

  return (
    <>
      <Styled.MenuContainer>
        <Styled.MenuMobileButton id={isOpen ? "iMenuOpen" : "iMenuClose"} onClick={toggleIsOpen}>
          <Styled.MenuMobileButtonIcon isOpen={isOpen}>
            <Icon iconType={IconType.ArrowRight} color={Color.TxtPrimary} size={Size.L} padding="10px" />
          </Styled.MenuMobileButtonIcon>
        </Styled.MenuMobileButton>

        <Styled.MenuList isOpen={isOpen} ref={menuRef}>
          <Styled.MenuItem key={'closeOpen'} color={Color.TxtPrimary} onClick={toggleIsOpen} isOpenMenu={isOpen}>
            <Styled.MenuLink>
              <Styled.IconWrapper>
                <Icon iconType={IconType.ArrowRight} color={Color.TxtPrimary} size={sizeIcons} animationType={AnimationType.Float} startAnimation={StartAnimation.Hover} padding="5px" />
              </Styled.IconWrapper>
            </Styled.MenuLink>
          </Styled.MenuItem>

          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.link);

            const handleClick = () => {
              if (item.nome === "Sair") {
                deleteCookie(Cookie.access_token);
              }
              navigate(item.link);
            };

            return (
              <Styled.MenuItem key={index} color={item.color} isActive={isActive} isOpenMenu={isOpen} onClick={handleClick}>
                <Styled.MenuLink>
                  <Styled.IconWrapper>
                    <Icon iconType={item.icone} color={getActiveColor(isActive, item.color)} size={Size.S} animationType={AnimationType.Float} startAnimation={StartAnimation.Hover} padding="5px" />
                  </Styled.IconWrapper>
                  <span>{item.nome}</span>
                </Styled.MenuLink>
              </Styled.MenuItem>
            );
          })}
        </Styled.MenuList>
      </Styled.MenuContainer>

      <Styled.PageContent isOpen={isOpen}>
        <Styled.ContentWrapper>
          <PageTitle />
          <Styled.PageContentWithOutTitle>
            {props.children}
          </Styled.PageContentWithOutTitle>
        </Styled.ContentWrapper>
        <FooterContentMenu>
          <>© {new Date().getFullYear()} SalaAis, All Rights Reserved.</>
        </FooterContentMenu>
      </Styled.PageContent>
    </>
  );
}
