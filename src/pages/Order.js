import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { Modal, ModalHeader, ModalBody } from "@windmill/react-ui";
import API from "../api/API";
import "react-confirm-alert/src/react-confirm-alert.css";
import personPackage from "../assets/img/personPackage.png";
import startupPackage from "../assets/img/startupPackage.png";
import bussinessPackage from "../assets/img/bussinessPackage.png";
import bussinessPackageB from "../assets/img/bussinessPackageB.png";
import "../assets/css/Payment.css";
import { useTranslation } from "react-i18next";
import VN_FLAG from "../assets/img/vietnam.svg";
import EN_FLAG from "../assets/img/united-states.svg";
import logo from "../assets/img/logo-ameritec.png";

const Order = ({ match }) => {
  const history = useHistory();
  const invite_code = match.params.invite_code ? match.params.invite_code : "";
  const donate_sales_id = match.params.donate_sales_id
    ? match.params.donate_sales_id
    : match.params.invite_code;
  const group = match.params.group ? match.params.group : "";
  const { t, i18n } = useTranslation();
  const [pricePrivate, setPricePrivate] = useState(0);
  const [priceStartup, setPriceStartup] = useState(0);
  const [priceBusiness, setPriceBusiness] = useState(0);
  const [priceBusinessB, setPriceBusinessB] = useState(0);
  const [activePrivate, setActivePrivate] = useState(true);
  const [activeStartup, setActiveStartup] = useState(true);
  const [activeBusiness, setActiveBusiness] = useState(true);
  const [activeBusinessB, setActiveBusinessB] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);

  function handleClickVi() {
    i18n.changeLanguage("vi");
    setIsModalOpen(false);
  }

  function handleClickEn() {
    i18n.changeLanguage("en");
    setIsModalOpen(false);
  }

  useEffect(() => {
    document.title = "Ameritec || " + t("Lựa chọn gói bảo mật");

    if (invite_code === "" || group === "") {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui dark:text-white dark:bg-gray-900">
              <h1>‼ Thông Báo ‼</h1>
              <p>Link giới thiệu không đúng! Vui lòng kiểm tra lại!</p>
              <br />
              <h4>
                Xin Cảm Ơn{" "}
                <span role="img" aria-label="emoji">
                  😊
                </span>
              </h4>
              <button
                onClick={() => {
                  onClose();
                  history.push("/");
                }}
              >
                Trở về
              </button>
            </div>
          );
        },
      });
    } else {
      const body = { invite_code, donate_sales_id, group };
      let message = t("Đã xảy ra lỗi vui lòng thử lại sau");
      API.checkLink(body)
        .then((res) => {
          const status = res.data.status;
          if (status !== 200) {
            confirmAlert({
              customUI: ({ onClose }) => {
                return (
                  <div className="custom-ui dark:text-white dark:bg-gray-900">
                    <h1>
                      <span role="img" aria-label="emoji">
                        🎉
                      </span>{" "}
                      Thông Báo{" "}
                      <span role="img" aria-label="emoji">
                        🎉
                      </span>
                    </h1>
                    <p>Link giới thiệu không đúng! Vui lòng kiểm tra lại!</p>
                    <br />
                    <h4>
                      Xin Cảm Ơn{" "}
                      <span role="img" aria-label="emoji">
                        😊
                      </span>
                    </h4>
                    <button
                      onClick={() => {
                        onClose();
                        history.push("/");
                      }}
                    >
                      Trở về
                    </button>
                  </div>
                );
              },
              closeOnEscape: false,
              closeOnClickOutside: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(message);
        });
    }

    API.getPackageList({ lang: i18n.language })
      .then((res) => {
        setPricePrivate(res.data.data.pricePrivate);
        setPriceStartup(res.data.data.priceStartup);
        setPriceBusiness(res.data.data.priceBusiness);
        setPriceBusinessB(res.data.data.priceBusinessB);
        setActivePrivate(res.data.data.activePrivate);
        setActiveStartup(res.data.data.activeStartup);
        setActiveBusiness(res.data.data.activeBusiness);
        setActiveBusinessB(res.data.data.activeBusinessB);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [i18n.language]);

  return (
    <div>
      <ToastContainer />
      <Modal isOpen={isModalOpen}>
        <ModalHeader className="mb-4 flex flex-col md:flex-row items-center justify-center">
          <img src={logo} width={100} />
          <p className="text-lg md:text-md text-center">
            CHỌN THỊ TRƯỜNG/ CHOOSE MARKET
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-6">
            <div
              onClick={handleClickVi}
              className="flex flex-col items-center gap-2 hover:bg-gray-200 cursor-pointer py-3 rounded-lg"
            >
              {/* <div className="w-32"><img src={VN_FLAG} className="w-full" /></div> */}
              <div className="font-semibold text-lg rounded-lg bg-blue-500 px-4 py-2 text-white">
                Việt Nam
              </div>
            </div>
            <div
              onClick={handleClickEn}
              className="flex flex-col items-center gap-2 hover:bg-gray-200 cursor-pointer py-3 rounded-lg"
            >
              {/* <div className="w-32"><img src={EN_FLAG} className="w-full" /></div> */}
              <div className="font-semibold text-lg rounded-lg bg-blue-500 px-4 py-2 text-white">
                Global
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <div
        className={`w-full min-h-screen p-10 flex flex-col items-center justify-center ${
          isModalOpen ? "hidden" : ""
        }`}
      >
        <div className="text-center text-4xl font-bold mb-10">
          {t("Lựa chọn gói bảo mật")}
        </div>
        <div className=" flex flex-col-reverse xl:flex-row items-center">
          {/* 1 card */}
          {activePrivate && (
            <div
              className="card flex mb-4 lg:mr-10 lg:mb-0 flex-col justify-center bg-white rounded-lg shadow-2xl"
              style={{ backgroundColor: "rgb(201 238 161)", height: "90%" }}
            >
              <div className="prod-title pt-5">
                <p className="text-2xl uppercase text-gray-900 font-bold">
                  {t("Gói Cá Nhân")}
                </p>
                <p className="uppercase text-sm text-gray-800">
                  (1 {t("THIẾT BỊ")})
                </p>
              </div>
              <div className="prod-img">
                <img
                  src={personPackage}
                  className="w-full object-cover object-center"
                />
              </div>
              <div className="prod-info grid gap-10">
                <div className="flex flex-col lg:flex-row px-5 pt-6 justify-between items-center text-gray-900">
                  <p className="font-bold text-xl">
                    {pricePrivate} {i18n.language === "vi" ? "VNĐ" : "$"}
                  </p>
                  <a
                    href={`/register/1/${invite_code}/${group}/${donate_sales_id}`}
                    className="px-6 py-2 duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                  >
                    {t("Mua hàng")}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="h-8 xl:hidden"></div>

          {/* 2 card */}
          {activeStartup && (
            <div
              className="card w-90 flex flex-col justify-center  mb-4 lg:mr-10 lg:mb-0 bg-white rounded-lg shadow-2xl"
              style={{ backgroundColor: "#8ac945", height: "95%" }}
            >
              <div className="prod-title p-5">
                <p className="text-2xl uppercase text-gray-900 font-bold">
                  {t("Gói Gia Đình")}
                </p>
                <p className="uppercase text-sm text-gray-800">
                  (4 {t("GIẤY PHÉP")}, 4 {t("THIẾT BỊ")})
                </p>
              </div>
              <div className="prod-img">
                <img
                  src={startupPackage}
                  className="w-full object-cover object-center"
                />
              </div>
              <div className="prod-info grid gap-10">
                <div className="flex flex-col lg:flex-row px-5 pt-6 justify-between items-center text-gray-900">
                  <p className="font-bold text-xl">
                    {priceStartup} {i18n.language === "vi" ? "VNĐ" : "$"}
                  </p>
                  <a
                    href={`/register/2/${invite_code}/${group}/${donate_sales_id}`}
                    className="relative px-6 py-2 duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                  >
                    {t("Mua hàng")}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="h-8 xl:hidden"></div>

          {/* 3 card */}
          {activeBusiness && (
            <div
              className="card w-90 flex flex-col mb-4 lg:mr-10 lg:mb-0 justify-center bg-white rounded-lg shadow-2xl"
              style={{ backgroundColor: "rgb(164 234 88)" }}
            >
              <div className="prod-title p-5">
                <p className="text-2xl uppercase text-gray-900 font-bold">
                  {t("Gói Doanh Nghiệp")} B
                </p>
                <p className="uppercase text-sm text-gray-800">
                  (16 {t("GIẤY PHÉP")}, 16 {t("THIẾT BỊ")})
                </p>
              </div>
              <div className="prod-img">
                <img
                  src={bussinessPackageB}
                  className="w-full object-cover object-center"
                />
              </div>
              <div className="prod-info grid gap-10">
                <div className="flex flex-col lg:flex-row px-5 pt-6 justify-between items-center text-gray-900">
                  <p className="font-bold text-xl">
                    {priceBusinessB} {i18n.language === "vi" ? "VNĐ" : "$"}
                  </p>
                  <a
                    href={`/register/4/${invite_code}/${group}/${donate_sales_id}`}
                    className="relative px-6 py-2 duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                  >
                    {t("Mua hàng")}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="h-8 xl:hidden"></div>

          {/* 3 card */}
          {activeBusiness && (
            <div
              className="card w-90 flex flex-col justify-center lg:mr-10 lg:mb-0 bg-white rounded-lg shadow-2xl"
              style={{ backgroundColor: "rgb(127 234 11)" }}
            >
              <div className="prod-title p-5">
                <p className="text-2xl uppercase text-gray-900 font-bold">
                  {t("Gói Doanh Nghiệp")} A
                </p>
                <p className="uppercase text-sm text-gray-800">
                  (40 {t("GIẤY PHÉP")}, 40 {t("THIẾT BỊ")})
                </p>
              </div>
              <div className="prod-img">
                <img
                  src={bussinessPackage}
                  className="w-full object-cover object-center"
                />
              </div>
              <div className="prod-info grid gap-10">
                <div className="flex flex-col lg:flex-row px-5 pt-6 justify-between items-center text-gray-900">
                  <p className="font-bold text-xl">
                    {priceBusiness} {i18n.language === "vi" ? "VNĐ" : "$"}
                  </p>
                  <a
                    href={`/register/3/${invite_code}/${group}/${donate_sales_id}`}
                    className="relative px-6 py-2 duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                  >
                    {t("Mua hàng")}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
