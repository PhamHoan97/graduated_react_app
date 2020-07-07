import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {isEmpty } from 'validator';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import * as actions from '../../Alert/Action/Index';
import {connect} from 'react-redux';
import host from '../../Host/ServerDomain';

const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">Không được để trống</small>;
    }
  }

  const minLengthAccount = (value) => {
    if (value.trim().length < 10) {
        return <small className="form-text text-danger">Không đúng định dạng tài khoản</small>;
    }
  }

  const minLength = (value) => {
    if (value.trim().length < 8) {
        return <small className="form-text text-danger">Mật khẩu ít nhất 8 kí tự</small>;
    }
  }

class CompanyLogin extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        redirectAdmin: false,
    };
  }

  handleChangeAccount = event => {
    this.setState({ username: event.target.value });
  }

  handleChangePassword = event => {
      this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    var data = { 
      username: this.state.username,
      password: this.state.password,
      redirectAdmin: false,
    };

    axios.post(host + `/api/login/company`, data)
      .then(res => {
        if(res.data.error != null){
          this.props.showAlert({
            message: res.data.message,
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Thất bại',
            severity:'error'
          });
        }else{
            localStorage.setItem('token', res.data.token);
            this.props.showAlert({
              message: res.data.message,
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thành công',
              severity:'success'
            });
            this.setState({redirectAdmin:true});
        }
      }).catch(function (error) {
        alert(error);
      })
    }

    onSubmit = event => {
      event.preventDefault();
      this.form.validateAll();
    }

    UNSAFE_componentWillMount() {
      this._isMounted = true;
      var self = this;
      var token = localStorage.getItem('token');
      if(token){
        axios.get(host + `/api/company/check/token/` + token,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
                if(self._isMounted){
                    if(res.data.adminLoggedIn){
                      this.setState({redirectAdmin:true});
                    }
                }
          }
        }).catch(function (error) {
          alert(error);
        });
      }
    }

    componentWillUnmount(){
      this._isMounted = false;
    }


    render() {
        if(this.state.redirectAdmin){
          return <Redirect to='/company/'/>;
        }

        return (
            <div className="page-wrapper-login-company">
            <div className="page-content--bge5">
              <div className="container">
                <div className="login-wrap">
                  <div className="login-content">
                    <div className="login-logo">
                      <a href="/">
                        <img src="../intro/images/logo.png"
                        style={{ width:"150px",height:"50px"}}
                        alt="Cool Admin" />
                      </a>
                    </div>
                    <div className="login-form">
                      <Form method="post" onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                        <div className="form-group">
                          <label>Tài khoản</label>
                          <Input validations={[required, minLengthAccount]} onChange={this.handleChangeAccount}
                            className="au-input au-input--full" type="text" name="account" placeholder="Tài khoản" />
                        </div>
                        <div className="form-group">
                          <label>Mật khẩu</label>
                          <Input validations={[required, minLength]} onChange={this.handleChangePassword}
                             className="au-input au-input--full" type="password" name="password" placeholder="Mật khẩu" />
                        </div>
                        <div className="login-checkbox">
                          <label>
                            <input type="checkbox" name="remember" />Lưu tài khoản
                          </label>
                          <label>
                            <a href="/company/reset/password"> Quên mật khẩu?</a>
                          </label>
                        </div>
                        <CheckButton onClick={this.handleSubmit} className="au-btn au-btn--block au-btn--green m-b-20" type="submit"><i className="fas fa-sign-in-alt"></i>  
                           Đăng nhập
                        </CheckButton>
                      </Form>
                      <div className="register-link">
                        <p>
                          Bạn có tài khoản chưa?
                          <a href="/register"> Đăng kí</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps )(CompanyLogin)
