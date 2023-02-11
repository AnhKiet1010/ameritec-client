import { lazy } from 'react';

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../../pages/Admin/Dashboard'));
const UserList = lazy(() => import('../../pages/Admin/UserList'));
const Activate = lazy(() => import('../../pages/Admin/Active'));
const Commission = lazy(() => import('../../pages/Admin/Commission'));
const CommissionDetail = lazy(() => import('../../pages/Admin/CommissionDetail'));
const UserProfile = lazy(() => import('../../pages/Admin/UserProfile'));

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/users',
    component: UserList,
  },
  {
    path: '/user/:id',
    component: UserProfile,
  },
  {
    path: '/commission',
    component: Commission,
  },
  {
    path: '/commission/:id',
    component: CommissionDetail,
  },
  {
    path: '/active',
    component: Activate,
  }
]

export default routes
