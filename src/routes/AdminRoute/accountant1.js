import { lazy } from 'react';

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../../pages/Admin/Dashboard'));
const UserList = lazy(() => import('../../pages/Admin/UserList'));
const Tree = lazy(() => import('../../pages/Admin/Tree'));
const Activate = lazy(() => import('../../pages/Admin/Active'));
const Commission = lazy(() => import('../../pages/Admin/Commission'));
const CommissionDetail = lazy(() => import('../../pages/Admin/CommissionDetail'));
const UserProfile = lazy(() => import('../../pages/Admin/UserProfile'));
const Activations = lazy(() => import('../../pages/Admin/Activations'));
const Policy = lazy(() => import('../../pages/Admin/Policy'));
const CreateBonus = lazy(() => import('../../pages/Admin/CreateBonus'));

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
    path: '/tree/:id',
    component: Tree,
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
    path: '/create-bonus/:id',
    component: CreateBonus,
  },
  {
    path: '/active',
    component: Activate,
  },
  {
    path: '/user/:id',
    component: UserProfile,
  },
  {
    path: '/storage',
    component: Activations,
  },
  {
    path: '/policy',
    component: Policy,
  },
]

export default routes
