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
import  { Redirect } from 'react-router-dom';
import * as actions from '../../Alert/Action/Index';
import {connect} from 'react-redux';
import host from '../../Host/ServerDomain';

const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">Không được để trống</small>;
    }
  }

  const email = (value) => {
    if (!isEmail(value)) {
        return <small className="form-text text-danger">Không đúng định dạng email</small>;
    }
  }

  const minLength = (value) => {
    if (value.trim().length < 8) {
        return <small className="form-text text-danger">Mật khẩu phải có ít nhất 8 kí tự</small>;
    }
  }

class SystemLogin extends Component{
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectSystem: false,
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

        axios.post(host + `/api/login/system`, account)
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

                this.setState({redirectSystem:true});
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
          axios.get(host + `/api/system/check/token/` + token,
          {
              headers: { 'Authorization': 'Bearer ' + token}
          }).then(res => {
            if(res.data.error != null){
                console.log(res.data.message);
            }else{
                  if(self._isMounted){
                      if(res.data.systemLoggedIn){
                        this.setState({redirectSystem:true});
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

    render(){
        if(this.state.redirectSystem){
            return <Redirect to={'/system/'}/>;
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
                        <div className="wrap-input100 validate-input m-b-23" data-validate="Username is required">
                        <span className="label-input100 required">Email</span>
                        <Input className="input100" type="text" name="username" placeholder="Nhập email" 
                            validations={[required, email]} onChange={this.handleChangeEmail}
                        />
                        <span className="focus-input100" data-symbol="" />
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                        <span className="label-input100 required">Mật khẩu</span>
                        <Input className="input100" type="password" name="password" placeholder="Nhập mật khẩu"
                            validations={[required, minLength]} onChange={this.handleChangePassword}
                        />
                        <span className="focus-input100" data-symbol="" />
                        </div>
                        <div className="text-right p-t-8 p-b-31">
                        <a href="/">
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
                    </Form>
                    </div>
                </div>
                </div>
                <div id="dropDownSelect1" />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps )(SystemLogin);