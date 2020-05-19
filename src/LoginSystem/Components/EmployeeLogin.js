import React,{ Component } from "react";
import '../images/icons/favicon.ico';
import'../vendor/bootstrap/css/bootstrap.min.css';
import'../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import'../fonts/iconic/css/material-design-iconic-font.min.css';
import'../vendor/animate/animate.css';
import'../vendor/css-hamburgers/hamburgers.min.css';
import'../vendor/animsition/css/animsition.min.css';
import'../vendor/select2/select2.min.css';
import'../vendor/daterangepicker/daterangepicker.css';
import'../css/util.css';
import'../css/main.css';
import Background from '../images/bg-01.jpg';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {isEmpty } from 'validator';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';

const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">Không được để trống</small>;
    }
  }

  const minLength = (value) => {
    if (value.trim().length < 8) {
        return <small className="form-text text-danger">Mật khẩu phải có độ dài ít nhất 8</small>;
    }
  }

class SystemLogin extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectEmployee: false,
        };
    }

    handleChangeUsername = event => {
        this.setState({ username: event.target.value });
    }

    handleChangePassword = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        var account = {
            username: this.state.username,
            password: this.state.password,
        };

        axios.post(`http://127.0.0.1:8000/api/login/employee`, account)
          .then(res => {
            if(res.data.error != null){
                console.log(res.data.message);
            }else{
                localStorage.setItem('token', res.data.token);
                if(res.data.isEmployee){
                    localStorage.setItem('employee_id', res.data.id);
                    localStorage.setItem('account_id', res.data.account_id);
                    localStorage.setItem('is_employee', res.data.isEmployee);
                }
                this.setState({redirectEmployee:true});
            }
          }).catch(function (error) {
            alert(error);
          })
    }

    handleLogout = event => {
        event.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("employee_id");
        localStorage.removeItem("account_id");
        localStorage.removeItem("is_employee");

        axios.post(`http://127.0.0.1:8000/api/logout/employee`)
          .then(res => {
            if(res.data.error != null){
                console.log(res.data.error);    
            }else{

            }
          }).catch(function (error) {
            alert(error);
          })
    }

    onSubmit = event => {
        event.preventDefault();
        this.form.validateAll();
    }

    render(){

        if(this.state.redirectEmployee){
            return <Redirect to='/employee/'/>;

        }
        return (
            <div>
                <div className="limiter-system-login">
                <div className="container-login100" style={{backgroundImage: "url(" + Background + ")"}}>
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    <Form className="login100-form validate-form" onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                        <span className="login100-form-title p-b-49">
                            Đăng nhập
                        </span>
                        <div className="wrap-input100 validate-input m-b-23" data-validate="Tài khoản không được trống">
                        <span className="label-input100">Tài khoản</span>
                        <Input className="input100" type="text" name="username" placeholder="Tài khoản" 
                            validations={[required]} onChange={this.handleChangeUsername}
                        />
                        <span className="focus-input100" data-symbol="" />
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Mật khẩu không được trống">
                        <span className="label-input100">Mật khẩu</span>
                        <Input className="input100" type="password" name="password" placeholder="Mật khẩu"
                            validations={[required, minLength]} onChange={this.handleChangePassword}
                        />
                        <span className="focus-input100" data-symbol="" />
                        </div>
                        <div className="text-right p-t-8 p-b-31">
                        <a href="/employee/reset/password">
                            Quên mật khẩu?
                        </a>
                        </div>
                        <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn" />
                            <CheckButton className="login100-form-btn" onClick={this.handleSubmit} ref={c => { this.checkBtn = c }}>
                                Đăng nhập
                            </CheckButton>
                        </div>
                        </div>
                        {/* <div className="txt1 text-center p-t-54 p-b-20">
                            <span>
                                Or Login Using
                            </span>
                        </div>
                        <div className="flex-c-m">
                            <a href="/" className="login100-social-item bg1">
                                <i className="fa fa-facebook" />
                            </a>
                            <a href="/" className="login100-social-item bg2">
                                <i className="fa fa-twitter" />
                            </a>
                            <a href="/" className="login100-social-item bg3">
                                <i className="fa fa-google" />
                            </a>
                        </div> */}
                    </Form>
                    </div>
                </div>
                </div>
                <div id="dropDownSelect1" />
          </div>
        );
    }
}

export default SystemLogin;