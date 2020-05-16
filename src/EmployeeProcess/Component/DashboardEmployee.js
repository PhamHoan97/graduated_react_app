import React, { Component } from "react";
import Menu from "../Menu";
import EmployeePage from "./EmployeePage";
import Sidebar from "../Sidebar";
import "../Style/EmployeeProcess.scss"

class DashboardEmployee extends Component {
  render() {
    return (
      <div id="content-employee_page" className="main-wrapper">
        <Menu />
        <Sidebar />
        <EmployeePage/>
      </div>
    );
  }
}

export default DashboardEmployee;
