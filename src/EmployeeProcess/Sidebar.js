import React, { Component } from "react";
import {NavLink} from "react-router-dom"

class Sidebar extends Component {
  mouseOverMenu = (e) => {
    e.preventDefault();
    if (
      document
        .getElementById("content-employee_page")
        .className.includes("mini-sidebar")
    ) {
      document.getElementById("content-employee_page").className =
        "main-wrapper mini-sidebar expand-menu";
    }
  };
  mouseOutMenu = (e) => {
    e.preventDefault();
    if (
      document
        .getElementById("content-employee_page")
        .className.includes("expand-menu")
    ) {
      document.getElementById("content-employee_page").className =
        "main-wrappe mini-sidebar";
    }
  };
  render() {
    return (
      <div
        className="sidebar"
        id="sidebar"
        onMouseOver={(e)=>this.mouseOverMenu(e)}
        onMouseOut={(e)=>this.mouseOutMenu(e)}
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
              
                <span>Trang chủ</span>
              </li>
              <li className="submenu">
                  <NavLink
                      to="/employee/dashboard"
                      exact
                      className="ml-3"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i className="fa fa-tachometer" aria-hidden="true" />
                      <span> Trang chủ</span>
                  </NavLink>
              </li>
              <li className="menu-title">
                <span>Thông báo</span>
              </li>
              <li className="submenu">
                <NavLink
                      to="/employee/notification"
                      exact
                      className="ml-3"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      <i className="fa fa-bell-o" />{" "}
                      <span> Danh sách thông báo</span>
                  </NavLink>
              </li>
              <li className="menu-title">
                <span>Tài khoản</span>
              </li>
              <li className="submenu">
                <a href="##" className="ml-3">
                  <i className="fa fa-user-o" aria-hidden="true" />
                  <span> Thông tin cá nhân </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
