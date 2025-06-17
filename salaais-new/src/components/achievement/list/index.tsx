import { toast } from "react-toastify"
import { Achievement } from ".."
import { IconType, Size } from "../../../global"
import { Text } from "../../text"
import { AchievementType } from "../models"
import * as Styled from "./style"

// Supondo que todos tenham nome
const achievementList = [
  {
    key: "checkin_feito",
    iconType: IconType.UserSettings,
    achievementType: AchievementType.Comum,
    nome: "Check-in Feito",
    descricao: "Completar o perfil do seu usuário"
  },
  {
    key: "primeiros_seguidores",
    iconType: IconType.Users,
    achievementType: AchievementType.Comum,
    nome: "Blogueirinho",
    descricao: "Consiguir seus primeiros 5 seguidores"
  },
  {
    key: "nota_abaixo_30",
    iconType: IconType.AirplaneDown,
    achievementType: AchievementType.Comum,
    nome: "Avião Turbulento",
    descricao: "Tirar uma nota abaixo de 30%"
  },
  {
    key: "primeiro_login",
    iconType: IconType.Login,
    achievementType: AchievementType.Comum,
    nome: "Primeiro Acesso",
    descricao: "Fazer login pela primeira vez"
  },
  {
    key: "bug_reportado",
    iconType: IconType.Bug,
    achievementType: AchievementType.Comum,
    nome: "Bug Report",
    descricao: "Identificar um bug e reportar"
  },
  {
    key: "modulo_inicial_concluido",
    iconType: IconType.Bookmark,
    achievementType: AchievementType.Comum,
    nome: "Navegação Básica",
    descricao: "Concluir o primeiro módulo de estudo."
  },
  {
    key: "cem_pontos",
    iconType: IconType.Star,
    achievementType: AchievementType.Comum,
    nome: "100 Pés de Conhecimento",
    descricao: "Acumular 100 pontos no sistema."
  },
  {
    key: "prova_em_ultimo_segundo",
    iconType: IconType.Clock,
    achievementType: AchievementType.Comum,
    nome: "Em Ar Puros",
    descricao: "Finalizar a prova faltando menos de 10 segundos."
  },
  {
    key: "prova_completa",
    iconType: IconType.AssigmentCheck,
    achievementType: AchievementType.Comum,
    nome: "Prova Completa",
    descricao: "Concluir uma prova sem deixar questões em branco."
  },
  {
    key: "prova_sobrando_tempo",
    iconType: IconType.Clock,
    achievementType: AchievementType.Raro,
    nome: "Ninguém me Pega",
    descricao: "Finalizar uma prova com mais de 10 minutos de sobra."
  },
  {
    key: "top_3_rank",
    iconType: IconType.Rank,
    achievementType: AchievementType.Raro,
    nome: "Top 3 do Rank",
    descricao: "Ficar em top 3 no rank"
  },
  {
    key: "encontrou_easter_egg",
    iconType: IconType.Eagle,
    achievementType: AchievementType.Raro,
    nome: "Olhos de Águia",
    descricao: "Encontrar o “easter egg” visual no site."
  },
  {
    key: "conteudo_estudado",
    iconType: IconType.Brain,
    achievementType: AchievementType.Raro,
    nome: "Super Gênio",
    descricao: "Estudar todo o conteúdo disponível"
  },
  {
    key: "melhoria_implementada",
    iconType: IconType.Manager,
    achievementType: AchievementType.Raro,
    nome: "Engenheiro do Céu",
    descricao: "Sugerir uma melhoria e ser implementada no sistema."
  },
  {
    key: "fenix_lendaria",
    iconType: IconType.Phoenix,
    achievementType: AchievementType.Lendario,
    nome: "Fênix Lendária",
    descricao: "Reprovar na prova ANAC e depois gabaritar a mesma."
  },
  {
    key: "primeira_hora_voo",
    iconType: IconType.Wing,
    achievementType: AchievementType.Lendario,
    nome: "Asas Lendárias",
    descricao: "Fazer sua primeira hora de voo prático (confirmado pelo admin)."
  },
]

const myAchieviments: string[] = []

function renderToast(item: typeof achievementList[0]) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start", // Alinha ao topo para textos maiores
      gap: "10px",
      padding: "6px",
    }}>
      <div style={{ flexShrink: 0 }}>
        <Achievement
          iconType={item.iconType}
          achievementType={item.achievementType}
          disabled={false}
        />
      </div>
      <div style={{ overflow: "hidden" }}>
        <strong style={{
          display: "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {item.nome}
        </strong>
        <div style={{
          overflowWrap: "break-word", // quebra palavras longas
          wordBreak: "break-word",    // reforça quebra de linha
          whiteSpace: "normal"        // permite múltiplas linhas
        }}>
          {item.descricao}
        </div>
      </div>
    </div>
  )
}

export function AchievementList() {
  const mySet = new Set(myAchieviments)

  const grouped = {
    [AchievementType.Comum]: achievementList.filter(a => a.achievementType === AchievementType.Comum),
    [AchievementType.Raro]: achievementList.filter(a => a.achievementType === AchievementType.Raro),
    [AchievementType.Lendario]: achievementList.filter(a => a.achievementType === AchievementType.Lendario),
  }

  return (
    <Styled.Content>
      {Object.entries(grouped).map(([type, items]) => (
        <Styled.Group key={type}>
          <Text text={type} bold size={Size.L} />
          <Styled.GroupList>
            {items.map((item) => {
              const isAchieved = mySet.has(item.key)
              return (
                <Achievement
                  key={item.key}
                  disabled={!isAchieved}
                  iconType={item.iconType}
                  achievementType={item.achievementType}
                  onClick={() =>
                    toast.info(renderToast(item), {
                      icon: false,
                      toastId: `${item.key}-${Date.now()}`,
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    })
                  }
                />
              )
            })}
          </Styled.GroupList>
        </Styled.Group>
      ))}
    </Styled.Content>
  )
}
