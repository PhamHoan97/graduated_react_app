import React, { Component } from 'react'
import {isEmpty } from 'validator';
import axios from 'axios';
import {loadTableAfterReject} from '../../Action/System/Index'
import { connect } from 'react-redux';
import * as actions from '../../../Alert/Action/Index';
import host from '../../../Host/ServerDomain';

class RejectReasonModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idRegistration : "",
            reason: ""
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        var id = nextProps.currentCompany;
        document.getElementById("reason-reject-textarea").value = "";
        this.setState({idRegistration: id});
    }

    validateForm(reason){
        var check = true;
        if(isEmpty(reason)){
            document.getElementById("error-reason-required").style.display = "block";
            document.getElementById("error-reason-length").style.display = "none";
            check =false;
        }else{
            if(reason.trim().length < 30){
                document.getElementById("error-reason-length").style.display = "block";
                document.getElementById("error-reason-required").style.display = "none";
                check = false;
            }
        }

        if(check){
            document.getElementById("error-reason-required").style.display = "none";
            document.getElementById("error-reason-length").style.display = "none";
        }

        return check;
    }

    sendRejectEmail = () =>{
        var reasonReject = this.state.reason;
        if(this.validateForm(reasonReject)){
            var id = this.state.idRegistration;
            var token = localStorage.getItem('token');
            var data = {
                idRegistration : id,
                reason: reasonReject,
                tokenData: token,
            };
    
            axios.post(host + `/api/system/send/email/reject`,data,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(res => {
                if(res.data.error != null){
                    this.props.showAlert({
                        message: res.data.message,
                        anchorOrigin:{
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        title:'Th???t b???i',
                        severity:'error'
                    });
                }else{
                    this.props.loadDataAfterReject(true);
                    this.props.showAlert({
                        message: res.data.message,
                        anchorOrigin:{
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        title:'Th??nh c??ng',
                        severity:'success'
                    });
                    document.getElementById("cancel-reject-modal").click();
                }
            }).catch(function (error) {
            alert(error);
            })
        }
    }

    changeReasonContent = event => {
        this.setState({reason: event.target.value});
        this.validateForm(this.state.reason);
    }

    render() {
        return (
            <div
            className="modal fade"
            id="rejectmodal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="scrollmodalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="scrollmodalLabel">
                    H???i ????p
                </h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">??</span>
                </button>
                </div>
                <div className="modal-body">
                <div className="card-body card-block">
                    <form
                        encType="multipart/form-data"
                        className="form-horizontal"
                    >
                    <div className="row form-group">
                        <div className="col col-md-3">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label required"
                        >
                            L?? do
                        </label>
                        </div>
                        <div className="col-12 col-md-8">
                            <div>
                                <textarea onChange={this.changeReasonContent} rows="10" className="form-control" id="reason-reject-textarea" name="reason"></textarea>
                                <small id="error-reason-required" className="form-text text-danger" style={{display:'none'}}>Kh??ng ???????c ????? tr???ng</small>
                                <small id="error-reason-length" className="form-text text-danger" style={{display:'none'}}>L?? do t??? ch???i ph???i r?? r??ng</small>
                            </div>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3"></div>
                        <div className="col-12 col-md-9">
                            <button onClick={this.sendRejectEmail.bind(this)} type="button" style={{float: 'left',}} className="btn btn-success">G???i Email</button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    id="cancel-reject-modal"
                >
                    ????ng
                </button>
                </div>
            </div>
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadDataAfterReject: (loadDataTable) => {
            dispatch(loadTableAfterReject(loadDataTable))
        },
        showAlert: (properties) => {
            dispatch(actions.showMessageAlert(properties))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RejectReasonModal);
