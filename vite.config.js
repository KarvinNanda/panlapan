import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { projects } from './src/data/projects.js'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes() {
      // Homepage + satu halaman statis per project di src/data/projects.js.
      // Catch-all route (/:pathMatch) sengaja tidak di-generate.
      return ['/', ...projects.map(p => `/work/${p.slug}`)]
    },
  }
})
