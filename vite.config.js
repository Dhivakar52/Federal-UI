import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    https: true, // Enable HTTPS if your site is HTTPS
    hmr: {
      protocol: 'wss', // secure websocket
      host: 'products.thefederal.com',
      port: 443, // HTTPS port
    },
    proxy: {
      '/api': {
        target: 'https://products.thefederal.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
