import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: 'es',
    // 压缩
    //minify: false,
    // css分离
    cssCodeSplit: true,
    rollupOptions: {
      // 忽略打包 vue 文件
      external: ['vue'],
      input: ['index.ts'],
      output: [
        {
          // 打包格式
          format: 'es',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: 'es',
        },
        {
          // 打包格式
          format: 'cjs',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: 'lib',
        },
      ],
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    vue(),
    dts({
      tsConfigFilePath: 'tsconfig.json',
    }),
    dts({
      outputDir: 'lib',
      tsConfigFilePath: 'tsconfig.json',
    }),
  ],
});
