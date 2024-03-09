import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/weather-app/',
  resolve: {
    alias: {
      '#root': __dirname,
      '@components': path.resolve(__dirname, 'src/components'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@icons': path.resolve(__dirname, 'src/UI/icons'),
      '@animations': path.resolve(__dirname, 'src/animations'),
    }
  },
})
