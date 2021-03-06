import React, { Component } from "react";
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import "../Style/NotificationCompany.scss";
import {NavLink} from "react-router-dom";
import axios from "axios";
import host from '../../../Host/ServerDomain';
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
  UNSAFE_componentWillMount() {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios.post(host + "/api/company/notification/list",{
      token:token
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
    axios.post(host + "/api/company/notification/response",{
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
                   <LinkPage linkPage=" danh s??ch th??ng b??o "/>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card ctm-border-radius shadow-sm flex-fill manage-notification_system--admin">
                      <div className="card-header text-left">
                        <h4 className="card-title mb-0">Danh s??ch th??ng b??o</h4>
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
                                <th
                                  style={{ width: "5%" }}
                                  className="cell-breakWord text-left"
                                  >#</th>
                                  <th
                                  style={{ width: "15%" }}
                                  className="cell-breakWord text-left"
                                  >T??n</th>
                                  <th
                                    style={{ width: "40%" }}
                                    className="cell-breakWord text-left"
                                  >
                                    Mi??u t???
                                  </th>
                                  <th style={{ width: "20%" }} className="cell-breakWord text-left">Ng??y</th>
                                  <th style={{ width: "15%" }} className="text-left">Tr???ng th??i</th>
                                  <th style={{ width: "15%" }}></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.listCompanyNotification.length !== 0 ? (
                                  Object.values(this.state.listCompanyNotification).map(
                                    (notification, index) => {
                                      return (
                                        <tr key={index}>
                                          <td
                                          style={{ width: "5%" }}
                                          className="cell-breakWord text-left"
                                          >
                                      {index+1}{" "}
                                          </td>
                                          <td
                                          style={{ width: "15%" }}
                                          className="cell-breakWord text-left"
                                          >
                                      {notification.name}{" "}
                                          </td>
                                          <td
                                            style={{ width: "40%" }}
                                            className="cell-breakWord text-left"
                                          >
                                            {notification.description}
                                          </td>
                                          <td style={{ width: "15%" }} className="text-left">{notification.date}</td>
                                          {
                                            parseInt(notification.status)===1 ? (
                                              <td style={{ width: "20%",color: "red" }} className="text-left">
                                               ???? xem
                                              </td>
                                              ):(<td style={{ width: "20%",color: "orange" }} className="text-left">
                                              Ch??a xem
                                             </td>)
                                          }
                                          <td style={{ width: "20%" }} className="cell-breakWord text-left">
                                            <div className="table-action">
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
                                                    Chi ti???t
                                                </NavLink>
                                              {/* <a
                                                href="##"
                                                className="btn btn-sm btn-outline-danger"
                                                data-toggle="modal"
                                                data-target="#delete"
                                              >
                                                <span className="lnr lnr-trash" />{" "}
                                                X??a
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
