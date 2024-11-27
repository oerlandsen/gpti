import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api-mercadolibre': {
  //       target: 'https://api.mercadolibre.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api-mercadolibre/, ''),
  //     },
  //   },
  // },
})
