# Pnpm - Workspace(Monorepo) - Vue - React - Vite

## 🪂 What is this?

> 这是一个基于 pnpm 的 monorepo 项目，包含了 vue、react、vite 等技术栈.
> 使用 monorepo 的好处是可以在一个项目中管理多个子项目，子项目之间可以相互依赖，也可以独立运行.

## 🥽 How to use?

```bash
# 创建根目录并初始化
pnpm init

# 创建 pnpm-workspace.yaml 文件 - 用于配置子项目
touch pnpm-workspace.yaml
```

```yaml
# pnpm-workspace.yaml
packages:
  # all packages in direct subdirs of packages/
  - 'packages/*'
  - 'core/*'
  # all packages in subdirs of components/
  - 'components/**'
  # all packages in subdirs of utils/
  - 'utils/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```

只允许使用 pnpm 安装依赖，不允许使用 npm 或 yarn.

```js
// package.json
{
  "private": true,
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

## 📦 Core

> Core 是一个基于 vite 的 monorepo 项目，包含了 vue、react、vite 等技术栈.

```bash
mkdir core
cd core

# 创建子项目
pnpm create @vitejs/app web-vue-simple --template vue

# 安装依赖，这里是在当前项目中安装依赖
pnpm i

# 如果是一些公共的依赖，可以在根目录中安装，之后所有的子项目都可以使用
cd ..
pnpm i
# -W
pnpm i -W @vue/runtime-core

# 单独给子项目安装依赖，如  --filter === -F
pnpm --filter @core/web-vue-simple add vue-router
# or
cd core/web-vue-simple
pnpm add vue-router
```

在根目录运行 Core 项目，修改根目录下的 package.json

```json
{
  "scripts": {
    "dev": "pnpm --filter @core/web-vue-simple start"
  }
}

# start 对应的是子项目中的 package.json 中的 scripts
```

## 创建.npmrc

> .npmrc 文件用于配置 pnpm 的一些参数，如：registry、store-dir 等.
> 作用是为了保证所有的子项目都使用相同的配置.

```bash
# 创建 .npmrc 文件
touch .npmrc

# 配置 registry - 配置淘宝镜像
registry=https://registry.npm.taobao.org

# 配置 store-dir - 配置缓存目录
store-dir=.pnpm-store

# 配置 shared-workspace-shrinkwrap - 配置共享依赖
shared-workspace-shrinkwrap=true

# ...

```

## 🔧 Utils

同理，可以创建 utils 目录，用于存放一些公共的工具类.

## 🧳 Components

同理，可以创建 components 目录，用于存放一些 vue、react 等组件.

### 模块之间依赖

```bash
# 在 core 中安装 @utils/xxx
pnpm --filter @core/web-vue-simple add @utils/xxx
```

注意：如果依赖的模块中需要一些编译解析器，则需要在根目录或者模块目录中安装(or 打包)，否则会(打包)报错.

在子项目中 package.json 通常会为了方便管理给模块命名，如：

```json
{
  "name": "@core/web-vue-simple",
  "version": "0.0.1",
  "dependencies": {
    "@utils/xxx": "workspace:*"
  }
}
```

## 统一管理项目规范

> 统一在根目录中管理项目规范，如：eslint、prettier、commitlint、husky、lint-staged 等.
> 这样可以保证所有的子项目都遵循相同的规范.

安装 ESlint

```bash
pnpm add eslint -Dw

pnpm add prettier -Dw

# 初始化
pnpm eslint --init
```

默认的配置中 eslint 的 parser 解析器是 @typescript-eslint/parser，但是使用 vue 时项目时，会报错，所以需要修改为 vue-eslint-parser.

```json
{
+ "parser": "vue-eslint-parser",
  "parserOptions": {
  + "parser": "@typescript-eslint/parser",
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

Vue 项目中使用如 class 语法时，会报错，解决办法是在项目目录 ts 配置文件中

```js
"compilerOptions": {
   + "types": ["vite/client"]
  }
```

React 仅需安装 `eslint-plugin-react`，其他的插件都是通用的，后续需要再补充.

## 📚 基本命令

-W 表示安装在全局的 workspace 里， 这样所有 package 都可以共用该文件
-WD 是 -W -D 的缩写， -D 表示安装在 devDependencies
...待补充

### 使用 vite 创建项目

```bash
pnpm create vite web-react-simple --template react-ts
```

**默认情况下创建的初始化项目依赖都是一些公共的依赖，如：react、react-dom、react-router-dom、typescript 等，已经统一在根目录中安装，所以在子项目中不需要再安装，否则会报错，所以需要删除子项目中的依赖避险重复安装**

```json
// 修改项目名称
"name": "@core/web-react-simple",

// react/package.json
{
  "dependencies": {
    - "react": "^17.0.2",
    - "react-dom": "^17.0.2",
    - "react-router-dom": "^5.2.0",
    - "typescript": "^4.2.4"
  }
}

// vue/package.json
{
  "dependencies": {
    - "vue": "^3.0.11",
    - "vue-router": "^4.0.8",
    - "typescript": "^4.2.4"
  }
}

// 根目录 - package.json
{
  "dependencies": {
    + "react": "^18.2.0",
    + "vue": "^3.2.45",
    + "react-dom": "^18.2.0"
  },
  "dependencies": {
    + "react": "^17.0.2",
    + "react-dom": "^17.0.2",
    + "react-router-dom": "^5.2.0",
    + "vue": "^3.0.11",
    + "vue-router": "^4.0.8",
    + "typescript": "^4.2.4"
    // ...
  }
}
```

完成后对各个项目进行安装依赖
如需要安装其他依赖，可以根据情况在根目录或者子项目中安装.

定义根目录下的启动命令

```json
// 根目录 - package.json
{
  "scripts": {
    "dev:vue:simple": "pnpm --filter @core/web-vue-simple dev"

  - "dev:vue:simple": "pnpm dev --filter @core/web-vue-simple" // 无效?
  }
}
```



## 🎒 Icon 包管理

> 考虑到多个项目使用到相同的图标，所以这里将 icon 与 svg 图标统一放到 Utils 下进行独立管理生成一个图标库，然后项目中进行安装 icon 包进行使用

1、在 Utils 下创建 monorepo 子项目 icon

`pnpm init`

2、更改项目名称 `@utils/icon`，添加脚本`"build" : "vite build"`

3、创建 `src/icons/svg` 目录用于存放 svg 图标文件

4、将其它的，如：iconfont 下载的文件复制到 `src/icons` 下，对这些文件也进行统一的管理

5、使用 vite 进行打包构建，创建 vite.config.js

6、安装打包依赖`vite-plugin-svg-icons`、`svgo`

```js
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
      output: {},
    },
  },
  plugins: [
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
     
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

```

7、执行 pnpm build

8、在使用的项目中，执行 `pnpm -F 使用的目录名称 add @utils/icons`

9、OKK👌
