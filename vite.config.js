import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // Accessible on network
    port: 5173,           // Frontend runs on this port
    https: false,         // Keep false unless you have proper SSL certs
    hmr: {
      protocol: 'ws',     // WebSocket for HMR (no SSL issues)
      host: 'localhost',  // Can also be your LAN IP for testing on other devices
      port: 5173,
    },
    proxy: {
      '/api': {
        target: 'https://products.thefederal.com/a', // Backend server
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
