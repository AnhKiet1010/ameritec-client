import { lazy } from 'react';

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../../pages/Admin/Dashboard'));
const UserList = lazy(() => import('../../pages/Admin/UserList'));
const Tree = lazy(() => import('../../pages/Admin/Tree'));
const Activate = lazy(() => import('../../pages/Admin/Active'));
const Commission = lazy(() => import('../../pages/Admin/Commission'));
const CommissionDetail = lazy(() => import('../../pages/Admin/CommissionDetail'));
const EditTree = lazy(() => import('../../pages/Admin/EditTree'));
const UserProfile = lazy(() => import('../../pages/Admin/UserProfile'));
const Activations = lazy(() => import('../../pages/Admin/Activations'));
const CreateAdmin = lazy(() => import('../../pages/Admin/CreateAdmin'));
const CreateBonus = lazy(() => import('../../pages/Admin/CreateBonus'));
const CreateUser = lazy(() => import('../../pages/Admin/CreateUser'));
const Policy = lazy(() => import('../../pages/Admin/Policy'));
const InviteCode = lazy(() => import('../../pages/Admin/InviteCode'));
const Request = lazy(() => import('../../pages/Admin/Request'));
const CreatePolicy = lazy(() => import('../../pages/Admin/CreatePolicy'));
const PolicyDetail = lazy(() => import('../../pages/Admin/PolicyDetail'));
const Package = lazy(() => import('../../pages/Admin/Package'));
const MailTemplate = lazy(() => import('../../pages/Admin/MailTemplate'));
const Trash = lazy(() => import('../../pages/Admin/Trash'));

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
    path: '/active',
    component: Activate,
  },
  {
    path: '/edit-tree',
    component: EditTree,
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
    path: '/create-admin',
    component: CreateAdmin,
  },
  {
    path: '/create-bonus/:id',
    component: CreateBonus,
  },
  {
    path: '/create-user',
    component: CreateUser,
  },
  {
    path: '/request',
    component: Request,
  },
  {
    path: '/invite-code',
    component: InviteCode,
  },
  {
    path: '/policy',
    component: Policy,
  },
  {
    path: '/create-policy',
    component: CreatePolicy,
  },
  {
    path: '/policy/:id',
    component: PolicyDetail,
  },
  {
    path: '/package',
    component: Package,
  },
  {
    path: '/mail-template',
    component: MailTemplate,
  },
  {
    path: '/trash',
    component: Trash,
  }
]

export default routes
