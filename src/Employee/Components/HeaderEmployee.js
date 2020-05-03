import React, { Component } from "react";
import axios from 'axios';
import  { Redirect } from 'react-router-dom';

export default class HeaderEmployee extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
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
            console.log(res.data.message);
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
            console.log(res.data.message);
            this.setState({isLogout:true});
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    if(localStorage.getItem("employee_id")){
      localStorage.removeItem("isEmployee");
      localStorage.removeItem("employee_id");
      axios.post(`http://127.0.0.1:8000/api/logout/employee`)
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

  renderAvatar = () =>{

  }
  
  render() {
    if(this.state.isLogout){
      return <Redirect to='/'/>;
    }
    return (
      <header className="header-desktop-employee">
        <div className="section__content section__content--p30">
          <div className="container-fluid-employee">
            <div className="header-wrap-employee">
              <div className="header-button">
                <div className="noti-wrap">
                  <div className="noti__item js-item-menu">
                    <i className="zmdi zmdi-notifications" />
                    <span className="quantity">3</span>
                    <div className="notifi-dropdown js-dropdown">
                      <div className="notifi__title">
                        <p>You have 3 Notifications</p>
                      </div>
                      <div className="notifi__item">
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
                      </div>
                      <div className="notifi__footer">
                        <a href="2AESN">All notifications</a>
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
                        HoanPham
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
                            <a href="2AESN">john doe</a>
                          </h5>
                          <span className="email">johndoe@example.com</span>
                        </div>
                      </div>
                      <div className="account-dropdown__body text-left">
                        <div className="account-dropdown__item">
                          <a href="2AESN">
                            <i className="zmdi zmdi-account" />
                            Change Password
                          </a>
                        </div>
                        <div className="account-dropdown__item">
                          <a href="2AESN">
                            <i className="zmdi zmdi-settings" />
                            Setting
                          </a>
                        </div>
                        <div className="account-dropdown__item">
                          <a href="2AESN">
                            <i className="zmdi zmdi-money-box" />
                            Language
                          </a>
                        </div>
                      </div>
                      <div className="account-dropdown__footer">
                        <a href="/" onClick={(e) => this.handleLogout(e)}>
                          <i className="zmdi zmdi-power" />
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}