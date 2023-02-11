import React, { useState } from "react";

import InputField from "../components/CustomFields/input-field";
import { FastField, Form, Formik } from "formik";
import Spinner from "../components/Spinner";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import CLIENT from "../api/Client";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function UpdateProfilePopup({ userData, onClose, setChange, setUserData }) {
  const [imgUrlMT, setImgUrlMT] = useState("");
  const [imgUrlMS, setImgUrlMS] = useState("");
  const { t } = useTranslation();

  const onSubmit = (values, actions) => {
    var formData = new FormData();

    formData.append("phone", values.phone);
    formData.append("password", values.password);
    formData.append("id", JSON.parse(localStorage.getItem("user")).user.id);
    formData.append("bank_name", values.bank_name);
    formData.append("bank_account", values.bank_account);
    formData.append("newPassword", values.newPassword);
    formData.append("confirmNewPassword", values.confirmNewPassword);
    formData.append("bank", values.bank);
    formData.append("request_commission", values.request_commission);
    formData.append("CMND_Front", values.CMND_Front);
    formData.append("CMND_Back", values.CMND_Back);

    CLIENT.editProfile(formData)
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          for (const error of res.data.errors) {
            actions.setFieldError(error.label, error.err_message);
          }
          toast.error(t("Wrong password"));
          actions.setSubmitting(false);
          onClose();
        } else {
          actions.setSubmitting(false);
          toast.success(t("Cập nhật thông tin thành công 🎉"));
          setUserData(res.data.data.newUser);
          setChange(res.data.data.change);
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    phone: userData.phone,
    bank: userData.bank,
    bank_name: userData.bank_name,
    bank_account: userData.bank_account,
    request_commission: userData.request_commission,
    newPassword: "",
    confirmNewPassword: "",
    password: "",
    CMND_Front: imgUrlMT,
    CMND_Back: imgUrlMS,
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    setImgUrlMT("");
    setImgUrlMS("");
  };

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required(t("Vui lòng điền số điện thoại"))
      .matches(phoneRegExp, t("Số điện thoại không đúng định dạng")),
    bank:
      userData.account_type === "vi"
        ? Yup.string().required(t("Vui lòng không để trống"))
        : Yup.string().nullable(),
    bank_account:
      userData.account_type === "vi"
        ? Yup.string().required(t("Vui lòng không để trống"))
        : Yup.string().nullable(),
    newPassword: Yup.string().matches(
      // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      // "Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường và một số"
      /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
      t("Mật khẩu phải chứa ít nhất 8 ký tự và một số")
    ),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      t("Không trùng khớp")
    ),
    bank_name:
      userData.account_type === "vi"
        ? Yup.string().required(t("Vui lòng không để trống"))
        : Yup.string().nullable(),
    password: Yup.string().required(t("Vui lòng không để trống")),
    request_commission:
      userData.account_type === "en"
        ? Yup.string().required("Please input Froms of receiving commissions")
        : Yup.string().nullable(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
      }}
    >
      {(formikProps) => {
        const { isSubmitting, setFieldValue } = formikProps;

        return (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <ToastContainer />
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:mb-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <Form
                  className="bg-white px-4 pt-5 sm:pt-6 overflow-y-auto"
                  style={{ maxHeight: "80vh" }}
                >
                  <div className="sm:flex sm:items-start">
                    <div className="bg-white px-8 pt-6 flex flex-col my-2">
                      <div className="-mx-3 md:flex">
                        <div
                          className={`${
                            userData.account_type === "vi"
                              ? "md:w-1/2"
                              : "w-full"
                          } px-3`}
                        >
                          <FastField
                            component={InputField}
                            name="phone"
                            type="text"
                            placeholder={t("Số điện thoại")}
                            label={t("Số điện thoại")}
                          />
                        </div>
                        {userData.account_type === "vi" && (
                          <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                            <FastField
                              component={InputField}
                              name="bank_name"
                              type="text"
                              placeholder={t("Tên tài khoản")}
                              label={t("Tên tài khoản")}
                            />
                          </div>
                        )}
                      </div>
                      {userData.account_type === "vi" && (
                        <div className="-mx-3 md:flex mb-1">
                          <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                            <FastField
                              component={InputField}
                              name="bank_account"
                              type="text"
                              placeholder={t("Số tài khoản")}
                              label={t("Số tài khoản")}
                            />
                          </div>
                          <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                            <FastField
                              component={InputField}
                              name="bank"
                              placeholder={t("Ngân hàng")}
                              label={t("Ngân hàng")}
                            />
                          </div>
                        </div>
                      )}

                      <div
                        className={`-mx-3 ${
                          userData.account_type === "vi" && "md:flex"
                        }`}
                      >
                        <div
                          className={`${
                            userData.account_type === "vi"
                              ? "md:w-1/2"
                              : "w-full"
                          } px-3`}
                        >
                          <FastField
                            component={InputField}
                            name="newPassword"
                            type="password"
                            placeholder={t("Mật khẩu mới")}
                            label={t("Mật khẩu mới")}
                          />
                        </div>
                        <div
                          className={`${
                            userData.account_type === "vi"
                              ? "md:w-1/2"
                              : "w-full"
                          } px-3 mb-3 md:mb-0`}
                        >
                          <FastField
                            component={InputField}
                            name="confirmNewPassword"
                            type="password"
                            placeholder={t("Nhập lại mật khẩu mới")}
                            label={t("Nhập lại mật khẩu mới")}
                          />
                        </div>
                      </div>
                      {userData.account_type === "vi" && (
                        <>
                          <div className="my-2">
                            <label
                              htmlFor="MT"
                              className="w-64 flex flex-col items-center m-auto px-1 py-6 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-400 hover:text-black"
                            >
                              {imgUrlMT !== "" ? (
                                <img
                                  src={imgUrlMT}
                                  width="150px"
                                  id="imgMT"
                                  alt="CMND"
                                />
                              ) : (
                                <>
                                  <svg
                                    className="w-8 h-8"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                  </svg>
                                  <span className="mt-2 text-xs text-center leading-normal">
                                    {t("Tải lên mặt trước CCCD hoặc CMND")}
                                  </span>
                                </>
                              )}
                            </label>
                            <input
                              id="MT"
                              name="cmndMT"
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                e.preventDefault();
                                let reader = new FileReader();
                                let file = e.target.files[0];
                                if (file && file.type.match("image.*")) {
                                  reader.readAsDataURL(file);
                                } else {
                                  setImgUrlMT(imgUrlMT);
                                }
                                reader.onloadend = function (e) {
                                  setFieldValue("CMND_Front", file);
                                  setImgUrlMT(reader.result);
                                };
                              }}
                              accept="image/*"
                            />
                          </div>
                          <div className="my-2">
                            <label
                              htmlFor="MS"
                              className="w-64 flex flex-col items-center m-auto px-1 py-6 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-400 hover:text-black"
                            >
                              {imgUrlMS !== "" ? (
                                <img
                                  src={imgUrlMS}
                                  width="150px"
                                  id="imgMS"
                                  alt="CMND"
                                />
                              ) : (
                                <>
                                  <svg
                                    className="w-8 h-8"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                  </svg>
                                  <span className="mt-2 text-xs text-center leading-normal">
                                    {t("Tải lên mặt sau CCCD hoặc CMND")}
                                  </span>
                                </>
                              )}
                            </label>
                            <input
                              id="MS"
                              name="cmndMS"
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                e.preventDefault();
                                let reader = new FileReader();
                                let file = e.target.files[0];
                                if (file && file.type.match("image.*")) {
                                  reader.readAsDataURL(file);
                                } else {
                                  setImgUrlMS(imgUrlMS);
                                }
                                reader.onloadend = function (e) {
                                  setFieldValue("CMND_Back", file);
                                  setImgUrlMS(reader.result);
                                };
                              }}
                              accept="image/*"
                            />
                          </div>
                          <div
                            onClick={handleDeleteImage}
                            className="w-full border-none focus:outline-none bg-red-600 text-white rounded-lg my-4 px-4 py-2 mx-auto text-sm text-center font-semibold"
                          >
                            {t("xóa ảnh")}
                          </div>
                        </>
                      )}
                      {userData.account_type === "en" && (
                        <>
                          <FastField
                            component={InputField}
                            name="request_commission"
                            type="text"
                            placeholder="Please input Froms of receiving commissions"
                            label="Froms of receiving commissions"
                          />
                          <span className="text-sm text-gray-500">
                            (Weekly payouts via Zelle, Venmo or PayPal. Example.
                            “Zelle: email@gmail.com” )
                          </span>
                        </>
                      )}
                      <div className="-mx-3 md:flex">
                        <div className="w-full px-3 my-3 md:mb-0">
                          <FastField
                            component={InputField}
                            name="password"
                            type="password"
                            placeholder={t("Mật khẩu")}
                            label={t("Vui lòng nhập mật khẩu")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-6 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className={` items-center cursor-pointer w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-500 hover:bg-green-600 focus:ring-green-600 sm:ml-3 sm:w-auto sm:text-sm`}
                    >
                      {isSubmitting && <Spinner />} {t("Lưu thay đổi")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                      }}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      disabled={isSubmitting}
                    >
                      {t("Hủy bỏ")}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default UpdateProfilePopup;
