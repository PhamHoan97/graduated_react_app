import React, { Component } from "react";
import avatarEmployee from "./Image/avatar-02.jpg"
class Menu extends Component {
  openMiniMenu =(e)=>{
    e.preventDefault();
    console.log(document.getElementById("content-employee_page").className);
    if (document.getElementById("content-employee_page").className.includes("mini-sidebar")) {
        document.getElementById("content-employee_page").className = "main-wrappe";
    } else {
        document.getElementById("content-employee_page").className = "main-wrappe mini-sidebar";
    }
  }
  render() {
    return (
      <div className="header">
        <div className="header-left">
          <a href="index.html" className="logo">
            <img src="./Image/logo.png" width={40} height={40} alt="" />
          </a>
        </div>
        <a 
        id="toggle_btn"
        href="##" 
        onClick={(e)=>this.openMiniMenu(e)}>
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </a>
        <div className="page-title-box">
          <h3>Giao diện quy trình nhân viên</h3>
        </div>
        <a id="mobile_btn" className="mobile_btn" href="#sidebar">
          <i className="fa fa-bars" />
        </a>
        <ul className="nav user-menu">
          <li className="nav-item">
            <div className="top-nav-search">
              <a href="##" className="responsive-search">
                <i className="fa fa-search" />
              </a>
              <form action="search.html">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search here"
                />
                <button className="btn" type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              href="##"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <i className="fa fa-bell-o" />{" "}
              <span className="badge badge-pill">3</span>
            </a>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Thông báo</span>
                <a href="##" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <a href="activities.html">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={avatarEmployee} />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">John Doe</span> added
                            new task{" "}
                            <span className="noti-title">
                              Patient appointment booking
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="activities.html">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src="assets/img/profiles/avatar-03.jpg" />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Tarah Shropshire</span>
                            changed the task name{" "}
                            <span className="noti-title">
                              Appointment booking with payment gateway
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              6 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="activities.html">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src="assets/img/profiles/avatar-06.jpg" />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Misty Tison</span>
                            added{" "}
                            <span className="noti-title">
                              Domenic Houston
                            </span>{" "}
                            and <span className="noti-title">Claire Mapes</span>{" "}
                            to project{" "}
                            <span className="noti-title">
                              Doctor available module
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              8 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="activities.html">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src="assets/img/profiles/avatar-17.jpg" />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Rolland Webber</span>
                            completed task{" "}
                            <span className="noti-title">
                              Patient and Doctor video conferencing
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              12 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="activities.html">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src="assets/img/profiles/avatar-13.jpg" />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Bernardo Galaviz</span>
                            added new task{" "}
                            <span className="noti-title">
                              Private chat module
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              2 days ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <a href="activities.html">Hiện thị tất cả thông báo</a>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown has-arrow main-drop">
            <a
              href="##"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <span className="user-img">
                <img src={avatarEmployee} alt="" />
                <span className="status online" />
              </span>
              <span>Admin</span>
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="profile.html">
                Thông tin cá nhân
              </a>
              <a className="dropdown-item" href="settings.html">
                Cài đặt
              </a>
              <a className="dropdown-item" href="login.html">
                Logout
              </a>
            </div>
          </li>
        </ul>
        <div className="dropdown mobile-user-menu">
          <a
            href="##"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="profile.html">
              Thông tin cá nhân
            </a>
            <a className="dropdown-item" href="settings.html">
              Cài đặt
            </a>
            <a className="dropdown-item" href="login.html">
              Logout
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
