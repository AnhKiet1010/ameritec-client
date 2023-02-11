import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import ReactExport from 'react-data-export';
import { confirmAlert } from "react-confirm-alert";
import QRCode from 'qrcode.react';
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../assets/css/Payment.css";
import {
  OutlineLogoutIcon,
  SearchIcon
} from '../../icons';
import PageTitle from "../../components/Typography/PageTitle";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Button
} from "@windmill/react-ui";
import Pagination from '@material-ui/lab/Pagination';
import { toast } from "react-toastify";
import ADMIN from "../../api/Admin";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function Activations() {
  const role = JSON.parse(localStorage.getItem('user')).user.role;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState(1);
  const [countResult, setCountResult] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const message = "Đã xảy ra lỗi vui lòng thử lại sau";
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [exportData, setExportData] = useState([]);
  const [changeExportList, setChangeExportList] = useState(true);
  const [resultsPerPage, setResultPerPage] = useState(20);
  const [refresh, setRefresh] = useState(false);

  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

  const handleKeyword = (event) => {
    event.preventDefault();
    setKeyword(event.target.value);
  }

  const handleSearchTypeChange = (e) => {
    e.preventDefault();
    setSearchType(e.target.value);
  }

  const handlePerPageChange = (event) => {
    event.preventDefault();
    setResultPerPage(event.target.value);
    setPage(1);
  };

  const handleOnMonthSearchChange = (e) => {
    e.preventDefault();
    setCurrentMonth(e.target.value);
  }

  const handleYearChange = (e) => {
    e.preventDefault();
    setCurrentYear(e.target.value);
  }

  const onSubmit = (e) => {
    setChangeExportList(true);
    setPage(1);
    setSubmitted(!submitted);
  }

  useEffect(() => {
    setLoading(true);
    ADMIN.getStorage({ searchType, keyword, page, resultsPerPage, currentMonth, currentYear, changeExportList })
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
        } else {
          setData(res.data.data.listLinkFilter);
          if (changeExportList) {
            setExportData(res.data.data.exportData);
          }
          setAllPage(res.data.data.allPage);
          setCountResult(res.data.data.countAllDocument);
          setChangeExportList(false);
          setLoading(false);
        }
      }).catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, [submitted, page, resultsPerPage, refresh]);

  function handleDeleteKey(id) {
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
                let message = "Đã xảy ra lỗi vui lòng thử lại sau";
                ADMIN.deleteStorage({ id })
                  .then((res) => {
                    const status = res.data.status;
                    if (status === 200) {
                      toast.success(res.data.message);
                      setRefresh(!refresh);
                      onClose();
                    } else {
                      toast.error(message);
                    }
                  })
                  .catch((error) => {
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

  const DataSet = [
    {
      columns: [
        { title: "HỌ VÀ TÊN" },
        { title: "EMAIL" },
        { title: "ID LINK" },
        { title: "KEY" },
        { title: "NGÀY TẠO" }


      ],
      data: exportData.map((item) => {
        return [
          { value: item.firstName + item.lastName },
          { value: item.email },
          { value: item.order },
          { value: item.shortToken },
          { value: (item.created && item.created !== "") ? new Date(item.created).toLocaleDateString('vi') : "" }
        ];
      })

    }
  ];

  return (
    <>
      <PageTitle>Danh sách sản phẩm</PageTitle>
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
                <option value={1} defaultValue={searchType === 1}>Tất cả</option>
                <option value={2} defaultValue={searchType === 2}>Theo Tên</option>
                <option value={3} defaultValue={searchType === 3}>Theo Tháng</option>
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
                  <option value={2019} defaultValue={currentYear === 2019}>Năm 2019</option>
                  <option value={2020} defaultValue={currentYear === 2020}>Năm 2020</option>
                  <option value={2021} defaultValue={currentYear === 2021}>Năm 2021</option>
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
                value={keyword}
                disabled={searchType == '1'}
                className={`h-full min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none ${searchType == '1' && 'opacity-50'}`} />
            </>
            }

            {(searchType == '3') &&
              <div class="relative">
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
        {data.length !== 0 ? (
          <ExcelFile
            filename="Ameritec-Key-Data"
            element={
              <button type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 h-full rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green ">
                <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                Xuất Data</button>
            }>
            <ExcelSheet dataSet={DataSet} name="Ameritec Data" />
          </ExcelFile>
        ) : null}
      </div>

      {loading ? (
        <div className="mt-4"><Skeleton variant="rect" width="100%" height={50} count={5} /></div>
      ) : (
        <TableContainer className="mt-4 mb-10">
          <Table>
            <TableHeader className="bg-gray-300">
              <tr>
                <TableCell>Khách hàng</TableCell>
                <TableCell className="text-center">Email</TableCell>
                <TableCell className="text-center">ID Link</TableCell>
                <TableCell className="text-center">Token kích hoạt</TableCell>
                <TableCell className="text-center">Thời gian tạo</TableCell>
                <TableCell className="text-center">Thao tác</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((link, i) => (
                <TableRow key={i} className={`${i % 2 !== 0 && 'bg-gray-100'} text-center`}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div className="text-left">
                        <p className="font-semibold">{link.firstName}</p>
                        <p className="font-semibold">{link.lastName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{link.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{link.order + 1}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{link.shortToken}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {`${new Date(link.created).toLocaleTimeString('vi')} - 
                       ${new Date(link.created).toLocaleDateString('vi')}`}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center gap-6">
                    <Button type="button" className="mx-auto" onClick={() => {
                      confirmAlert({
                        customUI: ({ onClose }) => {
                          return (
                            <div className="flex flex-col bg-white border-solid shadow-xl items-center p-4 rounded-sm border-gray-100"
                              style={{
                                maxWidth: "500px"
                              }}
                            >
                              <div className="my-4">
                                https://ameritec.zimperium.com/api/acceptor/v1/user-activation/activation?stoken={link.shortToken}
                              </div>
                              <div>
                                <QRCode
                                  id='qrcode'
                                  value={`https://ameritec.zimperium.com/api/acceptor/v1/user-activation/activation?stoken=${link.shortToken}`}
                                  size={150}
                                  level={'H'}
                                  includeMargin={true}
                                  style={{ margin: "0 auto" }}
                                />
                              </div>
                              <button
                                onClick={() => {
                                  onClose();
                                }}
                                className="inline-block my-4 mx-4 px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none disabled:opacity-50 cursor-pointer"
                              >
                                Đóng
                              </button>
                            </div>
                          );
                        }
                      });
                    }}>
                      Mã QR
                    </Button>
                    {
                      role === 'admin' &&
                      <Button type="button" className="mx-auto" onClick={() => handleDeleteKey(link._id)}>
                        Xóa
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
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
      )}
    </>
  );
}

export default Activations;
