import { defineConfig } from 'vite';
import * as path from 'path';
import dts from 'vite-plugin-dts';
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      // external: ['css-color-function'],
      output: [
        {
          // 打包格式
          format: 'es',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: path.resolve(__dirname, 'es'),
        },
        {
          // 打包格式
          format: 'cjs',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: path.resolve(__dirname, 'lib'),
        },
      ],
    },
  },
  plugins: [
    dts({
      tsConfigFilePath: 'tsconfig.json',
    }),
    dts({
      outputDir: 'lib',
      tsConfigFilePath: 'tsconfig.json',
    }),
  ],
});
