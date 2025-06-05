import { toast } from "react-toastify";
import "./style.css";

const CustomCloseButton = ({ closeToast }: { closeToast?: () => void }) => (
  <button
    onClick={closeToast}
    style={{
      color: 'var(--bg-secondary)',
      fontSize: '17px',
      border: 'none',
      background: 'var(--primary-color)',
      padding:'5px 10px',
      borderRadius:'10px',
      marginTop:'10px',
      cursor: 'pointer',
    }}
    aria-label="Fechar"
  >
    Fechar
  </button>
);

export const ToastInfo = (content: React.ReactNode) => {
  toast.info(
    <div style={{ whiteSpace: "normal", fontSize: "0.9rem", lineHeight: "1.4" }}>
      {content}
    </div>,
    {
      className: 'custom-toast-info',
      autoClose: false,
      closeOnClick: false,
      closeButton: <CustomCloseButton />,
      draggable: false,
      icon: false, // 👈 Remove o ícone padrão
    }
  );
};

