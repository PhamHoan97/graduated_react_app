import React, { Component } from "react";
import logo from "./Image/avatar-16.jpg";
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
    };
  }
  handleLogout = (event) => {
    console.log('Logout');
    event.preventDefault();
    localStorage.removeItem("token");
    if(localStorage.getItem("admin_id")){
      localStorage.removeItem("admin_id");
      localStorage.removeItem("company_id");
      axios.post(`http://127.0.0.1:8000/api/logout/company`)
      .then(res => {
        if(res.data.error != null){
            console.log(res.data.error);
        }else{
            console.log(res.data.message);
            this.setState({isLogout:true});
        }
      }).catch(function (error) {
        alert(error);
      });
    }
  }
  render() {
    if(this.state.isLogout){
      return <Redirect to='/'/>;
    }
    return (
      <>
        <header className="header">
          {/* Top Header Section */}
          <div className="top-header-section">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                  <div className="logo my-3 my-sm-0">
                    <a href="index.html">
                      {/* <img
                        src="assets/img/logo.png"
                        alt="logo image"
                        className="img-fluid"
                        width={100}
                      /> */}
                    </a>
                  </div>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9 col-6 text-right">
                  <div className="user-block d-none d-lg-block">
                    <div className="row align-items-center">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="user-notification-block align-right d-inline-block">
                          <div className="top-nav-search">
                            <form>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search here"
                              />
                              <button className="btn" type="submit">
                                <i className="fa fa-search" />
                              </button>
                            </form>
                          </div>
                        </div>
                        {/* user info*/}
                        <div className="user-info align-right dropdown d-inline-block header-dropdown">
                          <a
                            href="##"
                            data-toggle="dropdown"
                            className=" menu-style dropdown-toggle"
                            aria-expanded="false"
                          >
                            <div className="user-avatar d-inline-block">
                              <img
                                src={logo}
                                alt="user avatar"
                                className="rounded-circle img-fluid"
                                width={55}
                              />
                            </div>
                          </a>
                          {/* Notifications */}
                          <div
                            className="dropdown-menu notification-dropdown-menu shadow-lg border-0 p-3 m-0 dropdown-menu-right"
                            x-placement="bottom-end"
                            style={{
                              position: "absolute",
                              willChange: "transform",
                              left: "-100px",
                              transform: "translate3d(0px, 5px, 0px)",
                            }}
                          >
                            <a
                              className="dropdown-item p-2"
                              href="employment.html"
                            >
                              <span className="media align-items-center">
                                <i className="fa fa-user fa-1x mr-3" aria-hidden="true"></i>
                                <span className="media-body text-truncate">
                                  <span className="text-truncate">Profile</span>
                                </span>
                              </span>
                            </a>
                            <a
                              className="dropdown-item p-2"
                              href="settings.html"
                            >
                              <span className="media align-items-center">
                                <i className="fa fa-cog fa-1x mr-3" aria-hidden="true"></i>
                                <span className="media-body text-truncate">
                                  <span className="text-truncate">
                                    Settings
                                  </span>
                                </span>
                              </span>
                            </a>
                            <a
                              className="dropdown-item p-2"
                              href="/"
                              onClick={(e) => this.handleLogout(e)}
                            >
                              <span className="media align-items-center">
                              <i className="fa fa-sign-out fa-1x mr-3" aria-hidden="true"></i>
                                <span className="media-body text-truncate">
                                  <span className="text-truncate">Logout</span>
                                </span>
                              </span>
                            </a>
                          </div>
                          {/* Notifications */}
                        </div>
                        {/* /User info*/}
                      </div>
                    </div>
                  </div>
                  <div className="d-block d-lg-none">
                    <a href="##">
                      <span
                        className="lnr lnr-user d-block display-5 text-white"
                        id="open_navSidebar"
                      />
                    </a>
                    {/* Offcanvas menu */}
                    <div
                      className="offcanvas-menu"
                      id="offcanvas_menu"
                      style={{ width: "0px" }}
                    >
                      <span
                        className="lnr lnr-cross float-left display-6 position-absolute t-1 l-1 text-white"
                        id="close_navSidebar"
                      />
                      <div className="user-info align-center bg-theme text-center">
                        <a
                          href="##"
                          className="d-block menu-style text-white"
                        >
                          <div className="user-avatar d-inline-block mr-3">
                            <img
                              src="assets/img/profiles/img-6.jpg"
                              alt="user avatar"
                              className="rounded-circle img-fluid"
                              width={55}
                            />
                          </div>
                        </a>
                      </div>
                      <div className="user-notification-block align-center">
                        <div className="top-nav-search">
                          <form>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search here"
                            />
                            <button className="btn" type="submit">
                              <i className="fa fa-search" />
                            </button>
                          </form>
                        </div>
                      </div>
                      <hr />
                      <div className="user-menu-items px-3 m-0">
                        <a className="px-0 pb-2 pt-0" href="index.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-home mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Dashboard
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="employees.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-users mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Employees
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="company.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-apartment mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Company
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="calendar.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-calendar-full mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Calendar
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="leave.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-briefcase mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Leave
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="reviews.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-star mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Reviews
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="reports.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-rocket mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Reports
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="manage.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-sync mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Manage
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="settings.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-cog mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Settings
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="employment.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-user mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Profile
                              </span>
                            </span>
                          </span>
                        </a>
                        <a 
                          className="p-2"
                          href="/"
                          onClick={(e) => this.handleLogout(e)}
                         >
                          <span className="media align-items-center">
                            <span className="lnr lnr-power-switch mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left" >
                                Logout
                              </span>
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                    {/* /Offcanvas menu */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Top Header Section */}
        </header>
      </>
    );
  }
}
