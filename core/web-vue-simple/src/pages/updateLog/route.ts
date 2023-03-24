import { RouteRecordRaw } from 'vue-router';
const component = () => import('./index.vue');
const route: RouteRecordRaw = {
  path: '/updateLog',
  name: 'UpdateLog',
  component,
  meta: {
    title: '更新日志',
    showMenu: false,
  },
};
export default route;
