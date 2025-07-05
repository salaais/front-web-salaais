import { useEffect, useState } from "react";
import { InputCheckBox } from "../../inputs/checkBox";
import * as Styled from "./style";
import { getLocalStorage, LocalStorage, setLocalStorage } from "../../../global";

export function CardSettings() {
  const [darkMode, setDarkMode] = useState<boolean>(() =>
    getLocalStorage<boolean>(LocalStorage.isDarkMode) ?? false
  );

  const [notificacaoApp, setNotificacaoApp] = useState(false);
  const [notificacaoEmail, setNotificacaoEmail] = useState(false);

  useEffect(() => {
    setLocalStorage<boolean>(LocalStorage.isDarkMode, darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Styled.AllContent>
      <InputCheckBox
        text="DarkMode"
        value={darkMode}
        onChange={setDarkMode}
      />
      <InputCheckBox
        text="Receber notificações App"
        value={notificacaoApp}
        onChange={setNotificacaoApp}
      />
      <InputCheckBox
        text="Receber notificações Email"
        value={notificacaoEmail}
        onChange={setNotificacaoEmail}
      />
    </Styled.AllContent>
  );
}
