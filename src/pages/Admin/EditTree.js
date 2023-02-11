import React, { useState, useEffect } from "react";
import * as Yup from "yup";

import PageTitle from "../../components/Typography/PageTitle";
import {
  Label,
  Input,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TableFooter,
  Avatar
} from "@windmill/react-ui";
import { ToastContainer, toast } from "react-toastify";
import Pagination from '@material-ui/lab/Pagination';
import {
  Button
} from "@windmill/react-ui";
import { FastField, Form, Formik } from "formik";
import InputField from "../../components/CustomFields/input-field";
import ADMIN from '../../api/Admin';
import Spinner from "../../components/Spinner";
import { SearchIcon } from "../../icons";
import Skeleton from "react-loading-skeleton";


function Receipts() {
  const [group, setGroup] = useState(1);
  const [loading, setLoading] = useState(false);
  const resultsPerPage = 5;
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [countResult, setCountResult] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const searchType = 2;
  const changeExportList = false;
  const message = "Đã xảy ra lỗi vui lòng thử lại sau";
  const [showSuggest, setShowSuggest] = useState(false);
  const [moveAcc, setMoveAcc] = useState("");
  const [rootAcc, setRootAcc] = useState("");
  const [refresh, setRefresh] = useState(false);

  const initialValues = {
    move_acc: "",
    root_acc: "",
    group: 1
  };

  const validationSchema = Yup.object().shape({
    move_acc: Yup.string().required("Vui lòng điền mã giới thiệu"),
    root_acc: Yup.string().required("Vui lòng điền mã giới thiệu"),
  });

  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

  const handleSubmit = (values, { setSubmitting, resetForm, setFieldError }) => {
    let message = "Có vấn đề xảy ra! Vui lòng thử lại!";
    setSubmitting(true);

    const body = { ...values };

    ADMIN.editTree(body)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          toast.success(res.data.message);
          resetForm();
          setGroup(1);
          setMoveAcc("");
          setRootAcc("");
          setRefresh(!refresh);
          setSubmitting(false);
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
        toast.error(message);
      });
  };

  const onSubmit = (e) => {
    setLoading(true);
    setPage(1);
    setSubmitted(!submitted);
  }

  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  }

  useEffect(() => {
    setLoading(true);
    ADMIN.users({ searchType, keyword, page, resultsPerPage, changeExportList })
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
        } else {
          setData(res.data.data.listUserFilter);
          setAllPage(res.data.data.allPage);
          setCountResult(res.data.data.countAllDocument);
          setLoading(false);
        }
      }).catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, [submitted, page, refresh]);

  return (
    <>
      <PageTitle>Quản lí hệ thống</PageTitle>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const { isSubmitting, setFieldValue } = formikProps;

          return (
            <Form className="bg-white p-6 rounded-lg">
              <div className={`flex ${showSuggest ? "justify-between" : "justify-end"} items-center`}>
                {showSuggest &&
                  <div className="flex sm:flex-row flex-col">
                    <div className="block relative">
                      <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                          <path
                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                          </path>
                        </svg>
                      </span>
                      <input placeholder="Nhập tên người dùng"
                        onChange={handleKeyword}
                        value={keyword}
                        className={`h-full min-w-40 appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none`} />

                    </div>
                    <button onClick={onSubmit} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 mx-2 rounded-lg text-sm text-white bg-indigo-600 border border-transparent active:bg-indigo-500 hover:bg-indigo-500 focus:shadow-outline-indigo ">
                      <SearchIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                      Tìm kiếm</button>
                  </div>
                }
                <div className="flex items-center">
                  {
                    !showSuggest &&
                    <button onClick={() => setShowSuggest(true)} type="button" className="mr-2 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green">
                      Mở gợi ý</button>
                  }
                  {
                    showSuggest &&
                    <button onClick={() => setShowSuggest(false)} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-indigo-600 border border-transparent active:bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline-indigo ">
                      Đóng gợi ý</button>
                  }
                </div>
              </div>

              {
                showSuggest &&
                <TableContainer className="mt-4 mb-6">
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableCell>Tên</TableCell>
                        <TableCell className="text-center">Mã giới thiệu</TableCell>
                        <TableCell className="text-center">Cấp trên</TableCell>
                        <TableCell className="text-center">Thao tác</TableCell>
                      </tr>
                    </TableHeader>
                    {!loading &&
                      <TableBody>
                        {data.length > 0 && data.map((ele, i) => (
                          <>
                            <TableRow key={i}>
                              <TableCell>
                                <div className="flex items-center">
                                  <Avatar className="hidden mr-3 md:block" src={ele.avatar} alt="ele avatar" />
                                  <div className="text-left">
                                    <p className="font-semibold">{ele.full_name}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{ele.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm">{ele._id}</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm">{ele.parent_name}</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="w-full flex justify-end">
                                  <div>
                                    {
                                      moveAcc !== ele._id &&
                                      <button onClick={() => {
                                        setFieldValue("move_acc", ele._id);
                                        setMoveAcc(ele._id);
                                      }} type="button" className="mr-2 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-teal-600 border border-transparent active:bg-teal-600 hover:bg-teal-700 focus:shadow-outline-teal">
                                        Chọn chuyển đi</button>
                                    }
                                    {
                                      moveAcc === ele._id &&
                                      <button onClick={() => {
                                        setFieldValue("move_acc", "");
                                        setMoveAcc("");
                                      }} type="button" className="mr-2 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-600 hover:bg-red-700 focus:shadow-outline-red">
                                        Huỷ</button>
                                    }
                                  </div>
                                  <div>
                                    {rootAcc !== ele._id &&
                                      <button onClick={() => {
                                        setFieldValue("root_acc", ele._id);
                                        setRootAcc(ele._id);
                                      }} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-blue-400 border border-transparent active:bg-blue-500 hover:bg-blue-600 focus:shadow-outline-blue">
                                        Chọn chuyển đến</button>
                                    }
                                    {rootAcc === ele._id &&
                                      <button onClick={() => {
                                        setFieldValue("root_acc", "");
                                        setRootAcc("");
                                      }} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-600 hover:bg-red-700 focus:shadow-outline-red">
                                        Huỷ</button>
                                    }
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    }
                  </Table>
                  {
                    loading ?
                      <>
                        <div className=""><Skeleton variant="rect" width="100%" height={50} count={resultsPerPage} /></div>
                      </>
                      :
                      <TableFooter>
                        {data.length !== 0 ?
                          <div className="flex justify-between items-center">
                            <Pagination count={allPage} page={page} onChange={onPageChange} color="primary" />
                            <div>Có <span className="text-xl mx-1 text-gray-700">{countResult}</span> kết quả</div>
                          </div>
                          :
                          <div className="text-md text-gray-400 text-center">không có dữ liệu</div>}
                      </TableFooter>
                  }
                </TableContainer>

              }
              <FastField
                component={InputField}
                name="move_acc"
                type="text"
                placeholder="Nhập mã giới thiệu"
                label="Tài khoản chuyển đi"
              />
              <FastField
                component={InputField}
                name="root_acc"
                type="text"
                placeholder="Nhập mã giới thiệu"
                label="Chuyển đến tài khoản"
              />
              <div className="mt-4 mb-2 text-lg">Chọn nhóm để gắn cây hệ thống</div>
              <div className="grid md:grid-cols-3 md:grid-cols-2">
                <Label check>
                  <Input type="radio" name="group" value={1} onChange={(e) => {
                    setGroup(1);
                    setFieldValue('group', 1);
                  }} checked={group === 1} />
                  <span className="m-0 ml-2">Nhóm 1</span>
                </Label>
                <Label check>
                  <Input type="radio" name="group" value={2} onChange={(e) => {
                    setGroup(2);
                    setFieldValue('group', 2);
                  }} checked={group === 2} />
                  <span className="m-0 ml-2">Nhóm 2</span>
                </Label>
                <Label check>
                  <Input type="radio" name="group" value={3} onChange={(e) => {
                    setGroup(3);
                    setFieldValue('group', 3);
                  }} checked={group === 3} />
                  <span className="m-0 ml-2">Nhóm 3</span>
                </Label>
              </div>
              <Button type="submit" className="mt-4">
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                )}
                Xác nhận
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default Receipts;
