import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { theme } from 'antd';
// const { defaultAlgorithm, defaultSeed } = theme;
import { resolve } from 'path';

// const THEME_CONF = defaultAlgorithm(defaultSeed);

const resolvePath = (path: string) => resolve(__dirname, path);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': resolvePath('src'),
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 定义全局的 less 变量
        // globalVars: {
        //   'primary-color': THEME_CONF['colorPrimary'],
        // },
      },
    },
  },

  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://192.168.31.119:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
