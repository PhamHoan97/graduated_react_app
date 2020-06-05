import React, { Component } from "react";
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import host from '../Host/ServerDomain';  
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as actions from './Actions/Index';
import './Css/Notification.css';
import * as actionAlerts from '../Alert/Action/Index';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
      employee: '',
      openModal: false,
      username: '',  
      password: '',
      newPassword: '',
      confirmPassword: '', 
      notifications: '',
      click: '',
      isRedirectViewProcess: '',
    };
  }

  openMiniMenu =(e)=>{
    e.preventDefault();
    if (document.getElementById("content-employee_page").className.includes("mini-sidebar")) {
        document.getElementById("content-employee_page").className = "main-wrappe";
    } else {
        document.getElementById("content-employee_page").className = "main-wrappe mini-sidebar";
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.employee){
      this.setState({employee: nextProps.employee, username: nextProps.employee.username_account});
    }
    this.setState({openModal:false});
  }

  componentDidMount() {
    var token = localStorage.getItem('token');
    axios.get(host + `/api/employee/five/process/notification/` + token,
    {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(res => {
      if(res.data.error != null){
          console.log(res.data.error);
      }else{ 
        this.setState({notifications: res.data.notifications});
      }
    }).catch(function (error) {
      alert(error);
    });
  }
  
  renderAvatar = () =>{
    if(this.state.employee && this.state.employee.avatar){
      return <img className="img" src={host + this.state.employee.avatar} alt="Avatar" />
    }else{
      return <img className="img" src="/system/images/user-avatar-default.jpg" alt="Avatar" />;
    }
  }

  viewProcess = (e,id) => {
    e.preventDefault();
    this.setState({click:id, isRedirectViewProcess:true});
  } 

  handleClose = event => {
      this.setState({
          openModal:false,
      })
  };

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
    var alert = document.getElementById('alert-modal-error-update-account');
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

  openUpdateAccount = (e) => {
    e.preventDefault();
    this.setState({openModal:true});
  }

  handleLogout = (event) => {
    event.preventDefault();
    var tokenData = localStorage.getItem('token');
    localStorage.removeItem("token");
    if(localStorage.getItem("dataForm") !== null){
      localStorage.removeItem("dataForm");
    }
    axios.post(host + `/api/logout/employee`, {token: tokenData})
    .then(res => {
      if(res.data.error != null){
        this.props.showAlert({
          message:"Đăng xuất thất bại: ",
          anchorOrigin:{
              vertical: 'top',
              horizontal: 'right'
          },
          title:'Thất bại',
          severity:'error'
        });
      }else{
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

  renderNotification = () => {
    var notifications = this.state.notifications;
    return Object.values(notifications).map((value, key) => {
      return (
        <React.Fragment key={key}>
            <li className="notification-message">
              <a href="activities.html" onClick={(e) => this.viewProcess(e,value.id)}>
                <div className="media">
                  <span className="image-notification">
                    <i className="fas fa-comment-alt"></i>
                  </span>
                  <div className="media-body">
                    <p className="noti-details">
                      <span className="noti-title">
                        Quy trình mới: {value.name}
                      </span>
                    </p>
                    <p className="noti-time">
                      <span className="notification-time">
                        {value.created_at}
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </li>
        </React.Fragment>
      )
    })
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

    axios.post(host + `/api/employee/update/account`,
    data,
    {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(res => {
      if(res.data.error != null){
        var alert = document.getElementById('alert-modal-error-update-account');
            alert.style.display = "block";
            if(res.data.password){
                alert.innerHTML = "Mật khẩu không đúng";
            }else if(res.data.username){
                alert.innerHTML = "Tài khoản này đã có người dùng";
            }else{
                alert.innerHTML = res.data.message;
            }
      }else{ 
        document.getElementById("button-close-update-account").click(); 
        this.props.showAlert({
          message: res.data.message,
          anchorOrigin:{
              vertical: 'top',
              horizontal: 'right'
          },
          title:'Thành công',
          severity:'success'
        });
      }
    }).catch(function (error) {
      alert(error);
    });
  }
  
  render() {

    if(this.state.isLogout){
      return <Redirect to='/'/>;
    }
    if(this.state.isRedirectViewProcess){
      return <Redirect to={'/system/view/process/' + this.state.click} />
    }

    return (
      <div className="header">
        <div className="header-left">
          <a href="index.html" className="logo">
            <img src="./Image/Logo.png" width={40} height={40} alt="" />
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
                  placeholder="Tìm Kiếm"
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
                <a href="##" className="clear-notification">
                  {" "}
                  Đóng{" "}
                </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  {this.renderNotification()}
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
                {this.renderAvatar()}
                <span className="status online" />
              </span>
              <span style={{marginLeft: "5px;"}}>{this.state.employee.name}</span>
            </a>
            <div className="dropdown-menu dropdown-menu_employee">
              <a className="dropdown-item" href="profile.html" onClick={(e) => this.openUpdateAccount(e)}>
              <i className="fas fa-align-justify mr-2"></i> Cập nhật tài khoản
              </a>
              <a className="dropdown-item" href="settings.html">
                <i className="fas fa-globe mr-2"></i> Ngôn ngữ
              </a>
              <a className="dropdown-item" href="login.html" onClick={(e) => this.handleLogout(e)}>
              <i className="fas fa-sign-out-alt mr-2"></i> Đăng xuất
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
            <a className="dropdown-item" href="profile.html" onClick={(e) => this.openUpdateAccount(e)}>
              Cập nhật tài khoản
            </a>
            <a className="dropdown-item" href="settings.html">
              Ngôn ngữ
            </a>
            <a className="dropdown-item" href="login.html" onClick={(e) => this.handleLogout(e)}>
              Đăng xuất
            </a>
          </div>
        </div>
        {/* modal */}
        <Modal show={this.state.openModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Cập nhật tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="alert-error" id="alert-modal-error-update-account">
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
            <Button id="button-close-update-account" variant="secondary" onClick={this.handleClose}>
                Đóng
            </Button>
            </Modal.Footer>
        </Modal>
        {/* end modal */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    employee: state.employeeReducers.employee,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reloadEmployeePage: () => {
      dispatch(actions.reloadEmployeePage());
    },
    showAlert: (properties) => {
      dispatch(actionAlerts.showMessageAlert(properties))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);

