import { AlertCreateBase, ItemName } from "../..";
import { createUserPermission } from "../../../../../services/apis/salaais";
import * as Styled from '../../style'

export interface CreateUserPermissionModal {
    key_permissao: string;
    data_inicio: string;
    data_fim: string;
}

type ModalFormPermissionProps = {
    formState: CreateUserPermissionModal,
    onChange: (partial: Partial<ModalFormPermissionProps["formState"]>) => void;
};

export const ModalPermissionUser = ({ formState, onChange }: ModalFormPermissionProps) => (
    <Styled.ContentModal>
        <input
            type="text"
            placeholder="Nome Permissão"
            value={formState.key_permissao}
            onChange={(e) => onChange({ key_permissao: e.target.value })}
        />
        <input
            type="date"
            placeholder="Data Inicio permissão"
            value={formState.data_inicio}
            onChange={(e) => onChange({ data_inicio: e.target.value })}
        />
        <input
            type="date"
            placeholder="Data Fim permissão"
            value={formState.data_fim}
            onChange={(e) => onChange({ data_fim: e.target.value })}
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
                data_inicio: data.data_inicio,
                data_fim: data.data_fim,
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
