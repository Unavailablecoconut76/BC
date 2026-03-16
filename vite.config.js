import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './front',
  build: {
    outDir: '../build'
  },
  server: {
    port: 3000,
    host: 'localhost'
  }
})
