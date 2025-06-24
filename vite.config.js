import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    https: {
      key: fs.readFileSync('./products.thefederal.com-key.pem'),
      cert: fs.readFileSync('./products.thefederal.com.pem'),
    },
    hmr: {
      protocol: 'wss',
      host: 'products.thefederal.com',
      port: 5173,
    },
  },
})
