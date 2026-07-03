import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    react(),
    basicSsl() // ← Menambahkan plugin SSL lokal
  ],
  server: {
    host: true,  // ← Mengizinkan akses via IP Lokal / Wi-Fi
    https: true, // ← Memaksa Vite berjalan di HTTPS
    port: 5173
  }
})