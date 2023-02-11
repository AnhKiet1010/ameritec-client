import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import package_img from "../assets/img/logo-ameritec.png";
import SelectField from "../components/CustomFields/select-field";
import Spinner from "../components/Spinner";
import { BANK } from "../constants/bank";
import PAYPAL_IMG from "../assets/img/paypal.png";
import VISA_IMG from "../assets/img/visa-card-1.png";
import MASTER_IMG from "../assets/img/mastercard.png";
import AMERICAN_IMG from "../assets/img/american-express.png";
import DISCOVER_IMG from "../assets/img/discover-card.png";
import API from "../api/API";
import { useTranslation } from "react-i18next";
import PayPal from "../components/PayPal";
import {
  Button,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "@windmill/react-ui";
import InputField from "../components/CustomFields/input-field";

function Payment({ match }) {
  const { t, i18n } = useTranslation();
  const transId = match.params.id;
  const history = useHistory();
  const [isNLATM, setIsNLATM] = useState(false);
  const [isChooseMethod, setIsChooseMethod] = useState(false);
  const [showErrChooseMethod, setShowErrChooseMethod] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [total_amount, setTotalAmount] = useState(0);
  const [buy_package, setBuyPackage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkout, setCheckOut] = useState(false);
  const [openMoneyChase, setOpenMoneyChase] = useState(false);
  const [openChangePage, setOpenChangePage] = useState(false);
  const [url, setUrl] = useState("");
  const [onCredit, setOnCredit] = useState(false);

  const initialValues = {
    id: transId,
    country: i18n.language.includes("vi") ? "VN" : "USA",
    payment_method: "",
    bank_code: "",
  };

  const creditInitialValues = {
    trans_id: transId,
    card_number: "",
    name_on_card: "",
    expiry: "",
    cvc: "",
  };

  const creditValidationSchema = Yup.object().shape({
    card_number: Yup.string().max(16).min(16).label("Card number").required(),
    cvc: Yup.string().label("CVC").min(3).max(4).required(),
    name_on_card: Yup.string().label("Name").required(),
    expiry: Yup.string().label("Expiry").min(4).max(5).required(),
  });

  useEffect(() => {
    document.title = "Ameritec || " + t("Thanh Toán");
    let message = t("Đã xảy ra lỗi vui lòng thử lại sau");
    API.checkTransId({ transId })
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          let { user_name, phone, amount_usd, amount_vnd, buy_package, email } =
            res.data.data.trans;
          setName(user_name);
          setPhone(phone);
          setEmail(email);
          setBuyPackage(buy_package);
          setTotalAmount(
            i18n.language.includes("vi") ? amount_vnd : amount_usd
          );
        } else {
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, []);

  const validationSchema = Yup.object().shape({
    // payment_method: Yup.string().required(
    //   "Vui lòng chọn phương thức thanh toán"
    // ),
    country: Yup.string().required("Vui lòng chọn Quốc Gia"),
    bank_code: isNLATM
      ? Yup.string().required("Vui lòng chọn ngân hàng")
      : Yup.string().nullable(),
  });

  const handleSubmit = async (values, actions) => {
    const body = { ...values };
    if (!isChooseMethod) {
      setShowErrChooseMethod(true);
      return;
    }
    let message = t("Đã xảy ra lỗi vui lòng thử lại sau");
    setLoading(true);

    API.transaction(body)
      .then((res) => {
        const status = res.data.status;
        if (status && status !== 200) {
          for (const error of res.data.errors) {
            toast.error(error.err_message);
            actions.setFieldError(error.label, error.err_message);
          }
          actions.setSubmitting(false);
        } else {
          actions.setSubmitting(false);
          if (res.data.data.payment_method === "tienmat") {
            setOpenMoneyChase(true);
          } else if (
            res.data.data.payment_method === "nganluong" ||
            res.data.data.payment_method === "nganluongvisa"
          ) {
            actions.setSubmitting(false);
            setUrl(res.data.data.checkoutUrl);
            setOpenChangePage(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(message);
        actions.setSubmitting(false);
      });
  };

  const handleSubmitCredit = (values, actions) => {
    console.log("credit submited :", values);
    API.payWithCredit(values)
      .then((res) => {
        const status = res.data.status;
        if (status && status === 200) {
          toast.success(res.data.message);
          actions.setSubmitting(false);
          let url = res.data.data.url;
          history.push(url);
        } else {
          toast.error(res.data.message);
          for (var err of res.data.errors) {
            actions.setFieldError(err.label, err.err_message);
          }
          actions.setSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
        actions.setSubmitting(false);
      });
  };

  const onCancelCredit = () => {
    setOnCredit(false);
  };

  return (
    <div className="flex min-h-screen md:p-6 bg-gray-50 ">
      <Modal isOpen={openMoneyChase}>
        <ModalHeader className="text-center mb-4">
          🎉 {t("Thông Báo")} 🎉
        </ModalHeader>
        <ModalBody>
          <div className="text-lg md:text-xl flex flex-col justify-center">
            {i18n.language === "vi" && (
              <p>
                Giao dịch của bạn đã vào trạng thái chờ! Vui lòng thanh toán để
                được kích hoạt. Bạn có thể thanh toán tại Văn Phòng Công Ty hoặc
                chuyển khoản qua số tài khoản: 118002775135, ngân hàng:
                VietinBank, Tên tài khoản: CÔNG TY CỔ PHẦN AMERITEC
              </p>
            )}
            <br />
            <p className="text-center">
              {t(
                "Tài khoản sau khi xác nhận xong sẽ được thông báo về Email mà bạn đã đăng ký!"
              )}
            </p>
            <h4 className="text-center mt-2">{t("Xin Cảm Ơn")} 😊</h4>
            <Button
              className="mt-2 md:mt-4 m-auto"
              onClick={() => {
                history.push("/login");
              }}
            >
              {t("Đóng")}
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={openChangePage}>
        <ModalBody>
          <div className="flex flex-col justify-center">
            <Button>
              <a className="text-white" href={url}>
                Thanh toán
              </a>
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg lg:shadow-xl ">
        <main className="flex p-6">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold text-gray-700 ">
                {t("Thanh Toán")}
              </h1>
            </div>
            <hr className="my-4" />

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps) => {
                const { isSubmitting, setFieldValue } = formikProps;

                return (
                  <Form className="flex justify-center flex-col">
                    <div className="main w-full mb-4">
                      <div className="flex items-center w-full">
                        <div className="rounded-md mr-6">
                          <img
                            src={package_img}
                            alt="package"
                            width="100px"
                            className="object-fit rounded-md"
                          />
                        </div>
                        {buy_package === "1" && (
                          <h5 className="font-semibold">{t("Gói Cá Nhân")}</h5>
                        )}
                        {buy_package === "2" && (
                          <h5 className="font-semibold">{t("Gói Gia Đình")}</h5>
                        )}
                        {buy_package === "3" && (
                          <h5 className="font-semibold">
                            {t("Gói Doanh Nghiệp")}
                          </h5>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 w-full">
                      <label className="flex text-md text-gray-700 dark:text-gray-400">
                        <span className="mr-2">{t("Họ và tên")} : </span>
                        <span className="font-semibold">{name}</span>
                      </label>
                    </div>
                    <div className="mt-3 w-full">
                      <label className="flex text-md text-gray-700 dark:text-gray-400">
                        <span className="mr-2">Email : </span>
                        <span className="font-semibold">{email}</span>
                      </label>
                    </div>

                    <div className="mt-3 w-full">
                      <label className="flex text-md text-gray-700 dark:text-gray-400">
                        <span className="mr-2">{t("Số điện thoại")} : </span>
                        <span className="font-semibold">{phone}</span>
                      </label>
                    </div>

                    <div className="mt-3 w-full">
                      <label className="flex text-md text-gray-700 dark:text-gray-400">
                        <span className="mr-2">{t("Tổng số tiền")} : </span>
                        <span className="font-semibold">
                          {total_amount
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                          {i18n.language.includes("vi") ? "VNĐ" : "USD"}
                        </span>
                      </label>
                    </div>

                    <FastField
                      component={SelectField}
                      name="country"
                      type="text"
                      placeholder="Việt Nam"
                      options={[
                        { value: "VN", label: "Việt Nam" },
                        { value: "USA", label: "The United States of America" },
                      ]}
                      label={t("Quốc gia")}
                    />
                    {isNLATM && (
                      <FastField
                        component={SelectField}
                        name="bank_code"
                        placeholder={t("Chọn ngân hàng")}
                        options={BANK}
                        label={t("Ngân Hàng")}
                      />
                    )}

                    <div className="grouped fields mt-4">
                      <label htmlFor="fruit">
                        {t("Chọn phương thức thanh toán")}: (?)
                      </label>

                      <div className="flex flex-col mt-3">
                        <Label radio className="flex items-center mt-2 text-md">
                          <Input
                            type="radio"
                            className="border border-gray-700"
                            name="payment_method"
                            value="tienmat"
                            onChange={(e) => {
                              setIsChooseMethod(true);
                              setShowErrChooseMethod(false);
                              setFieldValue("payment_method", e.target.value);
                              setIsNLATM(false);
                            }}
                          />
                          <span className="m-0 ml-2">{t("Tiền mặt")}</span>
                        </Label>
                        {i18n.language.includes("vi") && (
                          <>
                            <Label
                              radio
                              className="flex items-center mt-2 text-md"
                            >
                              <Input
                                type="radio"
                                className="border border-gray-700"
                                name="payment_method"
                                value="nganluong"
                                onChange={(e) => {
                                  setIsChooseMethod(true);
                                  setShowErrChooseMethod(false);
                                  setFieldValue(
                                    "payment_method",
                                    e.target.value
                                  );
                                  setIsNLATM(!isNLATM);
                                }}
                              />
                              <span className="m-0 ml-2">Ngân Lượng (ATM)</span>
                            </Label>
                            <Label radio className="flex items-center mt-2">
                              <Input
                                type="radio"
                                className="border border-gray-700"
                                name="payment_method"
                                value="nganluongvisa"
                                onChange={(e) => {
                                  setIsChooseMethod(true);
                                  setFieldValue(
                                    "payment_method",
                                    e.target.value
                                  );
                                  setIsNLATM(false);
                                }}
                              />
                              <span className="m-0 ml-2 text-md">
                                Ngân Lượng (VISA)
                              </span>
                            </Label>
                          </>
                        )}
                      </div>
                      {showErrChooseMethod && (
                        <div className="mt-4 text-red-500">
                          Vui lòng chọn phương thức thanh toán
                        </div>
                      )}
                    </div>
                    <br />
                    {/* {
                      i18n.language.includes('vi') && */}
                    <Button
                      type="submit"
                      className="mt-4"
                      block
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                      )}
                      {t("Thanh Toán Đơn Hàng")}
                    </Button>
                    {/* } */}
                  </Form>
                );
              }}
            </Formik>

            {!i18n.language.includes("vi") && (
              <div className="my-6">
                <Button size="large" onClick={() => setOnCredit(true)}>
                  Pay with Credit card
                </Button>
                <div className="flex gap-2 mt-2">
                  <div className="flex justify-center items-center">
                    <img src={VISA_IMG} width={100} height="auto" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={MASTER_IMG} width={100} height="auto" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={DISCOVER_IMG} width={100} height="auto" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={AMERICAN_IMG} width={100} height="auto" />
                  </div>
                </div>
                <Modal isOpen={onCredit} onClose={onCancelCredit}>
                  <ModalHeader>
                    <p className="text-center mb-4 text-lg font-semibold">
                      Pay with Credit Card
                    </p>
                  </ModalHeader>
                  <ModalBody>
                    <Formik
                      initialValues={creditInitialValues}
                      validationSchema={creditValidationSchema}
                      onSubmit={handleSubmitCredit}
                    >
                      {(formikProps) => {
                        const { values, isSubmitting } = formikProps;
                        return (
                          <Form>
                            <div>
                              <FastField
                                component={InputField}
                                name="card_number"
                                type="text"
                                placeholder="Card Number"
                                label="Card Number"
                              />
                              <FastField
                                component={InputField}
                                name="name_on_card"
                                type="text"
                                placeholder="Name"
                                label="Name"
                              />
                              <div className="flex gap-2">
                                <FastField
                                  component={InputField}
                                  name="expiry"
                                  type="text"
                                  placeholder="Valid Thru (Ex: 22/25)"
                                  label="Expiry"
                                />
                                <FastField
                                  component={InputField}
                                  name="cvc"
                                  type="text"
                                  placeholder="CVC"
                                  label="CVC"
                                />
                              </div>
                            </div>
                            {isSubmitting && (
                              <p text="sm text-red my-2 mx-auto">
                                Please don't click Close button
                              </p>
                            )}
                            <div className="flex justify-center">
                              <Button
                                type="submit"
                                className="mt-2 m-auto"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <Spinner />
                                ) : (
                                  <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                                )}
                                Submit
                              </Button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </ModalBody>
                </Modal>
              </div>
            )}
            {!i18n.language.includes("vi") && <hr className="my-2" />}
            {!i18n.language.includes("vi") && (
              <div className="my-6">
                {checkout ? (
                  <PayPal trans_id={transId} price={total_amount} />
                ) : (
                  <div>
                    <Button
                      size="large"
                      className="appearance-none"
                      onClick={() => {
                        setCheckOut(true);
                      }}
                    >
                      Pay with PayPal
                    </Button>
                    <div className="mt-2">
                      <img src={PAYPAL_IMG} className="w-40" />
                      <p className="font-bold mt-2 text-sm">
                        Pay by PayPal, additional fees 4.59%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Payment;
