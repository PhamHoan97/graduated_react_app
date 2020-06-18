import React, { Component } from 'react'
import { connect } from 'react-redux';
import host from "../../../Host/ServerDomain"; 

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderEmployee = (employees, type) =>{
        var content = '';
        if(type === 4){
            return "Toàn bộ công ty"
        }else{
            for (let index = 0; index < employees.length; index++) {
                content += '<p className="form-control">' + employees[index].label + '</p>';
            }
            return content;
        }
    } 

    renderLinkDownloadDocument(info) {
        if(info && info.document){
            return (<a className="link-download-document" href={host + '/' + info.document}> Tải tài liệu tại đây</a>);
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
                                <p> {this.props.detail.name}</p>
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
                            <div className="col-md-9 letf-colum-detail form">
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
                            <div className="col-md-9 letf-colum-detail form"  
                                dangerouslySetInnerHTML={{__html: this.renderEmployee(this.props.detail.assign, this.props.detail.type)}}>
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
                                <p> {this.props.detail.description}. </p>
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
                                <p> {this.renderLinkDownloadDocument(this.props.detail)}</p>
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