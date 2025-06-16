import { Color, IconType, Size } from '../../../global';
import { Icon } from '../../icon';
import * as Styled from './style';

type SearchInputProps = {
  placeholder?: string;
  onFilterClick?: () => void;
};

export function SearchInput({
  placeholder = 'Buscar',
}: SearchInputProps) {

  return (
    <Styled.All>
      <Styled.Content>
        <Styled.Input placeholder={placeholder} />
        <Icon iconType={IconType.Search} size={Size.S} background={Color.BgSecondary} />
      </Styled.Content>
    </Styled.All>
  );
}
