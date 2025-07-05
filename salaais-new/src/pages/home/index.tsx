import { CardProgressDashboardItem, CardProgressList, IconsList, Menu, NotificationButton } from "../../components";
import type { CardDashboardItemProps } from "../../components/cards/progressDashboard/item";
import * as Styled from './style'

const example: CardDashboardItemProps = {
  title: 'Última Prova',
  values: [
    {
      materia: 'EME',
      descricao: 'BLOCO 1 - Emergências a Bordo (EME)',
      nota: 90,
    },
    {
      materia: 'SBV',
      descricao: 'BLOCO 1 - Sobrevivência (SBV)',
      nota: 10,
    },
    {
      materia: 'FHU',
      descricao: 'BLOCO 2 - Fatores Humanos na Aviação (FHU)',
      nota: 20,
    },
    {
      materia: 'SAC',
      descricao: 'BLOCO 2 - Sistema de Aviação Civil (SAC)',
      nota: 30,
    },
    {
      materia: 'RAC',
      descricao: 'BLOCO 2 - Regulamentação da Aviação Civil (RAC)',
      nota: 50,
    },
    {
      materia: 'RPA',
      descricao: 'BLOCO 2 - Regulamentação da Profissão do Aeronáutica (RPA)',
      nota: 40,
    },
    {
      materia: 'SVO',
      descricao: 'BLOCO 2 - Segurança de Voo (SVO)',
      nota: 30,
    },
    {
      materia: 'AFI',
      descricao: 'BLOCO 3 - Aspectos Fisiológicos (AFI)',
      nota: 70,
    },
    {
      materia: 'PSS',
      descricao: 'BLOCO 3 - Primeiros Socorros (PSS)',
      nota: 90,
    },
    {
      materia: 'AER',
      descricao: 'BLOCO 4 - Conhecimentos Básicos sobre Aeronave (AER)',
      nota: 95,
    },
    {
      materia: 'NAV',
      descricao: 'BLOCO 4 - Navegação Aérea (NAV)',
      nota: 10,
    },
    {
      materia: 'MET',
      descricao: 'BLOCO 4 - Meteorologia (MET)',
      nota: 0,
    },
  ],
}

export function HomePage() {

  return (
    <>
      <Menu>
        <a href="/home" >Estamos ainda trabalhando nisso</a>
        <br />
        <br />

        <NotificationButton />
        <Styled.Cards>
          <CardProgressList />
          <CardProgressDashboardItem {...example}/>
        </Styled.Cards>
        <IconsList />

      </Menu >
    </>
  )
}
