import { defineConfig } from 'vite';
import * as path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import viteCompression from 'vite-plugin-compression';
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
      svgoOptions: true,
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
    viteCompression({
      verbose: true,
      disable: false,
      // filter:()=>{}, // 那些资源不压缩
      threshold: 1024 * 50, // 体积大于 threshold 才会被压缩,单位 b
      deleteOriginFile: false, // 压缩后是否删除源文件
      algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz', // 生成的压缩包后缀
    }),
  ],
});
