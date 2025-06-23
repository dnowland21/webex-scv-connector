import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        '@webex/internal-plugin-metrics',
        '@webex/web-media-effects',
        'globalThis'
      ]
    }
  },
  optimizeDeps: {
    exclude: [
      '@webex/internal-plugin-metrics',
      '@webex/web-media-effects'
    ]
  }
});