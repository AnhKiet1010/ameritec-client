import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";
import PageTitle from "../components/Typography/PageTitle";
import { toast } from "react-toastify";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
} from "@windmill/react-ui";
import CLIENT from "../api/Client";
import UpdateProfilePopup from '../components/UpdateProfilePopup';
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [userData, setUserData] = useState({});
  const [change, setChange] = useState(false);

  useEffect(() => {
    document.title = "Ameritec || " +  t("Thông tin cá nhân");
    const id = JSON.parse(localStorage.getItem("user")).user.id;
    let message = t('Có lỗi xảy ra! Vui lòng thử lại sau');
    CLIENT.profile(id)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          const { result, user } = res.data.data;
          setUserData(user);
          setDataTable([...result]);
          setLoading(false);

          setLoading(false);
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(message);
      });
  }, [change]);

  function onClickEdit() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <UpdateProfilePopup userData={userData} onClose={onClose} setChange={setChange} setUserData={setUserData} />
        );
      },
    });
  }

  return (
    <>
      <PageTitle>{t("Thông tin cá nhân")}</PageTitle>
      {loading ? (
        <div className="mb-6">
          <Skeleton variant="rect" width={300} height={40} />
        </div>
      ) : (
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onClickEdit}
            className="inline-block mx-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none disabled:opacity-50"
          >
            {t('Thay đổi thông tin')}
          </button>
        </div>
      )}
      {loading ? (
        <Skeleton variant="rect" width="100%" height="50px" count="8" />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t('Chủ đề')}</TableCell>
                <TableCell>{t('Giá trị')}</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable.map((proper, i) => (
                (proper.label === "cmndMT" || proper.label === "cmndMS") ?
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">{t(proper.label)}</span>
                    </TableCell>
                    <TableCell>
                      {
                        proper.value ? 
                        <img src={`${process.env.REACT_APP_API_URL}/uploads/cmnd/${proper.value}`} width="50%" alt="CMND" />
                        :<div className="text-sm text-gray-400 text-left">{t('chưa cập nhật')}</div>
                      }
                    </TableCell>
                  </TableRow>
                  :
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">{t(proper.label)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{t(proper.value)}</span>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default Profile;
