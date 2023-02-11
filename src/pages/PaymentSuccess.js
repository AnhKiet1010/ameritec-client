import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import checkImg from "../assets/img/checkmark.svg";
import packageImg from "../assets/img/package.jpg";
import "../assets/css/Payment.css";
import { useTranslation } from "react-i18next";
import API from "../api/API";
import { toast } from "react-toastify";

const PaymentSuccess = ({ match }) => {
  const { trans_id } = match.params;
  const { t, i18n } = useTranslation();
  const [trans, setTrans] = useState({});
  const [price, setPrice] = useState("");
  const history = useHistory();

  useEffect(() => {
    document.title = "Ameritec || " + t("Thanh Toán Thành Công");
    let message = t("Đã xảy ra lỗi vui lòng thử lại sau");
    API.successWatched({ trans_id })
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          setTrans(res.data.data.trans);
          setPrice(
            i18n.language === "vi"
              ? res.data.data.trans.amount_vnd.toString()
              : res.data.data.trans.amount_usd.toString()
          );
        }
        if (status === 400) {
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, []);

  return (
    <div className="wrap">
      <div className="flex flex-col p-10 md:p-20">
        <div className="nine wide column">
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {t("Thanh Toán Thành Công")} {trans.payment_method}
          </h1>
          <div className="result__content">
            <span className="result__icon-wrapper result__item">
              <img src={checkImg} alt="" />
            </span>
            <h2 className="result__title result__item">
              {t("Cám ơn Bạn đã mua hàng")}!
            </h2>
            <div className="result__email-announcer result__item">
              {t("Email xác nhận đã được gửi đến")} <i>{trans.email}</i>
              {/* <div className="result__order-number result__item">
                {t('Mã số giao dịch')} : #{trans.orderId}
              </div> */}
            </div>
            <a className="ui primary button result__item mb-6" href="/login">
              {t("Trở về trang Login")}
            </a>
          </div>
        </div>
        <div className="seven wide column ">
          <div className="result__order-summary-wrapper">
            <h3 className="result__order-summary__title result__content--pd">
              {t("Thông tin đơn hàng")}
            </h3>
            <div className="result__order-item-wrapper result__content--pd">
              <span className="result__order-item__image">
                <img src={packageImg} alt="" />
              </span>
              {trans.buy_package === "1" && (
                <h4 className="result__order-item__name">{t("Gói Cá Nhân")}</h4>
              )}
              {trans.uy_package === "2" && (
                <h4 className="result__order-item__name">
                  {t("Gói Gia Đình")}
                </h4>
              )}
              {trans.buy_package === "3" && (
                <h4 className="result__order-item__name">
                  {t("Gói Doanh Nghiệp")} A
                </h4>
              )}
              {trans.buy_package === "4" && (
                <h4 className="result__order-item__name">
                  {t("Gói Doanh Nghiệp")} B
                </h4>
              )}
            </div>
            <div className="result__paying-info result__content--pd">
              <div className="result__paying-info-wrapper">
                <span className="result__paying-info__label">
                  {t("Tổng phụ")}
                </span>
                <span>
                  <span
                    className="result__paying-info__value"
                    data-allow-decimal-padding="false"
                  >
                    {price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </span>{" "}
                  {i18n.language === "vi" ? "VNĐ" : "USD"}
                </span>
              </div>
              <div className="result__paying-info-wrapper">
                <span className="result__paying-info__label">{t("Phí")}</span>
                <span className="result__paying-info__value">Free</span>
              </div>
              <div className="result__paying-info-wrapper">
                <span className="result__paying-info__label">{t("Thuế")}</span>
                <span
                  className="result__paying-info__value"
                  data-allow-decimal-padding="false"
                >
                  0 {i18n.language === "vi" ? "VNĐ" : "USD"}
                </span>
              </div>
              <div className="result__paying-info-wrapper">
                <span className="result__paying-info__label">
                  {t("Tổng cộng")}
                </span>
                <span>
                  <span
                    className="result__paying-info__value"
                    data-allow-decimal-padding="false"
                  >
                    {price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </span>{" "}
                  {i18n.language === "vi" ? "VNĐ" : "USD"}
                </span>
              </div>
            </div>
            <div className="result__paying-info-wrapper result__content--pd">
              <span className="result__paying-info__label">{t("Đã trả")}</span>
              <span className="main-color">
                <span
                  className="result__paying-info__value"
                  data-allow-decimal-padding="false"
                >
                  {price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                </span>{" "}
                {i18n.language === "vi" ? "VNĐ" : "USD"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
