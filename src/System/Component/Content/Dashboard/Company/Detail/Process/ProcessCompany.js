import React, { Component } from "react";

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
            <select className="js-select2" name="property">
              <option selected="selected">Department</option>
              <option value>Department 1</option>
              <option value>Department 2</option>
              <option value>Department 3</option>
              <option value>Department 4</option>
            </select>
            <div className="dropDownSelect2" />
          </div>
          <div className="rs-select2--dark rs-select2--sm rs-select2--border">
            <select className="js-select2 au-select-dark" name="time">
              <option selected="selected">All Time</option>
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
                      <a href="#">johndoe@gmail.com</a>
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
                    <a href="#" className="btn--detail__process">
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
                      <a href="#">johndoe@gmail.com</a>
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
                    <a href="#" className="btn--detail__process">
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
                      <a href="#">johndoe@gmail.com</a>
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
                    <a href="#" className="btn--detail__process">
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
