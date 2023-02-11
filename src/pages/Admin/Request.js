import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { SearchIcon } from "../../icons";
import PageTitle from "../../components/Typography/PageTitle";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge
} from "@windmill/react-ui";
import Pagination from '@material-ui/lab/Pagination';
import { toast, ToastContainer } from "react-toastify";
import ADMIN from '../../api/Admin';
import socket from '../../helpers/socketConnect';
import Spinner from "../../components/Spinner";
import { FastField, Form, Formik } from "formik";
import InputField from "../../components/CustomFields/input-field";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../assets/css/Payment.css";
import * as Yup from "yup";
import { CHANGE_COUNT_REQUEST_USER } from '../../slices/countRequestUserSlice';
import { useDispatch, useSelector } from 'react-redux';


function Request() {
  const [currentTable, setCurrentTable] = useState('pending');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [countResult, setCountResult] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resultsPerPage, setResultPerPage] = useState(20);
  const [searchType, setSearchType] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const countRequestUser = useSelector(state => state.countRequestUser);
  const dispatch = useDispatch();

  const initialValues = {
    denied_reason: "",
  };

  const validationSchema = Yup.object().shape({
    denied_reason: Yup.string().required("Vui lòng không để trống"),
  });

  const handleSearchTypeChange = (e) => {
    e.preventDefault();
    setSearchType(e.target.value);
  }

  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

  const handleKeyword = (event) => {
    event.preventDefault();
    setKeyword(event.target.value);
  }

  const handlePerPageChange = (event) => {
    event.preventDefault();
    setResultPerPage(event.target.value);
    setPage(1);
  };

  const onSubmit = (e) => {
    setLoading(true);
    setPage(1);
    setSubmitted(!submitted);
  }

  function handleDeniedRequest(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              const body = {
                id,
                ...values,
                status: 'denied'
              };
              let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
              ADMIN.changeRequestStatus(body)
                .then((res) => {
                  const status = res.data.status;
                  if (status !== 200) {
                    toast.error(res.data.message);
                    actions.setSubmitting(false);
                  } else {
                    let countRequestUserAction = CHANGE_COUNT_REQUEST_USER(countRequestUser - 1);
                    dispatch(countRequestUserAction);
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
              const { isSubmitting } = formikProps;

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
                      <Form className="bg-white p-4 overflow-auto" style={{ maxHeight: '700px' }}>
                        <div className="w-full">
                          <div className="bg-white flex flex-col">
                            <div className="-mx-3 md:flex">
                              <div className="md:w-full px-3 mb-3 md:mb-0">
                                <FastField
                                  component={InputField}
                                  name="denied_reason"
                                  type="text"
                                  placeholder="Phản hồi"
                                  label="Phản hồi"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pb-6 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className={` items-center cursor-pointer w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-500 hover:bg-green-600 focus:ring-green-600 sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                            {isSubmitting && <Spinner />} Chấp nhận
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

  function handleAcceptRequest(id) {
    ADMIN.changeRequestStatus({ id, status: 'accept' })
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
        } else {
          let countRequestUserAction = CHANGE_COUNT_REQUEST_USER(countRequestUser - 1);
          dispatch(countRequestUserAction);
          toast.success(res.data.message);
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCurrentTableChange = (e) => {
    e.preventDefault();
    setSearchType(1);
    setKeyword("");
    if (currentTable == 'pending') {
      setCurrentTable('success');
    }
    if (currentTable == 'success') {
      setCurrentTable('pending');
    }
  }

  useEffect(() => {
    let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
    ADMIN.getRequestList({ keyword, page, resultsPerPage, currentTable })
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          message = res.data.data.message;
          toast.error(message);
        } else {
          setData(res.data.data.listRequest);
          setAllPage(res.data.data.allPage);
          setCountResult(res.data.data.countAllDocument);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, [page, submitted, resultsPerPage, currentTable, refresh]);

  useEffect(() => {
    socket.on("NewRequest", () => {
      toast.info("có yêu cầu mới từ Khách Hàng");
      setRefresh(!refresh);
    });

    return () => {
      socket.off("NewRequest");
    }
  });

  const handleDeleteRequest = (id) => {
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
                ADMIN.deleteRequest({ id })
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

  return (
    <>
      <PageTitle>Danh sách yêu cầu của Khách Hàng</PageTitle>

      <div className="flex justify-center items-center mb-4">
        <div onClick={handleCurrentTableChange} className={`border-blue-500 transition-all cursor-pointer ${currentTable === 'pending' && "border-b-2 font-bold"} uppercase px-4 py-2`}>yêu cầu chưa duyệt</div>
        <div onClick={handleCurrentTableChange} className={`border-blue-500 transition-all cursor-pointer ${currentTable === 'success' && "border-b-2 font-bold"} uppercase px-4 py-2`}>yêu cầu đã duyệt</div>
      </div>

      <div className="my-2 flex sm:flex-row flex-col justify-between items-center">
        <div className="my-2 flex sm:flex-row flex-col justify-between items-center">
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  onChange={handlePerPageChange}
                  defaultValue={resultsPerPage}
                  className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option value={5} defaultValue={resultsPerPage === 5}>5</option>
                  <option value={10} defaultValue={resultsPerPage === 10}>10</option>
                  <option value={20} defaultValue={resultsPerPage === 20}>20</option>
                </select>
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  onChange={handleSearchTypeChange}
                  defaultValue={searchType}
                  className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option value={1} defaultValue={searchType === 1}>Theo Tên</option>
                </select>
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            {(searchType == '1') &&
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                    <path
                      d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                    </path>
                  </svg>
                </span>
                <input placeholder="Nhập từ khóa tìm kiếm"
                  onChange={handleKeyword}
                  className={`h-full min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none`} />
              </div>
            }
            <button onClick={onSubmit} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 mx-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-500 hover:bg-red-500 focus:shadow-outline-red ">
              <SearchIcon className="w-4 h-4 mr-3" aria-hidden="true" />
              Tìm kiếm</button>
          </div>
        </div>
      </div>


      <TableContainer className="mt-4">
        <Table>
          <TableHeader className="bg-gray-300">
            {
              currentTable === "pending" &&
              <tr>
                <TableCell className="text-center">Họ và tên</TableCell>
                <TableCell className="text-center">Yêu cầu</TableCell>
                <TableCell className="text-center">Lý do</TableCell>
                <TableCell className="text-center">File</TableCell>
                <TableCell className="text-center">Thời gian tạo</TableCell>
                <TableCell className="text-center">Trạng thái</TableCell>
                <TableCell className="text-center">Thao tác</TableCell>
              </tr>
            }
            {
              currentTable === "success" &&
              <tr>
                <TableCell className="text-center">Họ và tên</TableCell>
                <TableCell className="text-center">Yêu cầu</TableCell>
                <TableCell className="text-center">Lý do</TableCell>
                <TableCell className="text-center">File</TableCell>
                <TableCell className="text-center">Thời gian tạo</TableCell>
                <TableCell className="text-center">Trạng thái</TableCell>
                <TableCell className="text-center">Phản hồi</TableCell>
                <TableCell className="text-center">Thao tác</TableCell>
              </tr>
            }
          </TableHeader>
          {
            !loading &&
            <TableBody>
              {currentTable === "pending" && data.map((req, i) => (
                <TableRow key={i} className={`${i % 2 !== 0 && 'bg-gray-100'}`}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{req.request_name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{req.request_id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-sm max-w-xs overflow-auto">
                    {req.content}
                  </TableCell>
                  <TableCell className="text-center text-sm max-w-xs overflow-auto">
                    {req.reason}
                  </TableCell>
                  <TableCell className="text-center text-sm max-w-xs overflow-auto">
                    {
                      req.filename &&
                      <a className="font-normal underline text-blue-500" download rel="noopener noreferrer" target="_blank" href={`${process.env.REACT_APP_API_URL}/uploads/request/${req.filename}`}>xem</a>
                    }
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      {`${new Date(req.request_time).toLocaleTimeString('vi')} - 
                       ${new Date(req.request_time).toLocaleDateString('vi')}`}
                    </span>
                  </TableCell>
                  <TableCell className="text-center"><Badge type="danger">Chưa duyệt</Badge></TableCell>
                  <TableCell className="flex items-center justify-center">
                    <button onClick={() => handleAcceptRequest(req._id)} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 ml-1 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-500 hover:bg-green-500 focus:shadow-outline-green ">
                      Đồng ý</button>
                    <button onClick={() => handleDeniedRequest(req._id)} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 ml-1 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-500 hover:bg-red-500 focus:shadow-outline-red ">
                      Từ chối</button>
                  </TableCell>
                </TableRow>
              ))}
              {currentTable === "success" && data.map((req, i) => (
                <TableRow key={i} className={`${i % 2 !== 0 && 'bg-gray-100'}`}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{req.request_name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{req.request_id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-sm max-w-xs overflow-auto">
                    {req.content}
                  </TableCell>
                  <TableCell className="text-center text-sm max-w-xs overflow-auto">
                    {req.reason}
                  </TableCell>
                  <TableCell className="text-center text-sm max-w-xs overflow-auto">
                    {
                      req.filename &&
                      <a className="font-normal underline text-blue-500" download rel="noopener noreferrer" target="_blank" href={`${process.env.REACT_APP_API_URL}/uploads/request/${req.filename}`}>xem</a>
                    }
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">
                      {`${new Date(req.request_time).toLocaleTimeString('vi')} - 
                       ${new Date(req.request_time).toLocaleDateString('vi')}`}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {
                      req.status === 'denied' &&
                      <Badge type="danger">Từ chối</Badge>
                    }
                    {
                      req.status === 'accept' &&
                      <Badge type="success">Đồng ý</Badge>
                    }
                  </TableCell>
                  <TableCell className="">
                    <span className="text-sm">
                      {req.denied_reason}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <button
                      onClick={() => handleDeleteRequest(req._id)}
                      className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110 appearance-none focus:border-none focus:outline-none">
                      ❌
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
        </Table>
        <TableFooter>
          {/* PAGINATION */}
          {
            loading ?
              <div className=""><Skeleton variant="rect" width="100%" height={50} count={resultsPerPage} /></div>
              :
              data.length !== 0 ?
                <div className="flex justify-between items-center">
                  <Pagination count={allPage} page={page} onChange={onPageChange} color="primary" />
                  <div>Có <span className="text-xl mx-1 text-gray-700">{countResult}</span> kết quả</div>
                </div>
                :
                <div className="text-md text-gray-400 text-center">không có dữ liệu</div>
          }
          {/* PAGINATION */}
        </TableFooter>
      </TableContainer>

    </>
  );
}

export default Request;
