import React, { Component } from "react";
import logo from "../../Images/Logo.png";
import { NavLink } from "react-router-dom";

export default class MenuHorizontal extends Component {
  collapseMenu = (e) => {
    e.preventDefault();
    var valueClassName = e.target.className;
    var menu = e.target.nextSibling;
    if (valueClassName.includes("open")) {
      menu.setAttribute("style", "display:none");
      e.target.className = "js-arrow";
    } else {
      e.target.className += " open";
      menu.setAttribute("style", "display:block");
    }
  };
  render() {
    return (
      <aside className="menu-sidebar d-none d-lg-block text-left">
        <div className="logo">
          <a href="/system/dashboard">
            <img src={logo} alt="Cool Admin" style={{ width:"200px",height:"40px"}}/>
          </a>
        </div>
        <div className="menu-sidebar__content js-scrollbar1">
          <nav className="navbar-sidebar">
            <ul className="list-unstyled navbar__list">
              <li className="has-sub">
                <NavLink
                  to="/system/dashboard"
                  exact
                  activeClassName="selected"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#0074D9",
                  }}
                >
                  <i className="fas fa-tachometer-alt" />
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <a
                  href="##"
                  onClick={(e) => {
                    this.collapseMenu(e);
                  }}
                  className="js-arrow"
                >
                  <i className="fa fa-bell" aria-hidden="true"></i>
                  Quản lí thông báo
                </a>
                <ul className="list-unstyled navbar__sub-list js-sub-list">
                  <li>
                    <NavLink
                      to="/system/notification/template"
                      activeClassName="selected"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#0074D9",
                      }}
                    >
                      <i className="fa fa-list" />
                      Danh sách template
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/system/notification/form"
                      activeClassName="selected"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#0074D9",
                      }}
                    >
                     <i className="fa fa-check-square-o" aria-hidden="true"></i>
                      Danh sách Form
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/system/notification/send"
                      activeClassName="selected"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#0074D9",
                      }}
                    >
                      <i className="fa fa-envelope-o" />
                      Gửi thông báo
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li>
                <a
                  href="##"
                  onClick={(e) => {
                    this.collapseMenu(e);
                  }}
                  className="js-arrow"
                >
                  <i className="fas fa-assistive-listening-systems" />
                  Quản lí hệ thống
                </a>
                <ul className="list-unstyled navbar__sub-list js-sub-list">
                  <li>
                    <NavLink
                      to="/system/company"
                      activeClassName="selected"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#0074D9",
                      }}
                    >
                      <i className="fas fa-building" />
                      Công ty
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/system/registration"
                      activeClassName="selected"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#0074D9",
                      }}
                    >
                      <i className="fas fa-bell-slash" />
                      Đăng kí
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/system/email"
                      activeClassName="selected"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#0074D9",
                      }}
                    >
                      <i className="fas fa-envelope" />
                      Email
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="has-sub">
                <NavLink
                  to="/system/template"
                  exact
                  activeClassName="selected"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#0074D9",
                  }}
                >
                  <i className="fas fa-images"></i>
                  Quy trình mẫu
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}
