import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import { Doughnut } from "react-chartjs-2";
import ChartCard from "../components/Chart/ChartCard";
import ChartLegend from "../components/Chart/ChartLegend";
import { useHistory } from "react-router-dom";
import {
  CartIcon,
  MoneyIcon,
  LevelIcon,
  DartsIcon,
  SimpleClockIcon,
  MusclesIcon,
  PeopleIcon,
  FormsIcon,
} from "../icons";
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
import RoundIcon from "../components/RoundIcon";
import { toast } from "react-toastify";
import CLIENT from "../api/Client";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

function Dashboard() {
  const { t } = useTranslation();
  const history = useHistory();
  const [loadingTotalPoint, setLoadingTotalPoint] = useState(true);
  const [loadingCountPackage, setLoadingCountPackage] = useState(true);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const buy_package = JSON.parse(localStorage.getItem("user")).user.buy_package;
  const [totalPointGroup1, setTotalPointGroup1] = useState(0);
  const [totalPointGroup2, setTotalPointGroup2] = useState(0);
  const [totalPointGroup3, setTotalPointGroup3] = useState(0);
  const [totalPerGroup1, setTotalPerGroup1] = useState(0);
  const [totalPerGroup2, setTotalPerGroup2] = useState(0);
  const [totalPerGroup3, setTotalPerGroup3] = useState(0);
  const [targetNumber, setTargetNumber] = useState(0);
  const [tryTarget, setTryTarget] = useState(0);
  const [loadingTable, setLoadingTable] = useState(true);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [totalPersonPackage, setTotalPersonPackage] = useState(0);
  const [totalStartupPackage, setTotalStartupPackage] = useState(0);
  const [totalBusinessPackage, setTotalBusinessPackage] = useState(0);
  const [totalBusinessPackageB, setTotalBusinessPackageB] = useState(0);
  const [dayToExpired, setDayToExpired] = useState(365);
  const [createdTime, setCreatedTime] = useState("");
  const [expiredTime, setExpiredTime] = useState("");
  const resultsPerPage = 5;
  const [submittingRenew, setSubmittingRenew] = useState(false);
  const [revenue, setRevenue] = useState(0);

  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

  useEffect(() => {
    document.title = "Ameritec || " + t("Bảng thống kê");
    const id = JSON.parse(localStorage.getItem("user")).user.id;
    const buy_package = JSON.parse(localStorage.getItem("user")).user
      .buy_package;

    CLIENT.dashboardTotalPoint(id)
      .then((res) => {
        const status = res.data.status;
        console.log(res.data);
        if (status === 200) {
          setTargetNumber(res.data.data.targetNumber);
          setTotalPointGroup1(res.data.data.sumPoint.sumPointGroup1);
          setTotalPointGroup2(res.data.data.sumPoint.sumPointGroup2);
          setTotalPointGroup3(res.data.data.sumPoint.sumPointGroup3);
          setTotalPerGroup1(res.data.data.perGroup.perGroup1);
          setTotalPerGroup2(res.data.data.perGroup.perGroup2);
          setTotalPerGroup3(res.data.data.perGroup.perGroup3);
          setTryTarget(
            res.data.data.targetNumber -
              res.data.data.sumPoint.sumPointGroup1 -
              res.data.data.sumPoint.sumPointGroup2 -
              res.data.data.sumPoint.sumPointGroup3
          );
          setLoadingTotalPoint(false);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra! Vui lòng đăng nhập lại!");
      });

    CLIENT.dashboardCountPackage(id)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          setTotalPersonPackage(res.data.data.countPackage.countPackage1);
          setTotalStartupPackage(res.data.data.countPackage.countPackage2);
          setTotalBusinessPackage(res.data.data.countPackage.countPackage3);
          setTotalBusinessPackageB(res.data.data.countPackage.countPackage4);
          setLoadingCountPackage(false);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra! Vui lòng đăng nhập lại!");
      });

    CLIENT.dashboardUserInfo(id)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          const { user } = res.data.data;
          console.log(res.data);
          setUser(user);
          setDayToExpired(res.data.data.dayToExpired + 1);
          setExpiredTime(res.data.data.expired_time);
          setCreatedTime(res.data.data.created_time);
          setLoadingUserInfo(false);
          setRevenue(res.data.data.revenue.amount_usd);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra! Vui lòng đăng nhập lại!");
      });
  }, []);

  useEffect(() => {
    setLoadingTable(true);
    CLIENT.getRank500({ page, resultsPerPage })
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error("Có lỗi xảy ra! Vui lòng đăng nhập lại!");
        } else {
          setData(res.data.data.listUser);
          setLoadingTable(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra! Vui lòng đăng nhập lại!");
      });
  }, [page]);

  const doughnutOptions = {
    data: {
      datasets: [
        {
          data: [
            Math.round(totalPerGroup1),
            Math.round(totalPerGroup2),
            Math.round(totalPerGroup3),
            100 -
              Math.round(totalPerGroup1) -
              Math.round(totalPerGroup2) -
              Math.round(totalPerGroup3),
          ],
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: ["#10B981", "#3B82F6", "#F97316", "#000"],
          label: "Tỷ lệ cấp dưới theo nhóm",
        },
      ],
      labels: [t("Nhóm 1"), t("Nhóm 2"), t("Nhóm 3"), t("Cần cố gắng")],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
      width: "auto",
      height: "auto",
    },
    legend: {
      display: false,
    },
  };

  const doughnutLegends = [
    { title: t("Nhóm 1"), color: "bg-green-500" },
    { title: t("Nhóm 2"), color: "bg-blue-500" },
    { title: t("Nhóm 3"), color: "bg-orange-500" },
    { title: t("Cần cố gắng"), color: "bg-black" },
  ];

  const handleRenewClick = () => {
    setSubmittingRenew(true);
    CLIENT.requestRenew()
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          history.push(`/app/payment/${res.data.data.newTrans._id}`);
        } else {
          toast.error(t("Đã có lệnh gia hạn, vui lòng liên hệ với admin"));
          setSubmittingRenew(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra! Vui lòng đăng nhập lại!");
      });
  };

  return (
    <>
      <PageTitle>{t("Bảng thống kê")}</PageTitle>

      {/* <!-- Cards --> */}
      <div className={`grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4`}>
        {loadingUserInfo ? (
          <Skeleton variant="rect" width="100%" height={100} />
        ) : (
          <InfoCard title={t("Tổng doanh thu")} value={`$ ${revenue}`}>
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
        )}

        {loadingUserInfo ? (
          <Skeleton variant="rect" width="100%" height={100} />
        ) : (
          <InfoCard title={t("Tổng số điểm")} value={`${user.point}`}>
            <RoundIcon
              icon={CartIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
        )}

        {loadingUserInfo ? (
          <Skeleton variant="rect" width="100%" height={100} />
        ) : (
          <>
            <InfoCard title={t("Level Long")} value={user.level}>
              <RoundIcon
                icon={LevelIcon}
                iconColorClass="text-teal-500 dark:text-teal-100"
                bgColorClass="bg-teal-100 dark:bg-teal-500"
                className="mr-4"
              />
            </InfoCard>
          </>
        )}

        {loadingUserInfo ? (
          <Skeleton variant="rect" width="100%" height={100} />
        ) : (
          <div
            className={`min-w-0 rounded-lg shadow-xs overflow-hidden ${
              dayToExpired <= 7
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600"
            } flex justify-between items-center`}
          >
            <div className="p-4 flex items-center justify-between mb-2">
              {dayToExpired <= 7 && (
                <button
                  onClick={handleRenewClick}
                  className={`rounded-full ${
                    submittingRenew ? "bg-red-400" : "bg-white"
                  } text-red-500 p-1 font-semibold text-sm leading-4 flex justify-center items-center focus:outline-none w-12 h-12 mr-2
           hover:text-white  hover:bg-red-400`}
                >
                  {submittingRenew ? (
                    <span className="text-white">...</span>
                  ) : (
                    t("Gia Hạn")
                  )}
                </button>
              )}
              <div>
                <div className=" text-sm font-medium">
                  {t("Ngày đăng ký")} :{" "}
                  <span className="text-lg">
                    {new Date(createdTime).toLocaleDateString("vi")}
                  </span>
                </div>
                <div className=" text-sm font-medium">
                  {t("Ngày hết hạn")} :{" "}
                  <span className="text-lg">
                    {new Date(expiredTime).toLocaleDateString("vi")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <>
        {loadingUserInfo ? (
          <Skeleton variant="rect" width="100%" height={60} />
        ) : (
          <header className="flex flex-col items-center mb-4">
            <h1 className="text-2xl md:text-3xl text-primary-normal font-bold border-b border-gray-300 pb-3 dark:text-white">
              {t("Bước tiếp theo")} : {t("Bước")}{" "}
              {user.level <= 6 && user.level + 1}
            </h1>
          </header>
        )}

        <div className="w-full grid gap-6 mb-8 md:grid-cols-2">
          <div>
            <PageTitle>{t("Tỷ lệ (%) theo nhóm")}</PageTitle>
            {loadingTotalPoint ? (
              <>
                <div className="">
                  <Skeleton
                    variant="rect"
                    width="100%"
                    height={400}
                    count={1}
                  />
                </div>
              </>
            ) : (
              <ChartCard title="">
                <Doughnut {...doughnutOptions} />
                <ChartLegend legends={doughnutLegends} />
              </ChartCard>
            )}
          </div>

          <div className="w-64 m-auto sm:w-full hidden">
            <div>
              <PageTitle>{t("Top 500 khách hàng")}</PageTitle>
            </div>
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>{t("Họ và tên")}</TableCell>
                    <TableCell className="text-center">
                      {t("Level 500")}
                    </TableCell>
                    <TableCell className="text-center">{t("điểm")}</TableCell>
                  </tr>
                </TableHeader>
                {!loadingTable && (
                  <TableBody>
                    {data.map((user, i) => (
                      <TableRow
                        key={i}
                        className={`${
                          i % 2 !== 0 && "bg-gray-100"
                        } text-center`}
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
                                {user._id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-xs">
                            {t("Cấp")} {user.level}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="font-xs">
                            {user.point} {t("điểm")}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
              {loadingTable ? (
                <>
                  <div className="">
                    <Skeleton
                      variant="rect"
                      width="100%"
                      height={50}
                      count={6}
                    />
                  </div>
                </>
              ) : (
                <TableFooter>
                  {data.length !== 0 ? (
                    <div className="w-full flex flex-col md:flex-row justify-between items-center overflow-x-auto">
                      <Pagination
                        count={500 / resultsPerPage}
                        page={page}
                        onChange={onPageChange}
                        color="primary"
                      />
                    </div>
                  ) : (
                    <div className="text-md text-gray-400 text-center">
                      {t("không có dữ liệu")}
                    </div>
                  )}
                </TableFooter>
              )}
            </TableContainer>
          </div>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
          {loadingTotalPoint ? (
            <Skeleton variant="rect" width="100%" height={100} />
          ) : (
            <InfoCard title={t("Doanh số mục tiêu")} value={`${targetNumber}`}>
              <RoundIcon
                icon={DartsIcon}
                iconColorClass="text-green-500 dark:text-green-100"
                bgColorClass="bg-green-100 dark:bg-green-500"
                className="mr-4"
              />
            </InfoCard>
          )}

          {loadingTotalPoint ? (
            <Skeleton variant="rect" width="100%" height={100} />
          ) : (
            <InfoCard
              title={t("Doanh số đã đạt được")}
              value={`${
                totalPointGroup1 + totalPointGroup2 + totalPointGroup3
              }`}
            >
              <RoundIcon
                icon={SimpleClockIcon}
                iconColorClass="text-blue-500 dark:text-blue-100"
                bgColorClass="bg-blue-100 dark:bg-blue-500"
                className="mr-4"
              />
            </InfoCard>
          )}

          {loadingTotalPoint ? (
            <Skeleton variant="rect" width="100%" height={100} />
          ) : (
            <InfoCard title={t("Doanh số cần cố gắng")} value={`${tryTarget}`}>
              <RoundIcon
                icon={MusclesIcon}
                iconColorClass="text-teal-500 dark:text-teal-100"
                bgColorClass="bg-teal-100 dark:bg-teal-500"
                className="mr-4"
              />
            </InfoCard>
          )}
        </div>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {loadingCountPackage ? (
            <Skeleton variant="rect" width="100%" height={100} />
          ) : (
            <InfoCard
              title={`${t("Gói Doanh Nghiệp")} A`}
              value={totalBusinessPackage}
            >
              <RoundIcon
                icon={MoneyIcon}
                iconColorClass="text-orange-500 dark:text-orange-100"
                bgColorClass="bg-orange-100 dark:bg-orange-500"
                className="mr-4"
              />
            </InfoCard>
          )}

          {loadingCountPackage ? (
            <Skeleton variant="rect" width="100%" height={100} />
          ) : (
            <InfoCard
              title={`${t("Gói Doanh Nghiệp")} B`}
              value={totalBusinessPackageB}
            >
              <RoundIcon
                icon={FormsIcon}
                iconColorClass="text-yellow-500 dark:text-yellow-100"
                bgColorClass="bg-yellow-100 dark:bg-yellow-500"
                className="mr-4"
              />
            </InfoCard>
          )}

          {loadingCountPackage ? (
            <Skeleton variant="rect" width="100%" height={100} />
          ) : (
            <InfoCard title={t("Gói Gia Đình")} value={totalStartupPackage}>
              <RoundIcon
                icon={CartIcon}
                iconColorClass="text-blue-500 dark:text-blue-100"
                bgColorClass="bg-blue-100 dark:bg-blue-500"
                className="mr-4"
              />
            </InfoCard>
          )}

          {loadingCountPackage ? (
            <Skeleton variant="rect" width="100%" height={100} />
          ) : (
            <InfoCard title={t("Gói Cá Nhân")} value={totalPersonPackage}>
              <RoundIcon
                icon={PeopleIcon}
                iconColorClass="text-green-500 dark:text-green-100"
                bgColorClass="bg-green-100 dark:bg-green-500"
                className="mr-4"
              />
            </InfoCard>
          )}
        </div>
        <hr className="my-8" />
        <Footer />
      </>
    </>
  );
}

export default Dashboard;
