import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost', // 本地开发环境
    // host: '0.0.0.0', // 生产环境允许外部网络访问（注释保留）
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
