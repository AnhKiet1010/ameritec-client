import React, { useContext, Suspense, useEffect, lazy } from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import privateRoutes from "../routes/PrivateRoute";
import adminRoutes from "../routes/AdminRoute/admin";
import Accountant1Routes from "../routes/AdminRoute/accountant1";
import Accountant2Routes from "../routes/AdminRoute/accountant2";
import SystemRoutes from "../routes/AdminRoute/system";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("user")).user;
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    closeSidebar();
  }, [location]);

  var routes = [];
  if (user.role === "normal") {
    routes = privateRoutes;
  }
  if (user.role === "admin") {
    routes = adminRoutes;
  }
  if (user.role === "accountant1") {
    routes = Accountant1Routes;
  }
  if (user.role === "accountant2") {
    routes = Accountant2Routes;
  }
  if (user.role === "system") {
    routes = SystemRoutes;
  }

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header avatar={user.avatar} full_name={user.full_name} />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`${user.role === "normal" ? "/app" : "/admin"}${
                      route.path
                    }`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect exact from="/app" to="/app/dashboard" />
              <Redirect exact from="/admin" to="/admin/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
