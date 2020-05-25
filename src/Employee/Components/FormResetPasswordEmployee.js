import React, { Component } from 'react';
import '../Css/FormForgetPassword.css';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import * as actions from '../../Alert/Action/Index';
import {connect} from 'react-redux';

class FormResetPasswordEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            confirm: '',
            isRedirect: '',
        }
    }

    handleChangePassword = event => {
        event.preventDefault();
        this.setState({password:event.target.value});
    }

    handleChangeConfirm = event => {
        event.preventDefault();
        this.setState({confirm:event.target.value});
    }

    validateForm = (e) => {
        var regex= "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";
        var alert = document.getElementById('alert-error-validate');
         if(!this.state.password.match(regex)){
            alert.style.display = "block";
            alert.innerHTML = "Mật khẩu mới phải ít nhất 8 kí tự gồm chữ cái, số và ít nhất 1 chữ cái viết hoa";
            e.preventDefault();
        }else if(this.state.password !== this.state.confirm){
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
        console.log(1);
        var data = {
            id: this.props.match.params.id,
            newPassword : this.state.password,
        }
        axios.post(`http://127.0.0.1:8000/api/employee/reset/handle/password`, data)
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
            this.props.showAlert({
                message: res.data.message,
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'right'
                },
                title:'Thành công',
                severity:'success'
              });
            this.setState({isRedirect:true});
          }
        }).catch(function (error) {
          alert(error);
        })   
    }

    render() {
        if(this.state.isRedirect){
            return <Redirect to='/employee/login'/>;
        }
        return (
        <div className="container">
            <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-8 col-lg-6 pb-5">
                <form onSubmit={(e) => this.handleSubmitForm(e)}>
                <div className="card rounded-0">
                    <div className="card-header p-0">
                    <div className="bg-info text-white text-center py-2">
                        <h3><i className="fa fa-envelope" /> Đổi mật khẩu</h3>
                    </div>
                    </div>
                    <div className="card-body p-3">
                    <div className="form-group">
                        <div className="alert-error-form-reset-password" id="alert-error-validate">
                        
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fas fa-unlock"></i></div>
                            </div>
                            <input type="password" onChange={this.handleChangePassword} className="form-control" id="password" name="password" placeholder="Mật khẩu mới"  />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fas fa-unlock"></i></div>
                            </div>
                            <input type="password" onChange={this.handleChangeConfirm} className="form-control" id="confirm" name="confirm" placeholder="Xác nhận khẩu mới"  />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" onClick={(e) => this.validateForm(e)} className="btn btn-info btn-block rounded-0 py-2">Gửi</button>
                    </div>
                    </div>
                </div>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps )(FormResetPasswordEmployee)
