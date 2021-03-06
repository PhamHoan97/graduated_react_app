import React, { Component } from "react";
import Avatar from '../../Images/Account/Avatar-01.jpg';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../Alert/Action/Index';
import host from '../../../Host/ServerDomain';

class MenuVertical extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
      system: '',
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
    var tokenData = localStorage.getItem('token');
    localStorage.removeItem("token");
    axios.post(host + `/api/logout/system`, {token: tokenData})
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
            if(localStorage.getItem("builderSchema") !== null){
              localStorage.removeItem("builderSchema");
            }
            if(localStorage.getItem("funcUrl") !== null){
              localStorage.removeItem("funcUrl");
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

  componentDidMount() {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem('token')
    axios.get(host + `/api/system/account/` + token,
    {
      headers: { 'Authorization': 'Bearer ' + token}
    })
    .then(res => {
      if(self._isMounted){
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
          self.setState({system: res.data.system});
        }
      }
    }).catch(function (error) {
      alert(error);
    })
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    if(this.state.isLogout){
      return <Redirect to='/'/>;
    }
    return (
      <header className="header-desktop">
        <div className="section__content section__content--p30">
          <div className="container-fluid">
            <div className="header-wrap">
              <form className="form-header" method="POST">
                {/* <input
                  className="au-input au-input--xl"
                  type="text"
                  name="search"
                  placeholder="Search for datas and reports..."
                />
                <button className="au-btn--submit" type="submit">
                  <i className="zmdi zmdi-search" />
                </button> */}
              </form>
              <div className="header-button">
                <div className="noti-wrap">
                  <div className="noti__item js-item-menu">
                    <i className="zmdi zmdi-notifications" onClick={(e)=>{this.collapseMenuNotification(e)}} />
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
                      <img
                        src={Avatar}
                        alt="John Doe"
                        onClick={(e)=>{this.collapseMenuAccount(e)}}
                      />
                    </div>
                    <div className="content">
                      <a href="##" className="js-acc-btn" onClick={(e)=>{this.collapseMenuAccount(e)}}>
                        {this.state.system.name}
                      </a>
                    </div>
                    <div className="account-dropdown js-dropdown">
                      <div className="info clearfix">
                        <div className="image">
                          <a href="2AESN">
                            <img
                              src={Avatar}
                              alt="John Doe"
                            />
                          </a>
                        </div>
                        <div className="content">
                          <h5 className="name">
                            <a href="/system/dashboard">{this.state.system.name}</a>
                          </h5>
                          <span className="email">{this.state.system.email}</span>
                        </div>
                      </div>
                      <div className="account-dropdown__body text-left">
                        <div className="account-dropdown__item">
                          <a href="/system/dashboard">
                            <i className="zmdi zmdi-account" />
                            Cập nhật tài khoản
                          </a>
                        </div>
                        <div className="account-dropdown__item">
                          <a href="/system/dashboard">
                            <i className="zmdi zmdi-settings" />
                            Cài đặt
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
      </header>
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

export default connect(mapStateToProps, mapDispatchToProps )(MenuVertical)