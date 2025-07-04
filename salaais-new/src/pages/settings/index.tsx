import { CardSettings, Menu, UserProfileCard } from "../../components";
import * as Styled from './style'

export function SettingsPage() {

  return (
    <>
      <Menu>
        <a href="/test" >Estamos ainda trabalhando nisso</a>
        <br />
        <br />
        <Styled.Content>
          <UserProfileCard />
          <CardSettings />
        </Styled.Content>
      </Menu >
    </>
  )
}
