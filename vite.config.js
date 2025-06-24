import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // or use '0.0.0.0' to expose to local network
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: 'products.thefederal.com', // your custom domain
      port: 5173,
    },
  },
})
