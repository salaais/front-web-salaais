import React from "react"
import { Icon } from "../../icon"
import { Text } from "../../text"
import { Button } from "../../buttons/button"
import * as Styled from "./style"
import type { FullUserCardResponse, UserCardResponse } from "../../../services/apis/salaais/models"
import { AlertDelete, ItemName } from "../../alerts/alertDelete"
import { adminLoginComUsuario } from "../../../services/apis/salaais"
import { PermissionCardList } from "../permissionCard"
import { Color, getLocalStorage, LocalStorage, Permission, Size, ThemeType } from "../../../global"
import { AnimationType, IconType, StartAnimation } from "../../icon/models"

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
    // loadingData,
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
            onClick={() => AlertDelete(user.id_usuario, ItemName.User)}
            padding="5px"
          />}
        </Styled.ButtonsRight>
      </Styled.FirstContent>

      <Styled.SecondContent>
        {isExpanded && (!fullUserData || !fullUserData.bio) && (
          <Text text="Carregando..." size={Size.M} />
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

            <Styled.IconAndtext>
              <Text
                text={`Entrou em: ${formatDataCriacao(fullUserData.data_criacao)}`}
                size={Size.S}
              />

              <PermissionCardList />

              <Styled.Flex>
                <Styled.FlexColumnIcons>
                  <Icon
                    iconType={IconType.Facebook}
                    size={Size.S}
                    color={Color.BgPrimary}
                    animationType={AnimationType.Float}
                    startAnimation={StartAnimation.Hover}
                    background={Color.TxtPrimary}
                    onClick={() => window.open(fullUserData.link_facebook!, "_blank")}
                    padding="5px"
                  />
                  {!fullUserData.link_facebook && <Text text="Indisponível" size={Size.S} />}
                </Styled.FlexColumnIcons>
                <Styled.FlexColumnIcons>
                  <Icon
                    iconType={IconType.Instagram}
                    size={Size.S}
                    color={Color.BgPrimary}
                    animationType={AnimationType.Float}
                    startAnimation={StartAnimation.Hover}
                    background={Color.TxtPrimary}
                    onClick={() => window.open(fullUserData.link_instagram!, "_blank")}
                    padding="5px"
                  />
                  {!fullUserData.link_facebook && <Text text="Indisponível" size={Size.S} />}
                </Styled.FlexColumnIcons>
              </Styled.Flex>
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

            </Styled.IconAndtext>
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