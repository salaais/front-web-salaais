import { useEffect, useRef, useState } from "react";
import { Icon, Menu, SearchInput, UserCardList } from "../../components";
import { getUsers } from "../../services/apis/salaais";
import type { UserCardResponse } from "../../services/apis/salaais/models";
import { AnimationType, IconType, Size, StartAnimation } from "../../global";

export function UsersPage() {
  const [userList, setUserList] = useState<UserCardResponse[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchUsers = async (
    text: string,
    pageToFetch = 1,
    append = false
  ) => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    if (append) {
      setIsLoadingMore(true)
    } else {
      setIsLoadingInitial(true);
    }

    try {
      const res = await getUsers(text, pageToFetch, {
        signal: controller.signal,
      });

      setUserList(prev =>
        append ? [...prev, ...res.data] : res.data
      );
      setTotal(res.total);
    } catch (err: unknown) {
      if (
        err instanceof DOMException &&
        err.name === "AbortError"
      ) return;

      console.error("Erro ao carregar usuários", err);
    } finally {
      if (append) {
        setIsLoadingMore(false)
      } else {
        setIsLoadingInitial(false);
      }
    }
  };

  // Busca inicial ao abrir a página
  useEffect(() => {
    setIsLoadingInitial(true); // <- força o loading imediatamente antes do fetch
    fetchUsers("", 1);
  }, []);

  // Observa input e faz debounce da digitação
  useEffect(() => {
    const inputEl = inputRef.current;
    if (!inputEl) return;

    const handleInput = () => {
      const value = inputEl.value;
      setSearchText(value);
      setPage(1);

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        setIsLoadingInitial(true); // <- garantir que o loading apareça
        fetchUsers(value, 1, false);
      }, 500);
    };

    inputEl.addEventListener("input", handleInput);
    return () => inputEl.removeEventListener("input", handleInput);
  }, []);

  // Scroll infinito com IntersectionObserver
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
      <SearchInput inputRef={inputRef} />

      {isLoadingInitial && (
        <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
          <Icon
            iconType={IconType.Loading}
            size={Size.S}
            animationType={AnimationType.Rotate}
            startAnimation={StartAnimation.Infinite}
          />
        </div>
      )}

      <UserCardList list={userList} />

      {isLoadingMore && (
        <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
          <Icon
            iconType={IconType.Loading}
            size={Size.S}
            animationType={AnimationType.Rotate}
            startAnimation={StartAnimation.Infinite}
          />
        </div>
      )}

      <div ref={observerRef} style={{ height: "1px" }} />
    </Menu>
  );
}
