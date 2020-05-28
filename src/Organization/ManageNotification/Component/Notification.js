import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/Notification.scss";
import Header from "../../Header";
import Menu from "../../Menu";
import LinkPage from "../../LinkPage";
import ModalCreateNotification from "./ModalCreateNotification";
import axios from "axios";
import host from '../../../Host/ServerDomain';

export default class Notification extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      listNotification: [],
      showModalCreateNotification: false,
      statisticNotification: [],
      isDisplayStatistic: false,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  closeCreateNotification = () => {
    this.setState({
      showModalCreateNotification: false,
    });
  };

  openCreateNotification = (e) => {
    e.preventDefault();
    this.setState({
      showModalCreateNotification: true,
    });
  };

  getListNotification = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/system/notification/list/",
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if(self._isMounted){
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              listNotification: response.data.notifications,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  saveSendNotification = (e, idNotification) => {
    e.preventDefault();
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/system/notification/send",
        {
          idNotification: idNotification,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          self.getListNotification();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  componentDidMount() {
    this.getListNotification();
  }
  showStatisticNotification = (e, idNotificationChoose) => {
    e.preventDefault();
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/system/notification/statistic",
        {
          idNotification: idNotificationChoose,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          self.setState({
            isDisplayStatistic: true,
            statisticNotification: response.data.statisticNotification,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
                  <LinkPage linkPage=" Thông báo "/>
                </div>
                {this.state.isDisplayStatistic === true ? (
                  <div className="row ">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="card dash-widget ctm-border-radius shadow-sm ">
                        <div className="card-body">
                          <div className="card-icon bg-primary">
                            <i className="fa fa-users" aria-hidden="true" />
                          </div>
                          <div className="card-right">
                            <h4 className="card-title">Thông báo</h4>
                            <p className="card-text">{ this.state.statisticNotification.notificationUser}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-sm-6 col-12">
                      <div className="card dash-widget ctm-border-radius shadow-sm ">
                        <div className="card-body">
                          <div className="card-icon bg-warning">
                            <i className="fa fa-building-o" />
                          </div>
                          <div className="card-right">
                            <h4 className="card-title">Phản hồi</h4>
                            <p className="card-text">{ this.state.statisticNotification.responseUser}</p>
                          </div>
                          <div className="card-right ml-5">
                            <h4 className="card-title">Download</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="card shadow-sm ctm-border-radius  manage-notification_organization">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <ModalCreateNotification
                      getListNotification={this.getListNotification}
                      showModal={this.state.showModalCreateNotification}
                      close={() => this.closeCreateNotification()}
                    />
                    <a
                      href="create-review.html"
                      className="btn btn-theme button-1 ctm-border-radius text-white float-right"
                      onClick={(e) => this.openCreateNotification(e)}
                    >
                      <span /> Tạo thông báo
                    </a>
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
                            <table className="table custom-table table-hover table-notification_organization">
                              <thead>
                                <tr>
                                  <th style={{ width: "15%" }}>Tên</th>
                                  <th style={{ width: "15%" }}>Template</th>
                                  <th style={{ width: "15%" }}>Ngày tạo</th>
                                  <th style={{ width: "10%" }}>Trạng thái</th>
                                  <th style={{ width: "20%" }}>Hành động</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.listNotification.length !== 0 ? (
                                  Object.values(
                                    this.state.listNotification
                                  ).map((notification, key) => {
                                    return (
                                      <tr key={key}>
                                        <td
                                          style={{ width: "15%" }}
                                          className="cell-breakWord"
                                        >
                                          {notification.name}{" "}
                                        </td>
                                        <td
                                          style={{ width: "15%" }}
                                          className="cell-breakWord"
                                        >
                                          {notification.template_name}
                                        </td>
                                        <td style={{ width: "15%" }}>
                                          {notification.date}
                                        </td>
                                        <td style={{ width: "10%" }}>
                                          <div className="dropdown action-label drop-active">
                                            <a
                                              href="##"
                                              className="btn btn-white btn-sm"
                                              data-toggle="dropdown"
                                            >
                                              {parseInt(notification.status) ===
                                              1
                                                ? "Send"
                                                : "Pending"}
                                            </a>
                                          </div>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                          <div className="table-action">
                                            {parseInt(notification.status) ===
                                            1 ? (
                                              <div></div>
                                            ) : (
                                              <a
                                                href="edit-review.html"
                                                className="btn btn-sm btn-outline-success"
                                                onClick={(e) =>
                                                  this.saveSendNotification(
                                                    e,
                                                    notification.id
                                                  )
                                                }
                                              >
                                                <span className="lnr lnr-pencil" />{" "}
                                                Gửi
                                              </a>
                                            )}
                                            <a
                                              href="edit-review.html"
                                              className="btn btn-sm btn-outline-success"
                                              onClick={(e) =>
                                                this.showStatisticNotification(
                                                  e,
                                                  notification.id
                                                )
                                              }
                                            >
                                              <span className="lnr lnr-pencil" />{" "}
                                              Chi tiết
                                            </a>
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
                                  })
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
    );
  }
}
