import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { loadEnv } from './global/utils/env/index.ts';

loadEnv().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}).catch((err) => {
  console.error("Erro ao carregar variáveis de ambiente:", err);
});
