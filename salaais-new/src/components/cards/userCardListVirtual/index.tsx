import { useEffect, useState, useCallback, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import type {
  FullUserCardResponse,
  UserCardResponse,
} from "../../../services/apis/salaais/models";
import { UserCard } from "../userCard";
import {
  getUserInfo,
  startToFollow,
  stopToFollow,
} from "../../../services/apis/salaais";
import { toast } from "react-toastify";

export type UserCardListProps = {
  list?: UserCardResponse[];
  itemHeight?: number;
  height?: number;
};

export function UserCardListVirtual({
  list = [],
  itemHeight = 120,
  height = 600,
}: UserCardListProps) {
  const [followState, setFollowState] = useState<Record<number, boolean>>({});
  const [loadingFollow, setLoadingFollow] = useState<Record<number, boolean>>({});
  const [fullUserData, setFullUserData] = useState<Record<string, FullUserCardResponse>>({});
  const [loadingData, setLoadingData] = useState<Record<string, boolean>>({});
  const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    setFollowState(Object.fromEntries(list.map((u) => [u.id_usuario, u.eu_sigo])));
  }, [list]);

  const toggleExpand = useCallback(
    async (id_usuario: number) => {
      const user = list.find((u) => u.id_usuario === id_usuario);
      if (!user) return;

      setExpandedSet((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id_usuario)) newSet.delete(id_usuario);
        else newSet.add(id_usuario);
        return newSet;
      });

      if (fullUserData[user.username] || loadingData[user.username]) return;

      setLoadingData((prev) => ({ ...prev, [user.username]: true }));

      try {
        const data = await getUserInfo(user.id_usuario);
        if (!data || !data.data_criacao) throw new Error("Dados incompletos");
        setFullUserData((prev) => ({ ...prev, [user.username]: data }));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        toast.error(`Erro ao carregar dados do usuário: ${errorMessage}`);
      } finally {
        setLoadingData((prev) => ({ ...prev, [user.username]: false }));
      }
    },
    [list, fullUserData, loadingData]
  );

  const toggleFollow = useCallback(async (id_usuario: number, follow: boolean) => {
    setLoadingFollow((prev) => ({ ...prev, [id_usuario]: true }));
    try {
      if (follow) {
        await startToFollow(id_usuario)
      } else {
        await stopToFollow(id_usuario);
      }
      setFollowState((prev) => ({ ...prev, [id_usuario]: follow }));
    } finally {
      setLoadingFollow((prev) => ({ ...prev, [id_usuario]: false }));
    }
  }, []);

  const itemData = useMemo(
    () => ({
      list,
      expandedSet,
      fullUserData,
      loadingData,
      followState,
      loadingFollow,
      toggleExpand,
      toggleFollow,
    }),
    [list, expandedSet, fullUserData, loadingData, followState, loadingFollow, toggleExpand, toggleFollow]
  );

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const user = itemData.list[index];
    return (
      <div style={style} key={user.id_usuario}>
        <UserCard
          user={user}
          isExpanded={itemData.expandedSet.has(user.id_usuario)}
          onToggleExpand={itemData.toggleExpand}
          fullUserData={itemData.fullUserData[user.username]}
          loadingData={itemData.loadingData[user.username]}
          followState={itemData.followState[user.id_usuario]}
          loadingFollow={itemData.loadingFollow[user.id_usuario]}
          onFollow={() => itemData.toggleFollow(user.id_usuario, true)}
          onUnfollow={() => itemData.toggleFollow(user.id_usuario, false)}
        />
      </div>
    );
  };

  return (
    <List
      height={height}
      itemCount={list.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
}
