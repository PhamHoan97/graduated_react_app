import React, { Component } from "react";
import avatar from "./Image/logo-company.jpg";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {resetRedirectPageNode} from "./ManageCompany/Action/Index";
import { connect } from "react-redux";
import { compose } from 'redux'
class Menu extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(e) {
    e.preventDefault();
    this.props.history.goBack();
  }

  renderToday = () => {
    return new Date().toDateString();
  }

  render() {
    return (
      <div
        className="theiaStickySidebar"
        style={{
          paddingTop: "0px",
          paddingBottom: "1px",
          position: "static",
          transform: "none",
        }}
      >
        <aside className="sidebar sidebar-user">
          <div className="row">
            <div className="col-12">
              <div className="card ctm-border-radius shadow-sm ">
                <div className="card-body py-4">
                  <ul className="list-group list-group-horizontal-lg">
                    <li className="list-group-item text-center active button-5">
                      <a
                        href="index.html"
                        className="text-white"
                        onClick={(e) => this.goBack(e)}
                      >
                        Quay lại
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="user-card card shadow-sm bg-white text-center ctm-border-radius ">
            <div className="user-info card-body">
              <div className="user-avatar mb-4">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="img-fluid rounded-circle"
                  width={100}
                />
              </div>
              <div className="user-details">
                <h4>
                  <b>Chào mừng đến với hệ thống ISOX</b>
                </h4>
                <p>{this.renderToday()}</p>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="sidebar-wrapper d-lg-block d-md-none d-none">
            <div className="card ctm-border-radius shadow-sm border-none ">
              <div className="card-body">
                <div className="row no-gutters">
                  <div className="col-6 align-items-center text-center">
                    <NavLink
                      to="/company/dashboard"
                      exact
                      className="text-black p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i
                        className="fa fa-tachometer pr-0 pb-lg-2 font-23"
                        aria-hidden="true"
                      />
                      <span>Trang chủ</span>
                    </NavLink>
                  </div>
                  <div className="col-6 align-items-center shadow-none text-center">
                    <NavLink
                      to="/company/detail"
                      onClick={this.props.resetRedirectPage()}
                      className="text-black p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i
                        className="fa fa-university pr-0 pb-lg-2 font-23"
                        aria-hidden="true"
                      />
                      <span>Công ty</span>
                    </NavLink>
                  </div>
                  <div className="col-6 align-items-center shadow-none text-center">
                    <NavLink
                      to="/company/organization/employee"
                      exact
                      className="text-black p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i
                        className="fa fa-user-o pr-0 pb-lg-2 font-23"
                        aria-hidden="true"
                      />
                      <span>Nhân viên</span>
                    </NavLink>
                  </div>
                  <div className="col-6 align-items-center shadow-none text-center">
                    <NavLink
                      to="/company/organization/account"
                      exact
                      className="text-black p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i
                        className="fa fa-building-o pr-0 pb-lg-2 font-23"
                        aria-hidden="true"
                      />
                      <span>Tài khoản nhân viên</span>
                    </NavLink>
                  </div>
                  <div className="col-6 align-items-center shadow-none text-center">
                    <NavLink
                      to="/company/organization/department"
                      exact
                      className="text-black p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i
                        className="fa fa-calendar-o pr-0 pb-lg-2 font-23"
                        aria-hidden="true"
                      />
                      <span>Phòng ban</span>
                    </NavLink>
                  </div>
                  <div className="col-6 align-items-center shadow-none text-center">
                    <NavLink
                      to="/company/organization/role"
                      exact
                      className="text-black p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i
                        className="fa fa-level-up pr-0 pb-lg-2 font-23"
                        aria-hidden="true"
                      />
                      <span>Chức vụ</span>
                    </NavLink>
                  </div>
                   <div className="col-6 align-items-center shadow-none text-center">
                    <NavLink
                      to="/company/notification/system"
                      exact
                      className="text-black p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i
                        className="fa fa-bell-o pr-0 pb-lg-2 font-23"
                        aria-hidden="true"
                      />
                      <span>Danh sách thông báo </span>
                    </NavLink>
                  </div>
                  <div className="col-6 align-items-center shadow-none text-center">
                    <NavLink
                      to="/company/notification/create"
                      exact
                      className="text-black p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i
                        className="fa fa-bell-o pr-0 pb-lg-2 font-23"
                        aria-hidden="true"
                      />
                      <span>Tạo thông báo </span>
                    </NavLink>
                  </div>
                  <div className="col-6 align-items-center shadow-none text-center">
                    <NavLink
                      to="/company/process"
                      exact
                      className="text-black p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i
                        className="fa fa-certificate pr-0 pb-lg-2 font-23"
                        aria-hidden="true"
                      ></i>
                      <span>Tạo quy trình</span>
                    </NavLink>
                  </div>
                  <div className="col-6 align-items-center shadow-none text-center">
                    <NavLink
                      to="/company/manage/process"
                      exact
                      className="text-black p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i
                        className="fas fa-tasks pr-0 pb-lg-2 font-23"
                        aria-hidden="true"
                      ></i>
                      <span>Quản lý quy trình</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Sidebar */}
        </aside>
        <div
          className="resize-sensor"
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            right: "0px",
            bottom: "0px",
            overflow: "hidden",
            zIndex: -1,
            visibility: "hidden",
          }}
        >
          <div
            className="resize-sensor-expand"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
              zIndex: -1,
              visibility: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "0px",
                top: "0px",
                transition: "all 0s ease 0s",
                width: "340px",
                height: "1667px",
              }}
            />
          </div>
          <div
            className="resize-sensor-shrink"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
              zIndex: -1,
              visibility: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transition: "0s",
                width: "200%",
                height: "200%",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetRedirectPage: () => {
      dispatch(resetRedirectPageNode())
    }
  };
};
export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(Menu);

