import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {isEmpty } from 'validator';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';

const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">This field is required</small>;
    }
  }

  const minLengthAccount = (value) => {
    if (value.trim().length < 10) {
        return <small className="form-text text-danger">Invalid username and email type</small>;
    }
  }

  const minLength = (value) => {
    if (value.trim().length < 8) {
        return <small className="form-text text-danger">Password must be at least 8 characters long</small>;
    }
  }

export default class CompanyLogin extends Component {

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

    axios.post(`http://127.0.0.1:8000/api/login/company`, data)
      .then(res => {
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
            console.log(res.data.message);
            localStorage.setItem('token', res.data.token);
            if(res.data.isAdmin){
                localStorage.setItem('admin_id', res.data.id);
                localStorage.setItem('company_id', res.data.company_id);
                localStorage.setItem('is_admin', res.data.isAdmin);
            }
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

    render() {
        if(this.state.redirectAdmin){
          return <Redirect to='/system'/>;
        }

        return (
            <div className="page-wrapper">
            <div className="page-content--bge5">
              <div className="container">
                <div className="login-wrap">
                  <div className="login-content">
                    <div className="login-logo">
                      <a href="/">
                        <img src="../intro/images/Logo.png" alt="Cool Admin" />
                      </a>
                    </div>
                    <div className="login-form">
                      <Form method="post" onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                        <div className="form-group">
                          <label>Username</label>
                          <Input validations={[required, minLengthAccount]} onChange={this.handleChangeAccount}
                            className="au-input au-input--full" type="text" name="account" placeholder="Username" />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <Input validations={[required, minLength]} onChange={this.handleChangePassword}
                             className="au-input au-input--full" type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="login-checkbox">
                          <label>
                            <input type="checkbox" name="remember" />Remember Me
                          </label>
                          <label>
                            <a href="/company/forgetpassword"> Forgotten Password?</a>
                          </label>
                        </div>
                        <CheckButton onClick={this.handleSubmit} className="au-btn au-btn--block au-btn--green m-b-20" type="submit"><i className="fas fa-sign-in-alt"></i> sign in</CheckButton>
                        {/* <div className="social-login-content">
                            <div className="social-button">
                                <button className="au-btn au-btn--block au-btn--blue m-b-20"><i className="fab fa-facebook-square"></i> sign in with facebook</button>
                                <button className="au-btn au-btn--block au-btn--blue2"><i className="fab fa-twitter-square"></i> sign in with twitter</button>
                            </div>
                        </div> */}
                      </Form>
                      <div className="register-link">
                        <p>
                          Don't you have account?
                          <a href="/register"> Sign Up</a>
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