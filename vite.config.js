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
        '@webex/plugin-logger',
        '@webex/web-calling-sdk', // in case
      ]
    }
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    global: 'globalThis'
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  plugins: [
    inject({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
      global: ['globalThis', 'global']
    })
  ]
});