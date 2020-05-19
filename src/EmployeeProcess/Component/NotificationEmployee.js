import React, { Component } from "react";
import Menu from "../Menu";
import Sidebar from "../Sidebar";
import "../Style/EmployeeProcess.scss";
import axios from "axios";
import * as host from "../Url";
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {getDetailNotificationSystemEmployee} from "../Actions/Index"
class NotificationEmployee extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listNotificationEmployeeFromSystem: [],
      listNotificationEmployeeFromCompany: [],
    };
  }
  getListNotificationFromSystem = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    var idAccount = localStorage.getItem("account_id");
    axios
      .post(
        host.URL_BACKEND + "/api/employee/notification/list/system",
        {
          idAccount: idAccount,
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
    var idAccount = localStorage.getItem("account_id");
    axios
      .post(
        host.URL_BACKEND + "/api/employee/notification/list/company",
        {
          idAccount: idAccount,
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

  getDetailNotificationSystem = (idNotificationSystemEmployee) =>{
    var self = this;
    var token = localStorage.getItem("token");
    axios.post(host.URL_BACKEND + "/api/employee/notification/response",{
      idNotificationSystemEmployee:idNotificationSystemEmployee
    },{
      headers: { Authorization: "Bearer " + token },
    })
    .then(function (response) {
      if (response.data.error != null) {
        console.log(response.data.error);
      } else {
         self.props.getDetailNotificationSystemEmployee(response.data.notificationEmployee)
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
            <div className="row filter-row">
              <div
                className="col-sm-6 col-md-4 text-center"
                style={{ fontFamily: "initial" }}
              >
                <label className="mb-2 label-search_notification">
                  Tên thông báo
                </label>
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" />
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
                  <input
                    className="form-control floating"
                    type="datetime-local"
                    id="example-datetime-local-input"
                  />
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
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-striped custom-table mb-0 table-notification_employee">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Nội dung</th>
                        <th>Ngày</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.listNotificationEmployeeFromCompany.length !== 0 ? (
                        Object.values(this.state.listNotificationEmployeeFromCompany).map(
                          (notification, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <a href="estimate-view.html">{notification.name}</a>
                                </td>
                                <td>{notification.description}</td>
                                <td>{notification.update_at}</td>
                                <td>
                                  <span className="badge bg-inverse-success">
                                  {
                                    parseInt(notification.status)===1 ? ('Responsed'):('Pending')
                                  }
                                  </span>
                                </td>
                                <td>
                                  <div className="table-action">
                                  {
                                    parseInt(notification.status)===1 ? (<div></div>):(
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
                                    )
                                  }
                                  <a
                                    href="##"
                                    className="btn btn-sm btn-outline-danger"
                                    data-toggle="modal"
                                    data-target="#delete"
                                  >
                                    <span className="lnr lnr-trash" /> Xóa
                                  </a>
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
                              <td>
                                <a href="estimate-view.html">{notification.name}</a>
                              </td>
                              <td>{notification.description}</td>
                              <td>{notification.update_at}</td>
                              <td>
                                <span className="badge bg-inverse-success">
                                {
                                  parseInt(notification.status)===1 ? ('Responsed'):('Pending')
                                }
                                </span>
                              </td>
                              <td>
                                <div className="table-action">
                                {
                                    parseInt(notification.status)===1 ? (<div></div>):(
                                      <NavLink
                                        to={"/employee/notification/system/detail/"+notification.id}
                                        exact
                                        activeClassName="selected"
                                        activeStyle={{
                                          fontWeight: "bold",
                                          color: "#0074D9",
                                        }}
                                        className="btn btn-sm btn-outline-success mr-2"
                                        onClick={this.getDetailNotificationSystem(notification.id)}
                                      >
                                        <span className="lnr lnr-pencil" />{" "}
                                        Chi tiết
                                      </NavLink>
                                    )
                                  }
                                  <a
                                    href="##"
                                    className="btn btn-sm btn-outline-danger"
                                    data-toggle="modal"
                                    data-target="#delete"
                                  >
                                    <span className="lnr lnr-trash" /> Xóa
                                  </a>
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

