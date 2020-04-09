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
import { isEmail, isEmpty } from 'validator';
import axios from 'axios';

const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">This field is required</small>;
    }
  }

  const email = (value) => {
    if (!isEmail(value)) {
        return <small className="form-text text-danger">Invalid email format</small>;
    }
  }

  const minLength = (value) => {
    if (value.trim().length < 8) {
        return <small className="form-text text-danger">Password must be at least 8 characters long</small>;
    }
  }

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleChangeEmail = event => {
        this.setState({ email: event.target.value });
    }

    handleChangePassword = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        var account = {
            email: this.state.email,
            password: this.state.password,
        };

        axios.post(`http://127.0.0.1:8000/api/login/system`, account)
          .then(res => {
            if(res.data.error != null){
                console.log(res.data.error);
            }else{
                console.log(res.data.message);
                localStorage.setItem('system', JSON.stringify(res.data.system));
            }
          }).catch(function (error) {
            alert(error);
          })
    }

    handleLogout = event => {
        event.preventDefault();

        axios.post(`http://127.0.0.1:8000/api/logout/system`)
          .then(res => {
            if(res.data.error != null){
                console.log(res.data.error);
            }else{
                console.log(res.data.message);
            }
          }).catch(function (error) {
            alert(error);
          })
    }

    onSubmit(e){
        e.preventDefault();
        this.form.validateAll();
    }

    render(){
        return (
            <div>
                <div className="limiter">
                <div className="container-login100" style={{backgroundImage: "url(" + Background + ")"}}>
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    <Form className="login100-form validate-form" onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                        <span className="login100-form-title p-b-49">
                        Login
                        </span>
                        <div className="wrap-input100 validate-input m-b-23" data-validate="Username is required">
                        <span className="label-input100">Email/Username</span>
                        <Input className="input100" type="text" name="username" placeholder="Type your email or username" 
                            validations={[required, email]} onChange={this.handleChangeEmail}
                        />
                        <span className="focus-input100" data-symbol="" />
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                        <span className="label-input100">Password</span>
                        <Input className="input100" type="password" name="password" placeholder="Type your password"
                            validations={[required, minLength]} onChange={this.handleChangePassword}
                        />
                        <span className="focus-input100" data-symbol="" />
                        </div>
                        <div className="text-right p-t-8 p-b-31">
                        <a href="/">
                            Forgot password?
                        </a>
                        </div>
                        <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn" />
                            <CheckButton className="login100-form-btn" onClick={this.handleSubmit} ref={c => { this.checkBtn = c }}>
                            Login
                            </CheckButton>
                        </div>
                        </div>
                        <div className="txt1 text-center p-t-54 p-b-20">
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
                        </div>
                    </Form>
                    </div>
                </div>
                </div>
                <div id="dropDownSelect1" />
          </div>
        );
    }
}

export default Login;