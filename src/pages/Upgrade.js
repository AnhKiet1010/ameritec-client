import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import moment from "moment";
import SelectField from "../components/CustomFields/select-field";
import DatepickerField from "../components/CustomFields/datepicker-field";

import { BANK } from "../constants/bank";
import { PROVINCES } from "../constants/province";
import { Button } from "@windmill/react-ui";
import InputField from "../components/CustomFields/input-field";
import CheckboxField from "../components/CustomFields/checkbox-field";
import Spinner from "../components/Spinner";
import CLIENT from "../api/Client";
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../slices/authSlice';
import { useTranslation } from "react-i18next";

function Upgrade() {
  const [imgUrlMT, setImgUrlMT] = useState("");
  const [imgUrlMS, setImgUrlMS] = useState("");
  const { t } = useTranslation();


  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues = {
    id_code: "",
    id_time: "",
    issued_by: "",
    bank: "",
    accept_confirm: false,
    bank_account: "",
    bank_name: "",
    tax_code: "",
    CMND_Front: "",
    CMND_Back: "",
  };

  const validationSchema = Yup.object().shape({
    id_code: Yup.string().required("Vui lòng điền số CMND"),
    id_time: Yup.string()
      .required("Vui lòng chọn ngày cấp CMND")
      .test({
        name: "id_time",
        message: "Hãy chắc chắn bạn trên 16 tuổi",
        test: (value) => {
          return moment().diff(moment(value), "years") >= 16;
        },
      }),
    issued_by: Yup.string()
      .required("Vui lòng điền nơi cấp CMND"),
    bank_account: Yup.string()
      .required("Vui lòng điền số tài khoản"),
    bank_name: Yup.string().required("Vui lòng điền tên Ngân Hàng"),
  });

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {

    if (!values.accept_confirm) {
      setFieldError("accept_confirm", "Vui lòng đồng ý với điều khoản Công Ty");
      setSubmitting(false);
    } else {
      var formData = new FormData();

      formData.append("user_id", JSON.parse(localStorage.getItem("user")).user.id);
      formData.append("id_code", values.id_code);
      formData.append("id_time", values.id_time);
      formData.append("issued_by", values.issued_by);
      formData.append("bank_name", values.bank_name);
      formData.append("bank_account", values.bank_account);
      formData.append("bank", values.bank);
      formData.append("tax_code", values.tax_code);
      formData.append('CMND_Front', values.CMND_Front);
      formData.append('CMND_Back', values.CMND_Back);

      let message = t('Đã xảy ra lỗi vui lòng thử lại sau');
      CLIENT.upgrade(formData)
        .then((res) => {
          const status = res.data.status;
          if (status === 200) {
            setSubmitting(false);
            const action = LOGOUT();
            dispatch(action);
            new Promise((resolve, reject) => {
              setTimeout(() => {
                toast.success(res.data.message);
              },1000); 
              history.push('/login');
              resolve(false);
            });

          } else {
            toast.error(res.data.message);
            for (var err of res.data.errors) {
              setFieldError(err.label, err.err_message);
            }
            setSubmitting(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
          toast.error(message);
        });
    }
  };

  return (
    <div className="grid">
      <div className="flex items-start justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-3xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps) => {
                const { isSubmitting, values, setFieldValue } = formikProps;

                return (
                  <Form className="flex items-center justify-center p-6 sm:p-12" encType="multipart/form-data">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                          Nâng cấp tài khoản
                      </h1>
                      </div>

                      <div>
                        <hr className="my-8" />
                        <h1 className="text-xl font-bold text-black mb-4 dark:text-white">
                          Thông Tin Cá Nhân
                          </h1>
                        <div className="">
                          <div className="">
                            {/* <FastField
                              component={SelectField}
                              name="iden_type"
                              options={IDEN_TYPE}
                              placeholder="Lựa chọn Hồ Sơ"
                              label="Loại Hồ Sơ"
                            /> */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                              <FastField
                                component={InputField}
                                name="id_code"
                                type="text"
                                placeholder="Ví dụ : 2615*****"
                                label={`Số CMND`}
                              />
                              <FastField
                                component={DatepickerField}
                                selected={values.id_time}
                                dateFormat="dd/MM/yyyy"
                                name="id_time"
                                locale="vi"
                                placeholderText="Ngày cấp"
                                onChange={(date) =>
                                  setFieldValue("id_time", date)
                                }
                                label={`Ngày cấp CMND`}
                              />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <FastField
                                component={SelectField}
                                name="issued_by"
                                type="text"
                                options={PROVINCES}
                                placeholder="Nơi cấp"
                                label={`Nơi cấp CMND`}
                              />
                              <FastField
                                component={InputField}
                                name="tax_code"
                                type="text"
                                placeholder="Ví dụ : 8271938712"
                                label="Mã số Thuế Cá Nhân"
                              />
                            </div>
                            <div className="flex items-center justify-around grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="p-3">
                                <label htmlFor="MT" className="w-64 flex flex-col items-center m-auto px-1 py-6 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-400 hover:text-black">
                                  {
                                    imgUrlMT !== "" ?
                                      <img src={imgUrlMT} width="150px" id="imgMT" alt="CMND" />
                                      :
                                      <>
                                        <svg
                                          className="w-8 h-8"
                                          fill="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span className="mt-2 text-base leading-normal">
                                          Tải lên mặt trước
                                          </span>
                                      </>
                                  }
                                </label>
                                <input
                                  id="MT"
                                  name="cmndMT"
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => {
                                    const reader = new FileReader();

                                    reader.onload = (e) => {
                                      if (reader.readyState === 2) {
                                        setImgUrlMT(reader.result);
                                      }
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                    setFieldValue("CMND_Front", e.target.files[0]);
                                  }}
                                  accept="image/*"
                                  capture
                                />
                              </div>
                              <div className="p-3">
                                <label htmlFor="MS" className="w-64 flex flex-col items-center m-auto px-1 py-6 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-400 hover:text-black">
                                  {
                                    imgUrlMS !== "" ?
                                      <img src={imgUrlMS} width="150px" id="imgMS" alt="CMND" />
                                      :
                                      <>
                                        <svg
                                          className="w-8 h-8"
                                          fill="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span className="mt-2 text-base leading-normal">
                                          Tải lên mặt sau
                                          </span>
                                      </>
                                  }
                                </label>
                                <input
                                  id="MS"
                                  name="cmndMS"
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => {
                                    const reader = new FileReader();

                                    reader.onload = (e) => {
                                      if (reader.readyState === 2) {
                                        setImgUrlMS(reader.result);
                                      }
                                    };
                                    setFieldValue("CMND_Back", e.target.files[0]);
                                    reader.readAsDataURL(e.target.files[0]);
                                  }}
                                  accept="image/*"
                                  capture
                                />
                              </div>
                            </div>
                            <hr className="my-8" />
                            <h1 className="text-xl font-bold text-black mb-4 dark:text-white">
                              Thông Tin Tài Khoản Ngân Hàng
                              </h1>
                            <FastField
                              component={SelectField}
                              name="bank"
                              options={BANK}
                              placeholder="Lựa chọn Ngân Hàng"
                              label="Tên Ngân Hàng"
                            />
                            <FastField
                              component={InputField}
                              name="bank_account"
                              type="number"
                              placeholder="Số tài khoản"
                              label="Số tài khoản"
                              note="Vui lòng nhập đúng và kiểm tra lại lần nữa để chắc chắn"
                            />
                            <FastField
                              component={InputField}
                              name="bank_name"
                              type="text"
                              placeholder="Tên chủ thẻ"
                              label="Tên chủ tài khoản"
                              note="Vui lòng nhập đúng như tên trên thẻ"
                            />
                            <hr className="my-8" />
                            <FastField
                              component={CheckboxField}
                              name="accept_confirm"
                            />
                          </div>
                        </div>
                      </div>

                      <Button type="submit" block className="mt-8" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <Spinner />
                        ) : (
                          <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                        )}
                        Nâng cấp
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
