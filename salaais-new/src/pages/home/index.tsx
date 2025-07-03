import { IconsList, Menu, NotificationButton, UserProfileCard } from "../../components";

export function HomePage() {

  return (
    <>
      <Menu>
        <a href="/home" >Estamos ainda trabalhando nisso</a>
        <br />
        <br />
        
        <NotificationButton/>
        <UserProfileCard/>
        <IconsList />

      </Menu >
    </>
  )
}
