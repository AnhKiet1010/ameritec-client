import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/partials/header.css";
import "../assets/css/partials/banner-slide.css";
import "../assets/css/partials/footer.css";
import "../assets/css/main.css";

import LOGO from "../assets/img/logo-ameritec.png";
import LOGO_PNG from "../assets/img/logo.png";
// import SHIELD from '../assets/img/shield-mb.png';
import SHIELD from "../assets/img/phone-ka.png";
import LOGO_ZIPS from "../assets/img/logo-zIPS.png";
import ZIM_LOGO from "../assets/img/zimperium-logo.png";
import LOGO_GOOGLE from "../assets/img/logo-google.png";
import LOGO_MICRO from "../assets/img/microsoft-logo.png";
import LOGO_ORACLE from "../assets/img/oracle.png";
import LOGO_SAMSUNG from "../assets/img/samsung.png";
import LOGO_MCAFEE from "../assets/img/mcafee.png";
import LOGO_SIRA from "../assets/img/SierraVentures_Logo.png";
import LOGO_SOFTBANK from "../assets/img/softbank.png";
import LOGO_TMOBILE from "../assets/img/tmobile.png";
import LOGO_TVENTURES from "../assets/img/tventures.png";
import LOGO_WAR from "../assets/img/Warburg-Pincus.png";
import LOGO_BLACK from "../assets/img/blackberry.png";
import LOGO_MOBILE from "../assets/img/mobileiron.png";
import FACE from "../assets/img/facebook.png";
import YOU from "../assets/img/youtube.png";
import LOGO_NOTI from "../assets/img/logosalenoti.png";
import IPHONE from "../assets/img/iphone.png";
import personPackage from "../assets/img/personPackage.png";
import startupPackage from "../assets/img/startupPackage.png";
import bussinessPackage from "../assets/img/bussinessPackage.png";
import USER_LOGO from "../assets/img/unnamed.png";
import COMMA_ICON from "../assets/img/comma-icon.svg";
import ICON_SHIELD from "../assets/img/icon-shield.png";
import APP_STORE from "../assets/img/app-store.png";
import PLAY_STORE from "../assets/img/play-store.png";

function Home() {
  return (
    <div>
      <div className="wrap-container">
        <header>
          <div className="menu">
            <div className="wrap-menu">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand flex items-center" href="/">
                  <img src={LOGO} alt="logo-ameritec" width="50px" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown animate__animated animate__fadeIn delay-1">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/maintain"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                      >
                        Giới Thiệu
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <a className="dropdown-item" href="#">
                          Giới Thiệu Về Công Ty CP Ameritec
                        </a>
                      </div>
                    </li>
                    <li className="nav-item dropdown animate__animated animate__fadeIn delay-2">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/maintain"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                      >
                        Giải Pháp
                      </a>
                      {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item" href="#">Bảo Mật Di Động Doanh Nghiệp</a>
                                                <a className="dropdown-item" href="#">Nghiên Cứu Mối Đe Dọa Trên Di Động</a>
                                                <a className="dropdown-item" href="#">Qui Định Tuân Thủ Cho Thiết Bị Di Động</a>
                                            </div> */}
                    </li>
                    <li className="nav-item dropdown animate__animated animate__fadeIn delay-3">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/maintain"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                      >
                        Đối Tác
                      </a>
                      {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item" href="#">Ứng Dụng Bảo Mật Thiết Bị Di Dộng - AIPS</a>
                                                <a className="dropdown-item" href="#">Bộ Bảo Vệ Ứng Dụng Di Động - MAPS</a>
                                                <a className="dropdown-item" href="#">Phân Tích Ứng Dụng Nâng Cao Z3A</a>
                                            </div> */}
                    </li>
                    {/* <li className="nav-item">
                                            <a className="nav-link" href="#">Đối Tác</a>
                                        </li> */}
                    <li className="nav-item animate__animated animate__fadeIn delay-4">
                      <a className="nav-link" href="/maintain">
                        Giải Pháp
                      </a>
                    </li>
                    <li className="nav-item animate__animated animate__fadeIn delay-5">
                      <a className="nav-link" href="/maintain">
                        Tài Liệu
                      </a>
                    </li>
                  </ul>
                  <div className="btn-menu my-2 my-lg-0 animate__animated animate__fadeIn delay-6">
                    <a href="/login" className="btn btn-login">
                      Đăng Nhập
                    </a>
                    {/* <a
                      href="/referral/AMERITECAIPS1109/0"
                      className="ml-2 btn btn-login bg-red-500"
                    >
                      Đăng Ký
                    </a> */}
                  </div>
                </div>
              </nav>
              <div className="top" />
            </div>
          </div>
        </header>
        {/* SLIDER */}
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="home-banner-text">
                <h3 className="home-banner-title animate__animated animate__fadeIn delay-4">
                  ỨNG DỤNG BẢO MẬT DI ĐỘNG
                  <br />
                  HÀNG ĐẦU
                </h3>
                <span className="d-block animate__animated animate__fadeIn delay-5">
                  Ứng dụng ngăn chặn tin tặc xâm nhập thiết bị di động đầu tiên
                  trên thế giới giải pháp bảo vệ toàn diện cho các thiết bị IOS
                  &amp; Android
                </span>
                <a
                  href="/login"
                  className="btn btn-register animate__animated animate__fadeIn animate__infinite delay-6"
                >
                  MUA GÓI BẢO MẬT
                </a>
              </div>
            </div>
          </div>
          {/* <div className="swiper-pagination" />
                    <div className="swiper-button-prev" />
                    <div className="swiper-button-next" />
                    <div className="swiper-scrollbar" /> */}
        </div>
        {/* END SLIDER */}
      </div>
      {/* CONTENT */}
      <div className="content">
        <div className="sud">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 1920 181.1"
            style={{ enableBackground: "new 0 0 1920 181.1" }}
            xmlSpace="preserve"
          >
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html:
                  "\n                            .st1 {\n                                fill - rule: evenodd;\n                            clip-rule: evenodd;\n                            fill: #fff;\n            }\n                        ",
              }}
            />
            <g>
              <path
                className="st1"
                d="M0,80c0,0,28.9-4.2,43-13c14.3-9,71-35.7,137,5c17.3,7.7,33.3,13,48,11c17.3,0.3,50.3,4.7,66,23
               c20.3,9.7,68,40.3,134-12c24-11,59-16.3,104,2c21,7.3,85,27.7,117-14c24-30.7,62.7-55,141-12c26,10.3,72,14.7,110-14
               c37.7-19,89.7-29,122,53c23,32.7,47.7,66.3,97,26c24-22.7,51-78.3,137-38c0,0,28.3,15.7,52,15c23.7-0.7,50.7,4.3,76,41
               c19.7,19.7,71,36.7,121-2c0,0,22.3-16,55-12c0,0,32.7,6.7,56-71c23.3-76,79-92,122-29c9.3,13.7,25,42,62,43c37,1,51.7,25.3,67,48
               c15.3,22.7,51,22.7,53,23v28.1H0V80z"
              />
            </g>
          </svg>
        </div>
        <section className="strength">
          <div className="section-heading2">
            <div>ỨNG DỤNG</div>
            <img
              src={LOGO_PNG}
              alt
              width="190px"
              style={{ marginTop: "-20px" }}
            />
          </div>
          <div className="container-xl">
            <div className="strength-top row lg:mb-10">
              <div className="col-md-6 shield bg-blue-900 flex justify-center items-center rounded-lg">
                <img src={SHIELD} alt width="100%" />
              </div>
              <div className="col-md-6 description">
                <div className="desc-text">
                  <h2 className="under-banner-title">
                    ỨNG DỤNG BẢO MẬT TỐT NHẤT CHO ĐIỆN THOẠI
                  </h2>
                  <div className="under-banner-text">
                    <p>
                      Ứng dụng ngăn chặn tin tác xâm nhập thiết bị di động đầu
                      tiên trên thế giới, giải pháp bảo vệ toàn diện cho các
                      thiết bị Android & IOS
                    </p>
                  </div>
                  <a
                    href="/login"
                    className="btn btn-register animate__animated animate__headShake animate__infinite lg-center"
                  >
                    {" "}
                    MUA GÓI BẢO MẬT{" "}
                  </a>
                </div>
                <iframe
                  style={{ borderRadius: 20, marginTop: 40 }}
                  className="iframe-lg"
                  width="100%"
                  height="350px"
                  src="https://www.youtube.com/embed/JhGCnn5qkdI"
                  frameBorder={0}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                >
                  {" "}
                </iframe>
              </div>
            </div>
          </div>
          <div className="strength-items">
            <div className="section-heading3" style={{ marginTop: 0 }}>
              <h3 style={{ color: "#fff" }}>TÍNH NĂNG 💪</h3>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-xs-12 strength-item">
                <div className="strength-item">
                  <div className="content">
                    <div className="strength-item-content">
                      <p>
                        Quét liên tục theo thời gian thực (phần cài đặt trên
                        thiết bị, các phần mềm, ứng dụng, mạng wifi).
                      </p>
                    </div>
                  </div>
                  <div className="icon-strength-item">
                    <img src={LOGO_ZIPS} alt width="100%" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-xs-12 strength-item">
                <div className="strength-item">
                  <div className="content">
                    <div className="strength-item-content">
                      <p>Phát hiện 100% những mối đe dọa tấn công.</p>
                    </div>
                  </div>
                  <div className="icon-strength-item">
                    <img src={LOGO_ZIPS} alt width="100%" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 strength-item">
                <div className="strength-item">
                  <div className="content">
                    <div className="strength-item-content">
                      <p>
                        Giúp người dùng kịp thời ngăn chặn sự tấn công, xâm nhập
                        của tin tặc.
                      </p>
                    </div>
                  </div>
                  <div className="icon-strength-item">
                    <img src={LOGO_ZIPS} alt width="100%" />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 strength-item">
                <div className="strength-item">
                  <div className="content">
                    <div className="strength-item-content">
                      <p>
                        Lưu lại lịch sử các mối đe dọa tấn công (ngày, giờ,
                        thông tin chi tiết, địa điểm bị tấn công…).
                      </p>
                    </div>
                  </div>
                  <div className="icon-strength-item">
                    <img src={LOGO_ZIPS} alt width="100%" />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 strength-item">
                <div className="strength-item">
                  <div className="content">
                    <div className="strength-item-content">
                      <p>
                        Đưa ra cảnh bảo kèm theo hướng dẫn xử lý đối với từng
                        trường hợp cụ thể.
                      </p>
                    </div>
                  </div>
                  <div className="icon-strength-item">
                    <img src={LOGO_ZIPS} alt width="100%" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-xs-12 strength-item">
                <div className="strength-item">
                  <div className="content">
                    <div className="strength-item-content">
                      <p>
                        Khu vực nguy hiểm (Danger Zone): Bản đồ những điểm truy
                        cập wifi đã từng bị tấn công trong 30 ngày gần nhất.
                      </p>
                    </div>
                  </div>
                  <div className="icon-strength-item">
                    <img src={LOGO_ZIPS} alt width="100%" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-xs-12 strength-item">
                <div className="strength-item">
                  <div className="content">
                    <div className="strength-item-content">
                      <p>
                        Tính năng phân tích website: cho phép kiểm tra một đường
                        dẫn website có an toàn hay không trước khi người dùng
                        bấm vào truy cập.
                      </p>
                    </div>
                  </div>
                  <div className="icon-strength-item">
                    <img src={LOGO_ZIPS} alt width="100%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-xl">
            {/* <div className="develop-by"> */}
            <div className="section-heading3">
              <h3>
                ỨNG DỤNG ĐƯỢC PHÁT TRIỂN BỞI{" "}
                <img
                  src={ZIM_LOGO}
                  alt="ZIMPERIUM"
                  width="300px"
                  style={{ margin: "30px auto" }}
                />
              </h3>
              <p>ĐỐI TÁC CỦA ZIMPERIUM</p>
              <div className="container">
                <div className="partner-list">
                  <div className="partner-logo">
                    <img src={LOGO_GOOGLE} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_MICRO} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_ORACLE} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_SAMSUNG} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_MCAFEE} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_SIRA} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_SOFTBANK} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_TMOBILE} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_TVENTURES} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_WAR} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_BLACK} alt="partner-logo" />
                  </div>
                  <div className="partner-logo">
                    <img src={LOGO_MOBILE} alt="partner-logo" />
                  </div>
                </div>
              </div>
            </div>
            <div className="packages">
              <div className="section-heading3">
                <h3>CÁC GÓI BẢO MẬT</h3>
                <p className="max-w-40">
                  Nền tảng của chúng tôi bảo vệ doanh nghiệp của bạn bằng cách
                  cung cấp một lớp bảo mật di động hoàn chỉnh
                </p>
              </div>
              <div className="package-item-contain">
                <div className="package-item-item">
                  <div className="image-contain">
                    <img
                      src={personPackage}
                      className="private-package"
                      alt="GÓI CÁ NHÂN"
                    />
                  </div>
                  <div className="package-item-price-detail">
                    <h5 className="pack-title">GÓI CÁ NHÂN</h5>
                    <p className="old-price">(1 THIẾT BỊ)</p>
                    <p className="sell-price">$40 USD</p>
                    <a
                      href="/login"
                      className="btn btn-register"
                      style={{ margin: "auto" }}
                    >
                      Mua ngay
                    </a>
                  </div>
                </div>
                <div className="package-item-item">
                  <div className="image-contain">
                    <img
                      src={startupPackage}
                      className="4-package"
                      alt="GÓI GIA ĐÌNH"
                    />
                  </div>
                  <div className="package-item-price-detail">
                    <h5 className="pack-title">GÓI GIA ĐÌNH</h5>
                    <p className="old-price">(4 GIẤY PHÉP, 4 THIẾT BỊ)</p>
                    <p className="sell-price">$160 USD</p>
                    <a
                      href="/login"
                      className="btn btn-register"
                      style={{ margin: "auto" }}
                    >
                      Mua ngay
                    </a>
                  </div>
                </div>
                <div className="package-item-item">
                  <div className="image-contain">
                    <img
                      src={bussinessPackage}
                      className="4-package"
                      alt="GÓI DOANH NGHIỆP"
                    />
                  </div>
                  <div className="package-item-price-detail">
                    <h5 className="pack-title">GÓI DOANH NGHIỆP</h5>
                    <p className="old-price">(40 GIẤY PHÉP, 40 THIẾT BỊ)</p>
                    <p className="sell-price">$1600 USD</p>
                    <a
                      href="/login"
                      className="btn btn-register"
                      style={{ margin: "auto" }}
                    >
                      Mua ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-xl">
            <div className="get-app">
              <div className="media">
                <div className="media-left">
                  <img
                    className="media-object"
                    src={ICON_SHIELD}
                    alt="AMERITEC"
                  />
                </div>
                <div className="media-body">
                  <h2 className="sc-title">DOWNLOAD APP</h2>
                  <h3 className="sc-sub-title">
                    TRẢI NGHIỆM AIPS - ỨNG DỤNG BẢO VỆ ĐIỆN THOẠI TỐT NHẤT
                  </h3>
                </div>
              </div>
              <div className="link-to-store">
                <div className="img-hover-zoom">
                  <a href="https://apps.apple.com/vn/app/ameritec-aips/id1503362012">
                    <img className="sc-image" src={APP_STORE} alt="AMERITEC" />
                  </a>
                </div>
                <div className="img-hover-zoom">
                  <a href="https://play.google.com/store/apps/details?id=com.ameritecjsc.zips">
                    <img className="sc-image" src={PLAY_STORE} alt="AMERITEC" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="sud1">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 1920 181.1"
          style={{ enableBackground: "new 0 0 1920 181.1" }}
          xmlSpace="preserve"
        >
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html:
                "\n                        .st2 {\n                            fill - rule: evenodd;\n                        clip-rule: evenodd;\n                        fill: #0f0d2a;\n            }\n                    ",
            }}
          />
          <g>
            <path
              className="st2"
              d="M0,80c0,0,28.9-4.2,43-13c14.3-9,71-35.7,137,5c17.3,7.7,33.3,13,48,11c17.3,0.3,50.3,4.7,66,23
                c20.3,9.7,68,40.3,134-12c24-11,59-16.3,104,2c21,7.3,85,27.7,117-14c24-30.7,62.7-55,141-12c26,10.3,72,14.7,110-14
                c37.7-19,89.7-29,122,53c23,32.7,47.7,66.3,97,26c24-22.7,51-78.3,137-38c0,0,28.3,15.7,52,15c23.7-0.7,50.7,4.3,76,41
                c19.7,19.7,71,36.7,121-2c0,0,22.3-16,55-12c0,0,32.7,6.7,56-71c23.3-76,79-92,122-29c9.3,13.7,25,42,62,43c37,1,51.7,25.3,67,48
                c15.3,22.7,51,22.7,53,23v28.1H0V80z"
            />
          </g>
        </svg>
      </div>
      <section className="customer-talk">
        <div className="section-heading3">
          <h3 style={{ color: "#fff" }}>KHÁCH HÀNG NÓI VỀ CHÚNG TÔI 💌</h3>
          <p style={{ color: "#fff" }}>
            LỰA CHỌN BẢO MẬT TỐT NHẤT CHO ANDROID VÀ IOS
          </p>
        </div>
        <div className="customer-talk-slider mb-4">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="elsa-feeling-review-item">
                  <div className="review-item-header">
                    <img src={COMMA_ICON} className="comma-icon" />
                    <h5>Công nghệ tuyệt vời</h5>
                  </div>
                  <p className="review-item-text">
                    Mobile phishing protection must go beyond email, email is
                    the primary attack vector for phishing on traditional
                    endpoints. Since 80% of emails are read on mobile devices
                    and most mobile users do not always use on VPN for all
                    traffic, this vector is still very dangerous on mobile
                    devices. But mobile also brings a number of new attack
                    vectors existing solutions are powerless to prevent, e.g.,
                    personal email, SMS, messaging apps and even malicious apps
                    that masquerade as legitimate apps.
                  </p>
                  <div className="author-review">
                    <img
                      src={USER_LOGO}
                      className="author-img"
                      alt="author-img"
                    />
                    <div className="info-author">
                      <p className="author-name">JIMMY TORRES</p>
                      <p className="author-work-position">Google Play Store</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="elsa-feeling-review-item">
                  <div className="review-item-header">
                    <img src={COMMA_ICON} className="comma-icon" />
                    <h5>Công nghệ tuyệt vời</h5>
                  </div>
                  <p className="review-item-text">
                    Mobile phishing protection must go beyond email, email is
                    the primary attack vector for phishing on traditional
                    endpoints. Since 80% of emails are read on mobile devices
                    and most mobile users do not always use on VPN for all
                    traffic, this vector is still very dangerous on mobile
                    devices. But mobile also brings a number of new attack
                    vectors existing solutions are powerless to prevent, e.g.,
                    personal email, SMS, messaging apps and even malicious apps
                    that masquerade as legitimate apps.
                  </p>
                  <div className="author-review">
                    <img
                      src={USER_LOGO}
                      className="author-img"
                      alt="author-img"
                    />
                    <div className="info-author">
                      <p className="author-name">ROBERT JOYCE</p>
                      <p className="author-work-position">Google Play Store</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="elsa-feeling-review-item">
                  <div className="review-item-header">
                    <img src={COMMA_ICON} className="comma-icon" />
                    <h5>Công nghệ tuyệt vời</h5>
                  </div>
                  <p className="review-item-text">
                    Mobile phishing protection must go beyond email, email is
                    the primary attack vector for phishing on traditional
                    endpoints. Since 80% of emails are read on mobile devices
                    and most mobile users do not always use on VPN for all
                    traffic, this vector is still very dangerous on mobile
                    devices. But mobile also brings a number of new attack
                    vectors existing solutions are powerless to prevent, e.g.,
                    personal email, SMS, messaging apps and even malicious apps
                    that masquerade as legitimate apps.
                  </p>
                  <div className="author-review">
                    <img
                      src={USER_LOGO}
                      className="author-img"
                      alt="author-img"
                    />
                    <div className="info-author">
                      <p className="author-name">DAN GILMAN</p>
                      <p className="author-work-position">Google Play Store</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="section-heading3 lg-none">
          <h3 style={{ color: "#fff" }}>VIDEOS 🎦</h3>
          <p style={{ color: "#fff" }}>
            Ameritec AIPS - Ứng dụng bảo mật điện thoại di động hàng đầu tại
            Việt Nam
          </p>
        </div>
        <div
          id="carouselExampleControls2"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div className="carousel-inner carousel-inner-video">
            <img src={IPHONE} alt width="570px" className="mobile-mockup" />
            <div className="carousel-item active carousel-video">
              <div className="video">
                <iframe
                  src="https://www.youtube.com/embed/JhGCnn5qkdI"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="carousel-item carousel-video">
              <div className="video">
                <iframe
                  src="https://www.youtube.com/embed/WKDp26gBWx4"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="carousel-item carousel-video">
              <div className="video">
                <iframe
                  src="https://www.youtube.com/embed/k4qSUe-wlYk"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls2"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls2"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>
      {/* <div className="sud">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1920 181.1" style={{ enableBackground: 'new 0 0 1920 181.1' }} xmlSpace="preserve">
                    <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                        .st1 {\n                            fill - rule: evenodd;\n                        clip-rule: evenodd;\n                        fill: #fff;\n            }\n                    " }} />
                    <g>
                        <path className="st1" d="M0,80c0,0,28.9-4.2,43-13c14.3-9,71-35.7,137,5c17.3,7.7,33.3,13,48,11c17.3,0.3,50.3,4.7,66,23
              c20.3,9.7,68,40.3,134-12c24-11,59-16.3,104,2c21,7.3,85,27.7,117-14c24-30.7,62.7-55,141-12c26,10.3,72,14.7,110-14
              c37.7-19,89.7-29,122,53c23,32.7,47.7,66.3,97,26c24-22.7,51-78.3,137-38c0,0,28.3,15.7,52,15c23.7-0.7,50.7,4.3,76,41
              c19.7,19.7,71,36.7,121-2c0,0,22.3-16,55-12c0,0,32.7,6.7,56-71c23.3-76,79-92,122-29c9.3,13.7,25,42,62,43c37,1,51.7,25.3,67,48
              c15.3,22.7,51,22.7,53,23v28.1H0V80z" />
                    </g>
                </svg>
            </div> */}
      {/* <section className="news">
                <div className="section-heading2">
                    <h2>Tin tức &amp; Ưu đãi 🎉</h2>
                </div>
                <div className="news-list">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="new">
                                    <div className="header-img">
                                        <img src="https://vn.elsaspeak.com/wp-content/uploads/2020/10/Son-Tung-M-TP-su-dung-ELSA-Speak-350x250.jpg" alt />
                                    </div>
                                    <div className="desc-text">
                                        <h3 className="title">
                                            CÁCH CÀI ỨNG DỤNG BẢO MẬT ĐIỆN THOẠI AMERITEC AIPS</h3>
                                        <p className="para">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem distinctio aliquam repellat veniam temporibus perferendis?...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="new">
                                    <div className="header-img">
                                        <img src="https://vn.elsaspeak.com/wp-content/uploads/2020/10/Son-Tung-M-TP-su-dung-ELSA-Speak-350x250.jpg" alt />
                                    </div>
                                    <div className="desc-text">
                                        <h3 className="title">
                                            CÁCH CÀI ỨNG DỤNG BẢO MẬT ĐIỆN THOẠI AMERITEC AIPS</h3>
                                        <p className="para">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem distinctio aliquam repellat veniam temporibus perferendis?...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="new">
                                    <div className="header-img">
                                        <img src="https://vn.elsaspeak.com/wp-content/uploads/2020/10/Son-Tung-M-TP-su-dung-ELSA-Speak-350x250.jpg" alt />
                                    </div>
                                    <div className="desc-text">
                                        <h3 className="title">
                                            CÁCH CÀI ỨNG DỤNG BẢO MẬT ĐIỆN THOẠI AMERITEC AIPS</h3>
                                        <p className="para">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem distinctio aliquam repellat veniam temporibus perferendis?...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="btn btn-primary btn-lg" className="ml-3">Xem Thêm</a>
                    </div>
                </div>
            </section> */}
      {/* <div className="sud1 hidden">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1920 181.1" style={{ enableBackground: 'new 0 0 1920 181.1' }} xmlSpace="preserve">
                    <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                        .st2 {\n                            fill - rule: evenodd;\n                        clip-rule: evenodd;\n                        fill: #0f0d2a;\n            }\n                    " }} />
                    <g>
                        <path className="st2" d="M0,80c0,0,28.9-4.2,43-13c14.3-9,71-35.7,137,5c17.3,7.7,33.3,13,48,11c17.3,0.3,50.3,4.7,66,23
                c20.3,9.7,68,40.3,134-12c24-11,59-16.3,104,2c21,7.3,85,27.7,117-14c24-30.7,62.7-55,141-12c26,10.3,72,14.7,110-14
                c37.7-19,89.7-29,122,53c23,32.7,47.7,66.3,97,26c24-22.7,51-78.3,137-38c0,0,28.3,15.7,52,15c23.7-0.7,50.7,4.3,76,41
                c19.7,19.7,71,36.7,121-2c0,0,22.3-16,55-12c0,0,32.7,6.7,56-71c23.3-76,79-92,122-29c9.3,13.7,25,42,62,43c37,1,51.7,25.3,67,48
                c15.3,22.7,51,22.7,53,23v28.1H0V80z" />
                    </g>
                </svg>
            </div> */}
      {/* END CONTENT */}

      {/* FOOTER */}
      <section className="footer">
        <div className="wrap-footer">
          <div className="container-xl">
            <div className="top-footer">
              <img src={LOGO} alt width="200px" />
              <form action className="info-form">
                <label htmlFor>
                  🎉 Nhận tin tức mới nhất về An ninh mạng vào hộp thư của bạn
                </label>
                <div>
                  <input type="email" placeholder="Nhập Email Của Bạn" />
                  <button type="submit" className="ml-4">
                    Gửi
                  </button>
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-6 col-12 info-item">
                <div className="info">
                  <div className="header-info">
                    <h3>Corporate Office</h3>
                    <p>
                      📍 Address: 2505 S. Great Southwest Pkwy Grand Prairie, TX
                      75052
                    </p>
                    <p>📞 Tel: +1-844-446-9477</p>
                    <p>📞 Tel: +1-844-I-Go-zIPS</p>
                    <p>📫 Email: support@ameritecps.com</p>
                    <p>🌍 Website: https://ameritecps.com</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 info-item">
                <div className="header-info">
                  <h3>Văn Phòng Tại Việt Nam</h3>
                  <p>
                    📍 Địa chỉ: Tầng 25.02 Tòa nhà Viettel số 285 cách mạng
                    tháng 8 , P.12, Q.10, TP. Hồ Chí Minh
                  </p>
                  <p>📞 Điện thoại di động: 028.2250.8166</p>
                  <p>📫 Email: support@ameritecjsc.com</p>
                  <p>🌍 Website: https://ameritec.us</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 info-item">
                <div className="header-info">
                  <h3>Hỗ Trợ Khách Hàng</h3>
                  <p>
                    <a href="#">Trung Tâm Hỗ Trợ Khách Hàng</a>
                  </p>
                  <p>
                    <a href="#">Chính Sách Bảo Mật Thông Tin</a>
                  </p>
                  <p>
                    <a href="#">Chính Sách Bảo Hành</a>
                  </p>
                  <p>
                    <a href="#">Chính Sách Thanh Toán</a>
                  </p>
                  <p>
                    <a href="#">Chính Sách Đổi Trả</a>
                  </p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 info-item">
                <div className="header-info">
                  <h3>Liên Hệ</h3>
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/ameritecjsc">
                        <img src={FACE} alt width="50px" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/channel/UCvxi8TE2txGco_yoU-yVKUw">
                        <img src={YOU} alt width="50px" />
                      </a>
                    </li>
                  </ul>
                  <a href="#">
                    <img src={LOGO_NOTI} alt width="200px" />
                  </a>
                </div>
              </div>
            </div>
            <div className="copy-right">
              <span>
                ©&nbsp;Bản quyền thuộc về{" "}
                <a href="http://ameritecjsc.com">Ameritec</a>&nbsp;{" "}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* END FOOTER */}
    </div>
  );
}

export default Home;
