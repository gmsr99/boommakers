import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Target modern browsers — smaller, faster output
    target: 'es2020',

    // Don't wipe dist before rebuilding (needed on some mounted filesystems)
    emptyOutDir: false,

    // Increase chunk size warning threshold (400kB is normal for React apps)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: isSsrBuild ? {} : {
        // Manual code splitting — keeps vendor libs separate for better caching
        // Must be a function in Vite 8 / Rolldown
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'animation-vendor'
          }
          if (id.includes('node_modules/@supabase')) {
            return 'supabase-vendor'
          }
          if (
            id.includes('node_modules/react-type-animation') ||
            id.includes('node_modules/react-countup') ||
            id.includes('node_modules/react-intersection-observer')
          ) {
            return 'ui-vendor'
          }
        },
        // Readable chunk filenames in production
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  // Optimise dev server startup
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
}))
