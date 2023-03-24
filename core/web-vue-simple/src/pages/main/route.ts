import { RouteRecordRaw } from 'vue-router';
const component = () => import('./index.vue');
const route: RouteRecordRaw = {
  path: '/main',
  name: 'Main',
  component,
  meta: { keepAlive: true, requireAuth: false },
};
export default route;
