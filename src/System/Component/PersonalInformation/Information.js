import React, { Component } from "react";
import avatar from "../../Images/Account/Avatar-01.jpg";
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";

export default class Information extends Component {
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
                    <div className="col-md-4">
                      <div className="avatar--user">
                        <img src={avatar} alt="user" className="image--user" />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h2 className="mb-5 manage__account--information">
                        Persional Information
                      </h2>
                      <div className="information--user">
                        <table className="table">
                          <tbody>
                            <tr>
                              <th scope="col">Name</th>
                              <td>Pham Hoan</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-success btn--edit_user"
                                  data-toggle="modal"
                                  data-target="#scrollmodal"
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <th scope="col">Address</th>
                              <td>Ha Noi</td>
                            </tr>
                            <tr>
                              <th scope="col">Phone</th>
                              <td>0968823514</td>
                            </tr>
                            <tr>
                              <th scope="col">Email</th>
                              <td>nhatvan023@gmail.com</td>
                            </tr>
                            <tr>
                              <th scope="col">Birthday</th>
                              <td>21/06/97</td>
                            </tr>
                            <tr>
                              <th scope="col">Company</th>
                              <td>Cong ty dich vong cau giay </td>
                            </tr>
                            <tr>
                              <th scope="col">Department</th>
                              <td>Sale</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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
                        Persional Information
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
                            action
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
                                  placeholder
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
                                  htmlFor="hf-email"
                                  className=" form-control-label"
                                >
                                  Email
                                </label>
                              </div>
                              <div className="col-12 col-md-9">
                                <input
                                  type="email"
                                  id="hf-email"
                                  name="hf-email"
                                  placeholder
                                  className="form-control"
                                />
                                <span className="help-block">
                                  Please enter your email
                                </span>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <label
                                  htmlFor="hf-email"
                                  className=" form-control-label"
                                >
                                  Phone
                                </label>
                              </div>
                              <div className="col-12 col-md-9">
                                <input
                                  type="number"
                                  id="hf-email"
                                  name="hf-email"
                                  placeholder
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <label
                                  htmlFor="hf-email"
                                  className=" form-control-label"
                                >
                                  Address
                                </label>
                              </div>
                              <div className="col-12 col-md-9">
                                <input
                                  type="text"
                                  id="hf-email"
                                  name="hf-email"
                                  placeholder
                                  className="form-control"
                                />
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
                                  htmlFor="file-input"
                                  className=" form-control-label"
                                >
                                  Avatar
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
