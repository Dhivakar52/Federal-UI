import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    https: false, // Keep false if you're using reverse proxy with HTTPS outside
    hmr: {
      protocol: 'wss',
      host: 'products.thefederal.com',
      port: 443,
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








