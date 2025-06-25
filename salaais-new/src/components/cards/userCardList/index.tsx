import { useEffect, useState } from "react"
import * as Styled from "./style"
import type { FullUserCardResponse, UserCardResponse } from "../../../services/apis/salaais/models"
import { UserCard } from "../userCard"
import { getUserInfo, startToFollow, stopToFollow } from "../../../services/apis/salaais"
import { toast } from "react-toastify"

const defaultCards: UserCardResponse[] = [/* ... */] // mesmo array do exemplo anterior
export type UserCardListProps = {
  list?: UserCardResponse[]
}

export function UserCardList({ list = defaultCards }: UserCardListProps) {
  const [followState, setFollowState] = useState<Record<number, boolean>>({})
  const [loadingFollow, setLoadingFollow] = useState<Record<number, boolean>>({})
  const [fullUserData, setFullUserData] = useState<Record<string, FullUserCardResponse>>({})
  const [loadingData, setLoadingData] = useState<Record<string, boolean>>({})
  const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set())

  useEffect(() => {
    setFollowState(Object.fromEntries(list.map(user => [user.id_usuario, user.eu_sigo])))
  }, [list])

  const toggleExpand = async (id_usuario: number) => {
    const user = list.find(u => u.id_usuario === id_usuario);
    if (!user) return;

    // Abre/fecha instantaneamente
    setExpandedSet(prevSet => {
      const newSet = new Set(prevSet);
      if (newSet.has(id_usuario)) {
        newSet.delete(id_usuario);
      } else {
        newSet.add(id_usuario);
      }
      return newSet;
    });

    // Se já tem dados ou está carregando, não busca de novo
    if (fullUserData[user.username] || loadingData[user.username]) return;

    // Ativa loading ANTES de iniciar o fetch
    setLoadingData(prev => ({ ...prev, [user.username]: true }));

    try {
      const data = await getUserInfo(user.id_usuario);
      if (!data || !data.data_criacao) throw new Error("Dados incompletos");

      setFullUserData(prev => ({ ...prev, [user.username]: data }));
      console.log("Dados recebidos para", user.username, data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Não foi possível carregar dados do usuário");
    } finally {
      setLoadingData(prev => ({ ...prev, [user.username]: false }));
    }
  };


  const toggleStartToFollow = async (id_usuario: number) => {
    setLoadingFollow(prev => ({ ...prev, [id_usuario]: true }))
    await startToFollow(id_usuario)
    setFollowState(prev => ({ ...prev, [id_usuario]: true }))
    setLoadingFollow(prev => ({ ...prev, [id_usuario]: false }))
  }

  const toggleStopToFollow = async (id_usuario: number) => {
    setLoadingFollow(prev => ({ ...prev, [id_usuario]: true }))
    await stopToFollow(id_usuario)
    setFollowState(prev => ({ ...prev, [id_usuario]: false }))
    setLoadingFollow(prev => ({ ...prev, [id_usuario]: false }))
  }

  return (
    <Styled.ContentCards>
      {list.map(user => (
        <UserCard
          key={user.id_usuario}
          user={user}
          isExpanded={expandedSet.has(user.id_usuario)}
          onToggleExpand={toggleExpand}
          fullUserData={fullUserData[user.username]}
          loadingData={loadingData[user.username]}
          followState={followState[user.id_usuario]}
          loadingFollow={loadingFollow[user.id_usuario]}
          onFollow={() => toggleStartToFollow(user.id_usuario)}
          onUnfollow={() => toggleStopToFollow(user.id_usuario)}
        />
      ))}
    </Styled.ContentCards>
  )
}
