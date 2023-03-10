import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import PageTitle from "../../components/Typography/PageTitle";
import ADMIN from "../../api/Admin";
import { BANK } from '../../constants/bank';
import { PAYMENT } from '../../constants/payment';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast, ToastContainer } from "react-toastify";
import { FastField, Form, Formik, Field } from "formik";
import SelectField from "../../components/CustomFields/select-field";
import InputField from "../../components/CustomFields/input-field";
import Spinner from "../../components/Spinner";
import CTA from '../../components/CTA';
import * as Yup from "yup";
import {
  Badge,
} from "@windmill/react-ui";
import PopupChooseUserId from '../../components/PopupChooseUserId';
import { PACKAGE } from '../../constants/package';
import { Button, Modal, ModalHeader, ModalBody } from "@windmill/react-ui";
import axios from 'axios';

function CommissionDetail({ match }) {
  const role = JSON.parse(localStorage.getItem('user')).user.role;
  const [loading, setLoading] = useState(true);
  const [transData, setTransData] = useState({});
  const [comData, setComData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { id } = match.params;
  const [openNL, setOpenNL] = useState(false);
  const [messError, setMessError] = useState("");

  const initialValues = {
    id: transData._id,
    payment_method: transData.payment_method,
    note: transData.note
  };

  const validationSchema = Yup.object().shape({});

  function onClickChangeReceiveMem() {
    return confirmAlert({
      customUI: ({ onClose }) => {
        return <PopupChooseUserId onClose={onClose} comData={comData} refresh={refresh} setRefresh={setRefresh} />;
      }
    });
  }

  function onClickChangePaymentMethod() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              const body = {
                ...values
              };
              let message = '???? x???y ra l???i vui l??ng th??? l???i sau';
              ADMIN.updateTransPaymentMethod(body)
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
                    setRefresh(!refresh);
                    onClose();
                  }
                })
                .catch((err) => {
                  toast.error(message);
                });
            }}
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
                      <Form className="bg-white px-6 py-10">
                        <div className="md:w-full px-3 mb-3">
                          <FastField
                            component={SelectField}
                            name="payment_method"
                            placeholder="Ch???n ph????ng th???c thanh to??n"
                            options={PAYMENT}
                            label="Ch???n ph????ng th???c thanh to??n"
                          />
                          <FastField
                            component={InputField}
                            name="note"
                            type="text"
                            placeholder="Ghi ch??"
                            label="Ghi ch??"
                          />
                        </div>
                        <div className="pb-6 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={` items-center cursor-pointer w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-500 hover:bg-green-600 focus:ring-green-600 sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                            {isSubmitting && <Spinner />} L??u thay ?????i
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                            }}
                            disabled={isSubmitting}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            H???y b???
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
      },
    });
  }

  function onClickApproveCommission() {
    setUpdating(true);
    let message = '???? x???y ra l???i vui l??ng th??? l???i sau';
    ADMIN.updateStatusCommission({ id })
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setUpdating(false);
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        toast.error(message);
      });
  }

  useEffect(() => {
    let message = "C?? l???i x???y ra! Vui l??ng th??? l???i sau";
    ADMIN.getDetailCommission({ id })
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          setTransData(res.data.data.trans);
          setComData(res.data.data.com);
          setLoading(false);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(message);
      });
  }, [refresh]);

  const initialValuesNL = {
    id,
    total_amount: comData.amount_vnd,
    bank_code: comData.bank,
    bank_name: BANK.find(ele => ele.value === comData.bank) ? BANK.find(ele => ele.value === comData.bank).label : "",
    card_fullname: comData.bank_name,
    card_number: comData.bank_account
  }

  const validationSchemaNL = Yup.object().shape({
    total_amount: Yup.string().required("Vui l??ng kh??ng ????? tr???ng tr?????ng n??y"),
    bank_code: Yup.string().required("Vui l??ng kh??ng ????? tr???ng tr?????ng n??y"),
    bank_name: Yup.string().required("Vui l??ng kh??ng ????? tr???ng tr?????ng n??y"),
    card_fullname: Yup.string().required("Vui l??ng kh??ng ????? tr???ng tr?????ng n??y"),
    card_number: Yup.string().required("Vui l??ng kh??ng ????? tr???ng tr?????ng n??y"),
  });

  const handleSubmitNL = (values, { setSubmitting, setFieldError }) => {
    console.log("submit", values);

    ADMIN.returnCommissionNL(values)
      .then(res => {
        if (res.data.status === 200) {
          setSubmitting(false);
          setOpenNL(false);
          toast.success(res.data.message);
          setRefresh(!refresh);
        } else {
          setMessError(res.data.message);
          setSubmitting(false);
        }
      })
      .catch(err => {
        setSubmitting(false);
        toast.error("???? x???y ra l???i vui l??ng th??? l???i sau");
      });
  }

  const checkCashOutStatusNL = () => {
    setUpdating(true);
    ADMIN.checkCashOutStatusNL({ id })
      .then(res => {
        if (res.data.status === 200) {
          setUpdating(false);
          toast.success(res.data.message);
          setRefresh(!refresh);
        } else {
          toast.warning(res.data.message);
          setUpdating(false);
        }
      })
      .catch(err => {
        setUpdating(false);
        toast.error("???? x???y ra l???i vui l??ng th??? l???i sau");
      });
  }

  return (
    <>
      <PageTitle>Th??ng tin giao d???ch <span className="italic font-semibold text-gray-600">#{id}</span></PageTitle>
      <CTA back_url="/admin/commission" />
      <Modal isOpen={openNL} onClose={() => setOpenNL(false)}>
        <ModalHeader className="text-center mb-4">Tr??? hoa h???ng qua Ng??n L?????ng</ModalHeader>
        <ModalBody>
          {
            messError !== "" &&
            <div class="px-4 py-2 bg-red-100 rounded-lg mb-4 text-red-500 text-md">
              {messError}
            </div>
          }
          <Formik
            initialValues={initialValuesNL}
            validationSchema={validationSchemaNL}
            onSubmit={handleSubmitNL}
          >
            {
              (formikProps) => {

                const { isSubmitting } = formikProps;

                return (
                  <Form className="">
                    <Field
                      component={InputField}
                      name="card_fullname"
                      type="text"
                      placeholder="H??? v?? T??n"
                      label="H??? v?? T??n"
                    />
                    <Field
                      component={InputField}
                      name="card_number"
                      type="text"
                      placeholder="S??? t??i kho???n"
                      label="S??? t??i kho???n"
                    />
                    <Field
                      component={InputField}
                      name="bank_name"
                      type="text"
                      placeholder="Ng??n H??ng"
                      label="Ng??n H??ng"
                    />
                    <Field
                      component={InputField}
                      name="bank_code"
                      type="text"
                      placeholder="M?? Ng??n H??ng"
                      label="M?? Ng??n H??ng"
                    />
                    <Field
                      component={InputField}
                      name="total_amount"
                      type="text"
                      placeholder="S??? ti???n (VN??)"
                      label="S??? ti???n"
                    />
                    <Button type="submit" className="mt-4" block>
                      {isSubmitting ? (
                        <Spinner />
                      ) : (
                        <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                      )}
                      <span>Thanh to??n</span>
                    </Button>
                  </Form>
                )
              }
            }
          </Formik>
        </ModalBody>
      </Modal>
      <div className="flex flex-col lg:flex-row w-full gap-10 mb-40">
        <div className="w-full">
          <h3 className="p-4 text-2xl text-center text-bold italic">L???ch s??? thanh to??n</h3>
          <div className="container flex justify-center mx-auto">
            <div className="w-full bg-white rounded-lg shadow-lg">
              {
                loading ? <div className=""><Skeleton variant="rect" width="100%" height={50} count={6} /></div>
                  :
                  <ul className="divide-y-2 divide-gray-400">
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      H??? v?? t??n
                      <div className="text-semibold text-md text-gray-700">{transData.user_name}</div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      G??i mua
                      <div className="text-semibold text-md text-gray-700">
                        {
                          transData.account_type === 'en' ? PACKAGE.find(ele => ele.value === transData.buy_package).label_en
                            : PACKAGE.find(ele => ele.value === transData.buy_package).label
                        }
                      </div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Ng??y ????ng k??
                      <div className="text-semibold text-md text-gray-700">{new Date(transData.created_time).toLocaleDateString("vi")}</div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Ng??y h???t h???n
                      <div className="text-semibold text-md text-gray-700">{new Date(transData.expired_time).toLocaleDateString("vi")}</div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Tr???ng th??i thanh to??n
                      <div className="text-semibold text-md text-gray-700"><Badge type="success">???? thanh to??n</Badge></div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Ph????ng th???c thanh to??n
                      <div className="text-semibold text-md text-gray-700 flex items-center">
                        {transData.payment_method === 'tienmat' && 'Ti???n m???t'}
                        {transData.payment_method === 'nganluong' && 'Ng??n L?????ng ATM'}
                        {transData.payment_method === 'nganluongvisa' && 'Ng??n L?????ng VISA'}
                        {transData.payment_method === 'PAYPAL' && 'PAYPAL'}
                        {transData.payment_method === 'Credit Card' && 'Credit Card'}
                      </div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Ghi ch??
                      <div className="text-semibold text-md text-gray-700">{transData.note}</div>
                    </li>
                  </ul>
              }
            </div>
          </div>
          {
            role !== 'accountant2' &&
            <button onClick={onClickChangePaymentMethod} type="button" className="mt-4 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-indigo-600 border border-transparent active:bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline-indigo ">
              Thay ?????i ph????ng th???c thanh to??n</button>
          }
        </div>
        <div className="w-full">
          <h3 className="p-4 text-2xl text-center text-bold italic">L???ch s??? hoa h???ng</h3>
          <div className="container flex justify-center mx-auto">
            <div className="w-full bg-white rounded-lg shadow-lg">
              {
                loading ? <div className=""><Skeleton variant="rect" width="100%" height={50} count={9} /></div>
                  :
                  <ul className="divide-y-2 divide-gray-400">
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Ng?????i g???i
                      <div className="text-semibold text-md text-gray-700">{comData.approved_by}</div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Ng?????i nh???n
                      <div className="text-semibold text-md text-gray-700">{comData.receive_mem_name}</div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      G??i c???a ng?????i gi???i thi???u
                      <div className="text-semibold text-md text-gray-700">
                        {
                          comData.account_type === 'en' ? PACKAGE.find(ele => ele.value === comData.buy_package).label_en
                            : PACKAGE.find(ele => ele.value === comData.buy_package).label
                        }
                      </div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Tr???ng th??i t??i kho???n
                      {comData.is_active && <div className="text-semibold text-md text-gray-700"><Badge type="success">??ang ho???t ?????ng</Badge></div>}
                      {!comData.is_active && <div className="text-semibold text-md text-gray-700"><Badge type="danger">??ang t???m kh??a</Badge></div>}
                    </li>
                    {
                      comData.account_type === 'vi' &&
                      <>
                        <li className="flex justify-between p-4 text-sm text-gray-500">
                          Ng??n h??ng
                          <div className="text-semibold text-md text-gray-700">{BANK.find(ele => ele.value === comData.bank).label}</div>
                        </li>
                        <li className="flex justify-between p-4 text-sm text-gray-500">
                          T??n t??i kho???n
                          <div className="text-semibold text-md text-gray-700">{comData.bank_name}</div>
                        </li>
                        <li className="flex justify-between p-4 text-sm text-gray-500">
                          S??? t??i kho???n
                          <div className="text-semibold text-md text-gray-700">{comData.bank_account}</div>
                        </li>
                        <li className="flex justify-between p-4 text-sm text-gray-500">
                          S??? ti???n
                          {
                            comData.account_type === 'en' ?
                              <div className="text-semibold text-md text-gray-700">{comData.amount_usd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} USD</div>
                              : <div className="text-semibold text-md text-gray-700">{comData.amount_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} VN??</div>
                          }
                        </li>
                      </>
                    }
                    {
                      comData.account_type === 'en' &&
                      <li className="flex justify-between p-4 text-sm text-gray-500">
                        Froms of receiving commissions
                        <div className="text-semibold text-md text-gray-700">{comData.request_commission}</div>
                      </li>
                    }
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Th???i gian
                      <div className="text-semibold text-md text-gray-700">
                        {(comData.approved_time && comData.approved_time !== "") ? new Date(comData.approved_time).toLocaleTimeString("vi") : ""}
                        -
                        {(comData.approved_time && comData.approved_time !== "") ? new Date(comData.approved_time).toLocaleDateString("vi") : ""}</div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Tr???ng th??i thanh to??n
                      <div className="text-semibold text-md text-gray-700">
                        {comData.status === 'pending' && <Badge type="danger">Ch??a thanh to??n</Badge>}
                        {comData.status === 'processing' && <Badge type="warning">??ang x??? l??</Badge>}
                        {comData.status === 'success' && <Badge type="success">???? thanh to??n</Badge>}
                      </div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Ph????ng th???c tr??? HH
                      <div className="text-semibold text-md text-gray-700">
                        {comData.payment_method === 'thucong' && "Ti???n M???t"}
                        {comData.payment_method === 'nganluong' && "Ng??n L?????ng"}
                      </div>
                    </li>
                    <li className="flex justify-between p-4 text-sm text-gray-500">
                      Ghi ch??
                      <div className="text-semibold text-md text-gray-700">{comData.note}</div>
                    </li>
                  </ul>
              }
            </div>
          </div>
          {
            role !== 'accountant2' &&
            <>
              {
                comData.status === "pending" &&
                <div className="w-full flex flex-col">
                  <button type="button" onClick={onClickChangeReceiveMem} className="mt-4 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-indigo-600 border border-transparent active:bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline-indigo">
                    Thay ?????i ng?????i nh???n hoa h???ng</button>
                  <button onClick={onClickApproveCommission} disabled={!comData.is_active} type="button" className={`mt-4 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green ${!comData.is_active && 'opacity-25'}`}>
                    {updating && <Spinner />}Tr??? hoa h???ng</button>
                  <button onClick={() => setOpenNL(true)} disabled={!comData.is_active} type="button" className={`mt-4 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-yellow-600 border border-transparent active:bg-yellow-600 hover:bg-yellow-700 focus:shadow-outline-yellow ${!comData.is_active && 'opacity-25'}`}>
                    {updating && <Spinner />}Tr??? hoa h???ng b???ng Ng??n L?????ng</button>
                </div>
              }
              {
                comData.status === "processing" &&
                <div className="w-full flex flex-col">
                  <button onClick={checkCashOutStatusNL} disabled={!comData.is_active} type="button" className={`mt-4 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-yellow-600 border border-transparent active:bg-yellow-600 hover:bg-yellow-700 focus:shadow-outline-yellow ${!comData.is_active && 'opacity-25'}`}>
                    {updating && <Spinner />}Ki???m tra tr???ng th??i tr???</button>
                </div>
              }
            </>
          }
        </div>
      </div>
    </>
  );
}

export default CommissionDetail;
