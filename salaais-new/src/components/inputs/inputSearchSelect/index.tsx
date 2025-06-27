import { useState, useEffect, type ChangeEvent } from "react";
import type { InputComponentProps } from "./interfaces";
import * as Styled from "./style";
import { Icon } from "../../icon";
import { AnimationType, IconType, StartAnimation } from "../../icon/models";
import { Size } from "../../../global";

interface Option {
  label: string;
  value: string;
}

const defaultOptions = [
  { label: "label1", value: "value1" },
  { label: "label2", value: "value2" },
  { label: "label3", value: "value3" },
  { label: "label4", value: "value4" },
];

type OptionsProp = Option[] | (() => Option[] | Promise<Option[]>);

interface SearchSelectProps extends Partial<InputComponentProps> {
  options?: OptionsProp;
}

export function InputSearchSelect({
  text,
  value: propValue,
  onChange,
  placeholder = "Buscar",
  name = "Select",
  options = defaultOptions,
}: SearchSelectProps) {
  const [value, setValue] = useState<string>(propValue || "");
  const [allOptions, setAllOptions] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Atualiza valor externo se mudar
  useEffect(() => {
    setValue(propValue || "");
  }, [propValue]);

  // Carrega opções apenas 1 vez (e filtra inicialmente)
  useEffect(() => {
    const loadOptions = async () => {
      setIsLoading(true);
      try {
        if (typeof options === "function") {
          const result = await options();
          setAllOptions(result || []);
          setFilteredOptions(result || []);
        } else {
          setAllOptions(options);
          setFilteredOptions(options);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadOptions();
  }, [options]);

  const handleInputFocus = () => {
    setShowOptions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowOptions(false), 200);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    onChange?.(event);

    // Filtragem LOCAL apenas com base nas opções já carregadas
    const filtered = allOptions.filter((opt) =>
      opt.value.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(true);
  };

  const handleOptionSelect = (option: Option) => {
    setValue(option.value);
    onChange?.({
      target: { value: option.label },
    } as ChangeEvent<HTMLInputElement>);
    setShowOptions(false);
  };

  const inputId = text || placeholder;

  return (
    <Styled.Content>
      <Styled.InputWrapper>
        <Styled.Input
          id={inputId}
          value={value}
          name={name}
          autoComplete="off"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        {text && <Styled.Label htmlFor={inputId}>{placeholder}</Styled.Label>}
      </Styled.InputWrapper>

      {showOptions && (
        <Styled.OptionsList>
          {isLoading ? (
              <Icon
                iconType={IconType.Loading}
                size={Size.S}
                animationType={AnimationType.Rotate}
                startAnimation={StartAnimation.Infinite}
                width="100%"
              />
          ) : filteredOptions.length === 0 ? (
            <Styled.NoOptions>Nenhuma opção encontrada</Styled.NoOptions>
          ) : (
            filteredOptions.map((option) => (
              <Styled.Option
                key={option.label}
                onClick={() => handleOptionSelect(option)}
              >
                {option.value}
              </Styled.Option>
            ))
          )}
        </Styled.OptionsList>
      )}
    </Styled.Content>
  );
}
