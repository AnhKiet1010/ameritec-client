import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";
import PageTitle from "../../components/Typography/PageTitle";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Button,
  Label, Input
} from "@windmill/react-ui";
import { toast, ToastContainer } from "react-toastify";
import ADMIN from "../../api/Admin";
import InputField from "../../components/CustomFields/input-field";
import Spinner from "../../components/Spinner";

function Packages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [currentPackageEdit1, setCurrentPackageEdit1] = useState({});
  const [currentPackageEdit2, setCurrentPackageEdit2] = useState({});
  const [currentPackageEdit3, setCurrentPackageEdit3] = useState({});
  const [currentPackageEdit4, setCurrentPackageEdit4] = useState({});
  const message = "Đã xảy ra lỗi vui lòng thử lại sau";
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    ADMIN.getListPackage()
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
        } else {
          console.log('res', res.data);
          setData(res.data.data.listPackage);
          setCurrentPackageEdit1(res.data.data.listPackage[0]);
          setCurrentPackageEdit2(res.data.data.listPackage[1]);
          setCurrentPackageEdit3(res.data.data.listPackage[2]);
          setCurrentPackageEdit4(res.data.data.listPackage[3]);
          setLoading(false);
        }
      }).catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, [refresh]);

  function handleOnClick1(id) {
    const initialValues = {
      price_vnd: currentPackageEdit1.price_vnd,
      price_usd: currentPackageEdit1.price_usd,
      commission_package1_vnd: currentPackageEdit1.commission && currentPackageEdit1.commission.package1.price_vnd,
      commission_package1_usd: currentPackageEdit1.commission && currentPackageEdit1.commission.package1.price_usd,
      commission_package2_vnd: currentPackageEdit1.commission && currentPackageEdit1.commission.package2.price_vnd,
      commission_package2_usd: currentPackageEdit1.commission && currentPackageEdit1.commission.package2.price_usd,
      commission_package3_vnd: currentPackageEdit1.commission && currentPackageEdit1.commission.package3.price_vnd,
      commission_package3_usd: currentPackageEdit1.commission && currentPackageEdit1.commission.package3.price_usd,
      commission_package4_vnd: currentPackageEdit1.commission && currentPackageEdit1.commission.package4.price_vnd,
      commission_package4_usd: currentPackageEdit1.commission && currentPackageEdit1.commission.package4.price_usd,
      active: currentPackageEdit1.active
    };

    const validationSchema = Yup.object().shape({
      price_vnd: Yup.string().required("Vui lòng không để trống"),
      price_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package1_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package1_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package2_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package2_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package3_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package3_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package4_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package4_usd: Yup.string().required("Vui lòng không để trống"),
    });

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, actions) => {
              const body = {
                id,
                ...values
              };
              let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
              ADMIN.updatePackage(body)
                .then((res) => {
                  const status = res.data.status;
                  if (status !== 200) {
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
                      <Form className="bg-white p-4">
                        <div className="w-full">
                          <div className="bg-white flex flex-col">
                            <div className="-mx-3 md:flex">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="price_vnd"
                                  type="text"
                                  placeholder="Giá VNĐ"
                                  label="Giá VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3">
                                <Field
                                  component={InputField}
                                  name="price_usd"
                                  type="text"
                                  placeholder="Giá USD"
                                  label="Giá USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package1_vnd"
                                  type="text"
                                  placeholder="HH Cá Nhân VND"
                                  label="HH Cá Nhân VND"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package1_usd"
                                  type="text"
                                  placeholder="HH Cá Nhân USD"
                                  label="HH Cá Nhân USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package2_vnd"
                                  type="text"
                                  placeholder="HH Khởi Nghiệp VNĐ"
                                  label="HH Khởi Nghiệp VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package2_usd"
                                  type="text"
                                  placeholder="HH Khởi Nghiệp USD"
                                  label="HH Khởi Nghiệp USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package3_vnd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp A VNĐ"
                                  label="HH Doanh Nghiệp A VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package3_usd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp A USD"
                                  label="HH Doanh Nghiệp A USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package4_vnd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp B VNĐ"
                                  label="HH Doanh Nghiệp B VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package4_usd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp B USD"
                                  label="HH Doanh Nghiệp B USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0 flex justify-start items-end">
                                <Label check className="mt-4">
                                  <Input type="checkbox" checked={values.active === true} className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple" onChange={() => setFieldValue('active', true)} />
                                  <span className="ml-2 mb-0 text-sm text-gray-700">Hiện</span>
                                </Label>
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0 flex justify-start items-end">
                                <Label check className="mt-4">
                                  <Input type="checkbox" checked={values.active === false} className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple" onChange={() => setFieldValue('active', false)} />
                                  <span className="ml-2 mb-0 text-sm text-gray-700">Ẩn</span>
                                </Label>
                              </div>
                            </div>
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
      },
    });
  }

  function handleOnClick2(id) {
    const initialValues = {
      price_vnd: currentPackageEdit2.price_vnd,
      price_usd: currentPackageEdit2.price_usd,
      commission_package1_vnd: currentPackageEdit2.commission && currentPackageEdit2.commission.package1.price_vnd,
      commission_package1_usd: currentPackageEdit2.commission && currentPackageEdit2.commission.package1.price_usd,
      commission_package2_vnd: currentPackageEdit2.commission && currentPackageEdit2.commission.package2.price_vnd,
      commission_package2_usd: currentPackageEdit2.commission && currentPackageEdit2.commission.package2.price_usd,
      commission_package3_vnd: currentPackageEdit2.commission && currentPackageEdit2.commission.package3.price_vnd,
      commission_package3_usd: currentPackageEdit2.commission && currentPackageEdit2.commission.package3.price_usd,
      commission_package4_vnd: currentPackageEdit2.commission && currentPackageEdit2.commission.package4.price_vnd,
      commission_package4_usd: currentPackageEdit2.commission && currentPackageEdit2.commission.package4.price_usd,
      active: currentPackageEdit2.active
    };

    const validationSchema = Yup.object().shape({
      price_vnd: Yup.string().required("Vui lòng không để trống"),
      price_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package1_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package1_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package2_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package2_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package3_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package3_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package4_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package4_usd: Yup.string().required("Vui lòng không để trống"),
    });

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, actions) => {
              const body = {
                id,
                ...values
              };
              let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
              ADMIN.updatePackage(body)
                .then((res) => {
                  const status = res.data.status;
                  if (status !== 200) {
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
                      <Form className="bg-white p-4">
                        <div className="w-full">
                          <div className="bg-white flex flex-col">
                            <div className="-mx-3 md:flex">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="price_vnd"
                                  type="text"
                                  placeholder="Giá VNĐ"
                                  label="Giá VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3">
                                <Field
                                  component={InputField}
                                  name="price_usd"
                                  type="text"
                                  placeholder="Giá USD"
                                  label="Giá USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package1_vnd"
                                  type="text"
                                  placeholder="HH Cá Nhân VND"
                                  label="HH Cá Nhân VND"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package1_usd"
                                  type="text"
                                  placeholder="HH Cá Nhân USD"
                                  label="HH Cá Nhân USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package2_vnd"
                                  type="text"
                                  placeholder="HH Khởi Nghiệp VNĐ"
                                  label="HH Khởi Nghiệp VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package2_usd"
                                  type="text"
                                  placeholder="HH Khởi Nghiệp USD"
                                  label="HH Khởi Nghiệp USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package3_vnd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp A VNĐ"
                                  label="HH Doanh Nghiệp A VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package3_usd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp A USD"
                                  label="HH Doanh Nghiệp USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package4_vnd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp B VNĐ"
                                  label="HH Doanh Nghiệp B VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package4_usd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp B USD"
                                  label="HH Doanh Nghiệp B USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0 flex justify-start items-end">
                                <Label check className="mt-4">
                                  <Input type="checkbox" checked={values.active === true} className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple" onChange={() => setFieldValue('active', true)} />
                                  <span className="ml-2 mb-0 text-sm text-gray-700">Hiện</span>
                                </Label>
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0 flex justify-start items-end">
                                <Label check className="mt-4">
                                  <Input type="checkbox" checked={values.active === false} className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple" onChange={() => setFieldValue('active', false)} />
                                  <span className="ml-2 mb-0 text-sm text-gray-700">Ẩn</span>
                                </Label>
                              </div>
                            </div>
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
      },
    });
  }

  function handleOnClick3(id) {
    const initialValues = {
      price_vnd: currentPackageEdit3.price_vnd,
      price_usd: currentPackageEdit3.price_usd,
      commission_package1_vnd: currentPackageEdit3.commission && currentPackageEdit3.commission.package1.price_vnd,
      commission_package1_usd: currentPackageEdit3.commission && currentPackageEdit3.commission.package1.price_usd,
      commission_package2_vnd: currentPackageEdit3.commission && currentPackageEdit3.commission.package2.price_vnd,
      commission_package2_usd: currentPackageEdit3.commission && currentPackageEdit3.commission.package2.price_usd,
      commission_package3_vnd: currentPackageEdit3.commission && currentPackageEdit3.commission.package3.price_vnd,
      commission_package3_usd: currentPackageEdit3.commission && currentPackageEdit3.commission.package3.price_usd,
      commission_package4_vnd: currentPackageEdit3.commission && currentPackageEdit3.commission.package4.price_vnd,
      commission_package4_usd: currentPackageEdit3.commission && currentPackageEdit3.commission.package4.price_usd,
      active: currentPackageEdit3.active
    };

    const validationSchema = Yup.object().shape({
      price_vnd: Yup.string().required("Vui lòng không để trống"),
      price_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package1_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package1_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package2_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package2_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package3_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package3_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package4_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package4_usd: Yup.string().required("Vui lòng không để trống"),
    });

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, actions) => {
              const body = {
                id,
                ...values
              };
              let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
              ADMIN.updatePackage(body)
                .then((res) => {
                  const status = res.data.status;
                  if (status !== 200) {
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
                      <Form className="bg-white p-4">
                        <div className="w-full">
                          <div className="bg-white flex flex-col">
                            <div className="-mx-3 md:flex">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="price_vnd"
                                  type="text"
                                  placeholder="Giá VNĐ"
                                  label="Giá VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3">
                                <Field
                                  component={InputField}
                                  name="price_usd"
                                  type="text"
                                  placeholder="Giá USD"
                                  label="Giá USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package1_vnd"
                                  type="text"
                                  placeholder="HH Cá Nhân VND"
                                  label="HH Cá Nhân VND"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package1_usd"
                                  type="text"
                                  placeholder="HH Cá Nhân USD"
                                  label="HH Cá Nhân USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package2_vnd"
                                  type="text"
                                  placeholder="HH Khởi Nghiệp VNĐ"
                                  label="HH Khởi Nghiệp VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package2_usd"
                                  type="text"
                                  placeholder="HH Khởi Nghiệp USD"
                                  label="HH Khởi Nghiệp USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package3_vnd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp A VNĐ"
                                  label="HH Doanh Nghiệp A VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package3_usd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp A USD"
                                  label="HH Doanh Nghiệp A USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package4_vnd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp B VNĐ"
                                  label="HH Doanh Nghiệp B VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package4_usd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp B USD"
                                  label="HH Doanh Nghiệp B USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0 flex justify-start items-end">
                                <Label check className="mt-4">
                                  <Input type="checkbox" checked={values.active === true} className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple" onChange={() => setFieldValue('active', true)} />
                                  <span className="ml-2 mb-0 text-sm text-gray-700">Hiện</span>
                                </Label>
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0 flex justify-start items-end">
                                <Label check className="mt-4">
                                  <Input type="checkbox" checked={values.active === false} className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple" onChange={() => setFieldValue('active', false)} />
                                  <span className="ml-2 mb-0 text-sm text-gray-700">Ẩn</span>
                                </Label>
                              </div>
                            </div>
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
      },
    });
  }

  function handleOnClick4(id) {
    const initialValues = {
      price_vnd: currentPackageEdit4.price_vnd,
      price_usd: currentPackageEdit4.price_usd,
      commission_package1_vnd: currentPackageEdit4.commission && currentPackageEdit4.commission.package1.price_vnd,
      commission_package1_usd: currentPackageEdit4.commission && currentPackageEdit4.commission.package1.price_usd,
      commission_package2_vnd: currentPackageEdit4.commission && currentPackageEdit4.commission.package2.price_vnd,
      commission_package2_usd: currentPackageEdit4.commission && currentPackageEdit4.commission.package2.price_usd,
      commission_package3_vnd: currentPackageEdit4.commission && currentPackageEdit4.commission.package3.price_vnd,
      commission_package3_usd: currentPackageEdit4.commission && currentPackageEdit4.commission.package3.price_usd,
      commission_package4_vnd: currentPackageEdit4.commission && currentPackageEdit4.commission.package4.price_vnd,
      commission_package4_usd: currentPackageEdit4.commission && currentPackageEdit4.commission.package4.price_usd,
      active: currentPackageEdit4.active
    };

    const validationSchema = Yup.object().shape({
      price_vnd: Yup.string().required("Vui lòng không để trống"),
      price_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package1_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package1_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package2_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package2_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package3_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package3_usd: Yup.string().required("Vui lòng không để trống"),
      commission_package4_vnd: Yup.string().required("Vui lòng không để trống"),
      commission_package4_usd: Yup.string().required("Vui lòng không để trống"),
    });

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, actions) => {
              const body = {
                id,
                ...values
              };
              let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
              ADMIN.updatePackage(body)
                .then((res) => {
                  const status = res.data.status;
                  if (status !== 200) {
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
                      <Form className="bg-white p-4">
                        <div className="w-full">
                          <div className="bg-white flex flex-col">
                            <div className="-mx-3 md:flex">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="price_vnd"
                                  type="text"
                                  placeholder="Giá VNĐ"
                                  label="Giá VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3">
                                <Field
                                  component={InputField}
                                  name="price_usd"
                                  type="text"
                                  placeholder="Giá USD"
                                  label="Giá USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package1_vnd"
                                  type="text"
                                  placeholder="HH Cá Nhân VND"
                                  label="HH Cá Nhân VND"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package1_usd"
                                  type="text"
                                  placeholder="HH Cá Nhân USD"
                                  label="HH Cá Nhân USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package2_vnd"
                                  type="text"
                                  placeholder="HH Khởi Nghiệp VNĐ"
                                  label="HH Khởi Nghiệp VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package2_usd"
                                  type="text"
                                  placeholder="HH Khởi Nghiệp USD"
                                  label="HH Khởi Nghiệp USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package3_vnd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp A VNĐ"
                                  label="HH Doanh Nghiệp A VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package3_usd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp A USD"
                                  label="HH Doanh Nghiệp A USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package4_vnd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp B VNĐ"
                                  label="HH Doanh Nghiệp B VNĐ"
                                />
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                                <Field
                                  component={InputField}
                                  name="commission_package4_usd"
                                  type="text"
                                  placeholder="HH Doanh Nghiệp B USD"
                                  label="HH Doanh Nghiệp B USD"
                                />
                              </div>
                            </div>
                            <div className="-mx-3 md:flex mb-1">
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0 flex justify-start items-end">
                                <Label check className="mt-4">
                                  <Input type="checkbox" checked={values.active === true} className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple" onChange={() => setFieldValue('active', true)} />
                                  <span className="ml-2 mb-0 text-sm text-gray-700">Hiện</span>
                                </Label>
                              </div>
                              <div className="md:w-1/2 px-3 mb-3 md:mb-0 flex justify-start items-end">
                                <Label check className="mt-4">
                                  <Input type="checkbox" checked={values.active === false} className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple" onChange={() => setFieldValue('active', false)} />
                                  <span className="ml-2 mb-0 text-sm text-gray-700">Ẩn</span>
                                </Label>
                              </div>
                            </div>
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
      },
    });
  }

  return (
    <>
      <PageTitle>Cài đặt Gói</PageTitle>

      {loading ? (
        <div className="mt-4"><Skeleton variant="rect" width="100%" height={50} count={5} /></div>
      ) : (
        <TableContainer className="mt-4 mb-10">
          <Table>
            <TableHeader className="bg-gray-300">
              <tr>
                <TableCell>Gói</TableCell>
                <TableCell className="text-center">Giá</TableCell>
                <TableCell className="text-center">HH Cá Nhân</TableCell>
                <TableCell className="text-center">HH Khởi Nghiệp</TableCell>
                <TableCell className="text-center">HH Doanh Nghiệp A</TableCell>
                <TableCell className="text-center">HH Doanh Nghiệp B</TableCell>
                <TableCell className="text-center">Thời gian thay đổi</TableCell>
                <TableCell className="text-center">Thao tác</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((pack, i) => (
                <TableRow key={i} className={`${i % 2 !== 0 && 'bg-gray-100'} text-center`}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div className="text-left">
                        <p className="font-semibold">{pack.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{pack.price_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}VNĐ </span> /
                    <span className="text-sm"> {pack.price_usd}$</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {pack.commission.package1.price_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}VNĐ /
                      <span className="text-sm"> {pack.commission.package1.price_usd}$</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {pack.commission.package2.price_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}VNĐ /
                      <span className="text-sm"> {pack.commission.package2.price_usd}$</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {pack.commission.package3.price_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}VNĐ /
                      <span className="text-sm"> {pack.commission.package3.price_usd}$</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {pack.commission.package4.price_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}VNĐ /
                      <span className="text-sm"> {pack.commission.package4.price_usd}$</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {`${new Date(pack.mtime).toLocaleDateString('vi')}`}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center justify-between">
                    {
                      i === 0 &&
                      <Button type="button" className="mx-auto" onClick={() => {
                        handleOnClick1(pack._id);
                      }}>
                        Chỉnh sửa
                      </Button>
                    }
                    {
                      i === 1 &&
                      <Button type="button" className="mx-auto" onClick={() => {
                        handleOnClick2(pack._id);
                      }}>
                        Chỉnh sửa
                      </Button>
                    }
                    {
                      i === 2 &&
                      <Button type="button" className="mx-auto" onClick={() => {
                        handleOnClick3(pack._id);
                      }}>
                        Chỉnh sửa
                      </Button>
                    }
                    {
                      i === 3 &&
                      <Button type="button" className="mx-auto" onClick={() => {
                        handleOnClick4(pack._id);
                      }}>
                        Chỉnh sửa
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default Packages;
