import React, { useState } from "react";

import InputField from "./CustomFields/input-field";
import { FastField, Form, Formik } from "formik";
import { BANK } from "../constants/bank";
import { GENDER } from "../constants/gender";
import { PACKAGE } from "../constants/package";
import SelectField from "./CustomFields/select-field";
import DatePickerField from "./CustomFields/datepicker-field";
import Spinner from "./Spinner";
import { Label, Input } from "@windmill/react-ui";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ADMIN from "../api/Admin";

function AdminUpdateProfilePopup({
  userData,
  onClose,
  setRefresh,
  refresh,
  id,
}) {
  const [imgUrlMT, setImgUrlMT] = useState("");
  const [imgUrlMS, setImgUrlMS] = useState("");

  const onSubmit = (values, actions) => {
    var formData = new FormData();

    formData.append("id", id);
    formData.append("full_name", values.full_name);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("birthday", values.birthday);
    formData.append("gender", values.gender);
    formData.append("id_code", values.id_code);
    formData.append("id_time", values.id_time);
    formData.append("issued_by", values.issued_by);
    formData.append("tax_code", values.tax_code);
    formData.append("bank", values.bank);
    formData.append("bank_name", values.bank_name);
    formData.append("bank_account", values.bank_account);
    formData.append("password", values.password);
    formData.append("note", values.note);
    formData.append("is_partner", values.is_partner);
    formData.append("expire_time", values.expire_time);
    formData.append("buy_package", values.buy_package);
    formData.append("CMND_Front", values.CMND_Front);
    formData.append("CMND_Back", values.CMND_Back);
    formData.append("state", values.state);
    formData.append("ss", values.ss);
    formData.append("drive_id", values.drive_id);
    formData.append("request_commission", values.request_commission);

    let message = "Đã xảy ra lỗi vui lòng thử lại sau";
    ADMIN.editUser(formData)
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          for (const error of res.data.errors) {
            actions.setFieldError(error.label, error.err_message);
          }
          toast.error(res.data.message);
          actions.setSubmitting(false);
        } else {
          actions.setSubmitting(false);
          toast.success(res.data.message);
          onClose();
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        toast.error(message);
      });
  };

  const initialValues = {
    full_name: userData.full_name,
    phone: userData.phone,
    email: userData.email,
    birthday: new Date(userData.birthday),
    gender: userData.gender,
    id_code: userData.id_code,
    id_time: new Date(userData.id_time),
    issued_by: userData.issued_by,
    tax_code: userData.tax_code ? userData.tax_code : "",
    bank: userData.bank,
    bank_name: userData.bank_name,
    bank_account: userData.bank_account,
    password: "",
    note: userData.note,
    is_partner: userData.is_partner,
    expire_time: new Date(userData.expire_time),
    buy_package: userData.buy_package,
    CMND_Front: imgUrlMT,
    CMND_Back: imgUrlMS,
    state: userData.state,
    ss: userData.ss,
    request_commission: userData.request_commission,
    drive_id: userData.drive_id,
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Vui lòng không để trống"),
    phone: Yup.string().required("Vui lòng không để trống"),
    email: Yup.string().required("Vui lòng không để trống"),
    birthday: Yup.string().required("Vui lòng không để trống").nullable(),
    gender: Yup.string().required("Vui lòng không để trống"),
    // id_code: Yup.string().required("Vui lòng không để trống"),
    // id_time: Yup.string().required("Vui lòng để trống"),
    // issued_by: Yup.string().required("Vui lòng không để trống"),
    // bank: Yup.string().required("Vui lòng không để trống"),
    // bank_account: Yup.string().required("Vui lòng không để trống"),
    // bank_name: Yup.string().required("Vui lòng không để trống"),
    // password: Yup.string()
  });

  // const handleDeleteImage = (e) => {
  //     e.preventDefault();
  //     setImgUrlMT("");
  //     setImgUrlMS("");
  // }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        const { isSubmitting, values, setFieldValue } = formikProps;

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
                  className="bg-white p-4 overflow-auto"
                  style={{ maxHeight: "700px" }}
                >
                  <div className="w-full">
                    <div className="bg-white flex flex-col">
                      <div className="-mx-3 md:flex">
                        <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                          <FastField
                            component={InputField}
                            name="full_name"
                            type="text"
                            placeholder="Họ và tên"
                            label="Họ và tên"
                          />
                        </div>
                        <div className="md:w-1/2 px-3">
                          <FastField
                            component={InputField}
                            name="phone"
                            type="text"
                            placeholder="Số điện thoại"
                            label="Số điện thoại"
                          />
                        </div>
                      </div>
                      <div className="-mx-3 md:flex">
                        {userData.birthday && (
                          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <FastField
                              component={DatePickerField}
                              selected={values.birthday}
                              dateFormat="dd/MM/yyyy"
                              name="birthday"
                              locale="vi"
                              placeholderText="Ngày tháng năm sinh"
                              onChange={(date) =>
                                setFieldValue("birthday", date)
                              }
                              label="Ngày sinh"
                            />
                          </div>
                        )}

                        <div className="md:w-1/2 px-3">
                          <FastField
                            component={SelectField}
                            name="gender"
                            options={GENDER}
                            placeholder="Giới tính"
                            label="Giới tính"
                          />
                        </div>
                      </div>
                      <div className="-mx-3 md:flex">
                        <div className="md:w-full px-3 mb-3 md:mb-0">
                          <FastField
                            component={InputField}
                            name="password"
                            type="text"
                            placeholder="Mật khẩu"
                            label="Mật khẩu"
                          />
                        </div>
                      </div>
                      {userData.account_type === "en" && (
                        <>
                          <div className="-mx-3 md:flex">
                            <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                              <FastField
                                component={InputField}
                                name="state"
                                type="text"
                                placeholder="Please input State"
                                label="State"
                              />
                            </div>
                            <div className="md:w-1/2 px-3">
                              <FastField
                                component={InputField}
                                name="ss"
                                type="text"
                                placeholder="Please input SS# or TAX ID"
                                label="SS# or TAX ID"
                              />
                            </div>
                          </div>
                          <div className="-mx-3 md:flex">
                            <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                              <FastField
                                component={InputField}
                                name="drive_id"
                                type="text"
                                placeholder="Please input Driver's License"
                                label="Driver's License"
                              />
                            </div>
                            <div className="md:w-1/2 px-3">
                              <FastField
                                component={InputField}
                                name="request_commission"
                                type="text"
                                placeholder="Please input Froms of receiving commissions"
                                label="Froms of receiving commissions"
                              />
                            </div>
                          </div>
                        </>
                      )}
                      {userData.account_type === "vi" && (
                        <>
                          <div className="-mx-3 md:flex mb-1">
                            <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                              <FastField
                                component={InputField}
                                name="id_code"
                                type="text"
                                placeholder={`Số CMND`}
                                label={`Số CMND`}
                              />
                            </div>
                            <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                              <FastField
                                component={DatePickerField}
                                selected={values.id_time}
                                dateFormat="dd/MM/yyyy"
                                name="id_time"
                                locale="vi"
                                placeholderText="Ngày cấp"
                                onChange={(date) =>
                                  setFieldValue("id_time", date)
                                }
                                label="Ngày cấp"
                              />
                            </div>
                          </div>
                          <div className="-mx-3 md:flex mb-1">
                            <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                              <FastField
                                component={InputField}
                                name="issued_by"
                                type="text"
                                placeholder={`Nơi cấp`}
                                label={`Nơi cấp`}
                              />
                            </div>
                            <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                              <FastField
                                component={InputField}
                                name="tax_code"
                                type="text"
                                placeholder="Mã số thuế"
                                label="Mã số thuế"
                              />
                            </div>
                          </div>
                          <div className="-mx-3 md:flex mb-1">
                            <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                              <FastField
                                component={InputField}
                                name="bank_account"
                                type="text"
                                placeholder="Số tài khoản"
                                label="Số tài khoản"
                              />
                            </div>
                            <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                              <FastField
                                component={SelectField}
                                name="bank"
                                options={BANK}
                                placeholder="Ngân hàng"
                                label="Ngân hàng"
                              />
                            </div>
                          </div>
                          <div className="-mx-3 md:flex mb-1">
                            <div className="md:w-full px-3 mb-3 md:mb-0">
                              <FastField
                                component={InputField}
                                name="bank_name"
                                type="text"
                                placeholder="Tên tài khoản"
                                label="Tên tài khoản"
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <div className="-mx-3 md:flex mb-1">
                        <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                          <FastField
                            component={InputField}
                            name="email"
                            type="text"
                            placeholder="Email"
                            label="Nhập Email"
                          />
                        </div>
                        <div className="md:w-1/2 px-3 mb-3 md:mb-0 flex justify-start items-end">
                          <Label check className="mb-5">
                            <Input
                              type="checkbox"
                              checked={values.is_partner}
                              className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
                              onChange={() =>
                                setFieldValue("is_partner", !values.is_partner)
                              }
                            />
                            <span className="ml-2 mb-0 text-sm text-gray-700">
                              Cộng Tác Viên
                            </span>
                          </Label>
                        </div>
                      </div>
                      <div className="-mx-3 md:flex">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                          <FastField
                            component={DatePickerField}
                            selected={values.expire_time}
                            dateFormat="dd/MM/yyyy"
                            name="expire_time"
                            locale="vi"
                            placeholderText="Ngày hết hạn"
                            onChange={(date) =>
                              setFieldValue("expire_time", date)
                            }
                            label="Ngày hết hạn"
                          />
                        </div>
                        <div className="md:w-1/2 px-3">
                          <FastField
                            component={SelectField}
                            name="buy_package"
                            options={PACKAGE}
                            placeholder="Gói mua"
                            label="Gói mua"
                          />
                        </div>
                      </div>
                      <div className="-mx-3 md:flex mb-1">
                        <div className="md:w-full px-3 mb-3 md:mb-0">
                          <FastField
                            component={InputField}
                            name="note"
                            type="text"
                            placeholder="Nhập ghi chú"
                            label="Ghi chú"
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
                                    Tải lên mặt trước CCCD hoặc CMND
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
                              capture
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
                                    Tải lên mặt sau CCCD hoặc CMND
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
                              capture
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="pb-6 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className={` items-center cursor-pointer w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-500 hover:bg-green-600 focus:ring-green-600 sm:ml-3 sm:w-auto sm:text-sm`}
                    >
                      {isSubmitting && <Spinner />} Lưu thay đổi
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                      }}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Hủy bỏ
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

export default AdminUpdateProfilePopup;
