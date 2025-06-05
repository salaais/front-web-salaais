import { useState } from "react"
import { Logo } from "../../assets"
import { Size, ThemeType } from "../../global"
import { Align, Button, ButtonApple, ButtonGoogle, Hr, Input, ToastInfo } from "../index"
import { InputType } from "../inputs/input/interfaces"
import { JustifyType } from "../align/interfaces"
import * as Styled from "./style"
import type { RegisterRequest } from "../../services/apis/salaais/models"
import { registerAction } from "../../services"

// Import React Toastify

export const showTermsInfo = () => {
  ToastInfo(
    <>
      <div>
        <p><strong>📜 Termos de Uso</strong></p>
        <p><small>Última atualização: 3 de junho de 2025</small></p>
      </div>

      <p>Bem-vindo ao SalaAis!</p>
      <div>
        <p>
          Estes Termos de Uso regulam o acesso e uso da plataforma SalaAis, que fornece funcionalidades para provas, tarefas e conteúdos educacionais em aviação.
        </p>
      </div>

      <div>
        <p><strong>1. Aceitação dos Termos</strong></p>
        <p>Ao utilizar nossos serviços, você aceita estes termos integralmente.</p>
      </div>

      <div>
        <p><strong>2. Cadastro e Conta</strong></p>
        <p>Você é responsável por informações verdadeiras e pela segurança da sua conta.</p>
      </div>

      <div>
        <p><strong>3. Uso da Plataforma</strong></p>
        <p>- Uso apenas legal e educacional.</p>
        <p>- Não tentar burlar segurança.</p>
        <p>- Não reproduzir conteúdo sem autorização.</p>
      </div>

      <div>
        <p><strong>4. Compras e Permissões</strong></p>
        <p>Acesso a provas e tarefas pode depender de pagamentos realizados.</p>
      </div>

      <div>
        <p><strong>5. Suspensão e Cancelamento</strong></p>
        <p>Podemos suspender contas que violem os termos.</p>
      </div>

      <div>
        <p><strong>6. Isenção de Responsabilidade</strong></p>
        <p>Não nos responsabilizamos por resultados, problemas técnicos ou uso indevido.</p>
      </div>

      <div>
        <p><strong>7. Alterações nos Termos</strong></p>
        <p>Atualizações podem ocorrer, uso contínuo significa aceitação.</p>
      </div>

      <div>
        <p>Dúvidas? Contate nosso suporte.</p>
      </div>
    </>
  );
};

export const showPolitics = () => {
  ToastInfo(
    <>
      <div>
        <p><strong>🔐 Política de Privacidade</strong></p>
        <p><small>Última atualização: 3 de junho de 2025</small></p>
      </div>

      <div>
        <p>Sua privacidade é prioridade. Esta política explica como coletamos e usamos seus dados.</p>
      </div>

      <div>
        <p><strong>1. Dados Coletados</strong></p>
        <p>- Informações pessoais: nome, e-mail, senha, etc.</p>
        <p>- Dados de navegação e pagamento.</p>
      </div>

      <div>
        <p><strong>2. Uso dos Dados</strong></p>
        <p>- Gerenciar conta e compras.</p>
        <p>- Personalizar sua experiência.</p>
        <p>- Melhorar o serviço.</p>
      </div>

      <div>
        <p><strong>3. Compartilhamento</strong></p>
        <p>Não vendemos seus dados; compartilhamos apenas com parceiros necessários e autoridades legais.</p>
      </div>

      <div>
        <p><strong>4. Segurança</strong></p>
        <p>Protegemos seus dados com medidas técnicas e organizacionais.</p>
      </div>

      <div>
        <p><strong>5. Direitos do Usuário</strong></p>
        <p>Você pode acessar, corrigir ou pedir exclusão dos seus dados.</p>
      </div>

      <div>
        <p><strong>6. Cookies</strong></p>
        <p>Utilizamos cookies para melhorar sua experiência.</p>
      </div>

      <div>
        <p><strong>7. Alterações</strong></p>
        <p>Atualizações são possíveis; uso contínuo indica aceitação.</p>
      </div>

      <div>
        <p>Dúvidas? Contate nosso suporte.</p>
      </div>
    </>
  );
};

interface RegisterProps {
  onSwitchForm: () => void
}

export function Register({ onSwitchForm }: RegisterProps) {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    nome: "",
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
    <>
      <Styled.BackgroundCard>
        <Styled.ImgContent>
          <Styled.Img src={Logo} />
        </Styled.ImgContent>

        <Input
          text="Username"
          type={InputType.Text}
          name="username"
          size={Size.Full}
          value={formData.username}
          onChange={handleInputChange}
        />

        <Input
          text="Nome"
          type={InputType.Text}
          name="nome"
          size={Size.Full}
          value={formData.nome}
          onChange={handleInputChange}
        />

        <Input
          text="Email"
          type={InputType.Text}
          name="email"
          size={Size.Full}
          value={formData.email}
          onChange={handleInputChange}
        />

        <Input
          text="Password"
          type={InputType.Password}
          name="password"
          size={Size.Full}
          value={formData.password}
          onChange={handleInputChange}
        />

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


        <Align justify={JustifyType.Center} column>
          <Styled.Text>Já tem uma conta?</Styled.Text>
          <Styled.TextBold onClick={onSwitchForm} style={{ cursor: "pointer" }}>
            Login
          </Styled.TextBold>
        </Align>


        <Align gap="10px" alignCenter column>
          <Button
            text="Cadasdro"
            type={ThemeType.Primary}
            onClick={() => registerAction(formData, onSwitchForm  )}
          />

          <Hr bg="var(--bg-tartiary)" height="3px" width="100%" margin="10px 0" />

          <Align gap="10px" justify={JustifyType.Center}>
            <ButtonGoogle text="Cadasdro Google" />
            <ButtonApple text="Cadasdro Apple" />
          </Align>
        </Align>

        {/* ToastContainer deve estar presente para renderizar os toasts */}
      </Styled.BackgroundCard>
    </>
  )
}
