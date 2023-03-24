import { getCoreFolders } from './index.js';

export default {
  description: '初始化一个 vue 项目的 plop 配置',
  prompts: [
    {
      type: 'list',
      name: 'proPath', // 项目路径
      message: '请选择在哪个项目下创建页面',
      choices: getCoreFolders('core', 'web-vue').map((item) => ({
        title: item,
        value: `core/${item}`,
      })),
    },
  ],
  actions(data) {
    return [
      // init Api
      {
        type: 'add',
        path: '{{proPath}}/src/api/index.ts',
        template: `/* PLOP_INJECT_API */`,
      },
      // init Route
      {
        type: 'add',
        path: '{{proPath}}/src/router/routes.ts',
        template: `/* PLOP_INJECT_ROUTE */
export default [
    /* PLOP_PROVIDE_ROUTE */
];`,
      },
      {
        type: 'add',
        path: '{{proPath}}/src/router/index.ts',
        template: `import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;`,
      },
      // init Store
      {
        type: 'add',
        path: '{{proPath}}/src/store/index.ts',
        template: `import { createPinia } from 'pinia';

/* PLOP_INJECT_IMPORT */
export default createPinia();`,
      },
      // init Utils
      {
        type: 'add',
        path: '{{proPath}}/src/utils/index.ts',
        template: ``,
      },
      // update package.json - name & version & clean dependencies and devDependencies & add scripts & add author
      {
        type: 'modify',
        path: '{{proPath}}/package.json',
        pattern: /"name": "(.*)",/g,
        template: `"name": "@core/{{proPath}}",`,
      },
      {
        type: 'modify',
        path: '{{proPath}}/package.json',
        pattern: /"version": "(.*)",/g,
        template: `"version": "0.0.1",`,
      },
      {
        type: 'modify',
        path: '{{proPath}}/package.json',
        pattern: /"dependencies": {([\s\S]*?)},/g,
        template: `"dependencies": {},`,
      },
      {
        type: 'modify',
        path: '{{proPath}}/package.json',
        pattern: /"devDependencies": {([\s\S]*?)},/g,
        template: `"devDependencies": {},`,
      },
      {
        type: 'append',
        path: './package.json',
        pattern: '"scripts": {',
        template: `"dev:vue:{{proPath}}": "pnpm --filter @core/{{proPath}} dev",`,
      },
    ];
  },
};
