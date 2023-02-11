import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../../pages/Dashboard'))
// const Tree = lazy(() => import('../../pages/Tree'))
const Tree = lazy(() => import('../../pages/Tree'))
const Receipts = lazy(() => import('../../pages/Receipts'))
const InviteCode = lazy(() => import('../../pages/InviteCode'))
const Profile = lazy(() => import('../../pages/Profile'))
const Upgrade = lazy(() => import('../../pages/Upgrade'))
const Payment = lazy(() => import('../../pages/Payment'))
const Policy = lazy(() => import('../../pages/Policy'))
const Page404 = lazy(() => import('../../pages/404'))
const CreateRequest = lazy(() => import('../../pages/CreateRequest'))
const PolicyDetail = lazy(() => import('../../pages/PolicyDetail'))

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/tree',
    component: Tree,
  },
  {
    path: '/receipts',
    component: Receipts,
  },
  {
    path: '/payment/:id',
    component: Payment,
  },
  {
    path: '/invite-code',
    component: InviteCode,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/upgrade',
    component: Upgrade,
  },
  {
    path: '/policy',
    component: Policy,
  },
  {
    path: '/policy/:id',
    component: PolicyDetail,
  },
  {
    path: '/create-request',
    component: CreateRequest,
  },
  {
    path: '/404',
    component: Page404,
  },
]

export default routes
