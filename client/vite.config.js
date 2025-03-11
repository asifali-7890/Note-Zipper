﻿import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy API requests to your backend server running on port 5000
      '/api': {
        target: 'http://localhost:5000', // Your backend API
        changeOrigin: true
      },
    },
  }
})
