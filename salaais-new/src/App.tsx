// import {Logo} from './assets/index'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import { LoginPage } from './pages/login'
import { Alert } from "./components";

export default function App() {
  return (
    <>
      <Alert />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
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