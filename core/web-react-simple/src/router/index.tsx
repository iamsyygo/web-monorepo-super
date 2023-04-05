import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/find-music/recommend" />,
  },
  {
    path: '/find-music',
    Component: lazy(() => import('@/pages/find-music')),
    children: [
      {
        path: '/find-music/recommend',
        Component: lazy(() => import('@/pages/find-music/recommend')),
      },
      {
        path: '/find-music/ranking',
        Component: lazy(() => import('@/pages/find-music/ranking')),
      },
      {
        path: '/find-music/dj',
        Component: lazy(() => import('@/pages/find-music/dj')),
      },
      {
        path: '/find-music/new-music',
        Component: lazy(() => import('@/pages/find-music/new-music')),
      },
      {
        path: '/find-music/singer',
        Component: lazy(() => import('@/pages/find-music/singer')),
      },
      {
        path: '/find-music/song-list',
        Component: lazy(() => import('@/pages/find-music/song-list')),
      },
    ],
  },
  {
    path: '/me-music',
    Component: lazy(() => import('@/pages/me-music')),
  },
];

export default routes;
