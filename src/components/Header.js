import React, { useContext, useState, useEffect } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import {
  BellIcon,
  MenuIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext } from '@windmill/react-ui'
import { LOGOUT } from '../slices/authSlice';
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PIGGY from '../assets/img/piggy.gif';
import BONUS from '../assets/img/bonus.svg';
import '../assets/css/header.css';
import CLIENT from '../api/Client';
import SelectLanguageField from './SelectLanguageField';
import { CHANGE } from '../slices/piggySlice';
import { LIST_CHANGE } from '../slices/levelUpListSlice';
import { COUNT_NOTI_CHANGE } from '../slices/notiSlice';
import socket from '../helpers/socketConnect';
import { CHANGE_COUNT_REQUEST_USER } from '../slices/countRequestUserSlice';
import { useTranslation } from "react-i18next";

function Header({ full_name }) {
  const dispatch = useDispatch();
  const piggy = useSelector(state => state.piggy);
  const listLevel = useSelector(state => state.levelUpList);
  const noti = useSelector(state => state.noti);
  const countRequestUser = useSelector(state => state.countRequestUser);
  const role = JSON.parse(localStorage.getItem("user")).user.role;
  const id = JSON.parse(localStorage.getItem("user")).user.id;
  const { toggleSidebar } = useContext(SidebarContext);
  const { t, i18n } = useTranslation();

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  useEffect(() => {
    socket.on("AdminAddNoti", () => {
      const notiAction = COUNT_NOTI_CHANGE(noti + 1);
      dispatch(notiAction);
      if (role === 'normal') {
        toast.info(t("c?? th??ng b??o m???i"));
      }
    });


    socket.on("NewRequest", () => {
      const countRequestUserAction = CHANGE_COUNT_REQUEST_USER(countRequestUser + 1);
      dispatch(countRequestUserAction);
      if (role === 'admin') {
        toast.info(t("c?? y??u c???u m???i t??? Kh??ch H??ng"));
      }
    });

    socket.on("AdminChangeStatusRequest", (data) => {
      if (data.data === id) {
        toast.info(t("Admin ph???n h???i y??u c???u c???a B???n"));
      }
    });

    socket.on("AdminApproveCommission", (data) => {
      const piggyAction = CHANGE(piggy + parseInt(data.data));
      dispatch(piggyAction);
    });

    return () => {
      socket.off("AdminAddNoti");
      socket.off("NewRequest");
      socket.off("AdminChangeStatusRequest");
      socket.off("AdminApproveCommission");
    }
  });

  const removeAccents = (str) => {
    var AccentsMap = [
      "a??????????????????????????????????????????????",
      "A??????????????????????????????????????????????",
      "d??", "D??",
      "e??????????????????????????????",
      "E??????????????????????????????",
      "i????????????",
      "I????????????",
      "o??????????????????????????????????????????????",
      "O??????????????????????????????????????????????",
      "u?????????????????????????????",
      "U?????????????????????????????",
      "y??????????????",
      "Y??????????????"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }

  useEffect(() => {
    CLIENT.getHeaderDashBoard({ id })
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          const levelUpListAction = LIST_CHANGE(res.data.data.listLevelUpToday);
          const piggyAction = CHANGE(res.data.data.piggy);
          const notiAction = COUNT_NOTI_CHANGE(res.data.data.countNoti);
          dispatch(piggyAction);
          dispatch(levelUpListAction);
          dispatch(notiAction);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <header className="z-40 py-2 md:py-4 bg-white shadow-bottom dark:bg-gray-800">
      <ToastContainer />
      <div>
        <div className="container flex items-center justify-between lg:justify-end h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
          {/* <!-- Mobile hamburger --> */}
          <div className="flex items-center">
            <button
              className="p-1 md:mr-4 mr-2 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
              onClick={toggleSidebar}
              aria-label="Menu"
            >
              <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </button>
            <div className="flex items-center">
              <div className="lg:w-24 w-12">
                <img src={PIGGY} alt="piggy" className="w-full" />
              </div>
              <div className="lg:text-2xl md:text-xl text-md font-semibold text-red-500 animate">{piggy.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} $</div>
            </div>
          </div>
          {/* <!-- Search input --> */}
          <div className="flex-1 mx-6 overflow-x-hidden">
            {/* <marquee>
              {
                listLevel && listLevel.map(ele =>
                  <span className="md:text-lg text-md text-blue-800 font-semibold mx-4 hidden sm:inline" key={ele._id}>
                    {t('Xin Ch??c m???ng t??i kho???n')} <span className="uppercase">{i18n.language.includes('vi') ? ele.full_name : removeAccents(ele.full_name)}</span> {t('???? ?????t b?????c')} {ele.level}</span>
                )}
            </marquee> */}
          </div>
          <ul className="flex items-center justify-end flex-shrink-0 md:space-x-6 space-x-3">
            {/* <!-- Profile menu --> */}
            <li className="relative hidden md:block">
              <button
                className="focus:outline-none"
                onClick={handleProfileClick}
                aria-label="Account"
                aria-haspopup="true"
              >
                <h2 className="lg:text-lg text-sm">{full_name}</h2>
              </button>
              <Dropdown
                align="right"
                isOpen={isProfileMenuOpen}
                onClose={() => setIsProfileMenuOpen(false)}
                className="z-50"
              >
                {/* <DropdownItem tag="a" href="./profile" className="focus:outline-none">
                  <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>H??? s??</span>
                </DropdownItem>
                <DropdownItem tag="a" href="./profile" className="focus:outline-none">
                  <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>C??i ?????t</span>
                </DropdownItem> */}
                <DropdownItem className="focus:outline-none" onClick={() => {
                  const action = LOGOUT();
                  dispatch(action);
                  return <Redirect to="/login" />;
                }}>
                  <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>{t('????ng xu???t')}</span>
                </DropdownItem>
              </Dropdown>
            </li>
            {/* <!-- Notifications menu --> */}
            {
              role === 'normal' &&
              <li className="relative hidden md:block">
                <button
                  className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                  onClick={handleNotificationsClick}
                  aria-label="Notifications"
                  aria-haspopup="true"
                >
                  <BellIcon className="w-5 h-5 md:w-8 md:h-8" aria-hidden="true" />
                  {
                    noti > 0 && <span
                      aria-hidden="true"
                      className="absolute top-0 right-0 inline-block w-4 h-4 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                    ></span>
                  }
                </button>

                <Dropdown
                  align="right"
                  isOpen={isNotificationsMenuOpen}
                  onClose={() => setIsNotificationsMenuOpen(false)}
                >
                  <DropdownItem tag="a" href="/app/policy" className="justify-between">
                    <span>{t('Th??ng b??o')}</span>
                    {
                      noti > 0 && <Badge type="danger">{noti}</Badge>
                    }
                  </DropdownItem>
                </Dropdown>
              </li>
            }
            <li className="relative">
              <SelectLanguageField />
            </li>
          </ul>
        </div>
        <div className="px-4 overflow-x-hidden">
          {/* <marquee>
            {
              listLevel && listLevel.map(ele =>
                <span className="mx-4 text-sm text-blue-600 font-semibold sm:hidden">{t('Xin Ch??c m???ng t??i kho???n')} <span className="uppercase">{ele.full_name}</span> {t('???? ?????t b?????c')} {ele.level}</span>
              )}
          </marquee> */}
        </div>
      </div>

    </header>
  )
}

export default Header
