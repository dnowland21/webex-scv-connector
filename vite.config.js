import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';
import path from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        '@webex/internal-plugin-metrics',
        '@webex/internal-plugin-conversation',
        '@webex/internal-plugin-user',
        '@webex/webex-core',
        '@webex/plugin-authorization',
        '@webex/plugin-people',
        '@webex/plugin-logger',
        '@webex/plugin-metrics',
        '@webex/plugin-phone',
        '@webex/web-calling-sdk',
        'platform', // ✅ Prevents Rollup from bundling problematic platform.js
      ]
    }
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process',
      '@': path.resolve(__dirname, './src'),
    }
  },
  define: {
    global: 'globalThis', // ✅ ensures compatibility for dependencies using `global`
    globalThis: 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      }
    }
  },
  plugins: [
    inject({
      Buffer: ['buffer', 'Buffer'],
      process: 'process',
      global: ['globalThis', 'global'],
    })
  ]
});