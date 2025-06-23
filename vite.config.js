// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      external: [
        '@webex/internal-plugin-metrics',
        '@webex/web-media-effects',
        '@webex/media-core',
        '@webex/webrtc-core'
      ],
      output: {
        globals: {
          '@webex/internal-plugin-metrics': 'WebexInternalPluginMetrics',
          '@webex/web-media-effects': 'WebMediaEffects',
          '@webex/media-core': 'WebexMediaCore',
          '@webex/webrtc-core': 'WebexWebRTC'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@webex/calling']
  },
  server: {
    port: 3000,
    open: true
  }
});