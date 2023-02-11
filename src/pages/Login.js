import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";

import ImageLight from "../assets/img/create-account-office.jpeg";
// import { FacebookIcon, GoogleIcon } from "../icons";
import { Button, Modal, ModalHeader, ModalBody } from "@windmill/react-ui";
import InputField from "../components/CustomFields/input-field";
import Spinner from "../components/Spinner";
import API from "../api/API";
import { LOGIN } from "../slices/authSlice";
import LOGO from '../assets/img/logo-ameritec.png';
import { useTranslation } from "react-i18next";
import SelectLanguageField from '../components/SelectLanguageField';
import VN_FLAG from "../assets/img/vietnam.svg";
import EN_FLAG from "../assets/img/united-states.svg";
import logo from "../assets/img/logo-ameritec.png";


function Login({match}) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const history = useHistory();
  const dispatch = useDispatch();
  // const [isModalOpen, setIsModalOpen] = useState(!language ? false : true);
  document.title = "Ameritec || " +  t("Đăng Nhập");

  // function handleClickVi() {
  //   i18n.changeLanguage("vi");
  //   setIsModalOpen(false);
  // }

  // function handleClickEn() {
  //   i18n.changeLanguage("en");
  //   setIsModalOpen(false);
  // }

  const initialValues = {
    acc: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    acc: Yup.string().required(t("Vui lòng điền Email hoặc SĐT")),
    password: Yup.string().required(t("Vui lòng điền mật khẩu")),
  });

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    const body = { acc: values.acc, password: values.password };
    let message = t("Đã xảy ra lỗi vui lòng thử lại sau");
    API.login(body)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          const actionLogin = LOGIN({
            accessToken: res.data.data.access_token,
            user: res.data.data.user,
          });
          dispatch(actionLogin);
          setSubmitting(false);
          if (res.data.data.user.role === "normal") {
            history.push("/app");
          } else {
            history.push("/admin");
          }
        }
        if (status === 400) {
          setFieldError("acc", t("Email hoặc mật khẩu không đúng"));
          setFieldError("password", t("Email hoặc mật khẩu không đúng"));
          setSubmitting(false);
        }
        if (status === 401) {
          toast.error(t("Tài khoản của Bạn đã hết hạn! Vui lòng liên hệ Công Ty"))
          setSubmitting(false);
        }
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error(message);
      });
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      {/* <Modal isOpen={isModalOpen}>
          <ModalHeader className="mb-4 flex flex-col md:flex-row items-center justify-center">
                <img src={logo} width={100} />
                CHỌN THỊ TRƯỜNG/ CHOOSE MARKET
          </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-6">
            <div onClick={handleClickVi} className="flex flex-col items-center gap-2 hover:bg-gray-200 cursor-pointer py-3 rounded-lg">
              <div className="font-semibold text-lg rounded-lg bg-blue-500 px-4 py-2 text-white">Việt Nam</div>
            </div>
            <div onClick={handleClickEn} className="flex flex-col items-center gap-2 hover:bg-gray-200 cursor-pointer py-3 rounded-lg">
            <div className="font-semibold text-lg rounded-lg bg-blue-500 px-4 py-2 text-white">Global</div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <div className={`flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800`}>
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center px-6 sm:px-12 sm:pt-4 sm:pb-10 md:w-1/2">
            <div className="w-full">
              <a href={`${process.env.REACT_APP_CLIENT_URL}`} className="w-max mx-auto"><img className="mx-auto mb-2" src={LOGO} width="120px" /></a>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  {t("Đăng Nhập")}
                </h1>
                <SelectLanguageField />
              </div>
              <hr className="my-8" />
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(formikProps) => {
                  const { isSubmitting } = formikProps;

                  return (
                    <Form className="">
                      <Field
                        component={InputField}
                        name="acc"
                        type="text"
                        placeholder={t("Nhập Email")}
                        label="Email"
                      />
                      <Field
                        component={InputField}
                        name="password"
                        type="password"
                        placeholder={`${t("Nhập mật khẩu")}`}
                        label={`${t("Mật khẩu")}`}
                      />

                      <p className="mt-4">
                        <Link
                          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                          to="/forgot-password"
                        >
                          {`${t("Quên mật khẩu")}`}?
                        </Link>
                      </p>
                      <Button type="submit" className="mt-4" block>
                        {isSubmitting ? (
                          <Spinner />
                        ) : (
                          <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                        )}
                        <span>{`${t("Đăng nhập")}`}</span>
                      </Button>
                    </Form>
                  );
                }}
              </Formik>

              {/* <hr className="my-8" />

              <a
                href={`/referral/${process.env.REACT_APP_COMPANY_INVITE_CODE}/0`}
                type="submit"
                className="mt-4 w-full bg-red-500 text-sm font-medium hover:bg-red-700 text-white text-center rounded-lg py-2 px-4">
                <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                {`${t("Đăng ký")}`}
              </a> */}

              {/* <Button block layout="outline">
                <FacebookIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Facebook
              </Button>
              <Button className="mt-4" block layout="outline">
                <GoogleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Google
              </Button> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
