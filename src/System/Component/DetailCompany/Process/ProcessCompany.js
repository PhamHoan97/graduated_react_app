import React, { Component } from "react";
import DepartmentItemCompany from "./DepartmentItemCompany"
import ProcessItemCompany from "./ProcessItemCompany"

export default class ProcessCompany extends Component {
  render() {
    return (
      <div className="user-data m-b-40">
        <h3 className="title-3 m-b-30 detail--company__title">
          <i className="zmdi zmdi-account-calendar" />
          process data
        </h3>
        <div className="filters m-b-45">
          <div className="rs-select2--dark rs-select2--md m-r-10 rs-select2--border">
            <select className="js-select2 select--department__detail_company" name="property">
              <option value="">Department</option>
              <DepartmentItemCompany/>
              <DepartmentItemCompany/>
              <DepartmentItemCompany/>
              <DepartmentItemCompany/>
            </select>
            <div className="dropDownSelect2" />
          </div>
          <div className="rs-select2--dark rs-select2--sm rs-select2--border">
            <select className="js-select2 au-select-dark select--time__detail_company" name="time">
              <option value="">All Time</option>
              <option value>By Month</option>
              <option value>By Day</option>
            </select>
            <div className="dropDownSelect2" />
          </div>
        </div>
        <div className="table-responsive table-data">
          <table className="table">
            <thead>
              <tr>
                <td>Name</td>
                <td>Admin</td>
                <td>Date</td>
                <td>Status</td>
                <td>Detail</td>
                <td />
              </tr>
            </thead>
            <tbody>
               <ProcessItemCompany/>
               <ProcessItemCompany/>
               <ProcessItemCompany/>
               <ProcessItemCompany/>
            </tbody>
          </table>
        </div>
        <div className="user-data__footer">
          <button className="au-btn au-btn-load">load more</button>
        </div>
      </div>
    );
  }
}
