import styled from "styled-components"
import { Color } from "../../../global";

export const Content = styled.div`
  position: relative; /* Necessário para que o ícone absoluto funcione */
  display: flex;
  background: ${Color.BgSecondary};
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  max-width: 300px;
  flex-direction: column;
  box-shadow: ${Color.Shadow};
`;

export const ContentIcons = styled.div`
  display: flex;
  justify-content:flex-end;
  gap: 5px;
`;

export const FlexTop = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 24px; // ou ajuste conforme a altura do conteúdo
  width: 100%;
`;

export const InputsContent = styled.div`
  margin-top: 20px;
  display: flex;
  gap:10px;
  flex-direction:column;
`

export const ContentImageProfile = styled.div`
  position: relative;
  display: flex;               // precisa disso para justificar/alinha
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 70px;                 // suficiente para sobrepor 2 imagens de 60px com leve deslocamento
  margin: 0 auto;              // centraliza horizontalmente no container pai
`;

export const ImgPerfil = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
`;

// Estilo para a imagem de cima
export const ImgPerfilFront = styled(ImgPerfil)`
  right: 26px;
  z-index: 1;
  `;

export const InitialsPlaceholder = styled.div`
  left: 26px;
  position: absolute;
  top: 0;
  z-index: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${Color.BgPrimary};
  color: ${Color.TxtPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  user-select: none;
  letter-spacing: 2px;
`;
