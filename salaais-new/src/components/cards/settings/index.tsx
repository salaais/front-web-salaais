import { useState } from "react";
import { InputCheckBox } from "../../inputs/checkBox";
import * as Styled from "./style";

export function CardSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificacaoApp, setNotificacaoApp] = useState(false);
  const [notificacaoEmail, setNotificacaoEmail] = useState(false);

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
