import { useEffect, useState } from 'react'
import { Menu, Button, Switch, TextIcon, Text } from '../../components'
import { BackgroundCard } from '../../components/login/style'
import {
  setCookie,
  getLocalStorage,
  LocalStorage,
  setLocalStorage,
  Cookie,
} from '../../global'
import { ThemeType } from '../../global'
import * as Styled from './style'

export function SettingsPage() {
  const [notificacaoSite, setNotificacaoSite] = useState(false)
  const [notificacaoEmail, setNotificacaoEmail] = useState(false)
  const [darkMode, setDarkMode] = useState<boolean>(
    () => getLocalStorage<boolean>(LocalStorage.isDarkMode) ?? false,
  )
  const [geolocalizacao, setGeolocalizacao] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) {
      // Salva como token-user-mobile para compatibilidade com app mobile
      setCookie('token-user-mobile', token, '7d')
      // Também salva como access_token para que outras funcionalidades funcionem
      setCookie(Cookie.access_token, token, '7d')
    }
  }, [])

  useEffect(() => {
    setLocalStorage<boolean>(LocalStorage.isDarkMode, darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      <Menu>
        <Text text="Configurações" title />
        <Styled.ContentLogged>
          <BackgroundCard>
            <Styled.ButtonLink to="/home/planos">
              <Button text="Ver todos os planos" type={ThemeType.Primary} />
            </Styled.ButtonLink>
            <Switch
              enabled={['Notificações site']}
              value={notificacaoSite}
              onChange={setNotificacaoSite}
            />
            <Switch
              enabled={['Notificações email']}
              value={notificacaoEmail}
              onChange={setNotificacaoEmail}
            />
            <Switch
              enabled={['White mode', 'Dark mode']}
              value={darkMode}
              onChange={setDarkMode}
            />
            <Switch
              enabled={['Usar Geolocalização']}
              value={geolocalizacao}
              onChange={setGeolocalizacao}
            />
            <TextIcon text="Deletar conta" type="delete" align="center" />
            <Styled.Gap>
              <Button text="Cancelar" type={ThemeType.Secondary} />
              <Button text="Salvar" type={ThemeType.Primary} />
            </Styled.Gap>
          </BackgroundCard>
        </Styled.ContentLogged>
      </Menu>
    </>
  )
}
