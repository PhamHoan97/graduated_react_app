import React, { Component } from "react";

class ProcessItemCompany extends Component {
  render() {
    return (
        <tr>
            <td>
            <span className="table-data__info">
                <h6> {this.props.name} </h6>
            </span>
            </td>
            <td>
            <div className="table-data__info">
                <h6>{this.props.employee}</h6>
            </div>
            </td>
            <td>
            <span className="date">{this.props.date}</span>
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
