import React, { Component } from "react";
import Menu from "../Menu";
import Sidebar from "../Sidebar";
import "../Style/EmployeeProcess.scss";
import axios from "axios";
import host from '../../Host/ServerDomain'; 
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {getDetailNotificationSystemEmployee} from "../Actions/Index";

class NotificationEmployee extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listNotificationEmployeeFromSystem: [],
      listNotificationEmployeeFromCompany: [],
      textDateSearch:"",
      textNameSearch:"",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;
    const value =event.target.value;
    this.setState({
      [name]: value,
    })
  }
  getListNotificationFromSystem = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/employee/notification/list/system",
        {
          token: token,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (self._isMounted) {
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              listNotificationEmployeeFromSystem:
                response.data.notificationEmployeesSystem,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getListNotificationFromCompany = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/employee/notification/list/company",
        {
          token: token,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (self._isMounted) {
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              listNotificationEmployeeFromCompany:
                response.data.notificationFromCompany,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getListNotificationFromCompany();
    this.getListNotificationFromSystem();
  }


  deleteNotificationCompany = (e,idNotificationFromCompany) =>{
    e.preventDefault();
    var self = this;
    var token = localStorage.getItem("token");
    axios.post(host + '/api/employee/notification/company/delete', {
      idNotificationFromCompany:idNotificationFromCompany
    },{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
        console.log(response.data.error);
        } else {
          self.getListNotificationFromCompany();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  deleteNotificationSystem = (e,idNotificationFromSystem) =>{
    e.preventDefault();
    var self = this;
    var token = localStorage.getItem("token");
    axios.post(host + '/api/employee/notification/system/delete', {
      idNotificationFromSystem:idNotificationFromSystem
    },{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
        console.log(response.data.error);
        } else {
          self.getListNotificationFromSystem();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  render() {
    return (
      <div id="content-employee_page" className="main-wrapper">
        <Menu />
        <Sidebar />
        <div className="page-wrapper content-notification">
          <div className="container-fluid">
            <div className="row mb-4 mt-4">
              <div className="col-sm-6 col-md-4">
                <h3 className="page-title_employee">Danh sách thông báo</h3>
              </div>
            </div>
            {/* <div className="row filter-row">
              <div
                className="col-sm-6 col-md-4 text-center"
                style={{ fontFamily: "initial" }}
              >
                <label className="mb-2 label-search_notification">
                  Tên thông báo
                </label>
                <div className="form-group form-focus">
                <input
                  type="text"
                  name="textNameSearch"
                  className="form-control floating"
                  value={this.state.textNameSerach}
                  onChange={(event) => this.handleChange(event)}
                />
                </div>
              </div>
              <div
                className="col-sm-6 col-md-4 text-center"
                style={{ fontFamily: "initial" }}
              >
                <label className="mb-2 label-search_notification">
                  Ngày tạo
                </label>
                <div className="form-group form-focus">
                  <select
                  name="textDateSearch"
                  className="form-control floating"
                  value={this.state.textDateSearch}
                  onChange={(event) => this.handleChange(event)}
                  id="exampleFormControlSelect2">
                    <option value="0">Tất cả các ngày</option>
                    <option value="1">1 ngày</option>
                    <option value="5">1 tuần</option>
                    <option value="30">1 tháng</option>
                  </select>
                </div>
              </div>
              <div
                className="col-sm-6 col-md-4 text-center"
                style={{ fontFamily: "initial" }}
              >
                <label className="mb-2" />
                <a
                  href="##"
                  className="btn btn-success btn-block mt-2 btn-notification_search"
                >
                  {" "}
                  Tìm kiếm{" "}
                </a>
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-striped custom-table mb-0 table-notification_employee">
                    <thead className="thead-dark">
                      <tr>
                        <th style={{ width: "15%" }}>Tên</th>
                        <th style={{ width: "45%" }}>Nội dung</th>
                        <th style={{ width: "20%" }}>Ngày</th>
                        <th style={{ width: "10%" }}>Trạng thái</th>
                        <th style={{ width: "10%" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.listNotificationEmployeeFromCompany.length !== 0 ? (
                        Object.values(this.state.listNotificationEmployeeFromCompany).map(
                          (notification, index) => {
                            return (
                              <tr key={index}>
                                <td style={{ width: "15%" }}>
                                  <a href="estimate-view.html">{notification.name}</a>
                                </td>
                                <td style={{ width: "45%" }}>{notification.description}</td>
                                <td style={{ width: "20%" }}>{notification.update_at}</td>
                                <td style={{ width: "10%" }}>
                                  <span className="badge bg-inverse-success">
                                  {
                                    parseInt(notification.status)===1 ? ('Đã xem'):('Chưa xem')
                                  }
                                  </span>
                                </td>
                                <td style={{ width: "10%" }}>
                                  <div className="table-action">
                                  <NavLink
                                    to={"/employee/notification/company/detail/"+notification.id}
                                    exact
                                    activeClassName="selected"
                                    activeStyle={{
                                      fontWeight: "bold",
                                      color: "#0074D9",
                                    }}
                                    className="btn btn-sm btn-outline-success mr-2"
                                    >
                                    <span className="lnr lnr-pencil" />{" "}
                                    Chi tiết
                                  </NavLink>
                                  {/* <a
                                    href="##"
                                    className="btn btn-sm btn-outline-danger"
                                    data-toggle="modal"
                                    data-target="#delete"
                                    onClick={(e) => this.deleteNotificationCompany(e,notification.id)}
                                  >
                                    <span className="lnr lnr-trash" /> Xóa
                                  </a> */}
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )
                      ) : (
                        <tr></tr>
                      )}
                      {this.state.listNotificationEmployeeFromSystem.length !== 0 ? (
                        Object.values(this.state.listNotificationEmployeeFromSystem).map(
                          (notification, index) => {
                            return (
                              <tr key={index}>
                              <td style={{ width: "15%" }}>
                                <a href="estimate-view.html">{notification.name}</a>
                              </td>
                              <td style={{ width: "45%" }}>{notification.description}</td>
                              <td style={{ width: "20%" }}>{notification.update_at}</td>
                              <td style={{ width: "10%" }}>
                                <span className="badge bg-inverse-success">
                                {
                                  parseInt(notification.status)===1 ? ('Đã xem'):('Chưa xem')
                                }
                                </span>
                              </td>
                              <td style={{ width: "10%" }}>
                                <div className="table-action">
                                  <NavLink
                                    to={"/employee/notification/system/detail/"+notification.id}
                                    exact
                                    activeClassName="selected"
                                    activeStyle={{
                                      fontWeight: "bold",
                                      color: "#0074D9",
                                    }}
                                    className="btn btn-sm btn-outline-success mr-2"
                                  >
                                    <span className="lnr lnr-pencil" />{" "}
                                    Chi tiết
                                  </NavLink>
                                  {/* <a
                                    href="##"
                                    className="btn btn-sm btn-outline-danger"
                                    data-toggle="modal"
                                    data-target="#delete"
                                    onClick={(e) => this.deleteNotificationSystem(e,notification.id)}
                                  >
                                    <span className="lnr lnr-trash" /> Xóa
                                  </a> */}
                                </div>
                              </td>
                            </tr>
                            );
                          }
                        )
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDetailNotificationSystemEmployee: (detailNotificationSystemEmployee) => {
      dispatch(getDetailNotificationSystemEmployee(detailNotificationSystemEmployee));
    },
  };
};
export default connect(null,mapDispatchToProps)(NotificationEmployee);

