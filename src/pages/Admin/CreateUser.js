import React from "react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import ADMIN from "../../api/Admin";
import PageTitle from "../../components/Typography/PageTitle";
import CTA from "../../components/CTA";
import moment from 'moment';
import SelectField from "../../components/CustomFields/select-field";
import DatepickerField from "../../components/CustomFields/datepicker-field";

import { BANK } from "../../constants/bank";
import { PACKAGE } from "../../constants/package";
import { Button } from "@windmill/react-ui";
import InputField from "../../components/CustomFields/input-field";
import Spinner from "../../components/Spinner";
import { GENDER } from "../../constants/gender";
import { TYPE } from "../../constants/accountType";

function CreateUser() {

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    buy_package: "",
    id_code: "",
    id_time: "",
    issued_by: "",
    bank: "",
    parent_id: process.env.REACT_APP_COMPANY_INVITE_CODE,
    group_number: "1",
    bank_account: "",
    bank_name: "",
    tax_code: "",
    birthday: "",
    expired: false,
    gender: "",
    CMND_Front: "",
    CMND_Back: "",
    state: "",
    ss: "",
    request_commission: "",
    drive_id: "",
    account_type: "vi"
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Vui lòng điền họ và tên"),
    parent_id: Yup.string().required("Vui lòng điền mã giới thiệu"),
    group_number: Yup.string().required("Vui lòng chọn nhóm tham gia"),
    email: Yup.string()
      .email("Vui lòng điền đúng định dạng Email")
      .required("Vui lòng điền Email"),
      password: Yup.string()
      .required("Vui lòng điền mật khẩu")
      .matches(
        // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        // /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
        /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Mật khẩu phải chứa ít nhất 8 ký tự và một số"
      ),
    confirm_password: Yup.string()
      .required("Vui lòng điền lại mật khẩu")
      .oneOf([Yup.ref("password"), null], "Không trùng khớp"),
    phone: Yup.string().required("Vui lòng điền số điện thoại").matches(phoneRegExp, 'Số điện thoại không đúng định dạng'),
    birthday: Yup.string()
      .required("Vui lòng điền ngày tháng năm sinh")
      .test({
        name: "birthday",
        message: "Hãy chắc chắn bạn trên 16 tuổi",
        test: (value) => {
          return moment().diff(moment(value), "years") >= 16;
        },
      }).nullable(),
    account_type: Yup.string().required("Vui chọn loại tài khoản"),
  });

  const handleSubmit = (values, { setSubmitting, setFieldError, resetForm }) => {

    let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
    ADMIN.createUser(values)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          setSubmitting(false);
          toast.success("Tạo User thành công");
          resetForm();
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
  };

  return (
    <>
      <PageTitle>Tạo nhanh tài khoản</PageTitle>
      <ToastContainer />
      <CTA />
      <div className="grid">
        <div className="flex items-start justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <ToastContainer />
          <div className="flex-1 h-full max-w-2xl dark:bg-gray-800">
            <div className="flex flex-col overflow-y-auto">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(formikProps) => {
                  const { isSubmitting, setFieldValue, values } = formikProps;

                  return (
                    <Form className="flex items-center justify-center">
                      <div className="w-full">
                        <FastField
                          component={SelectField}
                          name="account_type"
                          options={TYPE}
                          placeholder="Loại tài khoản"
                          label="Loại tài khoản"
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0">
                          <FastField
                            component={InputField}
                            name="full_name"
                            type="text"
                            placeholder="họ và tên"
                            label="Họ và tên"
                            note="Tên như trong CMND"
                          />
                          <FastField
                            component={SelectField}
                            name="buy_package"
                            options={PACKAGE}
                            placeholder="Gói tham gia"
                            label="Gói tham gia"
                          />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0">
                          <FastField
                            component={InputField}
                            name="parent_id"
                            type="text"
                            placeholder="Mã giới thiệu"
                            label="Mã giới thiệu"
                          />
                          <FastField
                            component={SelectField}
                            name="group_number"
                            options={[
                              { value: "1", label: "Nhóm 1" },
                              { value: "2", label: "Nhóm 2" },
                              { value: "3", label: "Nhóm 3" },
                            ]}
                            placeholder="Nhóm tham gia"
                            label="Nhóm tham gia"
                          />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0">
                          <FastField
                            component={InputField}
                            name="email"
                            type="email"
                            placeholder="Email"
                            label="Email"
                            note="Vui lòng nhập đúng định dạng Email để sử dụng đăng nhập sau này"
                          />
                          <FastField
                            component={InputField}
                            name="phone"
                            type="text"
                            placeholder="Số điện thoại"
                            label="Số điện thoại"
                            note="Vui lòng nhập đúng số điện thoại của bạn"
                          />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0">
                          <FastField
                            component={InputField}
                            name="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            label="Mật khẩu"
                          />
                          <FastField
                            component={InputField}
                            name="confirm_password"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            label="Nhập lại mật khẩu"
                          />
                        </div>
                        <div>
                          <hr className="my-8" />
                          <h1 className="text-xl font-bold text-black mb-4">
                            Thông Tin Cá Nhân
                          </h1>
                          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0">
                            <FastField
                              component={DatepickerField}
                              selected={values.birthday}
                              dateFormat="dd/MM/yyyy"
                              name="birthday"
                              locale="vi"
                              placeholderText="Ngày tháng năm sinh"
                              onChange={(date) => setFieldValue("birthday", date)}
                              label="Ngày tháng năm sinh"
                              note="Vui lòng điền đúng định dạng như ví dụ"
                            />
                            <FastField
                              component={SelectField}
                              name="gender"
                              options={GENDER}
                              placeholder="Giới tính"
                              label="Giới tính"
                            />
                          </div>
                          {
                            values.account_type === 'vi' &&
                            <>
                              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0">

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
                              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0">
                                <FastField
                                  component={InputField}
                                  name="issued_by"
                                  type="text"
                                  placeholder="Nơi cấp"
                                  label="Nơi cấp CMND"
                                />
                                <FastField
                                  component={InputField}
                                  name="tax_code"
                                  type="text"
                                  placeholder="Ví dụ : 8271938712"
                                  label="Mã số Thuế Cá Nhân"
                                />
                              </div>
                            </>
                          }
                          {
                            values.account_type === 'vi' &&
                            <>
                              <hr className="my-8" />
                              <h1 className="text-xl font-bold text-black mb-4">
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
                            </>
                          }
                          {
                            values.account_type === 'en' &&
                            <>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                                <FastField
                                  component={InputField}
                                  name="state"
                                  type="text"
                                  placeholder="Please input State"
                                  label="State"
                                />
                                <FastField
                                  component={InputField}
                                  name="ss"
                                  type="text"
                                  placeholder="Please input SS# or TAX ID"
                                  label="SS# or TAX ID"
                                />
                              </div>
                              <FastField
                                component={InputField}
                                name="drive_id"
                                type="text"
                                placeholder="Please input Driver's License"
                                label="Driver's License"
                              />
                              <FastField
                                component={InputField}
                                name="request_commission"
                                type="text"
                                placeholder="Please input Froms of receiving commissions"
                                label="Froms of receiving commissions"
                              />
                              <span className="text-sm text-gray-500">(Weekly payouts via Zelle, Venmo or PayPal. Example. “Zelle: email@gmail.com” )</span>
                            </>
                          }
                        </div>
                        <hr className="my-8" />
                        <Button type="submit" block className="mt-8 mb-20" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <Spinner />
                          ) : (
                            <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                          )}
                          Tạo tài khoản
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
    </>
  );
}

export default CreateUser;
