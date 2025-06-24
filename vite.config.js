import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    https: true, // Enable HTTPS on dev server
    hmr: {
      protocol: 'wss', // Secure WebSocket
      host: 'products.thefederal.com',
      port: 5173,
    },
  },
})
