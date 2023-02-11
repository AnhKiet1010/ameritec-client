import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PageTitle from "../../components/Typography/PageTitle";
import { PACKAGE } from '../../constants/package';
import { confirmAlert } from "react-confirm-alert";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge
} from "@windmill/react-ui";
import Pagination from '@material-ui/lab/Pagination';
import { toast } from "react-toastify";
import ADMIN from "../../api/Admin";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../assets/css/Payment.css";
import {
  SearchIcon
} from '../../icons';
import ExportUsersData from "../../components/ExportData/users";

function Dashboard() {
  const role = JSON.parse(localStorage.getItem('user')).user.role;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLevel, setSearchLevel] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState(1);
  const [countResult, setCountResult] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const message = "Đã xảy ra lỗi vui lòng thử lại sau";
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [resultsPerPage, setResultPerPage] = useState(20);
  const [refresh, setRefresh] = useState(false);
  const getExportData = false;

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

  const handleDeleteUser = (id, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>❗ Xóa người dùng ❗</h1>
            <p>
              Bạn muốn xóa <span className="font-bold">{name}</span>
            </p>
            <br />

            <button className="" onClick={() => onClose()}>Hủy</button>
            <button
              className="red"
              onClick={() => {
                ADMIN.deleteUser({ id })
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

  const handleBlockUser = (id, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>❗ Tạm khóa người dùng ❗</h1>
            <p>
              Bạn muốn tạm khóa <span className="font-bold">{name}</span>
            </p>
            <br />

            <button className="" onClick={() => onClose()}>Hủy</button>
            <button
              className="red"
              onClick={() => {
                ADMIN.blockUser({ id })
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

  const handleUnblockUser = (id, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>❗ Mở tạm khóa người dùng ❗</h1>
            <p>
              Bạn muốn mở tạm khóa <span className="font-bold">{name}</span>
            </p>
            <br />

            <button className="" onClick={() => onClose()}>Hủy</button>
            <button
              className="red"
              onClick={() => {
                ADMIN.unBlockUser({ id })
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

  const handleOnLevelSearchChange = (e) => {
    setSearchLevel(e.target.value);
  }

  const handleOnMonthSearchChange = (e) => {
    e.preventDefault();
    setCurrentMonth(e.target.value);
  }

  const handleYearChange = (e) => {
    e.preventDefault();
    setCurrentYear(e.target.value);
  }

  const onSubmit = (e) => {
    setPage(1);
    setSubmitted(!submitted);
  }

  useEffect(() => {
    setLoading(true);
    ADMIN.users({ searchType, keyword, page, resultsPerPage, searchLevel, currentMonth, currentYear, getExportData })
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
  }, [submitted, page, resultsPerPage, refresh]);

  return (
    <>
      <PageTitle>Danh Sách Người Dùng</PageTitle>
      <div className="my-2 flex sm:flex-row flex-col justify-between items-center">
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative h-full">
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
            <div className="relative h-full">
              <select
                onChange={handleSearchTypeChange}
                defaultValue={searchType}
                className={`appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500`}>
                <option value={1} defaultValue={searchType === 1}>Tất cả</option>
                <option value={2} defaultValue={searchType === 2}>Theo Tên</option>
                <option value={3} defaultValue={searchType === 3}>Theo Email</option>
                <option value={4} defaultValue={searchType === 4}>Theo Mã Giới Thiệu</option>
                <option value={5} defaultValue={searchType === 5}>Theo Level</option>
                <option value={6} defaultValue={searchType === 6}>Theo Tháng</option>
                <option value={7} defaultValue={searchType === 7}>Hết Hạn</option>
                <option value={8} defaultValue={searchType === 8}>Tạm Khóa</option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {(searchType == '6' || searchType == '7') &&
              <div className="relative h-full">
                <select
                  onChange={handleYearChange}
                  defaultValue={currentYear}
                  className="appearance-none h-full rounded-r border-l border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  {
                    searchType === '7' &&
                    <option value={"all"} defaultValue={currentYear === 'all'}>Tất cả</option>
                  }
                  <option value={2019} defaultValue={currentYear === 2019}>Năm 2019</option>
                  <option value={2020} defaultValue={currentYear === 2020}>Năm 2020</option>
                  <option value={2021} defaultValue={currentYear === 2021}>Năm 2021</option>
                  <option value={2022} defaultValue={currentYear === 2022}>Năm 2022</option>
                  <option value={2023} defaultValue={currentYear === 2023}>Năm 2023</option>
                  <option value={2024} defaultValue={currentYear === 2024}>Năm 2024</option>
                  <option value={2025} defaultValue={currentYear === 2025}>Năm 2025</option>
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

            {(searchType == '1' || searchType == '2' || searchType == '3' || searchType == '4' || searchType == '8') && <>
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>
              <input placeholder="Nhập từ khóa tìm kiếm"
                onChange={handleKeyword}
                disabled={searchType == '1' || searchType == '8'}
                className={`h-full min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none ${(searchType == '1' || searchType == '8') && 'opacity-50'}`} />
            </>
            }

            {(searchType == '5') &&
              <div className="relative h-full">
                <select
                  onChange={handleOnLevelSearchChange}
                  defaultValue={searchLevel}
                  className="min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block py-2 px-4 pr-8 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white leading-tight h-full focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none">
                  <option value={0} defaultValue={searchLevel === 0}>Level 0</option>
                  <option value={1} defaultValue={searchLevel === 1}>Level 1</option>
                  <option value={2} defaultValue={searchLevel === 2}>Level 2</option>
                  <option value={3} defaultValue={searchLevel === 3}>Level 3</option>
                  <option value={4} defaultValue={searchLevel === 4}>Level 4</option>
                  <option value={5} defaultValue={searchLevel === 5}>Level 5</option>
                  <option value={6} defaultValue={searchLevel === 6}>Level 6</option>
                </select>
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            }

            {(searchType == '6' || searchType == '7') &&
              <div class="relative h-full">
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
          <ExportUsersData searchType={searchType} keyword={keyword} searchLevel={searchLevel} currentMonth={currentMonth} currentYear={currentYear} submitted={submitted} />
        ) : null}
      </div>

      <>
        <TableContainer className="mt-4 mb-20">
          <Table>
            <TableHeader className="bg-gray-300">
              <tr>
                <TableCell>Họ và tên</TableCell>
                <TableCell className="text-center">Người giới thiệu</TableCell>
                <TableCell className="text-center">B</TableCell>
                <TableCell className="text-center">Điểm</TableCell>
                <TableCell className="text-center">Thời gian tạo</TableCell>
                <TableCell className="text-center">Gói</TableCell>
                <TableCell className="text-center">Trạng Thái</TableCell>
                <TableCell className="text-center">Thao tác</TableCell>
              </tr>
            </TableHeader>
            {!loading &&
              <TableBody>
                {data.map((user, i) => (
                  <TableRow key={i} className={`${i % 2 !== 0 && 'bg-gray-100'} text-center`}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" />
                        <div className="text-left">
                          <p className="font-semibold">{user.full_name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="text-left">
                          <p className="font-semibold">{user.parent_name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{user.parent_id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-xs">{user.level}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-xs">{`${user.buy_package === "1" ? 0.25 : 1} - `}{user.point}</p>
                    </TableCell>
                    <TableCell>
                      <span className="">
                        {`${new Date(user.created_time).toLocaleDateString('vi')}`}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className={`min-w-max px-4 py-2 text-center rounded-md text-white text-sm`}
                        style={{backgroundColor: user.buy_package === '1' ? '#4B5563' : user.buy_package === '2' ? '#10B981' : user.buy_package === '3' ? "#1D4ED8" : user.buy_package === '4' ? "#00CED1" : "black"}}
                      >
                        {
                          user.account_type === 'en' ? PACKAGE.find(ele => ele.value === user.buy_package).label_en
                          : PACKAGE.find(ele => ele.value === user.buy_package).label
                        }
                      </div>
                      {/* <div className={`min-w-max px-4 py-2 text-center rounded-md bg-${user.buy_package === '1' ? 'gray-600' : user.buy_package === '2' ? 'green-500' : user.buy_package === '3' ? "blue-700" : user.buy_package === '4' ? "cyan-default" : "black"} text-white text-sm`}>
                        {
                          user.account_type === 'en' ? PACKAGE.find(ele => ele.value === user.buy_package).label_en
                          : PACKAGE.find(ele => ele.value === user.buy_package).label
                        }
                      </div> */}
                    </TableCell>
                    <TableCell>
                      {
                        user.expired ? <Badge type="danger">Hết hạn</Badge>
                          : !user.active ? <Badge type="neutral">Tạm khóa</Badge>
                            : user.active ? <Badge type="success">Đang Hoạt Động</Badge>
                              : ""
                      }
                    </TableCell>
                    <TableCell className="h-full flex items-center justify-between">
                      <div className="flex m-auto gap-2 items-center py-4">
                        {
                          role !== 'accountant2' &&
                          <a href={`/admin/tree/${user._id}`}
                            className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110">
                            🌴
                          </a>
                        }
                        <a href={`/admin/user/${user._id}`}
                          className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110">
                          👁
                        </a>
                        {
                          role !== 'accountant2' &&
                          <a href={`/admin/create-bonus/${user._id}`}
                            className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110">
                            🏆
                          </a>
                        }
                        {
                          role === 'admin' &&
                          <>
                            {
                              !user.expired &&
                              <>

                                {
                                  user.active &&
                                  <button
                                    onClick={() => handleBlockUser(user._id, user.full_name)}
                                    className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110 appearance-none focus:border-none focus:outline-none">
                                    🔒
                                  </button>
                                }
                                {
                                  !user.active &&
                                  <button
                                    onClick={() => handleUnblockUser(user._id, user.full_name)}
                                    className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110 appearance-none focus:border-none focus:outline-none">
                                    🔓
                                  </button>
                                }
                              </>
                            }
                          </>
                        }
                        {
                          (role === 'admin' && user.is_clone === false) &&
                          <button
                            onClick={() => handleDeleteUser(user._id, user.full_name)}
                            className="w-5 mr-2 text-gray-600 transform hover:text-purple-500 hover:scale-110 appearance-none focus:border-none focus:outline-none">
                            ❌
                          </button>
                        }
                      </div>
                    </TableCell>
                  </TableRow>
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
    </>
  );
}

export default Dashboard;
