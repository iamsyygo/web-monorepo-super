import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      resolvers: [ElementPlusResolver()],
      dts: 'src/@types/auto-imports.d.ts',
      exclude: [/node_modules/],
      eslintrc: {
        enabled: false, // 创建后关闭
        filepath: './.eslintrc.json',
        globalsPropValue: true,
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      extensions: ['vue'],
      dts: 'src/@types/components.d.ts',
      exclude: [/node_modules/],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        // target: 'http://localhost:8080',
      },
    },
  },
});
