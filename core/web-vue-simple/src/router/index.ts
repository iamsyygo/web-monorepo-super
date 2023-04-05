import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';
import mainRoute from '@/pages/main/route';
import allRoutes from './routes';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    ...mainRoute,
    children: [...allRoutes],
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

router.afterEach((to, from) => {
  document.title = (to.meta.title as string) || 'Dev';
});
export default router;
