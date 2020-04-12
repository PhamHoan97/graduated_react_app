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
                    <th>Name</th>
                    <th>Company</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Detail</th>
                    <th />
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
