import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from './scripts/sitemap.js'
import headTags from './scripts/head-tags.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap(), headTags()],
  server: {
    host: true,
    allowedHosts:true,
  }
})
