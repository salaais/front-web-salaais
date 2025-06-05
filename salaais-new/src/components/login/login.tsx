import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Logo } from "../../assets"
import { Size, ThemeType } from "../../global"
import { Align, Button, ButtonApple, ButtonGoogle, Hr, Input } from "../index"
import { InputType } from "../inputs/input/interfaces"
import { loginAction } from "../../services"
import * as Styled from "./style"
import { JustifyType } from "../align/interfaces"
import { showPolitics, showTermsInfo } from "./register"

interface LoginProps {
  onSwitchForm: () => void
}

export function Login({ onSwitchForm }: LoginProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Styled.BackgroundCard>
      <Styled.ImgContent>
        <Styled.Img src={Logo} />
      </Styled.ImgContent>

      <Input
        text={"Email"}
        type={InputType.Text}
        name={"email"}
        size={Size.Full}
        value={formData.email}
        onChange={handleInputChange}
      />
      <Input
        text={"Senha"}
        type={InputType.Password}
        name={"password"}
        size={Size.Full}
        value={formData.password}
        onChange={handleInputChange}
      />

      <Align justify={JustifyType.Center} column>
        <Styled.Text>Ainda não tem uma conta?</Styled.Text>
        <Styled.TextBold onClick={onSwitchForm} style={{ cursor: "pointer" }}>
          Cadastre-se
        </Styled.TextBold>
      </Align>

      <Align gap="10px" alignCenter column>
        <Button
          text="Login"
          type={ThemeType.Primary}
          onClick={() => loginAction(formData.email, formData.password, navigate)}
        />

        <Hr bg="var(--bg-tartiary)" height="3px" width="100%" margin="10px 0" />

        <Align gap="10px" justify={JustifyType.Center}>
          <ButtonGoogle text="Login Google" />
          <ButtonApple text="Login Apple" />
        </Align>
      </Align>
      <div>
        <p>
          Ao se registrar, você aceita nossos{" "}
          <Styled.A as="span" onClick={showTermsInfo} style={{ cursor: "pointer" }}>
            termos de uso
          </Styled.A>{" "}
          e a nossa{" "}
          <Styled.A as="span" onClick={showPolitics} style={{ cursor: "pointer" }}>
            política de privacidade
          </Styled.A>
          .
        </p>
      </div>

    </Styled.BackgroundCard>
  )
}
