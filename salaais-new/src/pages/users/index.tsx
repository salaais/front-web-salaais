import { useEffect, useRef, useState } from "react";
import { Icon, Menu, SearchInput, Text, UserCardList } from "../../components";
import { getUsers } from "../../services/apis/salaais";
import type { UserCardResponse } from "../../services/apis/salaais/models";
import { AnimationType, IconType, StartAnimation } from "../../components/icon/models";
import { Size } from "../../global";

export function UsersPage() {
  const [userList, setUserList] = useState<UserCardResponse[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const userListRef = useRef<UserCardResponse[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchUsers = async (
    text: string,
    pageToFetch = 1,
    append = false
  ) => {
    if (append) {
      setIsLoadingMore(true)
    } else {
      setIsLoadingInitial(true);
    }
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      const res = await getUsers(text, pageToFetch, { signal: controller.signal });
      const newList = append
        ? [...userListRef.current, ...res.data]
        : res.data;

      userListRef.current = newList;
      setUserList(newList);
      setTotal(res.total);
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        console.error("Erro ao buscar usuários:", err);
      }
    } finally {
      if (append) {
        setIsLoadingMore(false)
      } else {
        setIsLoadingInitial(false)
      }
    }
  };

  useEffect(() => {
    fetchUsers("", 1);
  }, []);

  const handleSearchClick = () => {
    if (!inputRef.current) return;
    const value = inputRef.current.value;
    setSearchText(value);
    setPage(1);
    fetchUsers(value, 1, false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          !isLoadingMore &&
          userList.length < total
        ) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchUsers(searchText, nextPage, true);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [userList, isLoadingMore, total, searchText, page]);

  return (
    <Menu>
      <SearchInput inputRef={inputRef} onSearchClick={handleSearchClick} />

      {isLoadingInitial && (
        <Icon
          iconType={IconType.Loading}
          size={Size.S}
          animationType={AnimationType.Rotate}
          startAnimation={StartAnimation.Infinite}
          width="100%"
        />
      )}

      {!isLoadingInitial && userListRef.current.length === 0 && userList.length === 0 && (
        <Text text="Nenhum usuário encontrado." size={Size.M} center />
      )}

      <UserCardList list={userList} />

      {isLoadingMore && (
        <Icon
          iconType={IconType.Loading}
          size={Size.S}
          animationType={AnimationType.Rotate}
          startAnimation={StartAnimation.Infinite}
          width="100%"
          padding="20px"
        />
      )}

      {isLoadingInitial && !isLoadingMore && (
        <Text text="Sem mais usuários." size={Size.M} center />
      )}

      <div ref={observerRef} style={{ height: "1px" }} />
    </Menu>
  );
}