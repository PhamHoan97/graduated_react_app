import React, { Component } from "react";
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import "../Style/NotificationCompany.scss";
import {NavLink} from "react-router-dom";
import axios from "axios";
import * as host from "../../Url";
import {getDetailNotificationAdmin} from "../Action/Index";
import {connect} from "react-redux";
class NotificationCompany extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      listCompanyNotification:[]
    }
  }
  componentWillMount() {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    var idAdmin = localStorage.getItem("admin_id");
    axios.post(host.URL_BACKEND + "/api/system/notification/company/list",{
      idAdmin:idAdmin
    },{
      headers: { Authorization: "Bearer " + token },
    })
    .then(function (response) {
      if(self._isMounted){
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          self.setState({
            listCompanyNotification: response.data.notificationAdmins,
          });
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getDetailNotification = (idNotificationAdmin) =>{
    var self = this;
    var token = localStorage.getItem("token");
    axios.post(host.URL_BACKEND + "/api/system/notification/company/response",{
      idNotificationAdmin:idNotificationAdmin
    },{
      headers: { Authorization: "Bearer " + token },
    })
    .then(function (response) {
      if (response.data.error != null) {
        console.log(response.data.error);
      } else {
         self.props.getDetailNotificationCompany(response.data.notificationAdmin)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="inner-wrapper manage-organization_template">
        <Header />
        <div
          className="page-wrapper_organization"
          style={{ transform: "none" }}
        >
          <div className="container-fluid" style={{ transform: "none" }}>
            <div className="row" style={{ transform: "none" }}>
              <div
                className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar"
                style={{
                  position: "relative",
                  overflow: "visible",
                  boxSizing: "border-box",
                  minHeight: "1px",
                }}
              >
                <Menu/>
              </div>
              <div className="col-xl-9 col-lg-8  col-md-12">
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card ">
                   <LinkPage linkPage=" danh sách thông báo "/>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card ctm-border-radius shadow-sm flex-fill manage-notification_system--admin">
                      <div className="card-header">
                        <h4 className="card-title mb-0">Danh sách thông báo</h4>
                      </div>
                      <div className="card-body align-center">
                    <div className="tab-content" id="v-pills-tabContent">
                      {/* Tab1*/}
                      <div
                        className="tab-pane fade active show"
                        id="v-pills-home"
                        role="tabpanel"
                        aria-labelledby="v-pills-home-tab"
                      >
                        <div className="employee-office-table">
                          <div className="table-responsive">
                            <table className="table custom-table table-hover table-notification_company">
                              <thead>
                                <tr>
                                  <th style={{ width: "15%" }}>Tên</th>
                                  <th
                                    style={{ width: "40%" }}
                                    className="cell-breakWord"
                                  >
                                    Miêu tả
                                  </th>
                                  <th style={{ width: "20%" }} className="cell-breakWord">Ngày</th>
                                  <th style={{ width: "10%" }}>Trạng thái</th>
                                  <th style={{ width: "25%" }}></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.listCompanyNotification.length !== 0 ? (
                                  Object.values(this.state.listCompanyNotification).map(
                                    (notification, index) => {
                                      return (
                                        <tr key={index}>
                                          <td style={{ width: "15%" }}>
                                      {notification.name}{" "}
                                          </td>
                                          <td
                                            style={{ width: "40%" }}
                                            className="cell-breakWord"
                                          >
                                            {notification.description}
                                          </td>
                                          <td style={{ width: "10%" }}>{notification.date}</td>
                                          <td style={{ width: "20%" }}>
                                            {
                                              parseInt(notification.status)===1 ? ('Responsed'):('Pending')
                                            }
                                          </td>
                                          <td style={{ width: "25%" }} className="cell-breakWord">
                                            <div className="table-action">
                                              {
                                                parseInt(notification.status)===1 ? (<div></div>):(
                                                  <NavLink
                                                    to={"/company/notification/detail/"+notification.id}
                                                    exact
                                                    activeClassName="selected"
                                                    activeStyle={{
                                                      fontWeight: "bold",
                                                      color: "#0074D9",
                                                    }}
                                                    className="btn btn-sm btn-outline-success"
                                                    onClick={this.getDetailNotification(notification.id)}
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
                                                <span className="lnr lnr-trash" />{" "}
                                                Xóa
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
                  </div>
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
    getDetailNotificationCompany: (detailNotificationAdmin) => {
      dispatch(getDetailNotificationAdmin(detailNotificationAdmin));
    },
  };
};
export default connect(null,mapDispatchToProps)(NotificationCompany);
