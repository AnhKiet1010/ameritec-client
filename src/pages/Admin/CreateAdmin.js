import React, { useState, useEffect } from "react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import ADMIN from "../../api/Admin";
import PageTitle from "../../components/Typography/PageTitle";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Button
} from "@windmill/react-ui";
import InputField from "../../components/CustomFields/input-field";
import SelectField from '../../components/CustomFields/select-field';
import Spinner from "../../components/Spinner";
import { CENTRALIZE } from '../../constants/centralize';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../assets/css/Payment.css";

function CreateAdmin() {
  const [listAdmin, setListAdmin] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
    ADMIN.getListAdmin()
      .then((res) => {
        if (res.data.status !== 200) {
          toast.error(res.data.message);
        } else {
          console.log(res.data);
          setListAdmin(res.data.data.listAdmin);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, [refresh]);

  const handleDeleteAdmin = (id) => {
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
                ADMIN.deleteAdmin({ id })
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

  const initialValues = {
    full_name: "",
    email: "",
    role: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Vui lòng điền họ và tên"),
    role: Yup.string().required("Vui lòng chọn quyền"),
    email: Yup.string()
      .email("Vui lòng điền đúng định dạng Email")
      .required("Vui lòng điền Email"),
    password: Yup.string()
      .required("Vui lòng điền mật khẩu")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự chữ hoa đặc biệt"
      ),
    confirm_password: Yup.string()
      .required("Vui lòng điền lại mật khẩu")
      .oneOf([Yup.ref("password"), null], "Không trùng khớp"),
  });

  const handleSubmit = (values, { setSubmitting, setFieldError, resetForm }) => {
    const body = { ...values };
    let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
    ADMIN.createAdmin(body)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          setSubmitting(false);
          resetForm();
          setRefresh(!refresh);
          toast.success(res.data.message);
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
      <PageTitle>Tạo tài khoản Admin</PageTitle>
      <ToastContainer />
      <div className="">
        <div className="flex items-start justify-center bg-gray-50 dark:bg-gray-900">
          <ToastContainer />
          <div className="flex-1 h-full dark:bg-gray-800">
            <div className="flex flex-col overflow-y-auto">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(formikProps) => {
                  const { isSubmitting } = formikProps;

                  return (
                    <Form className="flex items-center justify-center">
                      <div className="w-full">
                        <FastField
                          component={InputField}
                          name="full_name"
                          type="text"
                          placeholder="họ và tên"
                          label="Họ và tên"
                          note="Tên như trong CMND"
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <FastField
                            component={InputField}
                            name="email"
                            type="email"
                            placeholder="Email"
                            label="Email"
                            note="Vui lòng nhập đúng định dạng Email để sử dụng đăng nhập sau này"
                          />
                          <FastField
                            component={SelectField}
                            name="role"
                            options={CENTRALIZE}
                            placeholder="Chọn phân quyền cho tài khoản"
                            label="Phân quyền"
                          />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                        <Button type="submit" block className="mt-8" disabled={isSubmitting}>
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
        {
          listAdmin.length > 0 &&
          <div className="w-full mb-20">
            <PageTitle>Danh sách ADMIN : </PageTitle>
            <TableContainer className="">
              <Table>
                <TableHeader className="">
                  <tr>
                    <TableCell>Họ và tên</TableCell>
                    <TableCell className="text-center">Email</TableCell>
                    <TableCell className="text-center">Loại</TableCell>
                    <TableCell className="text-center">Ngày tạo</TableCell>
                    <TableCell className="text-center">Thao tác</TableCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {listAdmin.map((admin, i) => (
                    <TableRow key={i} className={`${i % 2 !== 0 && 'bg-gray-100'} text-center`}>
                      <TableCell className="text-left">
                        <p className="font-xs text-left">{admin.full_name}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-xs">{admin.email}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-xs">{CENTRALIZE.find(ele => ele.value === admin.role).label}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-xs">{new Date(admin.created_time).toLocaleDateString('vi')}</p>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDeleteAdmin(admin._id)}
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
    </>
  );
}

export default CreateAdmin;
