import React, { Component } from "react";
import "../../Style/Process/process.css";
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";

export default class Process extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <MenuHorizontal />
        <div className="page-container">
          <MenuVertical />
          <div className="main-content">
            <div>
              <div className="section__content section__content--p30">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      {/* DATA TABLE*/}
                      <section className="p-t-20">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              <h3 className="title-5 m-b-35 manage__process--title">
                                Manager Process in company
                              </h3>
                              <div className="table-data__tool">
                                <div className="table-data__tool-left">
                                  <div className="rs-select2--light rs-select2--md">
                                    <select
                                      className="js-select2 select--department__process"
                                      name="property"
                                      defaultValue={"DEFAULT"}
                                    >
                                      <option value="Department">
                                        Department
                                      </option>
                                      <option value="Sale">Sale</option>
                                      <option value="Mid">Mid</option>
                                    </select>
                                    <div className="dropDownSelect2" />
                                  </div>
                                  <div className="rs-select2--light rs-select2--sm">
                                    <select
                                      className="js-select2 select--today__process"
                                      name="time"
                                    >
                                      <option value>Today</option>
                                      <option value>3 Days</option>
                                      <option value>1 Week</option>
                                    </select>
                                    <div className="dropDownSelect2" />
                                  </div>
                                  <button className="au-btn-filter ml-5">
                                    <i className="zmdi zmdi-filter-list" />
                                    filters
                                  </button>
                                </div>
                                <div className="table-data__tool-right">
                                  <button
                                    className="au-btn au-btn-icon au-btn--green au-btn--small"
                                    data-toggle="modal"
                                    data-target="#scrollmodal"
                                  >
                                    <i className="zmdi zmdi-plus" />
                                    add item
                                  </button>
                                  {/* <div class="rs-select2--dark rs-select2--sm rs-select2--dark2">
                                                                        <select class="js-select2" name="type">
                                                                            <option selected="selected">Export</option>
                                                                            <option value="">Option 1</option>
                                                                            <option value="">Option 2</option>
                                                                        </select>
                                                                        <div class="dropDownSelect2"></div>
                                                                    </div> */}
                                </div>
                              </div>
                              <div className="table-responsive table-responsive-data2">
                                <table className="table table-data2">
                                  <thead>
                                    <tr>
                                      <th>
                                        <label className="au-checkbox">
                                          <input type="checkbox" />
                                          <span className="au-checkmark" />
                                        </label>
                                      </th>
                                      <th>name</th>
                                      <th>department</th>
                                      <th>description</th>
                                      <th>date</th>
                                      <th>status</th>
                                      <th />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="tr-shadow">
                                      <td>
                                        <label className="au-checkbox">
                                          <input type="checkbox" />
                                          <span className="au-checkmark" />
                                        </label>
                                      </td>
                                      <td>Lori Lynch AAAAAAAAAA AAAAAAAAAAA</td>
                                      <td>
                                        <span className="block-email">
                                          Sale
                                        </span>
                                      </td>
                                      <td className="desc">Samsung S8 Black</td>
                                      <td>2018-09-27 02:12</td>
                                      <td>
                                        <span className="status--process">
                                          Success
                                        </span>
                                      </td>
                                      <td>
                                        <div className="table-data-feature">
                                          <button
                                            className="item"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Evaluate Form"
                                          >
                                            <i className="zmdi zmdi-file" />
                                          </button>
                                          <button
                                            className="item"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Download"
                                          >
                                            <i className="zmdi zmdi-download" />
                                          </button>
                                          <button
                                            className="item"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Edit"
                                          >
                                            <i className="zmdi zmdi-edit" />
                                          </button>
                                          <button
                                            className="item"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Delete"
                                          >
                                            <i className="zmdi zmdi-delete" />
                                          </button>
                                          <button
                                            className="item"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="More"
                                          >
                                            <i className="zmdi zmdi-more" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr className="spacer" />
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      {/* END DATA TABLE*/}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="copyright">
                        <p>
                          Copyright © 2018 Colorlib. All rights reserved.
                          Template by{" "}
                          <a href="https://colorlib.com">Colorlib</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                                  placeholder=""
                                  className="form-control"
                                />
                                <small className="form-text text-muted">
                                  This is a help text
                                </small>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <label
                                  htmlFor="disabled-input"
                                  className=" form-control-label"
                                >
                                  Company
                                </label>
                              </div>
                              <div className="col-12 col-md-9">
                                <input
                                  type="text"
                                  id="company"
                                  name="company"
                                  placeholder="Disabled"
                                  disabled
                                  className="form-control"
                                />
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
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
