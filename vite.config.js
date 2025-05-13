import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    hmr: mode !== 'production' // HMR is only active in development
  },
  build: {
    outDir: 'dist', // optional: ensure build output goes to the correct folder
  },
}))
