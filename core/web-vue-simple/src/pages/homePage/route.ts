import { RouteRecordRaw } from 'vue-router';
const component = () => import('./index.vue');
const route: RouteRecordRaw = {
  path: '/home-page',
  name: 'HomePage',
  component,
  meta: { title: '首页', keepAlive: false, requireAuth: false, showMenu: true },
};
export default route;
