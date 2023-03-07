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
    "dev": "pnpm start --filter @core/web-vue-simple"
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

## 📚 基本命令

-C, --dir <dir> - 指定工作目录
-F, --filter <filter> - 指定过滤器
-W 表示安装在全局的 workspace 里， 这样所有 package 都可以共用该文件
-WD 是 -W -D 的缩写， -D 表示安装在 devDependencies
