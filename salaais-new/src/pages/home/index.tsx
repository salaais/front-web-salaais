import { DashboardProfile, IconsList, Menu, NotificationButton } from "../../components";
// import * as Styled from './style'

export function HomePage() {

  return (
    <>
      <Menu>
        <a href="/home" >Estamos ainda trabalhando nisso</a>
        <br />
        <br />

        <NotificationButton />
        <DashboardProfile />
        <IconsList />

      </Menu >
    </>
  )
}
