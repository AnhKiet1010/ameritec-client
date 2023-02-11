import { lazy } from 'react';

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../../pages/Admin/Dashboard'));
const Tree = lazy(() => import('../../pages/Admin/Tree'));

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/tree/:id',
    component: Tree,
  },
]

export default routes
