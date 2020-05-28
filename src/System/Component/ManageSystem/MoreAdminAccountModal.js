import React, { Component } from 'react';
import AdminAcountTable from "./AdminAcountTable";
import axios from 'axios';
import {isEmpty } from 'validator';
import {passDataFromFormToModalInCreateAccountAdmin} from "../../Action/System/Index";
import {connect} from 'react-redux';
import * as actions from '../../../Alert/Action/Index';
import host from '../../../Host/ServerDomain';

class MoreAdminAccountModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clickCreate: 1,
        }
    }

    generateAdminAccount = event => {
        var usernameR = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
        var passwordR = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
        document.getElementById("usernameGenerate").value = usernameR;
        document.getElementById("passwordGenerate").value = passwordR;
    }
    handleChangeUsername = event => {
        event.preventDefault();
        var check = true;
        var username = event.target.value;
        if(isEmpty(username)){
            document.getElementById("error-username-required").style.display = "block";
            document.getElementById("error-username-length").style.display = "none";
            check =false;
        }else{
            if(username.trim().length < 8){
                document.getElementById("error-username-length").style.display = "block";
                document.getElementById("error-username-required").style.display = "none";
                check = false;
            }
        }
        if(check){
            document.getElementById("error-username-required").style.display = "none";
            document.getElementById("error-username-length").style.display = "none";
        }
    }

    handleChangePassword = event => {
        event.preventDefault();
        var check = true;
        var password = event.target.value;
        if(isEmpty(password)){
            document.getElementById("error-password-required").style.display = "block";
            document.getElementById("error-password-length").style.display = "none";
            check = false;
        }else{
            if(password.trim().length < 8){
                document.getElementById("error-password-length").style.display = "block";
                document.getElementById("error-password-required").style.display = "none";
                check = false;
            }
        } 

        if(check){
            document.getElementById("error-password-required").style.display = "none";
            document.getElementById("error-password-length").style.display = "none";
        }
    }

    validateForm(usernameA, passwordA){
        var check = true;
        if(isEmpty(usernameA)){
            document.getElementById("error-username-required").style.display = "block";
            document.getElementById("error-username-length").style.display = "none";
            check =false;
        }else{
            if(usernameA.trim().length < 8){
                document.getElementById("error-username-length").style.display = "block";
                document.getElementById("error-username-required").style.display = "none";
                check = false;
            }
        }

        if(isEmpty(passwordA)){
            document.getElementById("error-password-required").style.display = "block";
            document.getElementById("error-password-length").style.display = "none";
            check = false;
        }else{
            if(passwordA.trim().length < 8){
                document.getElementById("error-password-length").style.display = "block";
                document.getElementById("error-password-required").style.display = "none";
                check = false;
            }
        }
        
        if(check){
            document.getElementById("error-username-required").style.display = "none";
            document.getElementById("error-username-length").style.display = "none";
            document.getElementById("error-password-required").style.display = "none";
            document.getElementById("error-password-length").style.display = "none";
        }

        return check;
    }

    createAdminAccount = event => {
        event.preventDefault();
        var usernameA = document.getElementById("usernameGenerate").value;
        var passwordA = document.getElementById("passwordGenerate").value;

        if(this.validateForm(usernameA,passwordA)){
            var account = {
                idCompany: this.props.currentCompany,
                username: usernameA,
                password: passwordA,
            };
            var token = localStorage.getItem('token');
            axios.post(host + `/api/system/more/admin`, account,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            }
            )
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
                    this.props.passDataFromFormToTable(this.props.currentCompany,this.state.clickCreate);
                    var numberClick = this.state.clickCreate + 1;
                    this.props.showAlert({
                        message: res.data.message,
                        anchorOrigin:{
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        title:'Thành công',
                        severity:'success'
                    });
                    this.setState({clickCreate: numberClick});
                }
            }).catch(function (error) {
                alert(error);
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        document.getElementById("usernameGenerate").value = "";
        document.getElementById("passwordGenerate").value = "";
        document.getElementById("error-username-required").style.display = "none";
        document.getElementById("error-username-length").style.display = "none";
        document.getElementById("error-password-required").style.display = "none";
        document.getElementById("error-password-length").style.display = "none";
    }

    render() {
        return (
            <div
            className="modal fade"
            id="more-admin-account-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="scrollmodalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="scrollmodalLabel">
                    Tài khoản mới
                </h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div className="modal-body">
                <div className="card-body card-block">
                    <form
                    method="post"
                    encType="multipart/form-data"
                    className="form-horizontal"
                    >
                    <div className="row form-group">
                        <div className="col col-md-3">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Tài khoản
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <div id="usernameA">
                            <input
                                onChange={this.handleChangeUsername}
                                type="text"
                                id="usernameGenerate"
                                name="username"
                                placeholder="Example: Tbxkdrld12"
                                className="form-control"
                            />
                            <small id="error-username-required" className="form-text text-danger" style={{display:'none'}}>Không được để trống</small>
                            <small id="error-username-length" className="form-text text-danger" style={{display:'none'}}>Mậ khẩu ít nhất 10 kí tự</small>
                            </div>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                        <div className="col-12 col-md-3" style={{display: 'none'}}>
                            <i className="far fa-check-circle fa-2x" style={{float:'left',color:'green'}}></i>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Mật khẩu
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <div id="passwordA">
                                <input
                                    onChange={this.handleChangePassword}
                                    type="password"
                                    id="passwordGenerate"
                                    name="password"
                                    placeholder="Example: Abcdxyz123"
                                    className="form-control"
                                />
                                <small id="error-password-required" className="form-text text-danger" style={{display:'none'}}>Không được để trống</small>
                                <small id="error-password-length" className="form-text text-danger" style={{display:'none'}}>Độ dài ít nhất 10 kí tự</small>
                            </div>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                        <div className="col-12 col-md-3" style={{display: 'none'}}>
                            <i className="far fa-check-circle fa-2x" style={{float:'left',color:'green'}}></i>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">

                        </div>
                        <div className="col-12 col-md-9">
                            <button onClick={(e) => this.generateAdminAccount(e)} type="button" style={{float: 'left',}} className="btn btn-success">Tạo tự động</button>
                            <button onClick = {(e) => this.createAdminAccount(e)} type="button" style={{float: 'left', marginLeft: '10px'}} className="btn btn-primary">Tạo tài khoản</button>
                        </div>
                    </div>
                    <div className="row form-group">
                        <AdminAcountTable initCompany= {this.props.currentCompany}/>
                    </div>
                    </form>
                </div>
                </div>
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                >
                    Đóng
                </button>
                </div>
            </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.systemReducers.manageSystemReducer.registrationReducer.idCompany,
        clickCreate: state.systemReducers.manageSystemReducer.registrationReducer.clickCreate
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        passDataFromFormToTable: (idCompany,clickCreate) => {
            dispatch(passDataFromFormToModalInCreateAccountAdmin(idCompany,clickCreate));
        },
        showAlert: (properties) => {
            dispatch(actions.showMessageAlert(properties))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreAdminAccountModal);
