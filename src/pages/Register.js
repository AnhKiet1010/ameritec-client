import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import SelectField from "../components/CustomFields/select-field";
import DatepickerField from "../components/CustomFields/datepicker-field";
import API from "../api/API";
import { useTranslation } from "react-i18next";
import { BANK } from "../constants/bank";
import { Button, Label, Input } from "@windmill/react-ui";
import InputField from "../components/CustomFields/input-field";
import CheckboxField from "../components/CustomFields/checkbox-field";
import Spinner from "../components/Spinner";
import { GENDER, GENDER_EN } from "../constants/gender";
import LOGO from "../assets/img/logo-ameritec.png";
import { PACKAGE } from "../constants/package";

function Register({ match }) {
  const history = useHistory();
  const buy_package = match.params.package;
  const lang = localStorage.getItem("i18nextLng");
  const { t, i18n } = useTranslation();
  const [isPartner, setIsPartner] = useState(true);
  document.title = "Ameritec || " + t("Tạo tài khoản");
  const [imgUrlMT, setImgUrlMT] = useState("");
  const [imgUrlMS, setImgUrlMS] = useState("");
  const [showErrorEmptyImageMT, setShowErrorEmptyImageMT] = useState(false);
  const [showErrorEmptyImageMS, setShowErrorEmptyImageMS] = useState(false);

  if (
    buy_package !== "1" &&
    buy_package !== "2" &&
    buy_package !== "3" &&
    buy_package !== "4"
  ) {
    return <Redirect to="/" />;
  }
  const currentPackage = lang.includes("vi")
    ? PACKAGE.find((ele) => buy_package === ele.value).label
    : PACKAGE.find((ele) => buy_package === ele.value).label_en;

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    accept_confirm: false,
    phone: "",
    buy_package,
    currentPackage,
    id_code: "",
    id_time: "",
    issued_by: "",
    bank: "",
    bank_account: "",
    bank_name: "",
    tax_code: "",
    birthday: "",
    gender: "",
    invite_code: match.params.invite_code,
    donate_sales_id: match.params.donate_sales_id,
    group_number: match.params.group,
    CMND_Front: imgUrlMT,
    CMND_Back: imgUrlMS,
    state: "",
    ss: "",
    request_commission: "",
    drive_id: "",
  };

  const validationSchema23 = Yup.object().shape({
    accept_confirm: Yup.boolean().required(
      t("Vui lòng xác nhận đồng ý với qui định")
    ),
    full_name: Yup.string().required(t("Vui lòng điền họ và tên")),
    email: Yup.string()
      .email(t("Vui lòng điền đúng định dạng Email"))
      .required(t("Vui lòng điền Email")),
    password: Yup.string()
      .required(t("Vui lòng điền mật khẩu"))
      .matches(
        // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        // "Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường và một số"
        // /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
        /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        t("Mật khẩu phải chứa ít nhất 8 ký tự và một số")
      ),
    confirm_password: Yup.string()
      .required(t("Vui lòng điền lại mật khẩu"))
      .oneOf([Yup.ref("password"), null], t("Không trùng khớp")),
    phone: Yup.string()
      .required(t("Vui lòng điền số điện thoại"))
      .matches(phoneRegExp, t("Số điện thoại không đúng định dạng")),
    birthday: Yup.string()
      .required(t("Vui lòng điền ngày tháng năm sinh"))
      .test({
        name: "birthday",
        message: t("Hãy chắc chắn bạn trên 16 tuổi"),
        test: (value) => {
          return moment().diff(moment(value), "years") >= 16;
        },
      })
      .nullable(),
    id_code: lang.includes("vi")
      ? Yup.string().required(t("Vui lòng điền Số CMND"))
      : Yup.string().nullable(),
    id_time: lang.includes("vi")
      ? Yup.string().required(t("Vui lòng Chọn Ngày Cấp"))
      : Yup.string().nullable(),
    gender: lang.includes("vi")
      ? Yup.string().required(t("Vui lòng điền giới tính"))
      : Yup.string().nullable(),
    issued_by: lang.includes("vi")
      ? Yup.string().required(t("Vui lòng Chọn Nơi Cấp"))
      : Yup.string().nullable(),
    bank: lang.includes("vi")
      ? Yup.string().required(t("Vui lòng Chọn tên Ngân Hàng"))
      : Yup.string().nullable(),
    bank_account: lang.includes("vi")
      ? Yup.string().required(t("Vui lòng điền Số Tài Khoản"))
      : Yup.string().nullable(),
    bank_name: lang.includes("vi")
      ? Yup.string().required(t("Vui lòng điền Tên Tài Khoản"))
      : Yup.string().nullable(),
    // CMND_Front: Yup.string().required(t("Vui lòng tải lên hình ảnh")),
    // CMND_Back: Yup.string().required(t("Vui lòng tải lên hình ảnh")),
    state: !lang.includes("vi")
      ? Yup.string().required("Please input state")
      : Yup.string().nullable(),
    ss: !lang.includes("vi")
      ? Yup.string().required("Please input ID code")
      : Yup.string().nullable(),
    request_commission: !lang.includes("vi")
      ? Yup.string().required("Please input Froms of receiving commissions")
      : Yup.string().nullable(),
    drive_id: !lang.includes("vi")
      ? Yup.string().required("Please input Driver's License")
      : Yup.string().nullable(),
  });

  const validationSchema1 = Yup.object().shape({
    accept_confirm: Yup.boolean().required(
      t("Vui lòng xác nhận đồng ý với qui định")
    ),
    full_name: Yup.string().required(t("Vui lòng điền họ và tên")),
    email: Yup.string()
      .email(t("Vui lòng điền đúng định dạng Email"))
      .required(t("Vui lòng điền Email")),
    password: Yup.string()
      .required(t("Vui lòng điền mật khẩu"))
      .matches(
        // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
        t("Mật khẩu phải chứa ít nhất 8 ký tự và một số")
      ),
    confirm_password: Yup.string()
      .required(t("Vui lòng điền lại mật khẩu"))
      .oneOf([Yup.ref("password"), null], t("Không trùng khớp")),
    phone: Yup.string()
      .required(t("Vui lòng điền số điện thoại"))
      .matches(phoneRegExp, t("Số điện thoại không đúng định dạng")),
  });

  const handleSubmit = (values, actions) => {
    if (!values.accept_confirm) {
      actions.setFieldError(
        "accept_confirm",
        t("Vui lòng đồng ý với điều khoản Công Ty")
      );
      actions.setSubmitting(false);
    } else if (
      isPartner &&
      lang.includes("vi") &&
      (imgUrlMT === "" || imgUrlMS === "")
    ) {
      if (imgUrlMT === "") {
        setShowErrorEmptyImageMT(true);
      }
      if (imgUrlMS === "") {
        setShowErrorEmptyImageMS(true);
      }
      actions.setSubmitting(false);
    } else {
      let message = t("Đã xảy ra lỗi vui lòng thử lại sau");
      var formData = new FormData();

      formData.append("bank_name", values.bank_name);
      formData.append("bank_account", values.bank_account);
      formData.append("bank", values.bank);
      formData.append("birthday", values.birthday);
      formData.append("buy_package", values.buy_package);
      formData.append("donate_sales_id", values.donate_sales_id);
      formData.append("email", values.email);
      formData.append("full_name", values.full_name);
      formData.append("gender", values.gender);
      formData.append("group_number", values.group_number);
      formData.append("id_code", values.id_code);
      formData.append("id_time", values.id_time);
      formData.append("invite_code", values.invite_code);
      formData.append("issued_by", values.issued_by);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("tax_code", values.tax_code);
      formData.append("account_type", lang);
      formData.append("is_partner", isPartner);
      formData.append("CMND_Front", values.CMND_Front);
      formData.append("CMND_Back", values.CMND_Back);

      const body =
        isPartner && lang.includes("vi")
          ? formData
          : { account_type: lang, is_partner: isPartner, ...values };

      API.register(body)
        .then((res) => {
          const status = res.data.status;
          if (status === 200) {
            actions.setSubmitting(false);
            let transId = res.data.data.id;
            history.push("/payment/" + transId);
          } else {
            toast.error(res.data.message);
            for (var err of res.data.errors) {
              actions.setFieldError(err.label, err.err_message);
            }
            actions.setSubmitting(false);
          }
        })
        .catch((error) => {
          console.log(error);
          actions.setSubmitting(false);
          toast.error(message);
        });
    }
  };

  return (
    <div className="grid">
      <div className="flex items-start justify-center min-h-screen p-6 bg-gray-50">
        <ToastContainer />
        <div className="flex-1 h-full max-w-3xl">
          <div className="flex flex-col overflow-y-auto">
            <Formik
              initialValues={initialValues}
              validationSchema={
                !isPartner ? validationSchema1 : validationSchema23
              }
              onSubmit={handleSubmit}
            >
              {(formikProps) => {
                const { isSubmitting, values, setFieldValue } = formikProps;

                return (
                  <Form
                    className="flex items-center justify-center p-6 sm:p-12"
                    encType="multipart/form-data"
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-700">
                          {t("Tạo tài khoản")}
                        </h1>
                        <a href="/">
                          <img src={LOGO} width="100px" alt="logo" />
                        </a>
                      </div>
                      <hr className="my-6" />
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                        <FastField
                          component={InputField}
                          name="full_name"
                          type="text"
                          placeholder={t("Họ và tên")}
                          label={t("Họ và tên")}
                        />
                        <FastField
                          component={InputField}
                          name="currentPackage"
                          type="text"
                          placeholder={t("Gói tham gia")}
                          label={t("Gói tham gia")}
                          disabled={true}
                        />
                      </div>
                      <FastField
                        component={InputField}
                        name="invite_code"
                        type="text"
                        placeholder={t("Mã giới thiệu")}
                        label={t("Mã giới thiệu")}
                        disabled={true}
                      />
                      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0">
                        <FastField
                          component={InputField}
                          name="email"
                          type="email"
                          placeholder="Email"
                          label="Email"
                        />
                        <FastField
                          component={InputField}
                          name="phone"
                          type="text"
                          placeholder={t("Số điện thoại")}
                          label={t("Số điện thoại")}
                        />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                        <FastField
                          component={InputField}
                          name="password"
                          type="password"
                          placeholder={t("Nhập mật khẩu")}
                          label={t("Mật khẩu")}
                        />
                        <FastField
                          component={InputField}
                          name="confirm_password"
                          type="password"
                          placeholder={t("Nhập lại mật khẩu")}
                          label={t("Nhập lại mật khẩu")}
                        />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4 mt-4">
                        <Label check>
                          <Input
                            type="checkbox"
                            checked={isPartner}
                            className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
                            onChange={() => setIsPartner(true)}
                          />
                          <span className="ml-2 mb-0 text-md text-gray-700">
                            {t("Đăng ký làm Cộng Tác Viên")}
                          </span>
                        </Label>
                        <Label check>
                          <Input
                            type="checkbox"
                            checked={!isPartner}
                            className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
                            onChange={() => setIsPartner(false)}
                          />
                          <span className="ml-2 mb-0 text-md text-gray-700">
                            {t("Mua để sử dụng")}
                          </span>
                        </Label>
                      </div>
                      {isPartner && (
                        <>
                          <hr className="my-8" />
                          <h1 className="text-xl font-bold text-black mb-4">
                            {t("Thông Tin Cá Nhân")}
                          </h1>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                            <FastField
                              component={DatepickerField}
                              selected={values.birthday}
                              dateFormat="dd/MM/yyyy"
                              name="birthday"
                              locale="vi"
                              placeholderText={t("Ngày tháng năm sinh")}
                              onChange={(date) =>
                                setFieldValue("birthday", date)
                              }
                              label={t("Ngày tháng năm sinh")}
                            />
                            <FastField
                              component={SelectField}
                              name="gender"
                              options={lang.includes("vi") ? GENDER : GENDER_EN}
                              placeholder={t("Giới tính")}
                              label={t("Giới tính")}
                            />
                          </div>
                          {!lang.includes("vi") && (
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
                              <span className="text-sm text-gray-500">
                                (Weekly payouts via Zelle, Venmo or PayPal.
                                Example. “Zelle: email@gmail.com” )
                              </span>
                            </>
                          )}
                          {lang.includes("vi") && (
                            <>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                                <FastField
                                  component={InputField}
                                  name="id_code"
                                  type="text"
                                  placeholder="2615*****"
                                  label={t("Số CMND hoặc CCCD")}
                                />
                                <FastField
                                  component={DatepickerField}
                                  selected={values.id_time}
                                  dateFormat="dd/MM/yyyy"
                                  name="id_time"
                                  locale="vi"
                                  placeholderText={t("Ngày cấp")}
                                  onChange={(date) =>
                                    setFieldValue("id_time", date)
                                  }
                                  label={t("Ngày cấp CMND hoặc CCCD")}
                                />
                              </div>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                                <FastField
                                  component={InputField}
                                  name="issued_by"
                                  type="text"
                                  placeholder={t("Nơi cấp")}
                                  label={t("Nơi cấp CMND hoặc CCCD")}
                                />
                                <FastField
                                  component={InputField}
                                  name="tax_code"
                                  type="text"
                                  placeholder="8271938712"
                                  label={t("Mã số Thuế Cá Nhân")}
                                />
                              </div>
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
                                      setShowErrorEmptyImageMT(false);
                                    };
                                  }}
                                  accept="image/*"
                                />
                              </div>
                              {showErrorEmptyImageMT && (
                                <div className="w-full text-sm mt-2 error invalid-feedback text-center">
                                  {t("Vui lòng tải lên hình ảnh")}
                                </div>
                              )}
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
                                      setShowErrorEmptyImageMS(false);
                                    };
                                  }}
                                  accept="image/*"
                                />
                              </div>
                              {showErrorEmptyImageMS && (
                                <div className="w-full text-sm mt-2 error invalid-feedback text-center">
                                  {t("Vui lòng tải lên hình ảnh")}
                                </div>
                              )}
                            </>
                          )}
                          {lang.includes("vi") && (
                            <>
                              <hr className="my-8" />
                              <h1 className="text-xl font-bold text-black mb-4">
                                {t("Thông Tin Tài Khoản Ngân Hàng")}
                              </h1>
                              <FastField
                                component={SelectField}
                                name="bank"
                                options={BANK}
                                placeholder={t("Tên Ngân Hàng")}
                                label={t("Tên Ngân Hàng")}
                              />
                              <FastField
                                component={InputField}
                                name="bank_account"
                                type="text"
                                placeholder={t("Số tài khoản")}
                                label={t("Số tài khoản")}
                              />
                              <FastField
                                component={InputField}
                                name="bank_name"
                                type="text"
                                placeholder={t("Tên chủ thẻ")}
                                label={t("Tên chủ tài khoản")}
                              />
                            </>
                          )}
                        </>
                      )}
                      <hr className="my-8" />
                      <FastField
                        component={CheckboxField}
                        name="accept_confirm"
                        link={`/policy/${process.env.REACT_APP_ID_MAIN_POLICY}`}
                      />
                      <Button
                        type="submit"
                        block
                        className="mt-8"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Spinner />
                        ) : (
                          <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                        )}
                        {t("Tạo tài khoản")}
                      </Button>

                      <hr className="my-8" />

                      <p className="mt-4 text-md">
                        {t("Bạn đã có tài khoản?")}
                        <Link
                          className="text-md font-medium text-purple-600 hover:underline"
                          to="/login"
                        >
                          <span> {t("Đăng nhập ngay")}</span>
                        </Link>
                      </p>
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

export default Register;
