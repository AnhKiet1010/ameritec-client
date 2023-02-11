import React from "react";
import { Table } from "@windmill/react-ui";

function PayToCT() {
  return (
    <div>
      <p className="mb-3">
        Quý khách vui lòng chuyển khoản đến Công Ty Ameritec.Sau khi thanh toán
        thành công! đường dẫn kích hoạt sẽ được gởi đến Email mà bạn đã đăng ký.
      </p>
      <p><span className="font-bold">Chủ tài khoản</span> : Công Ty CP Ameritec</p>
      
      <p><span className="font-bold">Số tài khoản :</span> 836193821739</p>

      <p><span className="font-bold">Ngân hàng :</span> Vietinbank</p>
      
      <p><span className="font-bold">Chi nhánh :</span> Quận 3</p>
     
      {/* <tr class="bg-emerald-200">
            <td>
              A Long and Winding Tour of the History of UI Frameworks and Tools
              and the Impact on Design
            </td>
            <td>Adam</td>
            <td>112</td>
          </tr> */}
      {/* <tr>
            <td>Intro to JavaScript</td>
            <td>Chris</td>
            <td>1,280</td>
          </tr> */}
    </div>
  );
}

export default PayToCT;
