import React, { Component } from "react";

export default class ProcessAllList extends Component {
  render() {
    return (
      <div>
        {/* DATA TABLE*/}
        <div className="table-responsive m-b-40">
          <table className="table table-borderless table-data3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Department</th>
                <th>Date</th>
                <th>Detail</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Quy trinh them nhan su </td>
                <td>Mobile</td>
                <td>Phong Nhan su</td>
                <td>2018-09-28 01:22</td>
                <td>
                  <span className="role admin">
                    <a href="##" style={{ color: "white", textDecoration: "none" }}>
                      Detail
                    </a>
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
                      title="More"
                    >
                      <i className="zmdi zmdi-more" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Quy trinh them nhan su </td>
                <td>Mobile</td>
                <td>Phong Nhan su</td>
                <td>2018-09-28 01:22</td>
                <td>
                  <span className="role admin">
                    <a href="##" style={{ color: "white", textDecoration: "none" }}>
                      Detail
                    </a>
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
                      title="More"
                    >
                      <i className="zmdi zmdi-more" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Quy trinh them nhan su </td>
                <td>Mobile</td>
                <td>Phong Nhan su</td>
                <td>2018-09-28 01:22</td>
                <td>
                  <span className="role admin">
                    <a href="##" style={{ color: "white", textDecoration: "none" }}>
                      Detail
                    </a>
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
                      title="More"
                    >
                      <i className="zmdi zmdi-more" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* END DATA TABLE*/}
        {/* Pagination */}
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="##">
              Trước
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="##">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="##">
              2
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="##">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="##">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="##">
              5
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="##">
              Sau
            </a>
          </li>
        </ul>
        {/* End Pagination */}
      </div>
    );
  }
}
