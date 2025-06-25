import { Icon, Menu } from "../../components";
import { IconType } from "../../components/icon/models";

export function HomePage() {

  return (
    <>
      <Menu>
        <a href="/home" >Estamos ainda trabalhando nisso</a>
        <br />
        <br />

        <Icon iconType={IconType.Edit} />
        <Icon iconType={IconType.Facebook} />
        <Icon iconType={IconType.Instagram} />
        <Icon iconType={IconType.Fire} />
        <Icon iconType={IconType.BookA} />
        <Icon iconType={IconType.Tests} />
        <Icon iconType={IconType.Test} />
        <Icon iconType={IconType.Formation} />
        <Icon iconType={IconType.Payment} />
        <Icon iconType={IconType.BookA} />

      </Menu >
    </>
  )
}
