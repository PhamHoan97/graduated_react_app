import React, { Component } from "react";
import Menu from "../Menu";
import Sidebar from "../Sidebar";
import "../Style/EmployeeProcess.scss"

class NotificationEmployee extends Component {
  render() {
    return (
      <div id="content-employee_page" className="main-wrapper">
        <Menu />
        <Sidebar />
        <div className="page-wrapper content-notification">
          <div className="container-fluid">
            <div className="row mb-4 mt-4">
              <div className="col-sm-6 col-md-4">
                <h3 className="page-title_employee">Danh sách thông báo</h3>
              </div>
            </div>
            <div className="row filter-row">
              <div
                className="col-sm-6 col-md-4 text-center"
                style={{ fontFamily: "initial" }}
              >
                <label className="mb-2 label-search_notification">Tên thông báo</label>
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" />
                </div>
              </div>
              <div
                className="col-sm-6 col-md-4 text-center"
                style={{ fontFamily: "initial" }}
              >
                <label className="mb-2 label-search_notification">Ngày tạo</label>
                <div className="form-group form-focus">
                  <input
                    className="form-control floating"
                    type="datetime-local"
                    id="example-datetime-local-input"
                  />
                </div>
              </div>
              <div
                className="col-sm-6 col-md-4 text-center"
                style={{ fontFamily: "initial" }}
              >
                <label className="mb-2" />
                <a href="##" className="btn btn-success btn-block mt-2 btn-notification_search">
                  {" "}
                  Tìm kiếm{" "}
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-striped custom-table mb-0 table-notification_employee">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Nội dung</th>
                        <th>Ngày</th>
                        <th>Người tạo</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="estimate-view.html">EST-0001</a>
                        </td>
                        <td>Global Technologies</td>
                        <td>11 Mar 2019</td>
                        <td>HoanPham</td>
                        <td>
                          <span className="badge bg-inverse-success">
                            Đã xem
                          </span>
                        </td>
                        <td>
                          <div className="table-action">
                            <a
                              href="edit-review.html"
                              className="btn btn-sm btn-outline-success mr-2"
                            >
                              <span className="lnr lnr-pencil" /> Chi tiết
                            </a>
                            <a
                              href="##"
                              className="btn btn-sm btn-outline-danger"
                              data-toggle="modal"
                              data-target="#delete"
                            >
                              <span className="lnr lnr-trash" /> Xóa
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="estimate-view.html">EST-0001</a>
                        </td>
                        <td>Global Technologies</td>
                        <td>11 Mar 2019</td>
                        <td>HoanPham</td>
                        <td>
                          <span className="badge bg-inverse-success">
                            Accepted
                          </span>
                        </td>
                        <td>
                          <div className="table-action">
                            <a
                              href="edit-review.html"
                              className="btn btn-sm btn-outline-success mr-2"
                            >
                              <span className="lnr lnr-pencil" /> Send
                            </a>
                            <a
                              href="edit-review.html"
                              className="btn btn-sm btn-outline-success mr-2"
                            >
                              <span className="lnr lnr-pencil" /> Detail
                            </a>
                            <a
                              href="##"
                              className="btn btn-sm btn-outline-danger mr-2"
                              data-toggle="modal"
                              data-target="#delete"
                            >
                              <span className="lnr lnr-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationEmployee;
