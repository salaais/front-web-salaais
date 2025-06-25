import { toast } from "react-toastify";
import { deleteUser } from "../../../services/apis/salaais";
import * as Styled from './style';
import { makeEnum, type EnumType } from "../../../global";

export const ItemName = makeEnum({
    User: "Usuário",
    Permission: "Permissão",
})

export const AlertDelete = (id: number, itemName?: EnumType<typeof ItemName>) => {
    toast(
        ({ closeToast }) => (
            <Styled.ToastContainer>
                <span>Tem certeza que deseja remover este usuário?</span>
                <Styled.ConfirmButton
                    onClick={() => {
                        closeToast?.();
                        toast.promise(deleteUser(id), {
                            pending: `Removendo ${itemName}...`,
                            success: `${itemName} removido com sucesso!`,
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
