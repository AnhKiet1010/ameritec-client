import React, { useState, useEffect } from "react";
import ReactExport from "react-data-export";
import { OutlineLogoutIcon } from "../../icons";
import { PACKAGE } from "../../constants/package";
import ADMIN from "../../api/Admin";
import Spinner from "../Spinner";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function ExportUsersData({ id, user }) {
  const [loading, setLoading] = useState(true);
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    setLoading(true);
    ADMIN.getExportListChildData({ id })
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          console.log(res.data.message);
        } else {
          setExportData(res.data.data.listChildExport);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const DataSet = [
    {
      columns: [
        { title: "MÃ GIỚI THIỆU" },
        { title: "HỌ VÀ TÊN" },
        { title: "EMAIL" },
        { title: "SỐ ĐIỆN THOẠI" },
        { title: "NGÀY THÁNG NĂM SINH" },
        { title: "GIỚI TÍNH" },
        { title: "TRẠNG THÁI" },
        { title: "LEVEL" },
        { title: "ĐIỂM" },
        { title: "GÓI MUA" },
        { title: "NGÀY THAM GIA" },
        { title: "NGÀY HẾT HẠN" },
        { title: "NGƯỜI GIỚI THIỆU" },
        { title: "SỐ CMND" },
        { title: "NGÀY CẤP" },
        { title: "NƠI CẤP" },
        { title: "MÃ SỐ THUẾ" },
        { title: "SỐ TÀI KHOẢN" },
        { title: "NGÂN HÀNG" },
        { title: "TÊN TÀI KHOẢN" },
        { title: "SS# or TAX ID" },
        { title: "State" },
        { title: "Driver's License" },
        { title: "Froms of receiving commissions" },
        { title: "GHI CHÚ" },
      ],
      data: exportData.map((item) => {
        let gender = "N/A";
        if (item.gender && item.gender == 2) {
          gender = "Nam";
        }
        if (item.gender && item.gender == 3) {
          gender = "Nữ";
        }
        var year =
          item.created_time && item.created_time !== ""
            ? new Date(item.created_time).getFullYear() + 1
            : "";
        var month =
          item.created_time && item.created_time !== ""
            ? new Date(item.created_time).getMonth()
            : "";
        var date =
          item.created_time && item.created_time !== ""
            ? new Date(item.created_time).getDate()
            : "";
        let expiredDate = "";
        if (year !== "" && month !== "" && date !== "") {
          expiredDate = new Date(year, month, date);
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
          { value: item.expired ? "Đã hết hạn" : "Đang hoạt động" },
          { value: item.level },
          { value: item.point },
          { value: PACKAGE.find((b) => b.value === item.buy_package).label },
          {
            value:
              item.created_time && item.created_time !== ""
                ? new Date(item.created_time).toLocaleDateString("vi")
                : "",
          },
          {
            value:
              expiredDate !== "" ? expiredDate.toLocaleDateString("vi") : "",
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
          { value: item.ss ? item.ss : "" },
          { value: item.state ? item.state : "" },
          { value: item.drive_id ? item.drive_id : "" },
          { value: item.request_commission ? item.request_commission : "" },
          { value: item.note ? item.note : "" },
        ];
      }),
    },
  ];

  return (
    <ExcelFile
      filename={`${user.uname}-Child-Data`}
      element={
        <button
          disabled={loading}
          type="button"
          className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 h-full rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green "
        >
          {loading ? (
            <Spinner />
          ) : (
            <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          )}
          Xuất Data
        </button>
      }
    >
      <ExcelSheet dataSet={DataSet} name="User Data" />
    </ExcelFile>
  );
}

export default ExportUsersData;
