import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('/react-router-dom/')) return 'router-vendor'
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) return 'react-vendor'
          if (id.includes('recharts')) return 'charts-vendor'
          if (id.includes('firebase')) return 'firebase-vendor'
          if (id.includes('tesseract.js')) return 'ocr-vendor'
          if (id.includes('framer-motion')) return 'motion-vendor'
        },
      },
    },
  },
})
