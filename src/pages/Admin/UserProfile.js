import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import InfoCard from "../../components/Cards/InfoCard";
import PageTitle from "../../components/Typography/PageTitle";
import CTA from "../../components/CTA";
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
} from "../../icons";
import RoundIcon from "../../components/RoundIcon";
import ADMIN from "../../api/Admin";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import CLIENT from "../../api/Client";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Button,
} from "@windmill/react-ui";
import { Doughnut } from "react-chartjs-2";
import ChartCard from "../../components/Chart/ChartCard";
import ChartLegend from "../../components/Chart/ChartLegend";
import ExportUsersData from "../../components/ExportData/usersProfile";
import AdminUpdateProfilePopup from "../../components/AdminUpdateProfilePopup";

function UserProfile({ match }) {
  const admin = JSON.parse(localStorage.getItem("user")).user;
  const id = match.params.id;
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [userData, setUserData] = useState({});
  const [change, setChange] = useState(false);
  const [totalPointGroup1, setTotalPointGroup1] = useState(0);
  const [totalPointGroup2, setTotalPointGroup2] = useState(0);
  const [totalPointGroup3, setTotalPointGroup3] = useState(0);
  const [totalPerGroup1, setTotalPerGroup1] = useState(0);
  const [totalPerGroup2, setTotalPerGroup2] = useState(0);
  const [totalPerGroup3, setTotalPerGroup3] = useState(0);
  const [loadingTotalPoint, setLoadingTotalPoint] = useState(true);
  const [loadingCountPackage, setLoadingCountPackage] = useState(true);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [targetNumber, setTargetNumber] = useState(0);
  const [tryTarget, setTryTarget] = useState(0);
  const [totalPersonPackage, setTotalPersonPackage] = useState(0);
  const [totalStartupPackage, setTotalStartupPackage] = useState(0);
  const [totalBusinessPackage, setTotalBusinessPackage] = useState(0);
  const [totalBusinessPackageB, setTotalBusinessPackageB] = useState(0);
  const [user, setUser] = useState({});
  const [dayToExpired, setDayToExpired] = useState(365);
  const [createdTime, setCreatedTime] = useState("");
  const [expiredTime, setExpiredTime] = useState("");
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  const [submittingRenew, setSubmittingRenew] = useState(false);
  const [revenue, setRevenue] = useState(0);

  const textAreaRef1 = useRef(null);

  function copyToClipboard1(e) {
    textAreaRef1.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast.success("Đã copy!");
  }

  const textAreaRef2 = useRef(null);

  function copyToClipboard2(e) {
    textAreaRef2.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast.success("Đã copy!");
  }

  const textAreaRef3 = useRef(null);

  function copyToClipboard3(e) {
    textAreaRef3.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast.success("Đã copy!");
  }

  useEffect(() => {
    const buy_package = JSON.parse(localStorage.getItem("user")).user
      .buy_package;

    CLIENT.dashboardTotalPoint(id)
      .then((res) => {
        const status = res.data.status;
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
  }, [refresh]);

  useEffect(() => {
    let message = "Có lỗi xảy ra! Vui lòng thử lại sau";
    ADMIN.getUser(id)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          const { result, user } = res.data.data;
          setUserData(user);
          setDataTable([...result]);
          setLoading(false);
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(message);
      });
  }, [change, refresh]);

  function onClickEdit() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <AdminUpdateProfilePopup
            userData={userData}
            id={id}
            onClose={onClose}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        );
      },
    });
  }

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
      labels: ["Nhóm 1", "Nhóm 2", "Nhóm 3", "Cần cố gắng"],
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
    { title: "Nhóm 1", color: "bg-green-500" },
    { title: "Nhóm 2", color: "bg-blue-500" },
    { title: "Nhóm 3", color: "bg-orange-500" },
    { title: "Cần cố gắng", color: "bg-black" },
  ];

  const handleRenewClick = () => {
    setSubmittingRenew(true);
    ADMIN.renewLicense({ id })
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          toast.success(res.data.message);
          setRefresh(!refresh);
        } else {
          toast.error(res.data.message);
          submittingRenew(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra! Vui lòng đăng nhập lại!");
      });
  };

  return (
    <>
      <PageTitle>
        Thông tin khách hàng :{" "}
        <span className="text-gray-700 italic">{userData.full_name}</span>
      </PageTitle>

      <CTA back_url="/admin/users" />
      {/* <!-- Cards --> */}
      <div className={`grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4`}>
        {loadingUserInfo ? (
          <Skeleton variant="rect" width="100%" height={100} />
        ) : (
          <InfoCard title="Tổng doanh thu" value={`$ ${revenue}`}>
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
          <InfoCard title="Tổng số điểm" value={`${user.point}`}>
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
            <InfoCard title="Level" value={user.level}>
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
              <div>
                <div className=" text-sm font-medium">
                  Ngày đăng ký :{" "}
                  <span className="text-lg">
                    {new Date(createdTime).toLocaleDateString("vi")}
                  </span>
                </div>
                <div className=" text-sm font-medium">
                  Ngày hết hạn :{" "}
                  <span className="text-lg">
                    {expiredTime
                      ? new Date(expiredTime).toLocaleDateString("vi")
                      : ""}
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
            <h1 className="text-3xl text-primary-normal font-bold border-b border-gray-300 pb-3 dark:text-white">
              Mục tiêu tiếp theo : B{user.level <= 6 && user.level + 1}
            </h1>
          </header>
        )}

        <div className="w-1/2 mb-4">
          <div>
            <PageTitle>Tỷ lệ cấp dưới theo nhóm (%)</PageTitle>
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
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
          {loadingTotalPoint ? (
            <Skeleton variant="rect" width="100%" height={100} />
          ) : (
            <InfoCard title="Số điểm mục tiêu" value={`${targetNumber}`}>
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
              title="Số điểm đã đạt được"
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
            <InfoCard title="Số điểm cần cố gắng" value={`${tryTarget}`}>
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
            <InfoCard title="Gói Doanh Nghiệp A" value={totalBusinessPackage}>
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
            <InfoCard title="Gói Doanh Nghiệp B" value={totalBusinessPackageB}>
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
            <InfoCard title="Gói gia đình" value={totalStartupPackage}>
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
      </>

      <div className="flex items-center justify-between space-x-4 mb-6">
        {admin.role === "admin" && (
          <button
            onClick={onClickEdit}
            className="inline-block mx-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none disabled:opacity-50"
          >
            Thay đổi thông tin
          </button>
        )}
        {admin.role === "admin" && (
          <>
            {dayToExpired <= 7 && (
              <button
                onClick={handleRenewClick}
                className={`inline-block mx-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-orange-500 rounded-full shadow ripple hover:shadow-lg hover:bg-orange-600 focus:outline-none disabled:opacity-50`}
              >
                {submittingRenew ? (
                  <span className="text-white">Đang xử lí gia hạn</span>
                ) : (
                  "Gia Hạn Tài Khoản"
                )}
              </button>
            )}
          </>
        )}
        {admin.role !== "accountant2" && (
          <ExportUsersData id={id} user={user} />
        )}
      </div>
      {loading ? (
        <Skeleton variant="rect" width="100%" height="50px" count="8" />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Chủ đề</TableCell>
                <TableCell>Giá trị</TableCell>
                <TableCell></TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable.map((proper, i) =>
                proper.label === "cmndMT" || proper.label === "cmndMS" ? (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">{proper.label}</span>
                    </TableCell>
                    <TableCell colSpan={2}>
                      {proper.value ? (
                        <img
                          src={`${process.env.REACT_APP_API_URL}/uploads/cmnd/${proper.value}`}
                          width="50%"
                          alt="CMND"
                        />
                      ) : (
                        <div className="text-sm text-gray-400 text-left">
                          chưa cập nhật
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">{proper.label}</span>
                    </TableCell>
                    {proper.label === "Link giới thiệu nhóm 1" && (
                      <TableCell>
                        <input
                          className="text-sm w-full"
                          onChange={() => {}}
                          ref={textAreaRef1}
                          value={proper.value}
                        />
                      </TableCell>
                    )}
                    {proper.label === "Link giới thiệu nhóm 2" && (
                      <TableCell>
                        <input
                          className="text-sm w-full"
                          onChange={() => {}}
                          ref={textAreaRef2}
                          value={proper.value}
                        />
                      </TableCell>
                    )}
                    {proper.label === "Link giới thiệu nhóm 3" && (
                      <TableCell>
                        <input
                          className="text-sm w-full"
                          onChange={() => {}}
                          ref={textAreaRef3}
                          value={proper.value}
                        />
                      </TableCell>
                    )}
                    {proper.label === "Link giới thiệu" && (
                      <TableCell>
                        <input
                          className="text-sm w-full"
                          onChange={() => {}}
                          ref={textAreaRef1}
                          value={`${proper.value}/1`}
                        />
                      </TableCell>
                    )}
                    {proper.label !== "Link giới thiệu nhóm 1" &&
                      proper.label !== "Link giới thiệu" &&
                      proper.label !== "Link giới thiệu nhóm 2" &&
                      proper.label !== "Link giới thiệu nhóm 3" && (
                        <TableCell colSpan={2}>
                          <span className="text-sm">{proper.value}</span>
                        </TableCell>
                      )}
                    {proper.label === "Link giới thiệu" && (
                      <TableCell>
                        <Button
                          onClick={(e) => {
                            copyToClipboard1(e);
                          }}
                        >
                          Copy
                        </Button>
                      </TableCell>
                    )}
                    {proper.label === "Link giới thiệu nhóm 1" && (
                      <TableCell>
                        <Button
                          onClick={(e) => {
                            copyToClipboard1(e);
                          }}
                        >
                          Copy
                        </Button>
                      </TableCell>
                    )}
                    {proper.label === "Link giới thiệu nhóm 2" && (
                      <TableCell>
                        <Button
                          onClick={(e) => {
                            copyToClipboard2(e);
                          }}
                        >
                          Copy
                        </Button>
                      </TableCell>
                    )}
                    {proper.label === "Link giới thiệu nhóm 3" && (
                      <TableCell>
                        <Button
                          onClick={(e) => {
                            copyToClipboard3(e);
                          }}
                        >
                          Copy
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default UserProfile;
