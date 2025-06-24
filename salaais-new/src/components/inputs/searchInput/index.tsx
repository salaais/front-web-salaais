import { Color, IconType, Size } from "../../../global";
import { Icon } from "../../icon";
import * as Styled from "./style";
import type { RefObject } from "react";

type SearchInputProps = {
  placeholder?: string;
  inputRef: RefObject<HTMLInputElement | null>;
};

export function SearchInput({
  placeholder = "Buscar",
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
          borderRadius={'0 32px 32px 0'}
        />
      </Styled.Content>
    </Styled.All>
  );
}