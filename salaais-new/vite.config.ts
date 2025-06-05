import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // ajuste se for hospedado em subdiretório
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false, // ou true se quiser otimização
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
});
