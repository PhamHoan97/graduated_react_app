import React, { Component } from "react";
import Menu from "../Menu";
import Sidebar from "../Sidebar";
import "../Style/EmployeeProcess.scss"

class DashboardEmployee extends Component {
  render() {
    return (
      <div id="content-employee_page" className="main-wrapper">
        <Menu />
        <Sidebar />
        <div className="page-wrapper content-notification">
          <div className="container-fluid">
            <div className="row mb-4 mt-4">
              <div className="col-sm-12 col-md-12">
                <h3 className="page-title_employee">Trang chủ</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardEmployee;
