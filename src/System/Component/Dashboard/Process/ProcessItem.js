import React, { Component } from "react";

class ProcessItem extends Component {
  render() {
    return (
        <tr>
            <td>{this.props.name}</td>
            <td>{this.props.company}</td>
            <td>{this.props.department}</td>
            <td>{this.props.date}</td>
            <td>
            <span className="role admin">
                <a href="##" style={{ color: "white", textDecoration: "none" }}>
                Chi tiết
                </a>
            </span>
            </td>
            <td>
            <div className="table-data-feature">
                {/* <button
                className="item"
                data-toggle="tooltip"
                data-placement="top"
                title="Evaluate Form"
                >
                <i className="zmdi zmdi-file" />
                </button> */}
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
    );
  }
}

export default ProcessItem;
