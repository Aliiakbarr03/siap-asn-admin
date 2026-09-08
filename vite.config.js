import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      },
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      }
    },
    // Chunk splitting strategy
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    sourcemap: false // set to true untuk debug
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js', 'xlsx', 'lucide']
  }
});
