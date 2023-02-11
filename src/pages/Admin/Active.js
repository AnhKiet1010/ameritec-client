import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { OutlineLogoutIcon, SearchIcon } from "../../icons";
import PageTitle from "../../components/Typography/PageTitle";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Button,
  Badge,
} from "@windmill/react-ui";
import Pagination from "@material-ui/lab/Pagination";
import { toast } from "react-toastify";
import ADMIN from "../../api/Admin";
import { PACKAGE } from "../../constants/package";
import ReactExport from "react-data-export";
import { useDispatch } from "react-redux";
import { CHANGE_COUNT_PENDING_TRANS } from "../../slices/countPendingTransSlice";

function Dashboard() {
  const role = JSON.parse(localStorage.getItem("user")).user.role;
  const [currentTable, setCurrentTable] = useState(
    role === "admin" ? "pending" : "success"
  );
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [countResult, setCountResult] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resultsPerPage, setResultPerPage] = useState(5);
  const [searchType, setSearchType] = useState(1);
  const [listChange, setListChange] = useState(false);
  const [searchLevel, setSearchLevel] = useState(0);
  const [exportData, setExportData] = useState([]);
  const [changeListExport, setChangeListExport] = useState(true);
  const dispatch = useDispatch();

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

  const handleOnLevelSearchChange = (e) => {
    setSearchLevel(e.target.value);
    setChangeListExport(true);
  };

  function activeToken(id) {
    setLoading(true);
    ADMIN.activeTrans(id)
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
          setLoading(false);
        } else {
          console.log("res.data", res.data);
          toast.success(res.data.message);
          const countPendingTransAction = CHANGE_COUNT_PENDING_TRANS(
            res.data.data.count
          );
          dispatch(countPendingTransAction);
          setListChange(!listChange);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSearchTypeChange = (e) => {
    e.preventDefault();
    setChangeListExport(true);
    setSearchType(e.target.value);
  };

  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

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

  const onSubmit = (e) => {
    setLoading(true);
    setPage(1);
    setSubmitted(!submitted);
  };

  function handleDeleteTrans(id) {
    setLoading(true);
    ADMIN.deleteTrans({ id })
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
          setLoading(false);
        } else {
          toast.success(res.data.message);
          setListChange(!listChange);
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
    setChangeListExport(true);
    if (currentTable == "pending") {
      setCurrentTable("success");
    }
    if (currentTable == "success") {
      setCurrentTable("pending");
    }
  };

  const DataSet = [
    {
      columns: [
        { title: "HỌ VÀ TÊN" },
        { title: "EMAIL" },
        { title: "GÓI MUA" },
        { title: "NGÀY THAM GIA" },
        { title: "NGƯỜI GIỚI THIỆU" },
        { title: "SỐ TIỀN ĐÃ THANH TOÁN (VNĐ)" },
        { title: "HÌNH THỨC THANH TOÁN" },
        { title: "THỜI GIAN THANH TOÁN" },
        { title: "TRẠNG THÁI THANH TOÁN" },
        { title: "NGƯỜI KÍCH HOẠT" },
        { title: "GHI CHÚ" },
      ],
      data: exportData.map((item) => {
        return [
          { value: item.user_name },
          { value: item.email },
          { value: PACKAGE.find((b) => b.value === item.buy_package).label },
          {
            value:
              item.created_time && item.created_time !== ""
                ? new Date(item.created_time).toLocaleDateString("vi")
                : "",
          },
          { value: item.invite_id },
          { value: item.amount_vnd },
          {
            value:
              item.payment_method === "tienmat"
                ? "tiền mặt"
                : item.payment_method === "nganluong"
                ? "Ngân Lượng"
                : item.payment_method === "nganluongvisa"
                ? "Ngân Lượng Visa"
                : "",
          },
          {
            value:
              item.approved_time && item.approved_time !== ""
                ? new Date(item.approved_time).toLocaleDateString("vi")
                : "",
          },
          { value: item.status },
          { value: item.approved_by },
          { value: item.note ? item.note : "" },
        ];
      }),
    },
  ];

  useEffect(() => {
    let message = "Đã xảy ra lỗi vui lòng thử lại sau";
    ADMIN.getPendingList({
      keyword,
      page,
      resultsPerPage,
      searchType,
      searchLevel,
      currentTable,
      changeListExport,
    })
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          message = res.data.data.message;
          toast.error(message);
        } else {
          setData(res.data.data.listTrans);
          setAllPage(res.data.data.allPage);
          if (changeListExport) {
            setExportData(res.data.data.exportData);
          }
          setCountResult(res.data.data.countAllDocument);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, [page, submitted, resultsPerPage, currentTable, listChange]);

  return (
    <>
      <PageTitle>Danh sách giao dịch</PageTitle>

      <div className="flex justify-center items-center mb-4">
        {role === "admin" && (
          <div
            onClick={handleCurrentTableChange}
            className={`border-blue-500 transition-all cursor-pointer ${
              currentTable === "pending" && "border-b-2 font-bold"
            } uppercase px-4 py-2`}
          >
            giao dịch chờ{" "}
          </div>
        )}
        <div
          onClick={handleCurrentTableChange}
          className={`border-blue-500 transition-all cursor-pointer ${
            currentTable === "success" && "border-b-2 font-bold"
          } uppercase px-4 py-2`}
        >
          giao dịch thành công
        </div>
      </div>

      <div className="my-2 flex sm:flex-row flex-col justify-between items-center">
        <div className="my-2 flex sm:flex-row flex-col justify-between items-center">
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  onChange={handlePerPageChange}
                  defaultValue={resultsPerPage}
                  className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value={5} defaultValue={resultsPerPage === 5}>
                    5
                  </option>
                  <option value={10} defaultValue={resultsPerPage === 10}>
                    10
                  </option>
                  <option value={20} defaultValue={resultsPerPage === 20}>
                    20
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

              <div className="relative">
                <select
                  onChange={handleSearchTypeChange}
                  defaultValue={searchType}
                  className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option value={1} defaultValue={searchType === 1}>
                    Theo Tên
                  </option>
                  <option value={2} defaultValue={searchType === 2}>
                    Theo Gói
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
            </div>
            {searchType == "1" && (
              <div className="block relative">
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
                  className={`h-full min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none`}
                />
              </div>
            )}
            {searchType == "2" && (
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
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
            <button
              onClick={onSubmit}
              type="button"
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 mx-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-500 hover:bg-red-500 focus:shadow-outline-red "
            >
              <SearchIcon className="w-4 h-4 mr-3" aria-hidden="true" />
              Tìm kiếm
            </button>
          </div>
        </div>
        {data.length !== 0 ? (
          <ExcelFile
            filename="Ameritec-Transaction-Data"
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
            <ExcelSheet dataSet={DataSet} name="transaction" />
          </ExcelFile>
        ) : null}
      </div>

      <TableContainer className="mt-4">
        <Table>
          <TableHeader className="bg-gray-300">
            {currentTable === "pending" && (
              <tr>
                <TableCell className="text-center">Họ và tên</TableCell>
                <TableCell className="text-center">Người giới thiệu</TableCell>
                {/* <TableCell className="text-center">Số điện thoại</TableCell> */}
                <TableCell className="text-center">Thời gian tạo</TableCell>
                <TableCell className="text-center">
                  Phương thức thanh toán
                </TableCell>
                <TableCell className="text-center">Gói</TableCell>
                <TableCell className="text-center">Trạng thái</TableCell>
                <TableCell className="text-center">Thao tác</TableCell>
              </tr>
            )}
            {currentTable === "success" && (
              <tr>
                <TableCell className="text-center">Họ và tên</TableCell>
                <TableCell className="text-center">Người giới thiệu</TableCell>
                {/* <TableCell className="text-center">Số điện thoại</TableCell> */}
                <TableCell className="text-center">
                  Thời gian thanh toán
                </TableCell>
                <TableCell className="text-center">
                  Phương thức thanh toán
                </TableCell>
                <TableCell className="text-center">Gói</TableCell>
                <TableCell className="text-center">Trạng thái</TableCell>
                <TableCell className="text-center">Kích hoạt bởi</TableCell>
                {/* <TableCell className="text-center">Thao tác</TableCell> */}
              </tr>
            )}
          </TableHeader>
          {!loading && (
            <TableBody>
              {currentTable === "pending" &&
                data.map((tran, i) => (
                  <TableRow
                    key={i}
                    className={`${i % 2 !== 0 && "bg-gray-100"}`}
                  >
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{tran.user_name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {tran.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col">
                        <div className="text-sm">{tran.invite_name}</div>
                        <div className="text-sm">{tran.invite_id}</div>
                      </div>
                    </TableCell>
                    {/* <TableCell className="text-center">
                    <span className="text-sm">{tran.phone}</span>
                  </TableCell> */}
                    <TableCell className="text-center">
                      <span className="text-sm">
                        {`${new Date(tran.created_time).toLocaleTimeString(
                          "vi"
                        )} - 
                       ${new Date(tran.created_time).toLocaleDateString("vi")}`}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {tran.payment_method === "tienmat" && "Tiền mặt"}
                      {tran.payment_method === "nganluong" && "Ngân Lượng ATM"}
                      {tran.payment_method === "nganluongvisa" &&
                        "Ngân Lượng VISA"}
                      {tran.payment_method === "PAYPAL" && "PAYPAL"}
                      {tran.payment_method === "Credit Card" && "Credit Card"}
                    </TableCell>
                    <TableCell className="text-center">
                      <div
                        className={`min-w-max px-4 py-2 text-center rounded-md bg-${
                          tran.buy_package === "1"
                            ? "gray-600"
                            : tran.buy_package === "2"
                            ? "green-500"
                            : tran.buy_package === "3"
                            ? "blue-700"
                            : "cyan-default"
                        } text-white text-sm`}
                      >
                        {tran.account_type === "en"
                          ? PACKAGE.find(
                              (ele) => ele.value === tran.buy_package
                            ).label_en
                          : PACKAGE.find(
                              (ele) => ele.value === tran.buy_package
                            ).label}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge type="danger">Chưa thanh toán</Badge>
                      {tran.is_renew ? (
                        <Badge type="warning">Gia hạn</Badge>
                      ) : (
                        <Badge type="neutral">Đăng ký mới</Badge>
                      )}
                    </TableCell>
                    <TableCell className="flex items-center justify-center">
                      <Button
                        type="button"
                        onClick={() => activeToken(tran._id)}
                      >
                        Kích hoạt
                      </Button>
                      <button
                        onClick={() => handleDeleteTrans(tran._id)}
                        type="button"
                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 ml-1 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-500 hover:bg-red-500 focus:shadow-outline-red "
                      >
                        Xóa
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              {currentTable === "success" &&
                data.map((tran, i) => (
                  <TableRow
                    key={i}
                    className={`${i % 2 !== 0 && "bg-gray-100"}`}
                  >
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{tran.user_name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {tran.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col">
                        <div className="text-sm">{tran.invite_name}</div>
                        <div className="text-sm">{tran.invite_id}</div>
                      </div>
                    </TableCell>
                    {/* <TableCell className="text-center">
                    <span className="text-sm">{tran.phone}</span>
                  </TableCell> */}
                    <TableCell className="text-center">
                      <span className="text-sm">
                        {`${new Date(tran.approved_time).toLocaleTimeString(
                          "vi"
                        )} - 
                      ${new Date(tran.approved_time).toLocaleDateString("vi")}`}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {tran.payment_method === "tienmat" && "Tiền mặt"}
                      {tran.payment_method === "nganluong" && "Ngân Lượng ATM"}
                      {tran.payment_method === "nganluongvisa" &&
                        "Ngân Lượng VISA"}
                      {tran.payment_method === "PAYPAL" && "PAYPAL"}
                      {tran.payment_method === "Credit Card" && "Credit Card"}
                    </TableCell>
                    <TableCell className="text-center">
                      <div
                        className={`min-w-max px-4 py-2 text-center rounded-md bg-${
                          tran.buy_package === "1"
                            ? "gray-600"
                            : tran.buy_package === "2"
                            ? "green-500"
                            : tran.buy_package === "3"
                            ? "blue-700"
                            : "cyan-default"
                        } text-white text-sm`}
                      >
                        {tran.account_type === "en"
                          ? PACKAGE.find(
                              (ele) => ele.value === tran.buy_package
                            ).label_en
                          : PACKAGE.find(
                              (ele) => ele.value === tran.buy_package
                            ).label}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge type="success">Đã thanh toán</Badge>
                      {tran.is_renew ? (
                        <Badge type="warning">Gia hạn</Badge>
                      ) : (
                        <Badge type="neutral">Đăng ký mới</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {tran.approved_by}
                    </TableCell>

                    {/* <TableCell className="flex items-center justify-center">
                    <Button type="button" onClick={() => activeToken(tran._id)}>
                      Kích hoạt
                    </Button>
                    <button onClick={() => handleDeleteTrans(tran._id)} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 ml-1 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-500 hover:bg-red-500 focus:shadow-outline-red ">
                      Xóa</button>
                  </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
        <TableFooter>
          {/* PAGINATION */}
          {loading ? (
            <div className="">
              <Skeleton
                variant="rect"
                width="100%"
                height={50}
                count={resultsPerPage}
              />
            </div>
          ) : data.length !== 0 ? (
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
          {/* PAGINATION */}
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Dashboard;
