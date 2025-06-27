import { toast } from "react-toastify";
import * as Styled from './style';
import { Size, type EnumType } from "../../../global";
import { Text } from "../../text";
import type { ItemName } from "../alertCreate";

export const AlertDelete = (
    id: number,
    itemName: EnumType<typeof ItemName>,
    deleteAction: (id: number) => Promise<void>
) => {
    toast(
        ({ closeToast }) => (
            <Styled.ToastContainer>
                <Text text={`Tem certeza que deseja remover este ${itemName}?`} size={Size.M} />
                <Styled.ConfirmButton
                    onClick={() => {
                        closeToast?.();
                        toast.promise(deleteAction(id), {
                            pending: `Removendo ${itemName}...`,
                            success: `${itemName} removid${itemName.endsWith("a") ? "a" : "o"} com sucesso!`,
                            error: `Erro ao remover ${itemName}.`,
                        });
                    }}
                >
                    Sim
                </Styled.ConfirmButton>
            </Styled.ToastContainer>
        ),
        {
            autoClose: false,
            closeOnClick: false,
            closeButton: true, // deixa o padrão
        }
    );

};
