import React, { Component } from "react";
import '../Style/Intro.css';
class Intro extends Component {
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("token") !== null) {
      console.log(localStorage.getItem("token"))
    }
  }
  render() {
    return (
      <div className="intro-system">
        {/* Natigation */}
        <div className="natigation">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                {/* fixed-top */}
                <nav className="navbar navbar-expand-lg navbar-light">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo01"
                  >
                    <a className="navbar-brand" href="/">
                      <img src='./intro/images/logo.png'
                      alt="logo"
                      className="logo-system"
                      />
                    </a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 menu-left">
                      <li className="nav-item active">
                        <a className="nav-link" href="/employee/login">
                          Nhân viên <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item active">
                        <a className="nav-link" href="/">
                          Giới thiệu <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item active">
                        <a className="nav-link" href="/">
                          Hướng dẫn <span className="sr-only">(current)</span>
                        </a>
                      </li>
                    </ul>
                    <ul className="navbar-nav ml-auto menu-right">
                      <li className="nav-item active">
                        <a className="nav-link" href="/">
                          Liên hệ <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item active">
                        <a className="nav-link" href="/company/login">
                          Công ty <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/register"
                          className="btn btn-primary btn-lg active btn--get__started"
                          role="button"
                          aria-pressed="true"
                        >
                          Bắt đầu &gt;
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* End Natigation*/}
        {/* Intro*/}
        <div className="intro">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-10 text-center">
                <div className="intro-description" >
                  <h1>Hệ thống quản lý quy trình doanh nghiệp</h1>
                  <a
                    href="/register"
                    className="btn btn-primary btn-lg active btn--get__started btn-intro"
                    role="button"
                    aria-pressed="true"
                  >
                    Bắt đầu &gt;
                  </a>
                </div>
              </div>
              <div className="col-md-1" />
            </div>
          </div>
        </div>
        {/* Intro*/}
        {/* Banner */}
        <div className="banner">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <h1 className="display-5">Quy trình doanh nghiệp</h1>
                  <p className="lead mt-2">
                  Một chuỗi các bước được liên kết với nhau được chỉ định cho mọi bên liên quan cho một công việc cụ thể để cung cấp sản phẩm hoặc dịch vụ cho khách hàng.
                  </p>
                </div>
                <div className="col-md-1"></div>
              </div>
            </div>
          </div>
        </div>
        {/* End banner */}
        {/* Feature*/}
        <div className="feature">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5 text-center feature--description">
                <div className="feature--description__content">
                  <h1 className="mb-5">Quy trình mẫu</h1>
                  <div>
                  Tiêu chuẩn Ký hiệu và mô hình hóa quy trình nghiệp vụ (Business Process Model and Notation - BPMN) với mục đích chính là làm cầu nối khoảng cách về thông tin giữa các bên liên quan thường xuyên xảy ra trong việc thiết kế và triển khai quy trình nghiệp vụ, đã và đang được sử dụng rộng rãi để mô hình hóa quy trình nghiệp vụ trong nhiều tổ chức. BPMN hỗ trợ cho cả người dùng kỹ thuật và người dùng nghiệp vụ trong việc quản lý các quy trình nghiệp vụ bằng cách đưa ra một tập các ký hiệu chung, có tính trực quan và dễ hiểu cho người dùng nghiệp vụ.
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <img src="./intro/images/process-company.png" alt="feature1" />
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-md-7">
                <img src="./intro/images/organization-company.jpg" alt="feature2" />
              </div>
              <div className="col-md-5 text-center feature--description">
                <div className="feature--description__content">
                  <h1 className="mb-5">Cơ cấu tổ chức</h1>
                  <div>
                  Tổng hợp các bộ phận khác nhau có mối liên hệ và quan hệ phụ thuộc lẫn nhau được chuyên môn hoá và có những trách nhiệm, quyền hạn nhất định được bố trí theo những cấp, những khâu khác nhau nhằm bảo đảm thực hiện các chức năng quản trị và phục vụ mục đích chung đã xác định của doanh nghiệp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Feature*/}
         {/* Banner */}
         <div className="banner">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <h1 className="display-5">Chức năng chính</h1>
                  <p className="lead mt-2">
                  Hệ thống xây dựng đầy đủ các chức năng cho phép doanh nghiệp quản lý toàn bộ quy trình tại các cấp của cơ cấu tổ chức
                  </p>
                </div>
                <div className="col-md-1"></div>
              </div>
            </div>
          </div>
        </div>
        {/* End banner */}
        {/* Blocks*/}
        <div className="blocks mt-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 text-center">
                <div className="block--icon">
                  <img src="./intro/images/process.png" alt="" />
                  <h3  className="mt-3">Quản lý quy trình</h3>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="block--icon">
                  <img src="./intro/images/manage-org.png" alt="" />
                  <h3  className="mt-3">Quản lý cơ cấu tổ chức</h3>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="block--icon">
                  <img src="./intro/images/files.png" alt="" />
                  <h3 className="mt-3">Quản lý tài liệu quy trình</h3>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="block--icon">
                  <img src="./intro/images/notification.png" alt="" />
                  <h3  className="mt-3">Quản lý thông báo</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end blocks */}
        {/* Footer*/}
        <footer className="page-footer font-small indigo bg-light mt-5">
          {/* Footer Links */}
          <div className="container text-center text-md-left">
            {/* Grid row */}
            <div className="row">
              {/* Grid column */}
              <div className="col-md-4 mx-auto">
                {/* Links */}
                <div className="mb-5 mt-5">
                  <img src='./intro/images/logo.png'
                  alt="logo"
                  className="logo-system"/>
                </div>
                {/* Copyright */}
                <div>
                  © 2020 Copyright:
                  <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
                </div>
                {/* Copyright */}
                <br />
              </div>
              {/* Grid column */}
              <hr className="clearfix w-100 d-md-none" />
              {/* Grid column */}
              <div className="col-md-4 mt-4">
              </div>
              {/* Grid column */}
              <hr className="clearfix w-100 d-md-none" />
              {/* Grid column */}
              <div className="col-md-4 mt-4">
                {/* Links */}
                <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                  Đại Học Bách Khoa Hà Nội
                </h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#!">Số 1, Đại Cồ Việt Giải Phóng Hà Nội </a>
                  </li>
                  {/* <li>
                    <a href="#!">2020</a>
                  </li> */}
                </ul>
              </div>
            </div>
            {/* Grid row */}
          </div>
          {/* Footer Links */}
        </footer>
        {/* end footer*/}
      </div>
    );
  }
}

export default Intro;
