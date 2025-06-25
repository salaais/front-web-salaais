import { Color, Size } from "../../../global";
import { Icon } from "../../icon";
import { IconType } from "../../icon/models";
import * as Styled from "./style";
import type { RefObject } from "react";

type SearchInputProps = {
  placeholder?: string;
  onSearchClick?: () => void;
  onTyping?: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

export function SearchInput({
  placeholder = "Buscar",
  onSearchClick,
  inputRef
}: SearchInputProps) {
  return (
    <Styled.All>
      <Styled.Content>
        <Styled.Input
          ref={inputRef}
          placeholder={placeholder}
        />
        <Icon
          iconType={IconType.Search}
          size={Size.S}
          background={Color.BgSecondary}
          onClick={onSearchClick}
        />
      </Styled.Content>
    </Styled.All>
  );
}