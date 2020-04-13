import React, { Component } from 'react'

class RejectReasonModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
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
                    Feedback
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
                            Reason
                        </label>
                        </div>
                        <div className="col-12 col-md-8">
                            <textarea rows="10" className="form-control" id="reason" name="reason"></textarea>
                            <small className="form-text text-muted">
                            </small>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col col-md-3"></div>
                        <div className="col-12 col-md-9">
                            <button type="button" style={{float: 'left',}} className="btn btn-success">Send to Email</button>
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
        )
    }
}

export default RejectReasonModal;
