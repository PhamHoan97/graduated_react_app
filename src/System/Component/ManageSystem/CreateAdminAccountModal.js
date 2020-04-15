import React, { Component } from 'react';
import AdminAcountTable from "./AdminAcountTable";
import axios from 'axios';
import {isEmpty } from 'validator';
import {passCompanyIdFromFormToModalInCreateAccountAdmin} from "../../Action/System/Index";
import {connect} from 'react-redux';


class CreateAdminAccountModal extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    generateAdminAccount = event => {
        console.log(123)
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
                idRegistration: this.props.currentCompany,
                username: usernameA,
                password: passwordA,
            };
            console.log(account);
            var token = localStorage.getItem('token');
            axios.post(`http://127.0.0.1:8000/api/system/create/admin`, account,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            }
            )
            .then(res => {
                if(res.data.error != null){
                    console.log(res.data.message);
                }else{
                    console.log(res.data);
                    this.props.passIdFromFormToTable(res.data.admin.company_id);
                }
            }).catch(function (error) {
                alert(error);
            })
        }
    }

    render() {
        return (
            <div
            className="modal fade"
            id="createaccountadmin"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="scrollmodalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="scrollmodalLabel">
                    New Admin Account
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
                            Username
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
                            <small id="error-username-required" className="form-text text-danger" style={{display:'none'}}>This field is required</small>
                            <small id="error-username-length" className="form-text text-danger" style={{display:'none'}}>Length must be at least 8 characters long</small>
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
                            Password
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
                                <small id="error-password-required" className="form-text text-danger" style={{display:'none'}}>This field is required</small>
                                <small id="error-password-length" className="form-text text-danger" style={{display:'none'}}>Length must be at least 8 characters long</small>
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
                            <button onClick={(e) => this.generateAdminAccount(e)} type="button" style={{float: 'left',}} className="btn btn-success">Generate Account</button>
                            <button onClick = {(e) => this.createAdminAccount(e)} type="button" style={{float: 'left', marginLeft: '10px'}} className="btn btn-primary">Create</button>
                        </div>
                    </div>
                    <div className="row form-group">
                        <AdminAcountTable admins = {this.props.currentCompany}/>
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
                    Cancel
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
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        passIdFromFormToTable: (idCompany) => {
            dispatch(passCompanyIdFromFormToModalInCreateAccountAdmin(idCompany));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminAccountModal)
