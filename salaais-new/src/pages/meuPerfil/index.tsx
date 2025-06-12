import { Icon, Menu } from "../../components";
import { AnimationType, Color, IconType, StartAnimation } from "../../global";

export function MeuPerfil() {

  return (
    <>
      <Menu isOpen={true} onClick={() => { }} />
      {/* <Icon iconType={IconType.ArrowLeft} color={Color.TxtPrimary} animationType={AnimationType.Float} startAnimation={StartAnimation.Hover} /> */}
      <a>Meu Perfil, Configuraçoes, editar perfil, Planos</a>
    </>
  )
}
