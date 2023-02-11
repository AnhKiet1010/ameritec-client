import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import ReactExport from "react-data-export";

import { Doughnut } from "react-chartjs-2";
import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";
import {
  CartIcon,
  MoneyIcon,
  PeopleIcon,
  FormsIcon,
  OutlineLogoutIcon,
} from "../../icons";
import RoundIcon from "../../components/RoundIcon";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
} from "@windmill/react-ui";
import Pagination from "@material-ui/lab/Pagination";
import { toast } from "react-toastify";
import ADMIN from "../../api/Admin";
import { PACKAGE } from "../../constants/package";
import Footer from "../../components/Footer";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")).user;
  const [loading, setLoading] = useState(true);
  const [totalPersonPackage, setTotalPersonPackage] = useState(0);
  const [totalStartupPackage, setTotalStartupPackage] = useState(0);
  const [totalBusinessPackage, setTotalBusinessPackage] = useState(0);
  const [totalBusinessPackageB, setTotalBusinessPackageB] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingTable, setLoadingTable] = useState(true);
  const [exportData, setExportData] = useState([]);
  const resultsPerPage = 5;
  const message = "Đã xảy ra lỗi vui lòng thử lại sau";
  const [countUserLevelArr, setCountUserLevelArr] = useState([]);
  const [data, setData] = useState([]);
  const [listLevel, setListLevel] = useState([]);

  const DataSet = [
    {
      columns: [
        { title: "MÃ GIỚI THIỆU" },
        { title: "HỌ VÀ TÊN" },
        { title: "EMAIL" },
        { title: "SỐ ĐIỆN THOẠI" },
        { title: "NGÀY THÁNG NĂM SINH" },
        { title: "GIỚI TÍNH" },
        { title: "ĐÃ HOÀN THÀNH BƯỚC" },
        { title: "ĐIỂM" },
        { title: "GÓI MUA" },
        { title: "NGÀY THAM GIA" },
        { title: "NGƯỜI GIỚI THIỆU" },
        { title: "SỐ CMND" },
        { title: "NGÀY CẤP" },
        { title: "NƠI CẤP" },
        { title: "MÃ SỐ THUẾ" },
        { title: "SỐ TÀI KHOẢN" },
        { title: "NGÂN HÀNG" },
        { title: "TÊN TÀI KHOẢN" },
      ],
      data: exportData
        ? exportData.map((item) => {
            let gender = "N/A";
            if (item.gender && item.gender == 2) {
              gender = "Nam";
            }
            if (item.gender && item.gender == 3) {
              gender = "Nữ";
            }
            return [
              { value: item._id },
              { value: item.full_name },
              { value: item.email },
              { value: item.phone ? item.phone : "" },
              {
                value:
                  item.birthday && item.birthday !== ""
                    ? new Date(item.birthday).toLocaleDateString("vi")
                    : "",
              },
              { value: gender },
              { value: item.level },
              { value: item.point },
              {
                value: PACKAGE.find((b) => b.value === item.buy_package).label,
              },
              {
                value:
                  item.created_time && item.created_time !== ""
                    ? new Date(item.created_time).toLocaleDateString("vi")
                    : "",
              },
              {
                value:
                  item.parent_id && item.parent_id !== "" ? item.parent_id : "",
              },
              { value: item.id_code ? item.id_code : "" },
              {
                value:
                  item.id_time && item.id_time !== ""
                    ? new Date(item.id_time).toLocaleDateString("vi")
                    : "",
              },
              { value: item.issued_by ? item.issued_by : "" },
              { value: item.tax_code ? item.tax_code : "" },
              { value: item.bank_account ? item.bank_account : "" },
              { value: item.bank ? item.bank : "" },
              { value: item.bank_name ? item.bank_name : "" },
            ];
          })
        : [],
    },
  ];

  const doughnutOptions = {
    data: {
      datasets: [
        {
          data: countUserLevelArr,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: [
            "#10B981",
            "#3B82F6",
            "#F97316",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#EC4899",
          ],
          label: "Tỷ lệ khách hàng theo Bước",
        },
      ],
      labels: ["B0", "B1", "B2", "B3", "B4", "B5", "B6"],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };

  const doughnutLegends = [
    { title: "B0", color: "bg-green-500" },
    { title: "B1", color: "bg-blue-500" },
    { title: "B2", color: "bg-orange-500" },
    { title: "B3", color: "bg-yellow-500" },
    { title: "B4", color: "bg-red-500" },
    { title: "B5", color: "bg-purple-500" },
    { title: "B6", color: "bg-pink-500" },
  ];

  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

  useEffect(() => {
    setLoadingTable(true);
    ADMIN.rank()
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(message);
        } else {
          setExportData(res.data.data.listUser);
          setData(
            res.data.data.listUser.slice(
              (page - 1) * resultsPerPage,
              page * resultsPerPage
            )
          );
          setLoadingTable(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra! Vui lòng đăng nhập lại!");
      });
  }, [page]);

  useEffect(() => {
    ADMIN.dashboard()
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
        } else {
          setTotalPersonPackage(res.data.data.countPersonPackages);
          setTotalStartupPackage(res.data.data.countStartupPackages);
          setTotalBusinessPackage(res.data.data.countBusinessPackages);
          setTotalBusinessPackageB(res.data.data.countBusinessPackagesB);
          setCountUserLevelArr(res.data.data.countUserLevelArr);
          setListLevel(res.data.data.listLevelUpToday);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra! Vui lòng đăng nhập lại!");
      });
  }, []);

  return (
    <>
      <PageTitle>Bảng Thống Kê</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <Skeleton variant="rect" width="100%" height={100} />
        ) : (
          <InfoCard title="Gói Doanh Nghiệp A" value={totalBusinessPackage}>
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
        )}

        {loading ? (
          <Skeleton variant="rect" width="100%" height={100} />
        ) : (
          <InfoCard title="Gói Doanh Nghiệp B" value={totalBusinessPackageB}>
            <RoundIcon
              icon={FormsIcon}
              iconColorClass="text-yellow-500 dark:text-yellow-100"
              bgColorClass="bg-yellow-100 dark:bg-yellow-500"
              className="mr-4"
            />
          </InfoCard>
        )}

        {loading ? (
          <Skeleton variant="rect" width="100%" height={100} />
        ) : (
          <InfoCard title="Gói Gia Đình" value={totalStartupPackage}>
            <RoundIcon
              icon={CartIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
        )}

        {loading ? (
          <Skeleton variant="rect" width="100%" height={100} />
        ) : (
          <InfoCard title="Gói cá nhân" value={totalPersonPackage}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
        )}
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div>
          <PageTitle>Tỷ lệ khách hàng theo Bước</PageTitle>
          {loading ? (
            <>
              <div className="">
                <Skeleton variant="rect" width="100%" height={400} count={1} />
              </div>
            </>
          ) : (
            <ChartCard title="">
              <Doughnut {...doughnutOptions} />
              <ChartLegend legends={doughnutLegends} />
            </ChartCard>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center">
            <PageTitle>Danh sách 500 khách hàng</PageTitle>
            {user.role !== "system" && data.length !== 0 ? (
              <ExcelFile
                filename="Ameritec-User-Data"
                element={
                  <button
                    type="button"
                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green "
                  >
                    <OutlineLogoutIcon
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />
                    Xuất Data
                  </button>
                }
              >
                <ExcelSheet dataSet={DataSet} name="Ameritec Data" />
              </ExcelFile>
            ) : null}
          </div>
          <TableContainer className="">
            <Table>
              <TableHeader className="">
                <tr>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell className="text-center">Đã hoàn thành</TableCell>
                  <TableCell className="text-center">Điểm</TableCell>
                </tr>
              </TableHeader>
              {!loadingTable && (
                <TableBody>
                  {data.map((user, i) => (
                    <TableRow
                      key={i}
                      className={`${i % 2 !== 0 && "bg-gray-100"} text-center`}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar
                            className="hidden mr-3 md:block"
                            src={user.avatar}
                            alt="User avatar"
                          />
                          <div className="text-left">
                            <p className="font-semibold">{user.full_name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-xs">B {user.level}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-xs">{user.point} điểm</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            {loadingTable ? (
              <>
                <div className="">
                  <Skeleton variant="rect" width="100%" height={50} count={6} />
                </div>
              </>
            ) : (
              <TableFooter>
                {data.length !== 0 ? (
                  <div className="flex justify-between items-center">
                    <Pagination
                      count={500 / resultsPerPage}
                      page={page}
                      onChange={onPageChange}
                      color="primary"
                    />
                    <div>
                      Có{" "}
                      <span className="text-xl mx-1 text-gray-700">{500}</span>{" "}
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
        </div>
      </div>
      {listLevel.length > 0 && (
        <div className="w-1/2 mt-8 mb-20">
          <PageTitle>Danh sách khách hàng đạt bước mới trong hôm nay</PageTitle>
          <TableContainer className="">
            <Table>
              <TableHeader className="">
                <tr>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell className="text-center">
                    Đã hoàn thành bước
                  </TableCell>
                  <TableCell className="text-center">Điểm</TableCell>
                </tr>
              </TableHeader>
              {!loadingTable && (
                <TableBody>
                  {listLevel.map((user, i) => (
                    <TableRow
                      key={i}
                      className={`${i % 2 !== 0 && "bg-gray-100"} text-center`}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar
                            className="hidden mr-3 md:block"
                            src={user.avatar}
                            alt="User avatar"
                          />
                          <div className="text-left">
                            <p className="font-semibold">{user.full_name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-xs">B {user.level}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-xs">{user.point} điểm</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      )}
      <hr className="my-8" />
      <Footer />
    </>
  );
}

export default Dashboard;
