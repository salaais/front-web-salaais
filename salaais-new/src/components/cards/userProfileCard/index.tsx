import { useState } from "react";
import { Text } from "../../text";
import * as Styled from "./style";
import { Color, Size } from "../../../global";
import { DefaultImage } from "../../../assets";
import { Icon } from "../../icon";
import { AnimationType, IconType, StartAnimation } from "../../icon/models";
import { InputInline } from "../../inputs/inputInline";

export interface UserProfile {
  url_imagem_perfil: string;
  planos_ativos: string[];
  nome: string;
  username: string;
  bio: string;
  data_nascimento: string;
  link_instagram: string;
  link_facebook: string;
}

const initialProfile: UserProfile = {
  url_imagem_perfil: "",
  planos_ativos: [
    "https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png",
    "https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png"
  ],
  nome: "Felipe Breno",
  username: "fe.felipe",
  bio: "bla, bla, bla, bla...",
  data_nascimento: `${new Date().toISOString().slice(0, 10)}`,
  link_instagram: "https://instagram.com",
  link_facebook: "https://facebook.com",
};

function getInitials(nome: string): string {
  const partes = nome.trim().split(" ");
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
}

export function UserProfileCard() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  function toggleIsEdit() {
    setIsEdit(!isEdit);
  }

  const handleChange = (key: keyof UserProfile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <Styled.AllContent>
      <Styled.ContentImage>
        {profile.planos_ativos.map((url, index) => (
          <Styled.ImagePlan key={index} src={url} alt={`Plano ${index + 1}`} />
        ))}
      </Styled.ContentImage>

      <Styled.Content>
        <Styled.ContentIcons>
          {!isEdit && (
            <Icon
              iconType={IconType.Edit}
              size={Size.S}
              padding="0"
              animationType={AnimationType.Float}
              startAnimation={StartAnimation.Hover}
              onClick={toggleIsEdit}
            />
          )}

          {isEdit && (
            <>
              <Icon
                iconType={IconType.Close}
                size={Size.S}
                padding="0"
                color={Color.Red}
                onClick={toggleIsEdit}
              />
              <Icon
                iconType={IconType.Check}
                size={Size.S}
                padding="0"
                color={Color.Green}
                onClick={toggleIsEdit}
              />
            </>
          )}
        </Styled.ContentIcons>

        <Text
          text={isEdit ? "Editar perfil" : "Meu perfil"}
          size={Size.S}
          margin="0 0 20px 0"
          bold
          center
        />

        <Styled.ContentImageProfile>
          {profile.url_imagem_perfil ? (
            <Styled.ImgPerfilFront src={profile.url_imagem_perfil} alt="Perfil" />
          ) : (
            <Styled.ImgPerfilFront src={DefaultImage} alt="Perfil" dashed />
          )}
          <Styled.InitialsPlaceholder>
            {getInitials(profile.nome)}
          </Styled.InitialsPlaceholder>
        </Styled.ContentImageProfile>

        {isEdit && (
          <Text
            text="Editar foto"
            size={Size.S}
            color={Color.Blue}
            margin="6px 0 0 0"
            bold
            center
          />
        )}

        <Styled.InputsContent>
          <InputInline
            label="Nome"
            value={profile.nome}
            onChange={handleChange("nome")}
            disabled={!isEdit}
          />
          <InputInline
            label="Username"
            value={profile.username}
            onChange={handleChange("username")}
            disabled={!isEdit}
          />
          <InputInline
            label="Bio"
            value={profile.bio}
            onChange={handleChange("bio")}
            disabled={!isEdit}
          />
          <InputInline
            label="Data Nascimento"
            value={profile.data_nascimento}
            onChange={handleChange("data_nascimento")}
            disabled={!isEdit}
          />
          <InputInline
            label="Link Instagram"
            value={profile.link_instagram}
            onChange={handleChange("link_instagram")}
            disabled={!isEdit}
          />
          <InputInline
            label="Link Facebook"
            value={profile.link_facebook}
            onChange={handleChange("link_facebook")}
            disabled={!isEdit}
          />
        </Styled.InputsContent>
      </Styled.Content>
    </Styled.AllContent>
  );
}
