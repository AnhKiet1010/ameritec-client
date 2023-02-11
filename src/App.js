import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import './App.css';
import { PrivateRoute, PublicRoute } from "./helpers/router";


const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Activate = lazy(() => import('./pages/Activate'));
const Home = lazy(() => import('./pages/Home'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Order = lazy(() => import('./pages/Order'));
const Payment = lazy(() => import('./pages/Payment'));
const Register = lazy(() => import('./pages/Register'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const NotFound = lazy(() => import('./pages/404'));
const Maintain = lazy(() => import('./pages/Maintain'));
const PolicyDetail = lazy(() => import('./pages/PolicyDetail'));

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute path="/register/:package/:invite_code/:group/:donate_sales_id" component={Register} />
          <PublicRoute path="/referral/:invite_code/:group/:donate_sales_id" component={Order} />
          <PublicRoute exact path="/referral/:invite_code/:group" component={Order} />
          <PublicRoute exact path="/payment/:id" component={Payment} />
          <PublicRoute path="/users/activate/:token" component={Activate} />
          <PublicRoute path='/users/password/reset/:token' component={ResetPassword} />
          <PublicRoute exact path='/payment/pay-success/:trans_id' component={PaymentSuccess} />
          <PublicRoute  exact path="/forgot-password" component={ForgotPassword} />
          <PublicRoute  exact path="/maintain" component={Maintain} />
          <PublicRoute  exact path="/policy/:id" component={PolicyDetail} />
          <Route exact path="/" component={Home} />

          <PrivateRoute path="/app" component={Layout} />
          <PrivateRoute path="/admin" component={Layout} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  )
}

export default App
