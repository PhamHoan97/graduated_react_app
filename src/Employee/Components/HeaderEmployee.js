import React, { Component } from "react";
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as host from "../../System/Constants/Url"; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class HeaderEmployee extends Component {
  
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
  
  collapseMenuAccount = (e) => {
    e.preventDefault();
    var prarentValueClassName = e.target.parentElement.parentElement.className;
    if (prarentValueClassName.includes("show-dropdown")) {
      e.target.parentElement.parentElement.className = "account-item clearfix js-item-menu";
    } else {
      e.target.parentElement.parentElement.className += " show-dropdown";
    }
  };
  
  collapseMenuNotification = (e) => {
    e.preventDefault();
    var prarentValueClassName = e.target.parentElement.className;
    if (prarentValueClassName.includes("show-dropdown")) {
      e.target.parentElement.className = "noti__item js-item-menu";
    } else {
      e.target.parentElement.className += " show-dropdown";
    }
  };

  handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    if(localStorage.getItem("system_id")){
      localStorage.removeItem("system_id");
      localStorage.removeItem("is_system");
      axios.post(`http://127.0.0.1:8000/api/logout/employee`)
      .then(res => {
        if(res.data.error != null){
            console.log(res.data.error);
        }else{
            this.setState({isLogout:true});
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    if(localStorage.getItem("admin_id")){
      localStorage.removeItem("is_admin");
      localStorage.removeItem("admin_id");
      localStorage.removeItem("company_id");
      axios.post(`http://127.0.0.1:8000/api/logout/company`)
      .then(res => {
        if(res.data.error != null){
            console.log(res.data.error);
        }else{
            this.setState({isLogout:true});
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    if(localStorage.getItem("employee_id")){
      localStorage.removeItem("is_employee");
      localStorage.removeItem("employee_id");
      axios.post(`http://127.0.0.1:8000/api/logout/employee`)
      .then(res => {
        if(res.data.error != null){
            console.log(res.data.error);
        }else{
            this.setState({isLogout:true});
        }
      }).catch(function (error) {
        alert(error);
      });
    }
  }
  componentDidMount() {
    var token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/api/employee/three/process/notification/` + token,
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

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.employee){
      this.setState({employee: nextProps.employee, username: nextProps.employee.username_account});
    }
    this.setState({openModal:false});
  }
  
  renderAvatar = () =>{
    if(this.state.employee && this.state.employee.avatar){
      return <img className="img" src={host.URL_BACKEND + '/' + this.state.employee.avatar} alt="Avatar" />
    }else{
      return <img className="img" src="/system/images/user-avatar-default.jpg" alt="Avatar" />;
    }
  }

  renderNotification = () => {
    var notifications = this.state.notifications;
    return Object.values(notifications).map((value, key) => {
      return (
        <React.Fragment key={key}>
          <div className="notifi__item" onClick={(e) => this.viewProcess(e,value.id)}>
            <div className="bg-c1 img-cir img-40">
              <i className="zmdi zmdi-email-open" />
            </div>
            <div className="content">
              <p>Quy trình mới: {value.name}</p>
              <span className="date">{value.created_at}</span>
            </div>
          </div>
        </React.Fragment>
      )
    })
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
      if(this.state.username.length <= 10){
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

    axios.post(`http://127.0.0.1:8000/api/employee/update/account`,
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
          this.props.reloadEmployeePage();
      }
    }).catch(function (error) {
      alert(error);
    });
  }

  openUpdateAccount = (e) => {
    e.preventDefault();
    this.setState({openModal:true});
  }
  
  render() {
    if(this.state.isLogout){
      return <Redirect to='/'/>;
    }
    if(this.state.isRedirectViewProcess){
      return <Redirect to={'/employee/view/process/' + this.state.click} />
    }
    return (
      <header className="header-desktop-employee">
        <div className="section__content section__content--p30">
          <div className="container-fluid-employee">
            <div className="header-wrap-employee">
              <div className="header-button">
                <div className="noti-wrap">
                  <div className="noti__item js-item-menu">
                    <i className="zmdi zmdi-notifications" onClick={(e)=>{this.collapseMenuNotification(e)}} />
                    <span className="quantity">3</span>
                    <div className="notifi-dropdown js-dropdown">
                      <div className="notifi__title">
                        <p>Bạn có thêm một số thông báo</p>
                      </div>
                      {this.renderNotification()}
                      {/* <div className="notifi__item">
                        <div className="bg-c1 img-cir img-40">
                          <i className="zmdi zmdi-email-open" />
                        </div>
                        <div className="content">
                          <p>You got a email notification</p>
                          <span className="date">April 12, 2018 06:50</span>
                        </div>
                      </div>
                      <div className="notifi__item">
                        <div className="bg-c2 img-cir img-40">
                          <i className="zmdi zmdi-account-box" />
                        </div>
                        <div className="content">
                          <p>Your account has been blocked</p>
                          <span className="date">April 12, 2018 06:50</span>
                        </div>
                      </div>
                      <div className="notifi__item">
                        <div className="bg-c3 img-cir img-40">
                          <i className="zmdi zmdi-file-text" />
                        </div>
                        <div className="content">
                          <p>You got a new file</p>
                          <span className="date">April 12, 2018 06:50</span>
                        </div>
                      </div> */}
                      <div className="notifi__footer">
                        <a href="2AESN">Xem tất cả thông báo</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="account-wrap">
                  <div className="account-item clearfix js-item-menu">
                    <div className="image">
                    <img className="img" src="/system/images/user-avatar-default.jpg" alt="Avatar" onClick={(e)=>{this.collapseMenuAccount(e)}}/>
                    </div>
                    <div className="content">
                      <a href="##" className="js-acc-btn" onClick={(e)=>{this.collapseMenuAccount(e)}}>
                        {this.state.employee.name}
                      </a>
                    </div>
                    <div className="account-dropdown js-dropdown">
                      <div className="info clearfix">
                        <div className="image">
                          <a href="/employee/dashboard">
                          <img className="img" src="/system/images/user-avatar-default.jpg" alt="Avatar" />
                          </a>
                        </div>
                        <div className="content">
                          <h5 className="name">
                            <a href="/employee/dashboard">{this.state.employee.name}</a>
                          </h5>
                          <span className="email">{this.state.employee.email}</span>
                        </div>
                      </div>
                      <div className="account-dropdown__body text-left">
                        <div className="account-dropdown__item">
                          <a href="/employee/dashboard" onClick={(e) => this.openUpdateAccount(e)}>
                            <i className="zmdi zmdi-account" />
                              Cập nhật tài khoản
                          </a>
                        </div>
                        <div className="account-dropdown__item">
                          <a href="/employee/dashboard">
                            <i className="zmdi zmdi-settings" />
                            Ngôn ngữ
                          </a>
                        </div>
                      </div>
                      <div className="account-dropdown__footer">
                        <a href="/" onClick={(e) => this.handleLogout(e)}>
                          <i className="zmdi zmdi-power" />
                          Đăng xuất
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    employee: state.employeeReducers.employee,
  }
}

export default connect(mapStateToProps, )(HeaderEmployee);
