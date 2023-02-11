import React, { useState, useEffect } from 'react';
import { SearchIcon } from "../icons";
import Skeleton from "react-loading-skeleton";
import { FastField, Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
    TableFooter,
    Avatar,
    Button
} from "@windmill/react-ui";
import Pagination from '@material-ui/lab/Pagination';
import InputField from "./CustomFields/input-field";
import Spinner from "./Spinner";
import * as Yup from "yup";
import ADMIN from "../api/Admin";


export default function PopupChooseUserId({ comData, onClose, refresh, setRefresh }) {
    const resultsPerPage = 5;
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [countResult, setCountResult] = useState(0);
    const [allPage, setAllPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [currentChoose, setCurrentChoose] = useState("");
    const searchType = 2;
    const changeExportList = false;
    const message = "Đã xảy ra lỗi vui lòng thử lại sau";


    const validationSchema = Yup.object().shape({});

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
    }, [submitted, page]);

    const onSubmit = (e) => {
        setLoading(true);
        setPage(1);
        setSubmitted(!submitted);
    }

    const initialValuesChangeReceiveMem = {
        id: comData._id,
        receive_mem_id: comData.receive_mem_id,
        note: comData.note
    };

    const handleKeyword = (event) => {
        setKeyword(event.target.value);
    }

    function onPageChange(e, page) {
        e.preventDefault();
        setPage(page);
    }
    return (<Formik
        initialValues={initialValuesChangeReceiveMem}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
            const body = {
                ...values
            };
            let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
            ADMIN.updateReceiveMemId(body)
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
            const { isSubmitting, setFieldValue } = formikProps;

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
                            <Form className="bg-white px-6 py-4">
                                <div className="mb-2 flex sm:flex-row flex-col">
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
                                    <button onClick={onSubmit} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 mx-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-500 hover:bg-red-500 focus:shadow-outline-red ">
                                        <SearchIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                                        Tìm kiếm</button>
                                </div>

                                <TableContainer className="my-4">
                                    <Table>
                                        <TableHeader>
                                            <tr>
                                                <TableCell>Tên</TableCell>
                                                <TableCell className="text-center"></TableCell>
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
                                                                        <p className="text-xs text-gray-600 dark:text-gray-400">{ele._id}</p>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    currentChoose === ele._id &&
                                                                <Button>Đã chọn</Button>
                                                                }
                                                                {
                                                                    currentChoose !== ele._id &&
                                                                <Button onClick={() => {
                                                                    setFieldValue('receive_mem_id', ele._id);
                                                                    setCurrentChoose(ele._id);
                                                                }}>Chọn</Button>
                                                                }
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
                                                        <Pagination count={allPage} page={page} onChange={onPageChange} className="text-sm" color="primary" />
                                                        <div className="text-sm">Có <span className="text-md mx-1 text-gray-700">{countResult}</span> kết quả</div>
                                                    </div>
                                                    :
                                                    <div className="text-md text-gray-400 text-center">không có dữ liệu</div>}
                                            </TableFooter>
                                    }
                                </TableContainer>
                                <div className="mb-3">
                                    <FastField
                                        component={InputField}
                                        name="receive_mem_id"
                                        placeholder="Người nhận hoa hồng"
                                        label="Người nhận hoa hồng"
                                    />
                                    <FastField
                                        component={InputField}
                                        name="note"
                                        type="text"
                                        placeholder="Ghi chú"
                                        label="Ghi chú"
                                    />
                                </div>
                                <div className="pb-6 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={` items-center cursor-pointer w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-500 hover:bg-green-600 focus:ring-green-600 sm:ml-3 sm:w-auto sm:text-sm`}
                                    >
                                        {isSubmitting && <Spinner />} Lưu thay đổi
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onClose();
                                        }}
                                        disabled={isSubmitting}
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