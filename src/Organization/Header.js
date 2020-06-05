import React, { Component } from "react";
import logo from "./Image/avatar-16.jpg";
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import * as actions from '../Alert/Action/Index';
import {connect} from 'react-redux';
import host from '../Host/ServerDomain'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
      openModal: false,
      username: '',  
      password: '',
      newPassword: '',
      confirmPassword: '', 
    };
  }

  handleLogout = (event) => {
    event.preventDefault();
    var tokenData = localStorage.getItem('token');
    localStorage.removeItem("token");
    axios.post(host + `/api/logout/company`, {token: tokenData})
    .then(res => {
      if(res.data.error != null){
        this.props.showAlert({
          message: res.data.error,
          anchorOrigin:{
              vertical: 'top',
              horizontal: 'right'
          },
          title:'Thất bại',
          severity:'error'
        });
      }else{
        if(localStorage.getItem("dataForm") !== null){
          localStorage.removeItem("dataForm");
        }
        this.props.showAlert({
          message: res.data.message,
          anchorOrigin:{
              vertical: 'top',
              horizontal: 'right'
          },
          title:'Thành công',
          severity:'success'
        });
        this.setState({isLogout:true});
      }
    }).catch(function (error) {
      alert(error);
    });
  }

  openUpdateAccount = (e) => {
    e.preventDefault();
    this.setState({openModal:true});
  }

  handleClose = event => {
    this.setState({
        openModal:false,
    })
  };

  componentDidMount() {
    var token = localStorage.getItem('token');
    axios.get(host + `/api/company/account/information/` + token,
    {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(res => {
      if(res.data.error != null){
          console.log(res.data.error);
      }else{ 
        this.setState({username: res.data.username});
      }
    }).catch(function (error) {
      alert(error);
    });
  }
  
  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({openModal:false});
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    var token = localStorage.getItem('token');
    var data = {
        username: this.state.username,
        password: this.state.password,
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword,
        tokenData: token,
    };

    axios.post(host + `/api/company/update/account`,
    data,
    {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(res => {
      if(res.data.error != null){
        var alert = document.getElementById('alert-modal-error-update-admin');
            alert.style.display = "block";
            if(res.data.password){
                alert.innerHTML = "Mật khẩu không đúng";
            }else if(res.data.username){
                alert.innerHTML = "Tài khoản này đã có người dùng";
            }else{
                alert.innerHTML = res.data.message;
            }
      }else{ 
        document.getElementById("button-close-update-admin").click(); 
        this.props.showAlert({
          message: res.data.message,
          anchorOrigin:{
              vertical: 'top',
              horizontal: 'right'
          },
          title:'Thành công',
          severity:'success'
        });
        this.setState({username: res.data.username});
      }
    }).catch(function (error) {
      alert(error);
    });
  }

  handleChangeUsername = event => {
    this.setState({username: event.target.value});
  }

  handleChangePassword = event => {
      this.setState({password: event.target.value});
  }

  handleChangeNewPassword= event => {
      this.setState({newPassword: event.target.value});
  }

  handleChangeConfirmPassword= event => {
      this.setState({confirmPassword: event.target.value});
  }

  handleValidateForm = (e) => {
    var regex= "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";
    var alert = document.getElementById('alert-modal-error-update-admin');
    if(this.state.username.length < 10){
        alert.style.display = "block";
        alert.innerHTML = "Tài khoản phải ít nhất 10 kí tự";
        e.preventDefault();
    }else if(!this.state.newPassword.match(regex)){
        alert.style.display = "block";
        alert.innerHTML = "Mật khẩu mới phải ít nhất 8 kí tự gồm chữ cái, số và ít nhất 1 chữ cái viết hoa";
        e.preventDefault();
    }else if(this.state.newPassword !== this.state.confirmPassword){
        alert.style.display = "block";
        alert.innerHTML = "Mật khẩu mới và xác nhận không giống nhau";
        e.preventDefault();
    }else{
        alert.innerHTML = "";
        alert.style.display= "none";
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
                        src="assets/img/Logo.png"
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
                                placeholder="Tìm kiếm"
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
                              onClick={(e) => this.openUpdateAccount(e)}
                            >
                              <span className="media align-items-center">
                                <i className="fa fa-user fa-1x mr-3" aria-hidden="true"></i>
                                <span className="media-body text-truncate">
                                  <span className="text-truncate">Cập nhật thông tin</span>
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
                                    Cài đặt
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
                                  <span className="text-truncate">Đăng xuất</span>
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
                    {/* <div
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
                                Trang chủ
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="employees.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-users mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Nhân viên
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="company.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-apartment mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Công ty
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="calendar.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-calendar-full mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Thời khóa biểu
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="leave.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-briefcase mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Xin nghỉ
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="reviews.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-star mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Đánh giá
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="reports.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-rocket mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Thông báo
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="manage.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-sync mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Quản lý
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="settings.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-cog mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Cài đặt
                              </span>
                            </span>
                          </span>
                        </a>
                        <a className="p-2" href="employment.html">
                          <span className="media align-items-center">
                            <span className="lnr lnr-user mr-3" />
                            <span className="media-body text-truncate text-left">
                              <span className="text-truncate text-left">
                                Thông tin cá nhân
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
                                Đăng xuất
                              </span>
                            </span>
                          </span>
                        </a>
                      </div>
                    </div> */}
                    {/* /Offcanvas menu */}
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
                  <div className="alert-error" id="alert-modal-error-update-admin">
                  </div>
                  <Form onSubmit={(e) => this.handleSubmitForm(e)}>
                      <Form.Group controlId="formGroupPassword1">
                          <Form.Label>Mật khẩu hiện tại</Form.Label>
                          <Form.Control type="password" onChange={this.handleChangePassword} required placeholder="Mật khẩu hiện tại" />
                      </Form.Group>
                      <Form.Group controlId="formGroupEmail-updateaccount">
                          <Form.Label>Tài khoản mới</Form.Label>
                          <Form.Control type="text" onChange={this.handleChangeUsername} required placeholder="Tài khoản mới" defaultValue={this.state.username}/>
                      </Form.Group>
                      <Form.Group controlId="formGroupPassword2">
                          <Form.Label>Mật khẩu mới</Form.Label>
                          <Form.Control type="password" onChange={this.handleChangeNewPassword} required placeholder="Mật khẩu mới" />
                      </Form.Group>
                      <Form.Group controlId="formGroupPassword3">
                          <Form.Label>Nhập lại mật khẩu</Form.Label>
                          <Form.Control type="password"  onChange={this.handleChangeConfirmPassword} required placeholder="Nhập lại" />
                      </Form.Group>
                      <Button variant="primary" type="submit" onClick={(e) => this.handleValidateForm(e)}>
                          Cập nhật
                      </Button>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
              <Button id="button-close-update-admin" variant="secondary" onClick={this.handleClose}>
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
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showAlert: (properties) => {
      dispatch(actions.showMessageAlert(properties))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(Header)
