import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import federation from '@originjs/vite-plugin-federation';

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
    federation({
      name: 'web-vue-simple',
      filename: 'remote-entry.js',
      // 注意处理跨域
      remotes: {
        'web-vue-components':
          'http://192.168.31.119:8081/assets/remote-entry.js',
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
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('origin', 'http://localhost:8080');
          });
        },
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    // 允许跨域
    cors: true,
  },
});
