import React, { Component } from 'react';

class RegisterInformationModal extends Component {
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
                result = "Less than 50 employees";   
                break; 
            case 2:
                result = "From 50 to 100 employees";   
                break;  
            case 3:
                result = "From 100 to 200 employees";   
                break;  
            case 4:
                result = "From 200 to 300 employees";   
                break;  
            case 5:
                result = "Less More than 300 employees";   
                break;                                                          
            default:
                break;
        }
        return result;
    }

    render() {
        return (
            <div
            className="modal fade"
            id="registerinfomodal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="scrollmodalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="scrollmodalLabel">
                    Company 
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
                            Company
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentCompany.name}</p>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Signature
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentCompany.signature}</p>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Address
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentCompany.address}</p>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Field
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p> {this.convertFieldOfCompany(this.props.currentCompany.field)} </p>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            WorkForce
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.convertWorkforceCompany(this.props.currentCompany.workforce)} </p>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Ceo 
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentCompany.ceo}</p>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col col-md-3">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Contact 
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentCompany.contact}</p>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                    </div>
                    {/* <div className="row form-group">
                        <div className="col col-md-3">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Approved By 
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>Trần Viết Huy</p>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                    </div> */}
                    {/* <div className="row form-group">
                        <div className="col col-md-3">

                        </div>
                        <div className="col-12 col-md-9">
                            <button type="button" style={{float: 'left',}} className="btn btn-success">Generate Account</button>
                            <button type="button" style={{float: 'left', marginLeft: '10px'}} className="btn btn-primary">Send</button>
                        </div>
                    </div> */}
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

export default RegisterInformationModal;
