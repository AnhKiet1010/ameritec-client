import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PageTitle from "../../components/Typography/PageTitle";
import ReactExport from "react-data-export";
import "../../assets/css/receipts.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TableFooter,
  Badge,
} from "@windmill/react-ui";
import { SearchIcon, OutlineLogoutIcon } from "../../icons";
import Pagination from "@material-ui/lab/Pagination";
import { toast } from "react-toastify";
import { PACKAGE } from "../../constants/package";
import ADMIN from "../../api/Admin";

function Receipts() {
  const [currentTable, setCurrentTable] = useState("pending");
  const [keyword, setKeyword] = useState("");
  const [countResult, setCountResult] = useState(0);
  const [searchLevel, setSearchLevel] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resultsPerPage, setResultPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [exportData, setExportData] = useState([]);
  const [searchType, setSearchType] = useState(1);
  const [changeListExport, setChangeListExport] = useState(true);

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

  const DataSet = [
    {
      columns: [
        { title: "HỌ VÀ TÊN" },
        { title: "GÓI MUA" },
        { title: "NGÀY THAM GIA" },
        { title: "NGƯỜI GIỚI THIỆU" },
        { title: "SỐ TIỀN ĐÃ THANH TOÁN (VNĐ)" },
        { title: "HÌNH THỨC THANH TOÁN" },
        { title: "TIỀN HOA HỒNG (VNĐ)" },
        { title: "THỜI GIAN CHUYỂN HOA HỒNG" },
        { title: "SỐ TÀI KHOẢN CHUYỂN HOA HỒNG" },
        { title: "NGÂN HÀNG CHUYỂN HOA HỒNG" },
        { title: "TÊN CHỦ TÀI KHOẢN NHẬN HOA HỒNG" },
        { title: "TRẠNG THÁI THANH TOÁN HOA HỒNG" },
        { title: "PHƯƠNG THỨC TRẢ HOA HỒNG" },
        { title: "FROM OF RECEIVING COMMISSIONS" },
        { title: "GHI CHÚ" },
      ],
      data: exportData.map((item) => {
        return [
          { value: item.join_mem_name },
          {
            value: PACKAGE.find((b) => b.value === item.trans_info.buy_package)
              .label,
          },
          {
            value:
              item.created_time && item.created_time !== ""
                ? new Date(item.created_time).toLocaleDateString("vi")
                : "",
          },
          { value: item.receive_mem_id },
          { value: item.trans_info.amount_vnd },
          {
            value:
              item.trans_info.payment_method === "tienmat"
                ? "tiền mặt"
                : item.trans_info.payment_method === "nganluong"
                ? "Ngân Lượng"
                : item.trans_info.payment_method === "nganluongvisa"
                ? "Ngân Lượng Visa"
                : item.trans_info.payment_method === "PAYPAL"
                ? "PAYPAL"
                : item.trans_info.payment_method === "Credit Card"
                ? "Credit Card"
                : "",
          },
          { value: item.amount_vnd },
          {
            value:
              item.approved_time && item.approved_time !== ""
                ? new Date(item.approved_time).toLocaleDateString("vi")
                : "",
          },
          { value: item.bank_account ? item.bank_account : "" },
          { value: item.bank ? item.bank : "" },
          { value: item.bank_name ? item.bank_name : "" },
          { value: item.status },
          {
            value:
              item.payment_method === "thucong"
                ? "tiền mặt"
                : item.payment_method === "nganluong"
                ? "Ngân Lượng"
                : "",
          },
          { value: item.request_commission },
          { value: item.note ? item.note : "" },
        ];
      }),
    },
  ];

  const handleOnLevelSearchChange = (e) => {
    setSearchLevel(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    e.preventDefault();
    setChangeListExport(true);
    setSearchType(e.target.value);
  };

  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

  const handleOnMonthSearchChange = (e) => {
    e.preventDefault();
    setChangeListExport(true);
    setCurrentMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    e.preventDefault();
    setChangeListExport(true);
    setCurrentYear(e.target.value);
  };

  const handleCurrentTableChange = (table) => {
    setSearchType(1);
    setKeyword("");
    setCurrentMonth(currentDate.getMonth() + 1);
    setCurrentYear(currentDate.getFullYear());
    setChangeListExport(true);
    if (table == "pending") {
      setCurrentTable("pending");
    }
    if (table == "success") {
      setCurrentTable("success");
    }
    if (table == "processing") {
      setCurrentTable("processing");
    }
  };

  const handleKeyword = (event) => {
    event.preventDefault();
    setChangeListExport(true);
    setKeyword(event.target.value);
  };

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
  };

  useEffect(() => {
    ADMIN.getReceipts({
      currentTable,
      page,
      resultsPerPage,
      keyword,
      currentYear,
      currentMonth,
      searchLevel,
      searchType,
      changeListExport,
    })
      .then((res) => {
        if (res.data.status !== 200) {
          setLoading(false);
          toast.error(res.data.message);
        } else {
          setData(res.data.data.listCommissionView);
          if (changeListExport) {
            setExportData(res.data.data.exportData);
          }
          setExportData(res.data.data.exportData);
          setAllPage(res.data.data.allPage);
          setCountResult(res.data.data.countAllDocument);
          setChangeListExport(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("err in receipt");
      });
  }, [page, resultsPerPage, currentTable, submitted]);

  return (
    <>
      <PageTitle>Quản lí hóa đơn</PageTitle>

      <div className="flex justify-center items-center mb-4">
        <div
          onClick={() => handleCurrentTableChange("pending")}
          className={`border-blue-500 transition-all cursor-pointer ${
            currentTable === "pending" && "border-b-2 font-bold"
          } uppercase px-4 py-2`}
        >
          hoa hồng chờ duyệt
        </div>
        <div
          onClick={() => handleCurrentTableChange("processing")}
          className={`border-blue-500 transition-all cursor-pointer ${
            currentTable === "processing" && "border-b-2 font-bold"
          } uppercase px-4 py-2`}
        >
          hoa hồng đang xử lí
        </div>
        <div
          onClick={() => handleCurrentTableChange("success")}
          className={`border-blue-500 transition-all cursor-pointer ${
            currentTable === "success" && "border-b-2 font-bold"
          } uppercase px-4 py-2`}
        >
          hoa hồng đã duyệt
        </div>
      </div>

      <div className="my-2 flex sm:flex-row flex-col justify-between items-center">
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                onChange={handlePerPageChange}
                value={resultsPerPage}
                className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select
                onChange={handleSearchTypeChange}
                value={searchType}
                className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                <option value={1}>Tất Cả</option>
                <option value={2}>Theo Tên</option>
                <option value={3}>Theo Gói</option>
                <option value={4}>Theo Tháng</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {searchType == "4" && (
              <div className="relative">
                <select
                  onChange={handleYearChange}
                  defaultValue={currentYear}
                  className="appearance-none h-full rounded-r border-l border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option value={2019} defaultValue={currentYear === 2019}>
                    Năm 2019
                  </option>
                  <option value={2020} defaultValue={currentYear === 2020}>
                    Năm 2020
                  </option>
                  <option value={2021} defaultValue={currentYear === 2021}>
                    Năm 2021
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="block relative">
            {(searchType == "1" || searchType == "2") && (
              <>
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Nhập từ khóa tìm kiếm"
                  onChange={handleKeyword}
                  disabled={searchType == "1"}
                  value={keyword}
                  className={`h-full min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none ${
                    searchType == "1" && "opacity-50"
                  }`}
                />
              </>
            )}

            {searchType == "3" && (
              <div className="relative">
                <select
                  onChange={handleOnLevelSearchChange}
                  defaultValue={searchLevel}
                  className="min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block py-2 px-4 pr-8 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white leading-tight h-full focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                >
                  <option value={1} defaultValue={searchLevel === 1}>
                    Gói cá nhân
                  </option>
                  <option value={2} defaultValue={searchLevel === 2}>
                    Gói gia đình
                  </option>
                  <option value={3} defaultValue={searchLevel === 3}>
                    Gói doanh nghiệp A
                  </option>
                  <option value={4} defaultValue={searchLevel === 4}>
                    Gói doanh nghiệp B
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            )}

            {searchType == "4" && (
              <div class="relative h-full">
                <select
                  onChange={handleOnMonthSearchChange}
                  defaultValue={currentMonth}
                  className="min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block py-2 px-4 pr-8 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white leading-tight h-full focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                >
                  <option value={1} defaultValue={currentMonth === 1}>
                    Tháng 1
                  </option>
                  <option value={2} defaultValue={currentMonth === 2}>
                    Tháng 2
                  </option>
                  <option value={3} defaultValue={currentMonth === 3}>
                    Tháng 3
                  </option>
                  <option value={4} defaultValue={currentMonth === 4}>
                    Tháng 4
                  </option>
                  <option value={5} defaultValue={currentMonth === 5}>
                    Tháng 5
                  </option>
                  <option value={6} defaultValue={currentMonth === 6}>
                    Tháng 6
                  </option>
                  <option value={7} defaultValue={currentMonth === 7}>
                    Tháng 7
                  </option>
                  <option value={8} defaultValue={currentMonth === 8}>
                    Tháng 8
                  </option>
                  <option value={9} defaultValue={currentMonth === 9}>
                    Tháng 9
                  </option>
                  <option value={10} defaultValue={currentMonth === 10}>
                    Tháng 10
                  </option>
                  <option value={11} defaultValue={currentMonth === 12}>
                    Tháng 11
                  </option>
                  <option value={12} defaultValue={currentMonth === 12}>
                    Tháng 12
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onSubmit}
            type="button"
            className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 mx-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-500 hover:bg-red-500 focus:shadow-outline-red "
          >
            <SearchIcon className="w-4 h-4 mr-3" aria-hidden="true" />
            Tìm kiếm
          </button>
        </div>
        {data.length !== 0 ? (
          <ExcelFile
            filename="Ameritec-Commission-Data"
            element={
              <button
                type="button"
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 h-full rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green "
              >
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                Xuất Data
              </button>
            }
          >
            <ExcelSheet dataSet={DataSet} name="commission" />
          </ExcelFile>
        ) : null}
      </div>

      <TableContainer className="mt-4 mb-20">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Tên</TableCell>
              <TableCell className="text-center">Gói sản phẩm</TableCell>
              <TableCell className="text-center">Thời gian kích hoạt</TableCell>
              <TableCell className="text-center">
                Hình thức thanh toán
              </TableCell>
              <TableCell className="text-center">Người nhận hoa hồng</TableCell>
              <TableCell className="text-center">Hoa hồng</TableCell>
              <TableCell className="text-center">Trạng thái</TableCell>
              {currentTable === "success" && (
                <TableCell className="text-center">
                  Phương thức trả HH
                </TableCell>
              )}
              <TableCell className="text-center">Thao tác</TableCell>
            </tr>
          </TableHeader>
          {!loading && (
            <TableBody>
              {data.length > 0 &&
                data.map((com, i) => (
                  <>
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">{com.join_mem_name}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div
                          className={`min-w-max px-4 py-2 text-center rounded-md bg-${
                            com.trans_info.buy_package === "1"
                              ? "gray-600"
                              : com.trans_info.buy_package === "2"
                              ? "green-500"
                              : com.trans_info.buy_package === "3"
                              ? "blue-500"
                              : com.trans_info.buy_package === "4"
                              ? "cyan-default"
                              : "black"
                          } text-white text-sm`}
                        >
                          {com.trans_info.account_type === "en"
                            ? PACKAGE.find(
                                (ele) =>
                                  ele.value === com.trans_info.buy_package
                              ).label_en
                            : PACKAGE.find(
                                (ele) =>
                                  ele.value === com.trans_info.buy_package
                              ).label}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm">
                          {new Date(com.created_time).toLocaleDateString("vi")}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {com.trans_info.payment_method === "tienmat" &&
                          "Tiền mặt"}
                        {com.trans_info.payment_method === "nganluong" &&
                          "Ngân Lượng ATM"}
                        {com.trans_info.payment_method === "nganluongvisa" &&
                          "Ngân Lượng VISA"}
                        {com.trans_info.payment_method === "PAYPAL" && "PAYPAL"}
                        {com.trans_info.payment_method === "Credit Card" &&
                          "Credit Card"}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm">{com.receive_mem_name}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        {com.account_type === "en" ? (
                          <span className="text-sm">
                            {com.amount_usd
                              .toString()
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                            USD
                          </span>
                        ) : (
                          <span className="text-sm">
                            {com.amount_vnd
                              .toString()
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                            VNĐ
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {com.is_renew ? (
                          <Badge type="warning">Gia hạn</Badge>
                        ) : (
                          <Badge type="neutral">Đăng ký mới</Badge>
                        )}
                      </TableCell>
                      {currentTable === "success" && (
                        <TableCell className="text-center">
                          {com.payment_method === "thucong" && "Tiền mặt"}
                          {com.payment_method === "nganluong" && "Ngân Lượng"}
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex m-auto justify-center py-4">
                          <a
                            href={`/admin/commission/${com._id}`}
                            className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110"
                          >
                            👁
                          </a>
                          {/* {
                          currentTable === 'success' &&
                          <a href={`/admin/create-bonus/${com.receive_mem_id}`}
                            className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110">
                            🏆
                          </a>
                        } */}
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          )}
        </Table>
        {loading ? (
          <>
            <div className="">
              <Skeleton
                variant="rect"
                width="100%"
                height={50}
                count={resultsPerPage}
              />
            </div>
          </>
        ) : (
          <TableFooter>
            {data.length !== 0 ? (
              <div className="flex justify-between items-center">
                <Pagination
                  count={allPage}
                  page={page}
                  onChange={onPageChange}
                  color="primary"
                />
                <div>
                  Có{" "}
                  <span className="text-xl mx-1 text-gray-700">
                    {countResult}
                  </span>{" "}
                  kết quả
                </div>
              </div>
            ) : (
              <div className="text-md text-gray-400 text-center">
                không có dữ liệu
              </div>
            )}
          </TableFooter>
        )}
      </TableContainer>
    </>
  );
}

export default Receipts;
