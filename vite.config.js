import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from './scripts/sitemap.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap()],
  server: {
    host: true,
    allowedHosts:true,
  }
})
