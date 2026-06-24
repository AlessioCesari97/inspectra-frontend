import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'


export default defineConfig({

  plugins: [react()],

  server: {

    host: true,

    allowedHosts: [
      'debating-grime-granular.ngrok-free.dev'
    ],

    proxy: {

      '/api': {

        target: 'http://localhost:8081',

        changeOrigin: true,

        rewrite: (path) =>
            path.replace(/^\/api/, '')

      }

    }

  }

})