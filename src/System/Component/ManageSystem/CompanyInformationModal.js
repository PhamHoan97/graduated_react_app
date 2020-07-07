import React, { Component } from 'react'

class CompanyInformationModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    
    convertFieldOfCompany = (field) => {
        var result;
        switch (field) {
            case "IT":
                result = "Information Technology";
                break;
            default:
                result = field;
                break;
        }
        return result;
    }

    convertWorkforceCompany = (workforce) => {
        var result;
        switch (workforce) {
            case 1:
                result = "Ít hơn 50 nhân viên";   
                break; 
            case 2:
                result = "Từ 50 đến 100 nhân viên";   
                break;  
            case 3:
                result = "Từ 100 đến 200 nhân viên";   
                break;  
            case 4:
                result = "Từ 200 đến 300 nhân viên";   
                break;  
            case 5:
                result = "Nhiều hơn 300 nhân viên";   
                break;                                                          
            default:
                break;
        }
        return result;
    }

    render() {
        if(this.props.currentCompany){
            return (
                <div
                className="modal fade"
                id="info-company-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="scrollmodalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="scrollmodalLabel">
                        Công ty 
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
                            <div className="col col-md-3 text-left">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Tên công ty
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p>{this.props.currentCompany.name}</p>
                                <small className="form-text text-muted">
                                </small>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3 text-left">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Kí hiệu
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p>{this.props.currentCompany.signature}</p>
                                <small className="form-text text-muted">
                                </small>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3 text-left">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Địa chỉ
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p>{this.props.currentCompany.address}</p>
                                <small className="form-text text-muted">
                                </small>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3 text-left">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Lĩnh vực
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p> {this.convertFieldOfCompany(this.props.currentCompany.field)} </p>
                                <small className="form-text text-muted">
                                </small>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3 text-left">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Nhân lực
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p>{this.convertWorkforceCompany(this.props.currentCompany.workforce)} </p>
                                <small className="form-text text-muted">
                                </small>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3 text-left">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Người đứng đầu 
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p>{this.props.currentCompany.ceo}</p>
                                <small className="form-text text-muted">
                                </small>
                            </div>
                        </div>
    
                        <div className="row form-group">
                            <div className="col col-md-3 text-left">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Liên hệ 
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p>{this.props.currentCompany.contact}</p>
                                <small className="form-text text-muted">
                                </small>
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
                    >
                        Đóng
                    </button>
                    </div>
                </div>
                </div>
            </div>
            )
        }else{
            return (<div></div>)
        }
    }
}

export default CompanyInformationModal;
