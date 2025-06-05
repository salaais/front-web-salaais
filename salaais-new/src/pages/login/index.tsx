import { useState } from "react"
import { Login, Register } from "../../components"
import * as Styled from './style'

export function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSwitchForm = () => {
    setIsRegistering((prev) => !prev)
  }

  return (
    <Styled.Content>
      <Styled.Inner>
        {isRegistering ? (
          <Register onSwitchForm={handleSwitchForm} />
        ) : (
          <Login onSwitchForm={handleSwitchForm} />
        )}
      </Styled.Inner>
    </Styled.Content>
  )
}
