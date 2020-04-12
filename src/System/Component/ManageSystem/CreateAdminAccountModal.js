import React, { Component } from 'react';
import AdminAcountTable from "./AdminAcountTable";

class CreateAdminAccountModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div
            className="modal fade"
            id="scrollmodal"
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
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Example: Tbxkdrld12"
                                className="form-control"
                            />
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
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Example: Abcdxyz123"
                                className="form-control"
                            />
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
                            <button type="button" style={{float: 'left',}} className="btn btn-success">Generate Account</button>
                            <button type="button" style={{float: 'left', marginLeft: '10px'}} className="btn btn-primary">Send</button>
                        </div>
                    </div>
                    <div className="row form-group">
                        <AdminAcountTable/>
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

export default CreateAdminAccountModal
