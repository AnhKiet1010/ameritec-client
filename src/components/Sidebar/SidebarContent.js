import React, { useEffect } from "react";
import privateRoutes from "../../routes/PrivateRoute/sidebar";
import adminRoutes from "../../routes/AdminRoute/adminSidebar";
import accountant1Routes from "../../routes/AdminRoute/accountant1Sidebar";
import accountant2Routes from "../../routes/AdminRoute/accountant2Sidebar";
import systemRoutes from "../../routes/AdminRoute/systemSidebar";
import { OutlineLogoutIcon, BellIcon } from "../../icons";
import { Badge } from "@windmill/react-ui";
import { NavLink, Route } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "@windmill/react-ui";
import LOGO_AMERITEC from "../../assets/img/logo-ameritec.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../slices/authSlice";
import ADMIN from "../../api/Admin";
import { useTranslation } from "react-i18next";
import { CHANGE_COUNT_PENDING_TRANS } from "../../slices/countPendingTransSlice";
import { CHANGE_COUNT_REQUEST_USER } from "../../slices/countRequestUserSlice";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function handleNavClick(route_path) {
  // console.log(route_path);
}

function SidebarContent() {
  const history = useHistory();
  const dispatch = useDispatch();
  const countPendingTrans = useSelector((state) => state.countPendingTrans);
  const countRequestUser = useSelector((state) => state.countRequestUser);
  const user = JSON.parse(localStorage.getItem("user")).user;
  const { t, i18n } = useTranslation();
  const noti = useSelector((state) => state.noti);

  useEffect(() => {
    ADMIN.getCountPendingList()
      .then((res) => {
        const countPendingTransAction = CHANGE_COUNT_PENDING_TRANS(
          parseInt(res.data.count)
        );
        dispatch(countPendingTransAction);
      })
      .catch((err) => {
        console.log(err);
      });

    ADMIN.countRequestUser()
      .then((res) => {
        const countRequestUserAction = CHANGE_COUNT_REQUEST_USER(
          parseInt(res.data.count)
        );
        dispatch(countRequestUserAction);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  var routes = [];
  if (user.role === "normal") {
    routes = privateRoutes;
  }
  if (user.role === "admin") {
    routes = adminRoutes;
  }
  if (user.role === "accountant1") {
    routes = accountant1Routes;
  }
  if (user.role === "accountant2") {
    routes = accountant2Routes;
  }
  if (user.role === "system") {
    routes = systemRoutes;
  }

  return (
    <div className="py-2 md:py-4 text-gray-500 dark:text-gray-400">
      <a
        className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        href="/"
      >
        <img src={LOGO_AMERITEC} alt="logo" className="m-auto" width="200" />
      </a>
      <div className="md:hidden flex justify-between px-10 text-purple-600">
        <h2 className="font-semibold">{user.full_name}</h2>
        <a
          href="/app/policy"
          className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
          aria-label="Notifications"
          aria-haspopup="true"
        >
          <BellIcon className="w-6 h-6" aria-hidden="true" />
          {noti > 0 && (
            <span
              aria-hidden="true"
              className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
            ></span>
          )}
        </a>
      </div>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name_vn} />
          ) : (
            <li className="relative px-6 py-3" key={route.name_vn}>
              <NavLink
                exact
                onClick={() => handleNavClick(route.path)}
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">
                  {i18n.language === "en" ? route.name_en : route.name_vn}
                </span>
                {route.path === "/admin/active" && countPendingTrans > 0 && (
                  <Badge type="danger" className="ml-2 font-semibold">
                    {countPendingTrans <= 5 ? countPendingTrans : "5+"}
                  </Badge>
                )}
                {route.path === "/admin/request" && countRequestUser > 0 && (
                  <Badge type="danger" className="ml-2 font-semibold">
                    {countRequestUser <= 5 ? countRequestUser : "5+"}
                  </Badge>
                )}
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
        <Button
          onClick={() => {
            const action = LOGOUT();
            dispatch(action);
            return history.push("/login");
          }}
        >
          <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          {t("Đăng xuất")}
        </Button>
      </div>
    </div>
  );
}

export default SidebarContent;
