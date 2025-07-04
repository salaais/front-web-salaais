import { AlertCreateBase, ItemName } from "../..";
import { Size } from "../../../../../global";
import { createUserPermission, getPermissaoOptions } from "../../../../../services/apis/salaais";
import { InputSearchSelect } from "../../../../inputs/inputSearchSelect";
import { Text } from "../../../../text";
import * as Styled from './style'
export interface CreateUserPermissionModal {
    key_permissao: string;
    data_inicio: string | null;
    data_fim: string | null;
}

type ModalFormPermissionProps = {
    formState: CreateUserPermissionModal,
    onChange: (partial: Partial<ModalFormPermissionProps["formState"]>) => void;
};

let cachedPermissoes: { label: string; value: string }[] | null = null;

const loadAllPermissoes = async () => {
    if (cachedPermissoes) return cachedPermissoes;

    const data = await getPermissaoOptions(); // essa função deve retornar todas
    cachedPermissoes = data;
    return data;
};

export const ModalPermissionUser = ({ formState, onChange }: ModalFormPermissionProps) => (
    <Styled.ContentModal>
        <Text text="Adicionar Permissão" size={Size.M} />

        {/* <Styled.Input
            type="text"
            placeholder="Nome Permissão"
            value={formState.key_permissao}
            onChange={(e) => onChange({ key_permissao: e.target.value })}
        /> */}

        <InputSearchSelect
            placeholder="Selecionar Permissão"
            value={formState.key_permissao}
            onChange={(e) => onChange({ key_permissao: e.target.value })}
            options={loadAllPermissoes}
        />


        <Styled.Input
            type="date"
            placeholder="Data Início permissão"
            value={formState.data_inicio ?? ""}
            onChange={(e) => onChange({ data_inicio: e.target.value || null })}
        />

        <Styled.Input
            type="date"
            placeholder="Data Fim permissão"
            value={formState.data_fim ?? ""}
            onChange={(e) => onChange({ data_fim: e.target.value || null })}
        />
    </Styled.ContentModal>
);

export const AlertCreatePermission = (id_usuario: number) => {
    AlertCreateBase<CreateUserPermissionModal>({
        itemName: ItemName.PermissionUser,
        defaultValue: {
            key_permissao: "",
            data_inicio: "",
            data_fim: "",
        },
        createAction: (data) =>
            createUserPermission({
                id_usuario,
                key_permissao: data.key_permissao,
                data_inicio: data.data_inicio || null,
                data_fim: data.data_fim || null,
            }),
        children: (formState, setFormState) => (
            <ModalPermissionUser
                formState={formState}
                onChange={(partial) =>
                    setFormState((prev) => ({ ...prev, ...partial }))
                }
            />
        ),
    });
};
