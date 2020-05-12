import React, { Component } from 'react';
import '../Css/ForgetPassword.css';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';

class ForgetPasswordEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            isRedirectAfterSend: false,        
        }
    }

    handleChangeEmail = event => {
        event.preventDefault();
        this.setState({email:event.target.value});
    }

    handleSubmitForm = event => {
        event.preventDefault();
        var data = {
            email: this.state.email
        };
        axios.post(`http://127.0.0.1:8000/api/employee/reset/send/password`, data)
        .then(res => {
          if(res.data.error != null){
              document.getElementById('alert-error').innerHTML = "Email này không hợp lệ";
          }else{
            this.setState({isRedirectAfterSend:true});            
          }
        }).catch(function (error) {
          alert(error);
        })
    }

    render() {
        if(this.state.isRedirectAfterSend){
            return <Redirect to='/employee/login'/>;
        }
        return (
        <div>
            <div className="form-gap" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4"></div>
                        <div className="col-md-4 col-md-offset-4">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="text-center">
                                        <h3><i className="fa fa-lock fa-4x" /></h3>
                                        <h2 className="text-center">Quên mật khẩu?</h2>
                                        <p>Bạn có thể lấy lại mật khẩu tại đây.</p>
                                        <div className="panel-body">
                                            <form id="register-form" onSubmit={this.handleSubmitForm} className="form" method="post">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                                                        <input id="email" onChange={this.handleChangeEmail} name="email" placeholder="Email" className="form-control" type="email" />
                                                    </div>
                                                    <div className="input-group">
                                                        <span className="text-danger error-alert" id="alert-error"></span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <button name="recover-submit" className="btn btn-lg btn-primary btn-block" type="submit">
                                                        Đổi mật khẩu
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-md-offset-4"></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ForgetPasswordEmployee
