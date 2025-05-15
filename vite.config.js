import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external access to dev server
    port: 5173,
    https: false, // set to true if using HTTPS locally

    hmr: mode !== 'production'
      ? {
          protocol: 'wss', // use 'ws' if you're using HTTP instead of HTTPS
          host: 'products.thefederal.com',
          port: 443, // or your frontend's HTTPS port (443 is default for HTTPS)
        }
      : false,
  },
  build: {
    outDir: 'dist',
  },
}))
