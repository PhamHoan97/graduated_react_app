import React, { Component } from "react";
import logo from "./Image/avatar-16.jpg";
import axios from "axios";
import { Redirect } from "react-router-dom";
import * as actions from "../Alert/Action/Index";
import { connect } from "react-redux";
import host from "../Host/ServerDomain";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Style/Notification.scss";
import itemNotification from "./Image/notification.png";
import iconNotification from "./Image/logo-notification.png";
import {NavLink} from "react-router-dom";

class Header extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
      openModal: false,
      username: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
      notifications: [],
    };
  }

  handleLogout = (event) => {
    event.preventDefault();
    var tokenData = localStorage.getItem("token");
    localStorage.removeItem("token");
    axios
      .post(host + `/api/logout/company`, { token: tokenData })
      .then((res) => {
        if (res.data.error != null) {
          this.props.showAlert({
            message: res.data.error,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            title: "Thất bại",
            severity: "error",
          });
        } else {
          if (localStorage.getItem("dataForm") !== null) {
            localStorage.removeItem("dataForm");
          }
          this.props.showAlert({
            message: res.data.message,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            title: "Thành công",
            severity: "success",
          });
          this.setState({ isLogout: true });
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  openUpdateAccount = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  handleClose = (event) => {
    this.setState({
      openModal: false,
    });
  };

  getListNotificationNoSee = () => {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + `/api/company/notification/list/header`,
        {
          token: token,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        if (self._isMounted) {
          if (res.data.error != null) {
            console.log(res.data.message);
          } else {
            self.setState({ notifications: res.data.notifications });
          }
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  componentDidMount() {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .get(host + `/api/company/account/information/` + token, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (self._isMounted) {
          if (res.data.error != null) {
            console.log(res.data.message);
          } else {
            self.setState({ username: res.data.username });
          }
        }
      })
      .catch(function (error) {
        alert(error);
      });
      this.getListNotificationNoSee()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ openModal: false });
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    var data = {
      username: this.state.username,
      password: this.state.password,
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
      tokenData: token,
    };

    axios
      .post(host + `/api/company/update/account`, data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.error != null) {
          var alert = document.getElementById("alert-modal-error-update-admin");
          alert.style.display = "block";
          if (res.data.password) {
            alert.innerHTML = "Mật khẩu không đúng";
          } else if (res.data.username) {
            alert.innerHTML = "Tài khoản này đã có người dùng";
          } else {
            alert.innerHTML = res.data.message;
          }
        } else {
          document.getElementById("button-close-update-admin").click();
          this.props.showAlert({
            message: res.data.message,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            title: "Thành công",
            severity: "success",
          });
          this.setState({ username: res.data.username });
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleChangeNewPassword = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  handleChangeConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleValidateForm = (e) => {
    var regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";
    var alert = document.getElementById("alert-modal-error-update-admin");
    if (this.state.username.length < 10) {
      alert.style.display = "block";
      alert.innerHTML = "Tài khoản phải ít nhất 10 kí tự";
      e.preventDefault();
    } else if (!this.state.newPassword.match(regex)) {
      alert.style.display = "block";
      alert.innerHTML =
        "Mật khẩu mới phải ít nhất 8 kí tự gồm chữ cái, số và ít nhất 1 chữ cái viết hoa";
      e.preventDefault();
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      alert.style.display = "block";
      alert.innerHTML = "Mật khẩu mới và xác nhận không giống nhau";
      e.preventDefault();
    } else {
      alert.innerHTML = "";
      alert.style.display = "none";
    }
  };

  render() {
    if (this.state.isLogout) {
      return <Redirect to="/" />;
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
                                placeholder="Tìm kiếm"
                              />
                              <button className="btn" type="submit">
                                <i className="fa fa-search" />
                              </button>
                            </form>
                          </div>
                        </div>
                        <div
                          className="user-info align-right dropdown d-inline-block header-dropdown"
                          id="notification_company-page"
                        >
                          <a
                            href="##"
                            data-toggle="dropdown"
                            className=" menu-style dropdown-toggle"
                            aria-expanded="false"
                          >
                            <div className="user-avatar d-inline-block">
                              <img alt="notification" src={iconNotification} />
                              <div className="badge badge-pill">
                                {this.state.notifications.length}
                              </div>
                            </div>
                          </a>
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
                            <div className="topnav-dropdown-header">
                              <span className="notification-title">
                                Thông báo
                              </span>
                              <a href="##" className="clear-noti">
                                {" "}
                              </a>
                            </div>
                            <div className="noti-content">
                              <ul className="notification-list">
                                <li className="notification-message">
                                  <a href="activities.html">
                                    {this.state.notifications.length !== 0 ? (
                                      Object.values(
                                        this.state.notifications
                                        )
                                      ).map((notification, index) => {
                                        return (
                                          <div className="media" key={index}>
                                            <span className="avatar">
                                              <img
                                                alt="notification"
                                                src={itemNotification}
                                              />
                                            </span>
                                            <div className="media-body">
                                              <p className="noti-details">
                                                <NavLink
                                                  to={"/company/notification/detail/"+notification.id}
                                                  exact
                                                  className="clear-noti"
                                                >
                                                  {" "}
                                                  {
                                                   notification.name
                                                  }
                                                </NavLink>
                                              </p>
                                              <p className="noti-time">
                                                <span className="notification-time">
                                                {
                                                   notification.date
                                                 }
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      }):(
                                        <div></div>
                                      )}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
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
                              onClick={(e) => this.openUpdateAccount(e)}
                            >
                              <span className="media align-items-center">
                                <i
                                  className="fa fa-user fa-1x mr-3"
                                  aria-hidden="true"
                                ></i>
                                <span className="media-body text-truncate">
                                  <span className="text-truncate">
                                    Cập nhật thông tin
                                  </span>
                                </span>
                              </span>
                            </a>
                            <a
                              className="dropdown-item p-2"
                              href="settings.html"
                            >
                              <span className="media align-items-center">
                                <i
                                  className="fa fa-cog fa-1x mr-3"
                                  aria-hidden="true"
                                ></i>
                                <span className="media-body text-truncate">
                                  <span className="text-truncate">Cài đặt</span>
                                </span>
                              </span>
                            </a>
                            <a
                              className="dropdown-item p-2"
                              href="/"
                              onClick={(e) => this.handleLogout(e)}
                            >
                              <span className="media align-items-center">
                                <i
                                  className="fa fa-sign-out fa-1x mr-3"
                                  aria-hidden="true"
                                ></i>
                                <span className="media-body text-truncate">
                                  <span className="text-truncate">
                                    Đăng xuất
                                  </span>
                                </span>
                              </span>
                            </a>
                          </div>
                        </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Top Header Section */}
          {/* modal */}
          <Modal show={this.state.openModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className="alert-error"
                id="alert-modal-error-update-admin"
              ></div>
              <Form onSubmit={(e) => this.handleSubmitForm(e)}>
                <Form.Group controlId="formGroupPassword1">
                  <Form.Label className="required">Mật khẩu hiện tại</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={this.handleChangePassword}
                    required
                    placeholder="Mật khẩu hiện tại"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupEmail-updateaccount">
                  <Form.Label className="required">Tài khoản mới</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChangeUsername}
                    required
                    placeholder="Tài khoản mới"
                    defaultValue={this.state.username}
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword2">
                  <Form.Label className="required">Mật khẩu mới</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={this.handleChangeNewPassword}
                    required
                    placeholder="Mật khẩu mới"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword3">
                  <Form.Label className="required">Nhập lại mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={this.handleChangeConfirmPassword}
                    required
                    placeholder="Nhập lại"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => this.handleValidateForm(e)}
                >
                  Cập nhật
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                id="button-close-update-admin"
                variant="secondary"
                onClick={this.handleClose}
              >
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end modal */}
        </header>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showAlert: (properties) => {
      dispatch(actions.showMessageAlert(properties));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
