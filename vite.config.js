import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        'xstate',
        'platform',
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
        '@webex/web-media-effects' // ✅ NEW LINE
      ]
    }
  },
  define: {
    global: 'globalThis'
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer/',
      process: 'process/browser'
    }
  },
  optimizeDeps: {
    include: ['buffer', 'process']
  }
});