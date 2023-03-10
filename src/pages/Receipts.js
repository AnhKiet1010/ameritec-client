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
    document.title = "Ameritec || " + t("L???ch s??? thanh to??n");
    const id = JSON.parse(localStorage.getItem("user")).user.id;
    var message = "???? x???y ra l???i vui l??ng th??? l???i sau";

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
      <PageTitle>{t('L???ch s??? thanh to??n')}</PageTitle>
      <div className="w-full grid grid-cols-2 xl:grid-cols-4 md:grid-cols-2 mb-4">
        <div onClick={() => setCurrentTable(1)} className={`border-blue-500 text-sm sm:text-md text-gray-400 text-center transition-all cursor-pointer ${currentTable === 1 && "border-b-2 text-gray-900"} font-bold uppercase px-4 py-2`}>{t('G??I ????NG K??')}</div>
        <div onClick={() => setCurrentTable(2)} className={`border-blue-500 text-sm sm:text-md text-gray-400 text-center transition-all cursor-pointer ${currentTable === 2 && "border-b-2 text-gray-900"} font-bold uppercase px-4 py-2`}>{t('L???CH S??? GIA H???N')}</div>
        <div onClick={() => setCurrentTable(3)} className={`border-blue-500 text-sm sm:text-md text-gray-400 text-center transition-all cursor-pointer ${currentTable === 3 && "border-b-2 text-gray-900"} font-bold uppercase px-4 py-2`}>{t('NH???N HOA H???NG')}</div>
        <div onClick={() => setCurrentTable(4)} className={`border-blue-500 text-sm sm:text-md text-gray-400 text-center transition-all cursor-pointer ${currentTable === 4 && "border-b-2 text-gray-900"} font-bold uppercase px-4 py-2`}>{t('NH???N TH?????NG')}</div>
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
                        <TableCell>{t('H??? v?? t??n')}</TableCell>
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
                        <TableCell>{t('G??i mua')}</TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {i18next.language === 'vi' && PACKAGE.find(ele => ele.value === transaction.buy_package).label}
                            {i18next.language === 'en' && PACKAGE.find(ele => ele.value === transaction.buy_package).label_en}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t('Th???i gian ????ng k??')}</TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {new Date(
                              transaction.created_time
                            ).toLocaleDateString("vi")}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t('S??? ti???n')}</TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {
                              i18next.language === 'vi' &&
                              <>
                                {transaction.amount_vnd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                                <span className="ml-1">VN??</span>
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
                        <TableCell>{t('Ph????ng th???c thanh to??n')}</TableCell>

                        <TableCell>
                          <span className="text-sm">
                            {transaction.payment_method === "tienmat" &&
                              t("Ti???n m???t")}
                            {transaction.payment_method === "nganluong" &&
                              "Ng??n L?????ng ATM"}
                            {transaction.payment_method === "nganluongvisa" &&
                              "Ng??n L?????ng VISA"}
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
                    {transactionList.length === 0 && <div className="text-md text-gray-400 text-center">{t('B???n ch??a th???c hi???n giao d???ch n??o tr??n h??? th???ng n??y')}</div>}
                  </TableFooter>
                </TableContainer>
                : <div className="text-md text-gray-400 text-center">{t('B???n ch??a th???c hi???n giao d???ch n??o tr??n h??? th???ng n??y')}</div>
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
                      <TableCell>{t('H??? v?? t??n')}</TableCell>
                      <TableCell className="text-center">Email</TableCell>
                      <TableCell className="text-center">{t('Ng??y l???p h??a ????n')}</TableCell>
                      <TableCell className="text-center">{t('Th???i gian gia h???n ti???p theo')}</TableCell>
                      <TableCell className="text-center">{t('S??? ti???n')}</TableCell>
                      <TableCell className="text-center">{t('Ph????ng th???c thanh to??n')}</TableCell>
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
                                  <span className="ml-1">VN??</span>
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
                                   t('Ti???n m???t')}
                                {trans.payment_method === "nganluong" &&
                                  "Ng??n L?????ng ATM"}
                                {trans.payment_method === "nganluongvisa" &&
                                  "Ng??n L?????ng VISA"}
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
                      <div className="text-md text-gray-400 text-center">{t('B???n ch??a th???c hi???n giao d???ch n??o tr??n h??? th???ng n??y')}</div> :
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
                      <TableCell>{t('H??? v?? t??n')}</TableCell>
                      <TableCell className="text-center">{t('T??n g??i')}</TableCell>
                      <TableCell className="text-center">{t('S??? ti???n')}</TableCell>
                      <TableCell className="text-center">{t('Ph????ng th???c nh???n')}</TableCell>
                      <TableCell className="text-center">{t('????ng k?? m???i/Gia h???n')}</TableCell>
                      <TableCell className="text-center">{t('Tr???ng th??i')}</TableCell>
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
                                  <span className="ml-1">VN??</span>
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
                                  "Ti???n m???t"}
                                {com.payment_method === "nganluong" &&
                                  "Ng??n L?????ng"}
                              </span>
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">
                              {com.is_renew ? t("gia h???n") : t("????ng k?? m???i")}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            {com.status === "pending" && <Badge type="danger">{t('Ch??a nh???n')}</Badge>}
                            {com.status === "success" && <Badge type="success">{t('???? nh???n')}</Badge>}
                          </TableCell>
                        </TableRow>)
                    }
                  </TableBody>
                </Table>
                <TableFooter>
                  {
                    dataTable.length === 0 &&
                    <div className="text-md text-gray-400 text-center">{t('B???n ch??a th???c hi???n giao d???ch n??o tr??n h??? th???ng n??y')}</div>
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
                      <TableCell>{t('Ng??y nh???n')}</TableCell>
                      <TableCell className="text-center">{t('Level')}</TableCell>
                      <TableCell className="text-center">{t('S??? ti???n')} VN??</TableCell>
                      <TableCell className="text-center">{t('S??? ti???n')} USD</TableCell>
                      <TableCell className="text-center">{t('S??? c??? ph???n')}</TableCell>
                      <TableCell className="text-center">{t('Ph????ng th???c nh???n')}</TableCell>
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
                                <span className="ml-1">VN??</span>
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
                              <span className="text-sm">{bonus.amount_share} {t('C??? Ph???n')}</span>
                            }
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm">
                              {/* <span className="text-sm">
                                {bonus.payment_method === "tienmat" &&
                                  "Ti???n m???t"}
                                {bonus.payment_method === "nganluong" &&
                                  "Ng??n L?????ng ATM"}
                                {bonus.payment_method === "nganluongvisa" &&
                                  "Ng??n L?????ng VISA"}
                              </span> */}
                              {t('chuy???n kho???n')}
                            </span>
                          </TableCell>
                        </TableRow>)
                    }
                  </TableBody>
                </Table>
                <TableFooter>
                  {
                    listBonus.length === 0 ?
                      <div className="text-md text-gray-400 text-center">{t('B???n ch??a nh???n ???????c th?????ng tr??n h??? th???ng n??y')}</div>
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
