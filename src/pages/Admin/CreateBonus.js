import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import ADMIN from "../../api/Admin";
import PageTitle from "../../components/Typography/PageTitle";

import { Button } from "@windmill/react-ui";
import InputField from "../../components/CustomFields/input-field";
import Spinner from "../../components/Spinner";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from "@windmill/react-ui";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../assets/css/Payment.css";

function CreateBonus({ match }) {
  const id = match.params.id;
  const [userName, setUserName] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [listBonus, setListBonus] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const initialValues = {
    receive_mem_id: id,
    receive_mem_name: userName,
    level: userLevel,
    amount_vnd: "",
    amount_usd: "",
    amount_share: "",
    note: ""
  };

  const validationSchema = Yup.object().shape({
    receive_mem_id: Yup.string().required("Vui lòng điền nhập mã giới thiệu"),
    receive_mem_name: Yup.string().required("Vui lòng điền họ và tên"),
    level: Yup.string().required("Vui lòng điền nhập level"),
    amount_vnd: Yup.string().nullable(),
    amount_usd: Yup.string().nullable(),
    amount_share: Yup.string().nullable(),
  });

  useEffect(() => {
    ADMIN.requestBonusUser({ id })
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          setUserName(res.data.data.user.full_name);
          setUserLevel(res.data.data.user.level);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    ADMIN.getListBonusByUserId({ id })
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          console.log(res.data);
          setListBonus(res.data.data.listBonus);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  const handleDeleteBonus = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>❗ Xác nhận xóa ❗</h1>
            <br />

            <button className="" onClick={() => onClose()}>Hủy</button>
            <button
              className="red"
              onClick={() => {
                ADMIN.deleteBonus({ id })
                  .then((res) => {
                    const status = res.data.status;
                    if (status !== 200) {
                      toast.error(res.data.message);
                    } else {
                      setRefresh(!refresh);
                      toast.success(res.data.message);
                      onClose();
                    }
                  })
                  .catch((err) => {
                    toast.error(err);
                  });
              }}
            >
              Xác nhận
            </button>
          </div>
        );
      },
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  }

  const handleSubmit = (values, { setSubmitting, setFieldError, resetForm }) => {
    const body = { ...values };
    let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
    ADMIN.createBonus(body)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          setSubmitting(false);
          resetForm();
          toast.success(res.data.message);
          setRefresh(!refresh);
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
      <PageTitle>Tạo thưởng cho khách hàng : <span className="italic">{userName}</span></PageTitle>
      <ToastContainer />
      <div className="">
        <div className="flex flex-col items-center justify-center bg-gray-50">
          <ToastContainer />
          <div className="flex-1 h-full w-full dark:bg-gray-800">
            <div className="flex flex-col overflow-y-auto">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {(formikProps) => {
                  const { isSubmitting } = formikProps;

                  return (
                    <Form className="flex items-center justify-center">
                      <div className="w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <Field
                            component={InputField}
                            name="receive_mem_name"
                            type="text"
                            placeholder="Họ và tên"
                            label="Họ và tên"
                            disabled={true}
                          />
                          <Field
                            component={InputField}
                            name="level"
                            type="text"
                            placeholder="Level thưởng"
                            label="Level thưởng"
                            disabled={true}
                          />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <Field
                            component={InputField}
                            name="receive_mem_id"
                            type="text"
                            placeholder="Mã giới thiệu"
                            label="Mã giới thiệu"
                            disabled={true}
                          />
                          <Field
                            component={InputField}
                            name="amount_share"
                            type="text"
                            placeholder="Thưởng cổ phần"
                            label="Thưởng cổ phần"
                          />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <Field
                            component={InputField}
                            name="amount_vnd"
                            type="text"
                            placeholder="Số tiền VNĐ VD: 300 ngàn -> 300000"
                            label="Số tiền VNĐ"
                          />
                          <Field
                            component={InputField}
                            name="amount_usd"
                            type="text"
                            placeholder="Số tiền USD VD: 300 $ -> 300"
                            label="Số tiền USD"
                          />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                          <Field
                            component={InputField}
                            name="note"
                            type="text"
                            placeholder="Nhập ghi chú"
                            label="Ghi chú"
                          />
                        </div>
                        <Button type="submit" block className="mt-8" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <Spinner />
                          ) : (
                            <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                          )}
                          Tạo thưởng
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          {
            listBonus.length > 0 &&
            <div className="w-full mb-20">
              <PageTitle>Danh sách thưởng : </PageTitle>
              <TableContainer className="">
                <Table>
                  <TableHeader className="">
                    <tr>
                      <TableCell>Họ và tên</TableCell>
                      <TableCell className="text-center">Level</TableCell>
                      <TableCell className="text-center">Ngày tạo</TableCell>
                      <TableCell className="text-center">Số tiền VNĐ</TableCell>
                      <TableCell className="text-center">Số tiền USD</TableCell>
                      <TableCell className="text-center">Thưởng Cổ Phần</TableCell>
                      <TableCell className="text-center">Ghi chú</TableCell>
                      <TableCell className="text-center">Thao tác</TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {listBonus.map((bonus, i) => (
                      <TableRow key={i} className={`${i % 2 !== 0 && 'bg-gray-100'} text-center`}>
                        <TableCell className="text-left">
                          <p className="font-xs text-left">{bonus.receive_mem_name}</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-xs">Cấp {bonus.level}</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-xs">{new Date(bonus.created_time).toLocaleDateString('vi')}</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-xs">{bonus.amount_vnd} VNĐ</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-xs">{bonus.amount_usd} USD</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-xs">{bonus.amount_share} Cổ phần</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-xs">{bonus.note}</p>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => handleDeleteBonus(bonus._id)}
                            className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110 appearance-none focus:border-none focus:outline-none">
                            ❌
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default CreateBonus;
