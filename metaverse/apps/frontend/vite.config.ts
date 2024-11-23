import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Optimize Phaser chunks for better performance
        manualChunks: {
          phaser: ['phaser'],
        },
      },
    }
  }
})
