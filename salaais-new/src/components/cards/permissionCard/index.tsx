import * as Styled from "./style";
import { Text } from "../../text";
import { Color, getLocalStorage, LocalStorage, Permission, Size } from "../../../global";
import { Icon } from "../../icon";
import { IconType } from "../../icon/models";


export interface PermissionCard {
    key_permissao: string;
    data_inicio: string | null;
    data_fim: string | null;
    ativo: boolean | null;
    data_criacao: string | null;
}

type PermissionCardProps = {
    cards?: PermissionCard[]; // Fallback para teste
};

// const mockPlans = [
//     {
//         title: "Bronze",
//         image: "https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png",
//     },
//     {
//         title: "Prata",
//         image: "https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png",
//     },
//     {
//         title: "Ouro",
//         image: "https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png",
//     },
//     {
//         title: "Premium",
//         image: "https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Diamond_2.png",
//     }
// ]

export const permissionList: PermissionCard[] = [
    {
        key_permissao: "PREMIUM",
        ativo: true,
        data_criacao: "2025-06-11T14:27:28.888Z",
        data_inicio: "2025-06-11T14:27:28.886Z",
        data_fim: "2025-07-11T13:58:11.140Z",
    },
    {
        key_permissao: "BRONZE",
        ativo: true,
        data_criacao: "2025-06-11T14:27:28.888Z",
        data_inicio: "2025-06-11T14:27:28.886Z",
        data_fim: "2025-07-11T13:58:11.140Z",
    },
    {
        key_permissao: "OURO",
        ativo: null,
        data_criacao: null,
        data_inicio: null,
        data_fim: null,
    },
];

export function PermissionCardItem({ card }: { card: PermissionCard }) {
    const isAdmin = (getLocalStorage<string[]>(LocalStorage.permissions) ?? []).includes(Permission.ADMIN);

    return (
        <Styled.CardItem>
            {isAdmin && <Icon
                iconType={IconType.Trash}
                size={Size.Xs}
                color={Color.BgSecondary}
                background={Color.Red}
                padding="5px"
                margin="0 0 10px 0"
                onClick={() => { }}
            />}
            <Text bold center size={Size.Xs} text={card.key_permissao} />
            {card.data_inicio && isAdmin && <Text size={Size.Xs} text={new Date(card.data_inicio).toLocaleDateString()} />}
            {card.data_fim && isAdmin && <Text size={Size.Xs} text={new Date(card.data_fim).toLocaleDateString()} />}
            {card.ativo && isAdmin && <Text center size={Size.Xs} text={card.ativo ? "Ativo" : "Inativo"} />}
        </Styled.CardItem>
    );
}

export function PermissionCardList({ cards = permissionList }: PermissionCardProps) {
    const isAdmin = (getLocalStorage<string[]>(LocalStorage.permissions) ?? []).includes(Permission.ADMIN);

    return (
        <Styled.CardList>
            {cards.map((card, index) => (
                <PermissionCardItem key={index} card={card} />
            ))}
            {isAdmin && <Icon
                iconType={IconType.Add}
                size={Size.Xs}
                color={Color.BgSecondary}
                background={Color.TxtPrimary}
                padding="5px"
                onClick={() => { }}
            />}
        </Styled.CardList>
    );
}
