import { useState } from "react"
import { AnimationType, Color, IconType, Size, StartAnimation, ThemeType } from "../../../global"
import { Icon } from "../../icon"
import { Text } from "../../text"
import * as Styled from "./style"
import { Button } from "../../buttons/button"


type UserCard = {
  id: number
  username: string
  nome: string
  eu_sigo: boolean
  url_imagem_perfil: string
}

type FullUserCard = UserCard & {
  bio: string
  seguidores: number
  seguindo: number
  desativado: boolean
  deletado: boolean
  data_criacao: string
  link_instagram: string
  link_facebook: string
}

const defaultCards: UserCard[] = [
  {
    id: 1,
    username: 'Flp_test_1',
    nome: 'Felipe Teste',
    eu_sigo: false,
    url_imagem_perfil: 'https://media.licdn.com/dms/image/v2/D4D03AQEm8_QH-QGX_g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728942800315?e=1755734400&v=beta&t=q1GdPrnnRTvbz7z5wrmPTuAoeQ09UNDq6ob_8MQFVBY',
  },
  {
    id: 2,
    username: 'Flp_test_2',
    nome: 'Felipe Teste',
    eu_sigo: true,
    url_imagem_perfil: '',
  },
  {
    id: 3,
    username: 'Flp_test_3',
    nome: 'Felipe Teste',
    eu_sigo: false,
    url_imagem_perfil: 'https://media.licdn.com/dms/image/v2/D4D03AQEm8_QH-QGX_g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728942800315?e=1755734400&v=beta&t=q1GdPrnnRTvbz7z5wrmPTuAoeQ09UNDq6ob_8MQFVBY',
  }
]

const fetchFullUserData = async (username: string): Promise<FullUserCard> => {
  // Simula API real
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Simulação: obter o ID pelo username (no real viria da API)
  const id = username === "Flp_test_1" ? 1 : username === "Flp_test_2" ? 2 : 3

  return {
    id,
    username,
    nome: 'Felipe Teste',
    eu_sigo: false,
    url_imagem_perfil: '',
    bio: 'Bio simulada',
    seguidores: 123,
    seguindo: 456,
    desativado: false,
    deletado: false,
    data_criacao: '2025-06-04T22:27:17.363Z',
    link_instagram: 'https://instagram.com',
    link_facebook: 'https://facebook.com',
  }
}

type UserCardProps = {
  cards?: UserCard[]
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

export function UsersCards({ cards = defaultCards }: UserCardProps) {
  const [followState, setFollowState] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(defaultCards.map(user => [user.id, user.eu_sigo]))
  )
  const [loadingFollow, setLoadingFollow] = useState<Record<number, boolean>>({})
  const [fullUserData, setFullUserData] = useState<Record<string, FullUserCard>>({})
  const [loadingData, setLoadingData] = useState<Record<string, boolean>>({})
  const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set())

  const toggleExpand = async (index: number) => {
    const newSet = new Set(expandedSet)
    if (newSet.has(index)) {
      newSet.delete(index)
    } else {
      newSet.add(index)
    }
    setExpandedSet(newSet)

    const username = cards[index].username
    if (!fullUserData[username]) {
      setLoadingData(prev => ({ ...prev, [username]: true }))
      const data = await fetchFullUserData(username)
      setFullUserData(prev => ({ ...prev, [username]: data }))
      setLoadingData(prev => ({ ...prev, [username]: false }))
    }
  }

  //Função para pegar as iniciais do Nome e usar no lugar da imagem
  function getInitials(nome: string): string {
    const partes = nome.trim().split(" ");
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (partes[0][0] + partes[1][0]).toUpperCase();
  }

  const startToFollow = async (id: number) => {
    setLoadingFollow(prev => ({ ...prev, [id]: true }))
    await new Promise(resolve => setTimeout(resolve, 800))
    setFollowState(prev => ({ ...prev, [id]: true }))
    setLoadingFollow(prev => ({ ...prev, [id]: false }))
  }

  const stopToFollow = async (id: number) => {
    setLoadingFollow(prev => ({ ...prev, [id]: true }))
    await new Promise(resolve => setTimeout(resolve, 800))
    setFollowState(prev => ({ ...prev, [id]: false }))
    setLoadingFollow(prev => ({ ...prev, [id]: false }))
  }


  return (
    <Styled.ContentCards>
      {cards.map((card, index) => {
        const isExpanded = expandedSet.has(index)

        return (
          <Styled.ContentCard key={index}>
            <Styled.FirstContent expanded={isExpanded}>
              <Styled.ImageAndText>
                {card.url_imagem_perfil ? (
                  <Styled.ImgPerfil src={card.url_imagem_perfil} alt={card.nome} />
                ) : (
                  <Styled.InitialsPlaceholder>
                    {getInitials(card.nome)}
                  </Styled.InitialsPlaceholder>
                )}
                <Styled.FlexColumn>
                  <Text text={card.username} bold />
                  <Text size={Size.M} text={card.nome} />
                </Styled.FlexColumn>
              </Styled.ImageAndText>
              {/* botao de seguir e seguindo */}
              {followState[card.id] ? (
                <Button
                  text={loadingFollow[card.id] ? "..." : "Seguindo"}
                  type={ThemeType.Outlined}
                  color={Color.TxtTertiary}
                  colorLoading={Color.TxtSecondary}
                  onClick={() => stopToFollow(card.id)}
                />
              ) : (
                <Button
                  text={loadingFollow[card.id] ? "..." : "Seguir"}
                  type={ThemeType.Outlined}
                  color={Color.FollowButtonColor}
                  background={Color.FollowButtonColor}
                  textColor={Color.BgPrimary}
                  colorLoading={Color.BgPrimary}
                  onClick={() => startToFollow(card.id)}
                />
              )}
            </Styled.FirstContent>

            <Styled.SecondContent expanded={isExpanded}>
              {loadingData[card.username] ? (
                <Text text="Carregando..." size={Size.M} />
              ) : fullUserData[card.username] ? (
                <>
                  <Styled.ContentFollwers>
                    <div>
                      <Text text={`${fullUserData[card.username].seguidores}`} bold />
                      <Text text="Seguidores" size={Size.S} />
                    </div>
                    <div>
                      <Text text={`${fullUserData[card.username].seguindo}`} bold />
                      <Text text="Seguindo" size={Size.S} />
                    </div>
                  </Styled.ContentFollwers>

                  <Text text={fullUserData[card.username].bio} size={Size.M} />

                  <Styled.IconAndtext>
                    <Text
                      text={`Entrou em: ${formatDataCriacao(fullUserData[card.username].data_criacao)}`}
                      size={Size.S}
                    />
                    <Styled.Flex>
                      <Icon
                        iconType={IconType.Facebook}
                        size={Size.S}
                        color={Color.BgPrimary}
                        animationType={AnimationType.Float}
                        startAnimation={StartAnimation.Hover}
                        background={Color.TxtPrimary}
                        onClick={() => window.open(fullUserData[card.username].link_facebook, "_blank")}
                        padding="5px"
                      />
                      <Icon
                        iconType={IconType.Instagram}
                        size={Size.S}
                        color={Color.BgPrimary}
                        animationType={AnimationType.Float}
                        startAnimation={StartAnimation.Hover}
                        background={Color.TxtPrimary}
                        onClick={() => window.open(fullUserData[card.username].link_instagram, "_blank")}
                        padding="5px"
                      />
                    </Styled.Flex>
                  </Styled.IconAndtext>
                </>
              ) : null}
            </Styled.SecondContent>

            <Icon
              iconType={IconType.ArrowDown}
              size={Size.M}
              padding="0px"
              width="100%"
              onClick={() => toggleExpand(index)}
            />
          </Styled.ContentCard>
        )
      })}
    </Styled.ContentCards>
  )
}