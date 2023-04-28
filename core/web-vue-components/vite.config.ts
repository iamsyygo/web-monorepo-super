import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import federation from '@originjs/vite-plugin-federation';
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    // 模块联邦
    federation({
      name: 'web-vue-components',
      filename: 'remote-entry.js',
      exposes: {
        './App': './src/App.vue',
        './context-menu': './src/components/context-menu/index.vue',
      },
      shared: ['vue', 'element-plus'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: false,
    target: ['chrome89', 'edge89', 'firefox89', 'safari15'],
  },
  server: { host: true },
});
