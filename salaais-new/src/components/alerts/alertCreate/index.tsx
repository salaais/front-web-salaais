import { toast } from "react-toastify";
import * as Styled from "./style";
import { makeEnum, type EnumType } from "../../../global";
import { Text } from "../../text";
import React, { useState, type ReactNode } from "react";

export const ItemName = makeEnum({
  User: "Usuário",
  Permission: "Permissão",
  PermissionUser: "Permissão usuário",
});

type AlertCreateProps<T> = {
  itemName: EnumType<typeof ItemName>;
  defaultValue: T;
  createAction: (data: T) => Promise<void>;
  children: (
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>
  ) => ReactNode;
};

// AlertCreate<CreateUserPermissionModal>({
//   itemName: ItemName.PermissionUser,
//   defaultValue: {
//     key_permissao: "",
//     data_inicio: "",
//     data_fim: "",
//   },
//   createAction: createUserPermission(user.id_usuario),
//   children: (formState, setFormState) => (
//     <ModalUserPermission
//       formState={formState}
//       onChange={(partial) =>
//         setFormState((prev) => ({ ...prev, ...partial }))
//       }
//     />
//   ),
// });
export function AlertCreateBase<T>({
  itemName,
  defaultValue,
  createAction,
  children,
}: AlertCreateProps<T>) {
  toast(({ closeToast }) => {
    const [value, setValue] = useState<T>(defaultValue);

    return (
      <Styled.ToastContainer>
        {children(value, setValue)}
        <Styled.ConfirmButton
          onClick={() => {
            closeToast?.();
            toast.promise(createAction(value), {
              pending: `Adicionando ${itemName}...`,
              success: `${itemName} adicionad${itemName.endsWith("a") ? "a" : "o"} com sucesso!`,
              error: `Erro ao adicionar ${itemName}.`,
            });
          }}
        >
          Sim
        </Styled.ConfirmButton>
      </Styled.ToastContainer>
    );
  }, {
    autoClose: false,
    closeOnClick: false,
    closeButton: true,
  });
}
