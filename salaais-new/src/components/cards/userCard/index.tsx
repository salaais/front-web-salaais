import React from "react"
import { Icon } from "../../icon"
import { Text } from "../../text"
import { Button } from "../../buttons/button"
import * as Styled from "./style"
import type { FullUserCardResponse, UserCardResponse } from "../../../services/apis/salaais/models"
import { AlertDelete } from "../../alerts/alertDelete"
import { adminLoginComUsuario, deleteUser } from "../../../services/apis/salaais"
import { PermissionCardList } from "../permissionCard"
import { Color, getLocalStorage, LocalStorage, Permission, Size, ThemeType } from "../../../global"
import { AnimationType, IconType, StartAnimation } from "../../icon/models"
import { ItemName } from "../../alerts/alertCreate"

export type UserCardProps = {
  user: UserCardResponse
  isExpanded: boolean
  onToggleExpand: (id: number) => void
  fullUserData?: FullUserCardResponse
  loadingData?: boolean
  followState: boolean
  loadingFollow: boolean
  onFollow: () => void
  onUnfollow: () => void
}

function formatDataCriacao(data: string): string {
  const createdDate = new Date(data);
  const now = new Date();

  const diffMs = now.getTime() - createdDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays === 0 ? "Hoje" : `${diffDays} dia${diffDays > 1 ? "s" : ""} atrás`}`;
  }

  return new Intl.DateTimeFormat("pt-BR").format(createdDate);
}

function getInitials(nome: string): string {
  const partes = nome.trim().split(" ");
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
}

export const UserCard = React.memo(function UserCard(props: UserCardProps) {
  const {
    user,
    isExpanded,
    onToggleExpand,
    fullUserData,
    loadingData,
    followState,
    loadingFollow,
    onFollow,
    onUnfollow
  } = props
  const isAdmin = (getLocalStorage<string[]>(LocalStorage.permissions) ?? []).includes(Permission.ADMIN);

  return (
    <Styled.ContentCard>
      <Styled.FirstContent expanded={isExpanded}>
        <Styled.ImageAndText>
          {user.url_imagem_perfil ? (
            <Styled.ImgPerfil src={user.url_imagem_perfil} alt={user.nome} />
          ) : (
            <Styled.InitialsPlaceholder>
              {getInitials(user.nome)}
            </Styled.InitialsPlaceholder>
          )}
          <Styled.FlexColumn>
            <Text text={user.username} bold />
            <Text size={Size.M} text={user.nome} />
          </Styled.FlexColumn>
        </Styled.ImageAndText>
        <Styled.ButtonsRight>

          {followState ? (
            <Button
              text={loadingFollow ? "..." : "Seguindo"}
              type={ThemeType.Outlined}
              color={Color.TxtTertiary}
              colorLoading={Color.TxtSecondary}
              onClick={onUnfollow}
            />
          ) : (
            <Button
              text={loadingFollow ? "..." : "Seguir"}
              type={ThemeType.Outlined}
              color={Color.FollowButtonColor}
              background={Color.FollowButtonColor}
              textColor={Color.BgPrimary}
              colorLoading={Color.BgSecondary}
              onClick={onFollow}
            />
          )}
          {isAdmin && <Icon
            iconType={IconType.Trash}
            size={Size.Xs}
            color={Color.BgSecondary}
            background={Color.Red}
            onClick={() => AlertDelete(user.id_usuario, ItemName.User, deleteUser)}
            padding="5px"
          />}
        </Styled.ButtonsRight>
      </Styled.FirstContent>

      <Styled.SecondContent isExpanded={isExpanded && !loadingData}>
        {isExpanded && (!fullUserData || !fullUserData.bio) && (
          <Icon
            iconType={IconType.Loading}
            size={Size.S}
            animationType={AnimationType.Rotate}
            startAnimation={StartAnimation.Infinite}
          />
        )}

        {isExpanded && fullUserData?.bio && (
          <>
            <Styled.ContentFollwers>
              <div>
                <Text text={`${fullUserData.seguidores}`} bold />
                <Text text="Seguidores" size={Size.S} />
              </div>
              <div>
                <Text text={`${fullUserData.seguindo}`} bold />
                <Text text="Seguindo" size={Size.S} />
              </div>
            </Styled.ContentFollwers>

            <Text text={fullUserData.bio} size={Size.M} />

              <Text
                text={`Entrou em: ${formatDataCriacao(fullUserData.data_criacao)}`}
                size={Size.S}
              />

              <PermissionCardList id_usuario={user.id_usuario} list={fullUserData.permissoes} />

              {fullUserData.link_facebook || fullUserData.link_instagram &&
                <Styled.SocialMedia>
                  {fullUserData.link_facebook &&
                    <Icon
                      iconType={IconType.Facebook}
                      size={Size.S}
                      color={Color.FacebookColor}
                      animationType={AnimationType.Float}
                      startAnimation={StartAnimation.Hover}
                      background={Color.BgPrimary}
                      onClick={() => {
                        if (fullUserData.link_facebook) {
                          window.open(fullUserData.link_facebook!, "_blank")
                        }
                      }}
                      padding="5px"
                    />
                  }
                  {fullUserData.link_instagram &&
                    <Icon
                      iconType={IconType.Instagram}
                      size={Size.S}
                      color={Color.InstagramColor}
                      animationType={AnimationType.Float}
                      startAnimation={StartAnimation.Hover}
                      background={Color.BgPrimary}
                      onClick={() => {
                        if (fullUserData.link_instagram) {
                          window.open(fullUserData.link_instagram, "_blank")
                        }
                      }}
                      padding="5px"
                    />
                  }
                </Styled.SocialMedia>
              }
              {isAdmin &&
                <Styled.FlexColumnIcons>
                  <Icon
                    iconType={IconType.Login}
                    size={Size.Xs}
                    color={Color.BgSecondary}
                    background={Color.Admin}
                    onClick={() => adminLoginComUsuario(user.id_usuario)}
                    padding="5px"
                  />
                  <Text text="Login" size={Size.S} />
                </Styled.FlexColumnIcons>
              }
          </>
        )}
      </Styled.SecondContent>
      <Icon
        iconType={IconType.ArrowDown}
        size={Size.M}
        padding="0px"
        width="100%"
        onClick={() => onToggleExpand(user.id_usuario)}
      />
    </Styled.ContentCard>
  )
});