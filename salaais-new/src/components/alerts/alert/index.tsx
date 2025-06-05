import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./style.css" // seu CSS customizado opcional

export function Alert() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      toastClassName="custom-toast"
    />
  )
}
