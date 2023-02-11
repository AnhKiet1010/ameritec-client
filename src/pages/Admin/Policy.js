import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PageTitle from "../../components/Typography/PageTitle";
import { confirmAlert } from "react-confirm-alert";
import "../../assets/css/receipts.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../assets/css/Payment.css";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TableFooter,
  Badge
} from "@windmill/react-ui";
import { SearchIcon } from "../../icons";
import Pagination from '@material-ui/lab/Pagination';
import { toast } from "react-toastify";
import ADMIN from '../../api/Admin';

function CreatePolicy() {
  const role = JSON.parse(localStorage.getItem('user')).user.role;
  const [currentTable, setCurrentTable] = useState('1');
  const [keyword, setKeyword] = useState("");
  const [countResult, setCountResult] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resultsPerPage, setResultPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const message = "Đã xảy ra lỗi vui lòng thử lại sau";
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [searchType, setSearchType] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const handleSearchTypeChange = (e) => {
    e.preventDefault();
    setSearchType(e.target.value);
  }

  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

  const handleOnMonthSearchChange = (e) => {
    e.preventDefault();
    setCurrentMonth(e.target.value);
  }

  const handleYearChange = (e) => {
    e.preventDefault();
    setCurrentYear(e.target.value);
  }

  const handleCurrentTableChange = (e) => {
    e.preventDefault();
    setSearchType(1);
    setKeyword("");
    setCurrentMonth(currentDate.getMonth() + 1);
    setCurrentYear(currentDate.getFullYear());
    if (currentTable == '1') {
      setCurrentTable('2');
    }
    if (currentTable == '2') {
      setCurrentTable('1');
    }
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

  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

  const onSubmit = (e) => {
    setLoading(true);
    setPage(1);
    setSubmitted(!submitted);
  }

  const handleDeletePolicy = (id, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>❗ Xóa tài liệu ❗</h1>
            <p>
              Bạn muốn xóa tài liệu : <span className="font-bold">{name}</span>
            </p>
            <br />

            <button className="" onClick={() => onClose()}>Hủy</button>
            <button
              className="red"
              onClick={() => {
                ADMIN.deletePolicy({ id })
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
                    toast.error(message);
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

  useEffect(() => {

    ADMIN.getPolicyList({ currentTable, page, resultsPerPage, keyword, currentYear, currentMonth, searchType })
      .then((res) => {
        if (res.data.status !== 200) {
          setLoading(false);
          toast.error(res.data.message);
        } else {
          setData(res.data.data.listPolicy);
          setAllPage(res.data.data.allPage);
          setCountResult(res.data.data.countAllDocument);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("err in receipt");
      });
  }, [page, resultsPerPage, currentTable, submitted, refresh]);

  return (
    <>
      <PageTitle>Quản lí tài liệu</PageTitle>

      <div className="flex justify-center items-center mb-4">
        <div onClick={handleCurrentTableChange} className={`border-blue-500 transition-all cursor-pointer ${currentTable === '1' && "border-b-2 font-bold"} uppercase px-4 py-2`}>chính sách công ty</div>
        <div onClick={handleCurrentTableChange} className={`border-blue-500 transition-all cursor-pointer ${currentTable === '2' && "border-b-2 font-bold"} uppercase px-4 py-2`}>tài liệu học tập</div>
      </div>

      <div className="my-2 flex sm:flex-row flex-col justify-between items-center">
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                onChange={handlePerPageChange}
                value={resultsPerPage}
                className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
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
                value={searchType}
                className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                <option value={1}>Tất Cả</option>
                <option value={2}>Theo Tiêu Đề</option>
                <option value={3}>Theo Tháng</option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {(searchType == '3') &&
              <div className="relative">
                <select
                  onChange={handleYearChange}
                  defaultValue={currentYear}
                  className="appearance-none h-full rounded-r border-l border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option value={2020} defaultValue={currentYear === 2020}>Năm 2020</option>
                  <option value={2021} defaultValue={currentYear === 2021}>Năm 2021</option>
                  <option value={2022} defaultValue={currentYear === 2022}>Năm 2022</option>
                </select>
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            }
          </div>
          <div className="block relative">

            {(searchType == '1' || searchType == '2') && <>
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>
              <input placeholder="Nhập từ khóa tìm kiếm"
                onChange={handleKeyword}
                disabled={searchType == '1'}
                value={keyword}
                className={`h-full min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none ${searchType == '1' && 'opacity-50'}`} />
            </>
            }

            {(searchType == '3') &&
              <div className="relative h-full">
                <select
                  onChange={handleOnMonthSearchChange}
                  defaultValue={currentMonth}
                  className="min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block py-2 px-4 pr-8 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white leading-tight h-full focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none">
                  <option value={1} defaultValue={currentMonth === 1}>Tháng 1</option>
                  <option value={2} defaultValue={currentMonth === 2}>Tháng 2</option>
                  <option value={3} defaultValue={currentMonth === 3}>Tháng 3</option>
                  <option value={4} defaultValue={currentMonth === 4}>Tháng 4</option>
                  <option value={5} defaultValue={currentMonth === 5}>Tháng 5</option>
                  <option value={6} defaultValue={currentMonth === 6}>Tháng 6</option>
                  <option value={7} defaultValue={currentMonth === 7}>Tháng 7</option>
                  <option value={8} defaultValue={currentMonth === 8}>Tháng 8</option>
                  <option value={9} defaultValue={currentMonth === 9}>Tháng 9</option>
                  <option value={10} defaultValue={currentMonth === 10}>Tháng 10</option>
                  <option value={11} defaultValue={currentMonth === 12}>Tháng 11</option>
                  <option value={12} defaultValue={currentMonth === 12}>Tháng 12</option>
                </select>
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            }
          </div>
          <button onClick={onSubmit} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 mx-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-500 hover:bg-red-500 focus:shadow-outline-red ">
            <SearchIcon className="w-4 h-4 mr-3" aria-hidden="true" />
            Tìm kiếm</button>
        </div>
        {
          role === 'admin' &&
          <button type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green ">
            <a href="/admin/create-policy">Tạo mới</a>
          </button>
        }
      </div>



      <TableContainer className="mt-4 mb-20">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Tiêu đề</TableCell>
              <TableCell className="text-center">Thời gian tạo</TableCell>
              <TableCell className="text-center">Loại</TableCell>
              <TableCell className="text-center">Người tạo</TableCell>
              {
                role === 'admin' &&
                <TableCell className="text-center">Thao tác</TableCell>
              }
            </tr>
          </TableHeader>
          {!loading &&
            <TableBody>
              {data.length > 0 && data.map((policy, i) => (
                <>
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm w-40 truncate">{policy.title_vn}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">
                        {`${new Date(policy.ctime).toLocaleTimeString("vi")} - ${new Date(policy.ctime).toLocaleDateString("vi")}`}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">
                        {policy.type === 'text' && <Badge type="success">text</Badge>}
                        {policy.type === 'file' && <Badge type="primary">file</Badge>}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">{policy.cname}</span>
                    </TableCell>
                    {role === 'admin' &&
                      <TableCell className="h-full flex items-center justify-between">
                        <div className="flex m-auto gap-2 items-center py-4">
                          <a
                            href={`/admin/policy/${policy._id}`}
                            className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110">
                            👁
                          </a>
                          {/* <a
                          href={`/admin/policy/${policy._id}`}
                          className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110">
                          🛠
                        </a> */}
                          <button
                            onClick={() => handleDeletePolicy(policy._id, policy.title_vn)}
                            disabled={policy._id === process.env.REACT_APP_ID_MAIN_POLICY}
                            className={`w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110 appearance-none focus:border-none focus:outline-none ${policy._id === process.env.REACT_APP_ID_MAIN_POLICY && 'hidden'}`}>
                            ❌
                          </button>
                        </div>
                      </TableCell>
                    }
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
    </>
  );
}

export default CreatePolicy;
