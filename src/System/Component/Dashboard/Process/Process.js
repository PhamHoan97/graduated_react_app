import React, { Component } from "react";

class Process extends Component {
  render() {
    return (
        <div>
            {/* DATA TABLE*/}
            <div className="table-responsive m-b-40">
            <table className="table table-borderless table-data3">
                <thead>
                <tr>
                    <th></th>
                    <th>Mã quy trình</th>
                    <th>Tên</th>
                    <th>Công ty</th>
                    <th>Thể loại</th>
                    <th>Chi tiết</th>
                </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
            </div>
        </div>
    );
  }
}

export default Process;
