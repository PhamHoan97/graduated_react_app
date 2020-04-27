import React, { Component } from 'react';
import SelectDepartmentToAssign from './SelectDepartmentToAssign';
import AssignEmployeeSelect from './AssignEmployeeSelect';

class FormAddProcessModal extends Component {
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
                    New process
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
                  <div className="card">
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
                              Name
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Name..."
                              className="form-control"
                            />
                            <small className="form-text text-muted">
                            </small>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="textarea-input"
                              className=" form-control-label"
                            >
                              Description
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <textarea
                              name="description"
                              id="description"
                              rows={9}
                              placeholder="Content..."
                              className="form-control"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="file-input"
                              className=" form-control-label"
                            >
                              File input
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="file"
                              id="file-input"
                              name="file-input"
                              className="form-control-file"
                            />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="disabled-input"
                              className=" form-control-label"
                            >
                              Department
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <SelectDepartmentToAssign />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="disabled-input"
                              className=" form-control-label"
                            >
                              Assign to
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <AssignEmployeeSelect />
                          </div>
                        </div>
                      </form>
                    </div>
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
                  <button type="button" className="btn btn-primary">
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default FormAddProcessModal
