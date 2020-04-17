import React, { Component } from "react";

class ProcessItemCompany extends Component {
  render() {
    return (
        <tr>
            <td>
            <span className="table-data__info">
                <h6> Quy trình quản lí nhân sự </h6>
            </span>
            </td>
            <td>
            <div className="table-data__info">
                <h6>lori lynch</h6>
                <span>
                <a href="##">johndoe@gmail.com</a>
                </span>
            </div>
            </td>
            <td>
            <span className="date">20/10/2020</span>
            </td>
            <td>
            <span className="table-data__info">
                <h6> Success </h6>
            </span>
            </td>
            <td>
            <span className="role admin">
                <a href="##" className="btn--detail__process">
                Detail
                </a>
            </span>
            </td>
            <td>
            <span className="more">
                <i className="zmdi zmdi-more" />
            </span>
            </td>
        </tr>
    );
  }
}

export default ProcessItemCompany;
