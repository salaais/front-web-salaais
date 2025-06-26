import * as Styled from "./style";
import { Text } from "../../text";
import { Color, getLocalStorage, LocalStorage, Permission, Size } from "../../../global";
import { Icon } from "../../icon";
import { IconType } from "../../icon/models";
import type { PermissioesFullUserCard } from "../../../services/apis/salaais/models";

type PermissionCardProps = {
    list?: PermissioesFullUserCard[]; // Fallback para teste
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

// export const permissionList: PermissioesFullUserCard[] = [
//     {
//         "key_permissao": "COMUM",
//         "nome_permissao": "Comum",
//         "url_imagem": "https://www.elojobinfinity.com.br/elos/ferro.png",
//         "ativo": true,
//         "data_criacao": "2024-11-14T06:57:48.917Z",
//         "data_inicio": null,
//         "data_fim": null
//     },
//     {
//         "key_permissao": "ADMIN",
//         "nome_permissao": "Admin",
//         "url_imagem": "https://salaais-web.vercel.app/assets/logo-amarelo-CTBq-93H.png",
//         "ativo": true,
//         "data_criacao": "2024-11-20T00:34:13.614Z",
//         "data_inicio": "2024-11-20T00:34:13.613Z",
//         "data_fim": null
//     },
//     {
//         "key_permissao": "COMUM",
//         "nome_permissao": "Comum",
//         "url_imagem": "https://www.elojobinfinity.com.br/elos/ferro.png",
//         "ativo": true,
//         "data_criacao": "2025-06-11T14:27:28.888Z",
//         "data_inicio": "2025-06-11T14:27:28.886Z",
//         "data_fim": "2025-07-11T13:58:11.140Z"
//     },
//     {
//         "key_permissao": "PREMIUM",
//         "nome_permissao": "Premium",
//         "url_imagem": "https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Diamond_2.png",
//         "ativo": true,
//         "data_criacao": "2025-06-20T19:53:40.548Z",
//         "data_inicio": "2025-06-20T19:53:40.546Z",
//         "data_fim": "2025-10-18T19:53:40.546Z"
//     },
//     {
//         "key_permissao": "PREMIUM",
//         "nome_permissao": "Premium",
//         "url_imagem": "https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Diamond_2.png",
//         "ativo": false,
//         "data_criacao": "2025-06-20T19:55:08.862Z",
//         "data_inicio": "2025-10-18T19:53:40.546Z",
//         "data_fim": "2026-02-15T19:53:40.546Z"
//     },
//     {
//         "key_permissao": "BRONZE",
//         "nome_permissao": "Bronze",
//         "url_imagem": "https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png",
//         "ativo": true,
//         "data_criacao": "2025-06-20T21:02:52.770Z",
//         "data_inicio": "2025-06-20T21:02:52.768Z",
//         "data_fim": "2025-07-20T21:02:52.768Z"
//     }
// ];

export function PermissionCardItem({ card }: { card: PermissioesFullUserCard }) {
    const isAdmin = (getLocalStorage<string[]>(LocalStorage.permissions) ?? []).includes(Permission.ADMIN);

    return (
        <Styled.CardItem>
            {isAdmin &&
                <Styled.FlexEndIcon>
                    <Icon
                        iconType={IconType.Trash}
                        size={Size.Xs}
                        color={Color.BgSecondary}
                        background={Color.Red}
                        padding="5px"
                        margin="0 0 10px 0"
                        onClick={() => { }}
                    />
                </Styled.FlexEndIcon>
            }
            <Styled.Image src={card.url_imagem} alt={card.nome_permissao} />
            <Text bold center size={Size.S} text={card.nome_permissao} />
            {card.data_inicio && isAdmin && <Text size={Size.Xs} text={new Date(card.data_inicio).toLocaleDateString()} color={Color.Green} />}
            {card.data_fim && isAdmin && <Text size={Size.Xs} text={new Date(card.data_fim).toLocaleDateString()} color={Color.Red} />}
            {!card.ativo && isAdmin && <Text center size={Size.Xs} text={"Inativo"} color={Color.Red} bold />}
            {card.ativo && isAdmin && <Text center size={Size.Xs} text={"Ativo"} color={Color.Green} bold />}
        </Styled.CardItem>
    );
}

export function PermissionCardList({ list = [] }: PermissionCardProps) {
    const isAdmin = (getLocalStorage<string[]>(LocalStorage.permissions) ?? []).includes(Permission.ADMIN);

    return (
        <Styled.CardList>
            {list.map((card, index) => (
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
