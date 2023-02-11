import React, { useState, useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { toast } from "react-toastify";
import CLIENT from '../api/Client';
import { useTranslation } from "react-i18next";
import socket from '../helpers/socketConnect';

function Policy() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentTable, setCurrentTable] = useState('1');

  useEffect(() => {
    socket.on("AdminAddNoti", () => {
      setRefresh(!refresh);
    });

    return () => {
      socket.off("AdminAddNoti");
    }
  });

  useEffect(() => {
    document.title = "Ameritec || " + t("Quản lí tài liệu");
    CLIENT.getPolicyList({currentTable})
      .then((res) => {
        if (res.data.status !== 200) {
          setLoading(false);
          toast.error(res.data.message);
        } else {
          setData(res.data.data.listPolicy);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("err in receipt");
      });
  }, [refresh, currentTable]);

  const handleCurrentTableChange = (e) => {
    e.preventDefault();
    if (currentTable == '1') {
      setCurrentTable('2');
    }
    if (currentTable == '2') {
      setCurrentTable('1');
    }
  }

  return (
    <>
      <PageTitle>{t('Quản lí tài liệu')}</PageTitle>
      <div>
        <div className="flex justify-center items-center mb-4">
          <div onClick={handleCurrentTableChange} className={`border-blue-500 transition-all cursor-pointer ${currentTable === '1' && "border-b-2 font-bold"} uppercase px-4 py-2`}>{t('Chính Sách Công Ty')}</div>
          <div onClick={handleCurrentTableChange} className={`border-blue-500 transition-all cursor-pointer ${currentTable === '2' && "border-b-2 font-bold"} uppercase px-4 py-2`}>{t('Tài Liệu Học Tập')}</div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
          {data.length > 0 && data.map((policy, i) => (
            <a href={`/app/policy/${policy._id}`} key={i} className="relative bg-blue-100 w-full p-2 mx-auto border-blue-100 rounded-lg cursor-pointer hover:bg-blue-200">
              <div className={`absolute w-4 h-4 right-2 rounded-full bg-red-600 ${policy.is_read && 'hidden'}`}></div>
              <div className="text-gray-800 text-center p-4 w-full">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex flex-col items-start">
                    <h3 className="font-semibold text-lg text-left">
                      {i18n.language === "vi" && policy.title_vn}
                      {i18n.language === "en" && policy.title_en}
                    </h3>
                    <p className="text-sm italic mt-1">
                      {policy.category === '1' && t('Chính Sách Công Ty')}
                      {policy.category === '2' && t('Tài Liệu Học Tập')}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-semibold">{new Date(policy.ctime).toLocaleTimeString('vi').substring(0, new Date(policy.ctime).toLocaleTimeString('vi').length - 3)}</p>
                    <p className="text-sm italic">{new Date(policy.ctime).toLocaleDateString('vi')}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Policy;
