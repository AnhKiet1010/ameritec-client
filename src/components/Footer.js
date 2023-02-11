import React from "react";
// import '../assets/css/partials/footer.css';
import FACE from "../assets/img/facebook.png";
import YOU from "../assets/img/youtube.png";
import LOGO_NOTI from "../assets/img/logosalenoti.png";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <section className="footer mb-20">
      <div
        className={`grid grid-cols-1 ${
          i18n.language.includes("vi") ? "md:grid-cols-3" : "md:grid-cols-2"
        } gap-4`}
      >
        {i18n.language.includes("vi") && (
          <>
            <div className="">
              <div className="info">
                <div className="header-info">
                  <h3 className="font-semibold uppercase text-lg mb-6">
                    Văn phòng tại Hoa Kỳ
                  </h3>
                  <p className="text-md mb-1">
                    📍 Address: 9900 SPECTRUM DRIVE AUSTIN, TX 78717
                  </p>
                  <p className="text-md mb-1">📞 Tel: +1-844-446-9477</p>
                  <p className="text-md mb-1">📞 Tel: +1-844-I-Go-zIPS</p>
                  <p className="text-md mb-1">
                    📫 Email: support@ameritecjsc.com
                  </p>
                  <p className="text-md mb-1">
                    🌍 Website: https://ameritecps.com
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="header-info">
                <h3 className="font-semibold uppercase text-lg mb-6">
                  Văn Phòng Tại Việt Nam
                </h3>
                <p className="text-md mb-1">
                  📍 Địa chỉ: Tầng 25.02 Tòa nhà Viettel số 285 cách mạng tháng
                  8 , P.12, Q.10, TP. Hồ Chí Minh
                </p>
                <p className="text-md mb-1">
                  📞 Điện thoại: 028.2250.8166
                </p>
                <p className="text-md mb-1">
                  📫 Email: support@ameritecjsc.com
                </p>
                <p className="text-md mb-1">
                  🌍 Website: https://ameritecjsc.com
                </p>
              </div>
            </div>
          </>
        )}
        {!i18n.language.includes("vi") && (
          <div className="">
            <div className="info">
              <div className="header-info">
                <h3 className="font-semibold uppercase text-lg mb-6">
                  CONTACT US
                </h3>
                <p className="text-md mb-1">
                  📍 Address: 2505 S. Great Southwest Pkwy Grand Prairie, TX
                  75052
                </p>
                <p className="text-md mb-1">📞 Tel: +1-844-446-9477</p>
                <p className="text-md mb-1">📞 Tel: +1-844-I-Go-zIPS</p>
                <p className="text-md mb-1">
                  📫 Email: support@ameritecjsc.com
                </p>
                <p className="text-md mb-1">
                  🌍 Website: https://ameritecps.com
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="">
          {i18n.language.includes("vi") && (
            <h3 className="font-semibold uppercase text-lg mb-6">Liên Hệ</h3>
          )}
          <ul className="flex gap-6 mb-6">
            <li>
              <a href="https://www.facebook.com/ameritecjsc">
                <img src={FACE} alt="ima" width="50px" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCvxi8TE2txGco_yoU-yVKUw">
                <img src={YOU} alt="ima" width="50px" />
              </a>
            </li>
          </ul>
          {/* { i18n.language.includes('vi') &&
                    <a href="#">
                        <img src={LOGO_NOTI} alt width="200px" />
                    </a>} */}
        </div>
      </div>
      <div className="mt-5 text-center">
        {i18n.language.includes("vi") && (
          <span>
            ©&nbsp;Bản quyền thuộc về{" "}
            <a href="http://ameritecjsc.com">Ameritec</a>&nbsp;{" "}
          </span>
        )}
        {i18n.language.includes("en") && (
          <span>
            ©&nbsp;Copyright belong to{" "}
            <a href="http://ameritecjsc.com">Ameritec</a>&nbsp;{" "}
          </span>
        )}
      </div>
    </section>
  );
}

export default Footer;
