import React, { Component } from 'react'

class EmailInformationModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    convertStatusEmail(status){
        return (status === 1) ? "Sent" : "Error";
    }

    render() {
        if(this.props.currentEmail){
        return (
            <div
            className="modal fade"
            id="emailinformation"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="scrollmodalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="scrollmodalLabel">
                    Email 
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
                            Type
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentEmail.type}</p>
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
                            Sender
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentEmail.sender.username}</p>
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
                            Recipient
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentEmail.to}</p>
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
                            Status
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p> {this.convertStatusEmail(this.props.currentEmail.status)} </p>
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
                            Response
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentEmail.response} </p>
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
                            Created 
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentEmail.created_at}</p>
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
                            Updated 
                        </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>{this.props.currentEmail.updated_at}</p>
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
                    Cancel
                </button>
                </div>
            </div>
            </div>
        </div>
        )}else{
            return (<div></div>)
        }
    }
}

export default EmailInformationModal
