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

function Trash() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [countResult, setCountResult] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const message = "Đã xảy ra lỗi vui lòng thử lại sau";
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

  const handlePerPageChange = (event) => {
    event.preventDefault();
    setResultPerPage(event.target.value);
    setPage(1);
  };

  const onSubmit = (e) => {
    setPage(1);
    setSubmitted(!submitted);
  }

  function onClearTrash() {
    ADMIN.deleteTrashUser()
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setRefresh(!refresh);
        }
      }).catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }

  useEffect(() => {
    setLoading(true);
    ADMIN.getListDeleteUser({ keyword, page, resultsPerPage })
      .then((res) => {
        const status = res.data.status;
        console.log('res', res.data);
        if (status !== 200) {
          toast.error(res.data.message);
        } else {
          setData(res.data.data.list);
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
      <PageTitle>Thùng rác</PageTitle>
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
          </div>
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
              className={`h-full min-w-40 appearance-none rounded-r rounded-l sm:rounded-l-none border border-l-none border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none && 'opacity-50'}`} />
          </div>
          <button onClick={onSubmit} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 mx-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-500 hover:bg-red-500 focus:shadow-outline-red ">
            <SearchIcon className="w-4 h-4 mr-3" aria-hidden="true" />
            Tìm kiếm</button>
        </div>
        <button onClick={onClearTrash} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 mx-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-500 hover:bg-green-500 focus:shadow-outline-red ">
          Làm sạch thùng rác</button>
      </div>

      <>
        <TableContainer className="mt-4 mb-20">
          <Table>
            <TableHeader className="bg-gray-300">
              <tr>
                <TableCell>Họ và tên</TableCell>
                <TableCell className="text-center">Level</TableCell>
                <TableCell className="text-center">Điểm</TableCell>
                <TableCell className="text-center">Gói</TableCell>
                <TableCell className="text-center">Thời gian tạo</TableCell>
                <TableCell className="text-center">Thời gian xóa</TableCell>
              </tr>
            </TableHeader>
            {!loading &&
              <TableBody>
                {data && data.length > 0 && data.map((user, i) => (
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
                      <p className="font-xs">{user.level}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-xs">{`${user.buy_package === "1" ? 0.25 : 1} - `}{user.point}</p>
                    </TableCell>
                    <TableCell>
                      {/* <div className={`min-w-max px-4 py-2 text-center rounded-md bg-${user.buy_package === '1' ? 'red' : user.buy_package === '2' ? 'green' : user.buy_package === '3' ? "blue" : "black"}-500 text-white text-sm`}>
                        {
                          PACKAGE.find(ele => ele.value === user.buy_package).label
                        }
                      </div> */}
                      <div className={`min-w-max px-4 py-2 text-center rounded-md text-white text-sm`}
                        style={{backgroundColor: user.buy_package === '1' ? '#4B5563' : user.buy_package === '2' ? '#10B981' : user.buy_package === '3' ? "#1D4ED8" : user.buy_package === '4' ? "#00CED1" : "black"}}
                      >
                        {
                          user.account_type === 'en' ? PACKAGE.find(ele => ele.value === user.buy_package).label_en
                          : PACKAGE.find(ele => ele.value === user.buy_package).label
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="">
                        {`${new Date(user.created_time).toLocaleDateString('vi')}`}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="">
                        {`${new Date(user.delete_time).toLocaleDateString('vi')}`}
                      </span>
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

export default Trash;
