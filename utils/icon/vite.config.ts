import { defineConfig } from 'vite';
import * as path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
export default defineConfig({
  // 打包成单个js库
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'icon',
    },

    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      // external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
        //   vue: 'Vue',
        // },
      },
    },
  },
  plugins: [
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      // svgsToSymbols: true,
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
      /**
       * custom insert position
       * @default: body-last
       */
      inject: 'body-last',

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
  ],
});
