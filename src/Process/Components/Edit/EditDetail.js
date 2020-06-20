import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditInformationProcessModal from './EditInformationProcessModal';
import * as actions from '../../Actions/Index';
import * as actionAlerts from '../../../Alert/Action/Index';

class EditDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    renderAssign = (assign, type) =>{
        var content = '';
        if(type === 4){
            return "Toàn bộ công ty";
        }else if(type === 5){
            var employees = assign.employees;
            for (let index = 0; index < employees.length; index++) {
                content += '<p className="form-control">' + employees[index].label + '</p>';
            }
            if(assign.roles){
                var roles = assign.roles;
                for (let index = 0; index < roles.length; index++) {
                    content += '<p className="form-control">' + roles[index].label + '</p>';
                }
            }
            if(assign.departments){
                var departments = assign.departments;
                for (let index = 0; index < departments.length; index++) {
                    content += '<p className="form-control">' + departments[index].label + '</p>';
                }
            }
            return content;
        }
        else{
            for (let index = 0; index < assign.length; index++) {
                content += '<p className="form-control">' + assign[index].label + '</p>';
            }
            return content;
        }
    } 

    openEditProcessModal = (e) => {
        e.preventDefault();
        document.getElementById('clone-button-edit-process').click();
        this.props.clickOpenModalEditProcessInfo();
    }

    resetDataOfProcess = (e) => {
        e.preventDefault();
        this.props.showAlert({
          message: "Phục hổi mặc định thông tin của quy trình",
          anchorOrigin:{
              vertical: 'top',
              horizontal: 'right'
          },
          title:'Thành công',
          severity:'success'
        });
        setTimeout(function(){ 
          window.location.reload();
        }, 1000);
    }

    render() {
        if(this.props.detail && this.props.detail.time){
            return (
                <div className="detail-area-view-process">
                    <form
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal"
                    >
                        <div className="row">
                            <div className="col-md-5 title-footer">
                                <h4>Thông tin</h4>
                            </div>
                        </div> 
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Mã quy trình
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p> {this.props.detail.code}</p>
                            </div>
                        </div>   
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Tên quy trình
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p>{this.props.detail.name}</p>
                            </div>
                        </div>         
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Thời gian
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p> {this.props.detail.time}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Deadline
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p> {this.props.detail.deadline}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Giao cho
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail"  
                                dangerouslySetInnerHTML={{__html: this.renderAssign(this.props.detail.assign, this.props.detail.type)}}>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:"10px"}}>
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Mô tả
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p> {this.props.detail.description}. </p>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:"10px"}}>
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <div className="btn-group">
                                    <button 
                                        type="button"
                                        className="btn btn-primary iso-btn"                   
                                        onClick={(e) => this.openEditProcessModal(e)}
                                    >
                                        Sửa <i className="far fa-edit"></i>
                                    </button>
                                    <button 
                                        id = "clone-button-edit-process"
                                        type="button"
                                        className="btn btn-primary iso-btn"                   
                                        data-toggle="modal"
                                        data-target="#form-edit-process"
                                        style={{display: "none"}}
                                    >
                                        Sửa 
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={(e) => this.resetDataOfProcess(e)} style={{float:"left", marginLeft:"5px"}}>
                                        Phục hồi <i className="fas fa-undo"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <EditInformationProcessModal />
                </div>
            )
        }else{
            return (
                <div className="detail-area-view-process">
                    <form
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal"
                    >
                        <div className="row">
                            <div className="col-md-5 title-footer">
                                <h4>Thông tin</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Mã quy trình
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p> {this.props.detail.code}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Tên quy trình
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p></p>
                            </div>
                        </div>            
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Thời gian
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                            <p></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Deadline
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Giao cho
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail form"  >
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Mô tả
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p> </p>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:"10px"}}>
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <button 
                                    type="button"
                                    className="btn btn-primary iso-btn"                   
                                    onClick={(e) => this.openEditProcessModal(e)}
                                >
                                    Sửa <i className="far fa-edit"></i>
                                </button>
                                <button 
                                    id = "clone-button-edit-process"
                                    type="button"
                                    className="btn btn-primary iso-btn"                   
                                    data-toggle="modal"
                                    data-target="#form-edit-process"
                                    style={{display: "none"}}
                                >
                                    Sửa
                                </button>
                            </div>
                        </div>
                    </form>
                    <EditInformationProcessModal />
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        detail: state.addProcessReducers.informationProcessReducer.information,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clickOpenModalEditProcessInfo: () => {
            dispatch(actions.clickOpenModalEditProcessInfo())
        },
        showAlert: (properties) => {
            dispatch(actionAlerts.showMessageAlert(properties))
          },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDetail)