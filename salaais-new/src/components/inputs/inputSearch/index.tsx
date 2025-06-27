import { Color, Size } from "../../../global";
import { Icon } from "../../icon";
import { IconType } from "../../icon/models";
import * as Styled from "./style";
import type { RefObject } from "react";

type InputSearchProps = {
  placeholder?: string;
  onSearchClick?: () => void;
  onTyping?: () => void;
  inputRef?: RefObject<HTMLInputElement | null>;
};

export function InputSearch({
  placeholder = "Buscar",
  onSearchClick,
  inputRef
}: InputSearchProps) {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <Styled.All>
      <Styled.Content>
        <Styled.Input
          ref={inputRef}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
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