import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5001,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://localhost:5001',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
