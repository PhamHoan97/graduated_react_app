import React, { Component } from "react";
import logo from "../../Images/Logo.png";
import {  NavLink } from "react-router-dom";

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
      <aside className="menu-sidebar d-none d-lg-block">
        <div className="logo">
          <a href="4a">
            <img src={logo} alt="Cool Admin" />
          </a>
        </div>
        <div className="menu-sidebar__content">
          <nav className="navbar-sidebar">
            <ul className="list-unstyled navbar__list">
              <li className="has-sub">
                <NavLink to="/system" exact activeClassName="selected" activeStyle={{
                      fontWeight: "bold",
                      color: "#0074D9"
                    }}>
                  <i className="fas fa-tachometer-alt" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/system/process" activeClassName="selected"  activeStyle={{
                      fontWeight: "bold",
                      color: "#0074D9"
                    }}>
                  <i className="fas fa-cog" />
                  Manager Process
                </NavLink>
              </li>
              <li>
                <NavLink to="/system/organization"  activeClassName="selected"  activeStyle={{
                      fontWeight: "bold",
                      color: "#0074D9"
                    }}>
                  <i className="fa fa-sitemap" />
                    Manager Organization
                </NavLink>
              </li>
              <li>
                  <a href="##" onClick={(e) => {
                    this.collapseMenu(e);
                  }} className="js-arrow">
                  <i className="fas fa-tachometer-alt" />
                      Manager System
                </a>
                <ul className="list-unstyled navbar__sub-list js-sub-list">
                  <li>
                    <NavLink to="/system/account/notification" activeClassName="selected"  activeStyle={{
                      fontWeight: "bold",
                      color: "#0074D9"
                    }}>
                      <i className="fas fa-star" />
                        Manager Notification
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                  <NavLink to="/system/personal"  activeClassName="selected"  activeStyle={{
                      fontWeight: "bold",
                      color: "#0074D9"
                    }}>
                    <i className="fas fa-users" />
                      Account
                  </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}
