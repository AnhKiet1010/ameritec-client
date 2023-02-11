import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import PageTitle from "../components/Typography/PageTitle";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { toast } from "react-toastify";
import { PACKAGE } from '../constants/package';
import "../assets/css/receipts.css";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TableFooter,
  Pagination,
  Badge
} from "@windmill/react-ui";
import CLIENT from "../api/Client";
import { useTranslation } from "react-i18next";
import { current } from "immer";
import i18next from "i18next";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function Receipts() {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [listBonus, setListBonus] = useState([]);
  const [currentTable, setCurrentTable] = useState(1);

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // setup data for every table
  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = dataTable.length;

  // pagination change control
  function onPageChangeTable(p) {
    setPageTable(p);
  }

  useEffect(() => {
    document.title = "Ameritec || " + t("Lịch sử thanh toán");
    const id = JSON.parse(localStorage.getItem("user")).user.id;
    var message = "Đã xảy ra lỗi vui lòng thử lại sau";

    CLIENT.receipts(id)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          console.log(res.data.data);
          setTransaction(
            res.data.data.transaction[res.data.data.transaction.length - 1]
          );
          setTransactionList(
            res.data.data.transaction
          );
          setDataTable(res.data.data.commission);
          setListBonus(res.data.data.listBonus);
          setLoading(false);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(message);
      });
  }, [pageTable]);

  return (
    <>
      <PageTitle>{t('Lịch sử thanh toán')}</PageTitle>
      <div className="w-full grid grid-cols-2 xl:grid-cols-4 md:grid-cols-2 mb-4">
        <div onClick={() => setCurrentTable(1)} className={`border-blue-500 text-sm sm:text-md text-gray-400 text-center transition-all cursor-pointer ${currentTable === 1 && "border-b-2 text-gray-900"} font-bold uppercase px-4 py-2`}>{t('GÓI ĐĂNG KÝ')}</div>
        <div onClick={() => setCurrentTable(2)} className={`border-blue-500 text-sm sm:text-md text-gray-400 text-center transition-all cursor-pointer ${currentTable === 2 && "border-b-2 text-gray-900"} font-bold uppercase px-4 py-2`}>{t('LỊCH SỬ GIA HẠN')}</div>
        <div onClick={() => setCurrentTable(3)} className={`border-blue-500 text-sm sm:text-md text-gray-400 text-center transition-all cursor-pointer ${currentTable === 3 && "border-b-2 text-gray-900"} font-bold uppercase px-4 py-2`}>{t('NHẬN HOA HỒNG')}</div>
        <div onClick={() => setCurrentTable(4)} className={`border-blue-500 text-sm sm:text-md text-gray-400 text-center transition-all cursor-pointer ${currentTable === 4 && "border-b-2 text-gray-900"} font-bold uppercase px-4 py-2`}>{t('NHẬN THƯỞNG')}</div>
      </div>
      {loading ? (
        <div className="m-6">
          <Skeleton variant="rect" width="100%" height="100px" />
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          {
            currentTable === 1 &&
            <div className="w-full">
              {transaction ?
                <TableContainer className="">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>{t('Họ và tên')}</TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {transaction.user_name}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {transaction.email}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t('Gói mua')}</TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {i18next.language === 'vi' && PACKAGE.find(ele => ele.value === transaction.buy_package).label}
                            {i18next.language === 'en' && PACKAGE.find(ele => ele.value === transaction.buy_package).label_en}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t('Thời gian đăng ký')}</TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {new Date(
                              transaction.created_time
                            ).toLocaleDateString("vi")}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t('Số tiền')}</TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {
                              i18next.language === 'vi' &&
                              <>
                                {transaction.amount_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                <span className="ml-1">VNĐ</span>
                              </>
                            }
                            {
                              i18next.language === 'en' &&
                              <>
                                {transaction.amount_usd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                <span className="ml-1">USD</span>
                              </>
                            }
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t('Phương thức thanh toán')}</TableCell>

                        <TableCell>
                          <span className="text-sm">
                            {transaction.payment_method === "tienmat" &&
                              t("Tiền mặt")}
                            {transaction.payment_method === "nganluong" &&
                              "Ngân Lượng ATM"}
                            {transaction.payment_method === "nganluongvisa" &&
                              "Ngân Lượng VISA"}
                            {transaction.payment_method === "PAYPAL" &&
                              "PAYPAL"}
                            {transaction.payment_method === "Credit Card" &&
                            "Credit Card"}
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <TableFooter>
                    {transactionList.length === 0 && <div className="text-md text-gray-400 text-center">{t('Bạn chưa thực hiện giao dịch nào trên hệ thống này')}</div>}
                  </TableFooter>
                </TableContainer>
                : <div className="text-md text-gray-400 text-center">{t('Bạn chưa thực hiện giao dịch nào trên hệ thống này')}</div>
              }
            </div>
          }
          {
            currentTable === 2 &&
            <div className="w-full">
              <TableContainer className="">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell>{t('Họ và tên')}</TableCell>
                      <TableCell className="text-center">Email</TableCell>
                      <TableCell className="text-center">{t('Ngày lập hóa đơn')}</TableCell>
                      <TableCell className="text-center">{t('Thời gian gia hạn tiếp theo')}</TableCell>
                      <TableCell className="text-center">{t('Số tiền')}</TableCell>
                      <TableCell className="text-center">{t('Phương thức thanh toán')}</TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {
                      transactionList.length > 0 && transactionList.map(trans =>
                        <TableRow key={trans._id}>
                          <TableCell className="">
                            <span className="text-sm">{trans.user_name}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">{trans.email}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm text-center">
                              {new Date(
                                trans.created_time
                              ).toLocaleDateString("vi")}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">
                              {new Date(
                                trans.expired_time
                              ).toLocaleDateString("vi")}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">
                              {
                                i18next.language === 'vi' &&
                                <>
                                  {trans.amount_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                  <span className="ml-1">VNĐ</span>
                                </>
                              }
                              {
                                i18next.language === 'en' &&
                                <>
                                  {trans.amount_usd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                  <span className="ml-1">USD</span>
                                </>
                              }
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">
                              <span className="text-sm">
                                {trans.payment_method === "tienmat" &&
                                   t('Tiền mặt')}
                                {trans.payment_method === "nganluong" &&
                                  "Ngân Lượng ATM"}
                                {trans.payment_method === "nganluongvisa" &&
                                  "Ngân Lượng VISA"}
                                {trans.payment_method === "PAYPAL" &&
                                  "PAYPAL"}
                                {trans.payment_method === "Credit Card" &&
                                "Credit Card"}
                              </span>
                            </span>
                          </TableCell>
                        </TableRow>)
                    }
                  </TableBody>
                </Table>
                <TableFooter>
                  {
                    transactionList.length === 0 ?
                      <div className="text-md text-gray-400 text-center">{t('Bạn chưa thực hiện giao dịch nào trên hệ thống này')}</div> :
                      ""
                  }
                </TableFooter>
              </TableContainer>
            </div>
          }
          {
            currentTable === 3 &&
            <div className="w-full">
              <TableContainer className="">
                <Table>
                  <TableHeader className="">
                    <tr>
                      <TableCell>{t('Họ và tên')}</TableCell>
                      <TableCell className="text-center">{t('Tên gói')}</TableCell>
                      <TableCell className="text-center">{t('Số tiền')}</TableCell>
                      <TableCell className="text-center">{t('Phương thức nhận')}</TableCell>
                      <TableCell className="text-center">{t('Đăng ký mới/Gia hạn')}</TableCell>
                      <TableCell className="text-center">{t('Trạng thái')}</TableCell>
                    </tr>
                  </TableHeader>

                  <TableBody>
                    {
                      dataTable.length > 0 && dataTable.map(com =>
                        <TableRow key={com._id}>
                          <TableCell className="">
                            <span className="text-sm">{com.join_mem_name}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">
                              {i18next.language === 'vi' && PACKAGE.find(ele => ele.value === transaction.buy_package).label}
                              {i18next.language === 'en' && PACKAGE.find(ele => ele.value === transaction.buy_package).label_en}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">
                              {
                                i18next.language === 'vi' &&
                                <>
                                  {com.amount_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                  <span className="ml-1">VNĐ</span>
                                </>
                              }
                              {
                                i18next.language === 'en' &&
                                <>
                                  {com.amount_usd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                  <span className="ml-1">USD</span>
                                </>
                              }
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">
                              <span className="text-sm">
                                {com.payment_method === "thucong" &&
                                  "Tiền mặt"}
                                {com.payment_method === "nganluong" &&
                                  "Ngân Lượng"}
                              </span>
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">
                              {com.is_renew ? t("gia hạn") : t("đăng ký mới")}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            {com.status === "pending" && <Badge type="danger">{t('Chưa nhận')}</Badge>}
                            {com.status === "success" && <Badge type="success">{t('đã nhận')}</Badge>}
                          </TableCell>
                        </TableRow>)
                    }
                  </TableBody>
                </Table>
                <TableFooter>
                  {
                    dataTable.length === 0 &&
                    <div className="text-md text-gray-400 text-center">{t('Bạn chưa thực hiện giao dịch nào trên hệ thống này')}</div>
                  }
                </TableFooter>
              </TableContainer>
            </div>
          }
          {
            currentTable === 4 &&
            <div className="w-full">
              <TableContainer className="">
                <Table>
                  <TableHeader className="">
                    <tr>
                      <TableCell>{t('Ngày nhận')}</TableCell>
                      <TableCell className="text-center">{t('Level')}</TableCell>
                      <TableCell className="text-center">{t('Số tiền')} VNĐ</TableCell>
                      <TableCell className="text-center">{t('Số tiền')} USD</TableCell>
                      <TableCell className="text-center">{t('Số cổ phần')}</TableCell>
                      <TableCell className="text-center">{t('Phương thức nhận')}</TableCell>
                    </tr>
                  </TableHeader>

                  <TableBody>
                    {
                      listBonus.length > 0 && listBonus.map(bonus =>
                        <TableRow key={bonus._id}>
                          <TableCell className="">
                            <span className="text-sm">{new Date(bonus.created_time).toLocaleDateString('vi')}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">{bonus.level}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            {
                              bonus.amount_vnd &&
                              <span className="text-sm">
                                {bonus.amount_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                <span className="ml-1">VNĐ</span>
                              </span>
                            }
                          </TableCell>
                          <TableCell className="text-center">
                            {
                              bonus.amount_usd &&
                              <span className="text-sm">{bonus.amount_usd ? bonus.amount_usd + '$' : ''}</span>
                            }
                          </TableCell>
                          <TableCell className="text-center">
                            {
                              bonus.amount_share &&
                              <span className="text-sm">{bonus.amount_share} {t('Cổ Phần')}</span>
                            }
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">
                              {/* <span className="text-sm">
                                {bonus.payment_method === "tienmat" &&
                                  "Tiền mặt"}
                                {bonus.payment_method === "nganluong" &&
                                  "Ngân Lượng ATM"}
                                {bonus.payment_method === "nganluongvisa" &&
                                  "Ngân Lượng VISA"}
                              </span> */}
                              {t('chuyển khoản')}
                            </span>
                          </TableCell>
                        </TableRow>)
                    }
                  </TableBody>
                </Table>
                <TableFooter>
                  {
                    listBonus.length === 0 ?
                      <div className="text-md text-gray-400 text-center">{t('Bạn chưa nhận được thưởng trên hệ thống này')}</div>
                      : ""
                  }
                </TableFooter>
              </TableContainer>
            </div>
          }
        </div>
      )}
    </>
  );
}

export default Receipts;
