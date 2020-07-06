import React, { Component } from 'react'
import { connect } from 'react-redux';
import host from "../../../Host/ServerDomain"; 
import '../../Css/Detail.css';

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderEmployee = (assign, type) =>{
        var content = '';
        if(type === 4){
            return "Toàn bộ công ty";
        }if(type === 5){
            var employees = assign.employees;
            var roles = assign.roles;
            var departments = assign.departments;
            for (let index = 0; index < employees.length; index++) {
                content += '<p className="form-control">' + employees[index].label + '</p>';
            }
            if(roles){
                for (let index = 0; index < roles.length; index++) {
                    content += '<p className="form-control">' + roles[index].label + '</p>';
                } 
            }
            if(departments){
                for (let index = 0; index < departments.length; index++) {
                    content += '<p className="form-control">' + departments[index].label + '</p>';
                } 
            }
            return content;
        }else{
            for (let index = 0; index < assign.length; index++) {
                content += '<p className="form-control">' + assign[index].label + '</p>';
            }
            return content;
        }
    } 

    renderLinkDownloadDocument(info) {
        if(info && info.document){
            return (<a className="btn btn-info download-document" target="_blank"  rel="noopener noreferrer" href={host + '/' + info.document}> Tải về <i className="fas fa-download"></i></a>);
        }else{
            return (<></>)
        }
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
                                <h4 className="title-section">Thông tin</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <p className=" form-control-label content-note-detail">
                                    Mã quy trình
                                </p>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p className="content-note-detail"> {this.props.detail.code}</p>
                            </div>
                        </div> 
                        <div className="row row-detail">
                            <div className="col-md-3">
                                <p className=" form-control-label content-note-detail">
                                    Tên quy trình
                                </p>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p className="content-note-detail"> {this.props.detail.name}</p>
                            </div>
                        </div>           
                        <div className="row row-detail">
                            <div className="col-md-3">
                                <p className=" form-control-label content-note-detail">
                                    Thời gian
                                </p>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p className="content-note-detail"> {this.props.detail.time}</p>
                            </div>
                        </div>
                        <div className="row row-detail">
                            <div className="col-md-3">
                            <p className="form-control-label content-note-detail">
                                Ban hành
                            </p>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p className="content-note-detail"> {this.props.detail.deadline}</p>
                            </div>
                        </div>
                        <div className="row row-detail">
                            <div className="col-md-3">
                                <p className=" form-control-label content-note-detail">
                                    Giao cho
                                </p>
                            </div>
                            <div className="col-md-9 content-note-detail"  
                                dangerouslySetInnerHTML={{__html: this.renderEmployee(this.props.detail.assign, this.props.detail.type)}}>
                            </div>
                        </div>
                        <div className="row row-detail">
                            <div className="col-md-3">
                                <p className=" form-control-label content-note-detail">
                                    Mô tả
                                </p>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p className="content-note-detail"> {this.props.detail.description} </p>
                            </div>
                        </div>
                        <div className="row row-detail">
                            <div className="col-md-3">
                            <p className=" form-control-label content-note-detail">
                                Tài liệu
                            </p>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p className="content-note-detail"> {this.renderLinkDownloadDocument(this.props.detail)}</p>
                            </div>
                        </div>
                    </form>
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
                            <div className="col-md-9 letf-colum-detail form"  >
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
                            <div className="col-md-9 letf-colum-detail form"  >
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
                        <div className="row">
                            <div className="col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Tài liệu
                            </label>
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <p> </p>
                            </div>
                        </div>
                    </form>
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

export default connect(mapStateToProps)(Detail)