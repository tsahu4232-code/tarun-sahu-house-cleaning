import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // No sourcemaps in the production bundle -> smaller output, faster deploy
    sourcemap: false,
    // Split large third-party libraries into their own cacheable chunk
    // so app code changes don't invalidate the vendor cache
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react-router-dom') ||
              id.includes('/react/') ||
              id.includes('/react-dom/')
            ) {
              return 'vendor';
            }
          }
        },
      },
    },
    // Warn if any chunk grows unexpectedly large
    chunkSizeWarningLimit: 600,
  },
})