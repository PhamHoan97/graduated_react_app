import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditInformationProcessModal from './EditInformationProcessModal';

class EditDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    renderAssign = (data, type) =>{
        if(type === 4){
            return "Toàn bộ công ty";
        }else {
            var content = '';
            if(Array.isArray(data)){
                for (let index = 0; index < data.length; index++) {
                    content += '<p className="form-control">' + data[index].label + '</p>';
                }
            }
            return content;
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
                            <div className="col-md-9 letf-colum-detail form"  
                                dangerouslySetInnerHTML={{__html: this.renderAssign(this.props.detail.assign, this.props.detail.type)}}>
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
                        <div className="row" style={{marginTop:"10px"}}>
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-9 letf-colum-detail">
                                <button 
                                    type="button"
                                    className="btn btn-primary iso-btn"                   
                                    data-toggle="modal"
                                    data-target="#form-edit-process">
                                    Sửa
                                </button>
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
                                <button className="btn btn-primary iso-btn"> Sửa</button>
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

export default connect(mapStateToProps)(EditDetail)