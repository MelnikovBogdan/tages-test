import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcertPlugin from 'vite-plugin-mkcert'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mkcertPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: 'static/*',
          dest: 'static',
        },
      ],
    }),
  ],
  base: '/tages-test/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'static': fileURLToPath(new URL('./static', import.meta.url)),
    },
  },
})
