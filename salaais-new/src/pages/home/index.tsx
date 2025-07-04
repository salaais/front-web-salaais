import { CardProgressList, IconsList, Menu, NotificationButton } from "../../components";
import * as Styled from './style'

export function HomePage() {

  return (
    <>
      <Menu>
        <a href="/home" >Estamos ainda trabalhando nisso</a>
        <br />
        <br />

        <NotificationButton />
        <Styled.Cards>
          <CardProgressList />
        </Styled.Cards>
        <IconsList />

      </Menu >
    </>
  )
}
