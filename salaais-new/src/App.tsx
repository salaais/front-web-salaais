import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { AchievementsPage, AdminPage, HomePage, LoginPage, PlansPage, RankingPage, SettingsPage, StudyPage, UsersPage } from "./pages";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <ToastContainer theme="light"/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/planos" element={<PlansPage />} />
          <Route path="/home/estudos" element={<StudyPage />} />
          <Route path="/home/usuarios" element={<UsersPage />} />
          <Route path="/home/configuracoes" element={<SettingsPage />} />
          <Route path="/home/ranking" element={<RankingPage />} />
          <Route path="/home/conquistas" element={<AchievementsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

// <>
//   <h1>App</h1>
//   <Button text="Teste" type={ThemeType.Secondary} />
//   <Button text="Teste" type={ThemeType.Primary} />
//   <Button text="Teste" type={ThemeType.Outlined} />
//   <Icon
//         iconType={IconType.Refresh}
//         size={Size.S}
//         color={Color.Red}
//         animationType={AnimationType.Rotate}
//         startAnimation={StartAnimation.Hover}
//       />
//   <Text text={"Seja Bem Vindo ao SalaAis"} title coloredParts={[{ text: "SalaAis", color: Color.Primary }]} center />
//   {/* <Text id={id} text={title} title coloredParts={coloredParts} center /> */}
// </>