import { getCoreFolders } from './index.js';

export default {
  description: '创建一个新的 vue 页面(page、route、api)',
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
    {
      type: 'input',
      name: 'path',
      message: '请输入页面路径(相对于项目中 src/pages, e.g. user/login)',
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }
        return '路径不能为空';
      },
    },
    // {
    //   type: 'select',
    //   name: 'type',
    //   message: '请选择页面类型',
    //   choices: [
    //     { title: '普通页面', value: 'normal' },
    //     { title: '弹窗页面', value: 'modal' },
    //   ],
    // },
    {
      type: 'input',
      name: 'title',
      message: '请输入页面标题',
    },
    {
      type: 'confirm',
      name: 'isAuth',
      default: true,
      message: '是否需要控制权限?',
    },
    {
      type: 'confirm',
      name: 'isKeepAlive',
      default: true,
      message: '是否需要缓存?',
    },
    {
      type: 'confirm',
      name: 'showMenu',
      default: true,
      message: '是否需要显示菜单栏?',
    },
  ],
  actions(data) {
    // 获取最后一个路径作为页面名称
    const enPath = data.path.split('/').pop();

    return [
      // Add Page
      {
        type: 'add',
        path: '{{proPath}}/src/pages/{{path}}/index.vue',
        templateFile: 'plop/templates/page.vue.hbs',
      },
      // {
      //   type: 'add',
      //   path: 'src/pages/{{path}}/index.ts',
      //   templateFile: 'plop/templates/page.ts.hbs',
      // },
      // Add Route
      {
        type: 'add',
        path: '{{proPath}}/src/pages/{{path}}/route.ts',
        templateFile: 'plop/templates/route.ts.hbs',
        data: {
          enPath,
          ...data,
        },
      },
      // Add Api
      {
        type: 'add',
        path: '{{proPath}}/src/api/{{path}}.ts',
        templateFile: 'plop/templates/api.ts.hbs',
      },
      // Append Route
      {
        type: 'append',
        path: '{{proPath}}/src/router/routes.ts',
        pattern: '/* PLOP_INJECT_ROUTE */',
        template: `import ${enPath}Route from '@/pages/{{path}}/route';`,
      },
      {
        type: 'append',
        path: '{{proPath}}/src/router/routes.ts',
        pattern: '/* PLOP_PROVIDE_ROUTE */',
        template: ` ${enPath}Route,`,
      },
      // Append Api
      {
        type: 'append',
        path: '{{proPath}}/src/api/index.ts',
        pattern: '/* PLOP_INJECT_API */',
        template: `export * from '@/api/{{path}}';`,
      },
    ];
  },
};
