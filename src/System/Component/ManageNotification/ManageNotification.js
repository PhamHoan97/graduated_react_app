import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import ModalCreateNotification from "./ModalCreateNotification";
import ModalSendNotification from "./ModalSendNotification";
import axios from "axios";
import * as host from "../../Constants/Url";
import { connect } from "react-redux";
import { getIdNotificationChoose } from "../../Action/Notification/Index";
import '../../Style/Notification/manageNotification.css'

class ManageNotification extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listNotification: [],
      statisticNotification: [],
      isDisplayStatistic: false,
      showModalCreateNotification: false,
      showModalSendNotification: false,
    };
  }

  UNSAFE_componentWillMount = () => {
    this.getListNotification();
  };

  getListNotification = () => {
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .get(host.URL_BACKEND + "/api/system/notification/list", {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          self.setState({
            listNotification: response.data.notifications,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  closeCreateNotification = () => {
    this.setState({
      showModalCreateNotification: false,
    });
  };
  openCreateNotification = () => {
    this.setState({
      showModalCreateNotification: true,
    });
  };
  closeSendNotification = () => {
    this.setState({
      showModalSendNotification: false,
    });
  };
  openSendNotification = (idNotificationChoose) => {
    this.props.getIdNotificationChoose(idNotificationChoose);
    this.setState({
      showModalSendNotification: true,
    });
  };
  showStatisticNotification = (idNotificationChoose) => {
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host.URL_BACKEND + "/api/system/notification/statistic",
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
      <div className="page-wrapper">
        <MenuHorizontal />
        <div className="page-container">
          <MenuVertical />
          <div className="main-content">
            <div>
              <div className="section__content section__content--p30">
                <div className="container-fluid">
                  {this.state.isDisplayStatistic === false ? (
                    <div></div>
                  ) : (
                    <>
                      <div className="row">
                        <div className="col-md-12">
                          <h3 className="title-5 m-b-35 manage__company--notification">
                            Statistic
                          </h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <h3 className="title-5 m-b-35 notification__name--statistic">
                            {this.state.statisticNotification.notificationName}
                          </h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="statistic__item statistic__item--green">
                            <h2 className="number">{ this.state.statisticNotification.notificationUser}</h2>
                            <span className="desc">Users</span>
                            <div className="icon">
                              <i className="zmdi zmdi-account-o" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="statistic__item statistic__item--orange">
                            <h2 className="number">{ this.state.statisticNotification.notificationAdmin}</h2>
                            <span className="desc">Admins</span>
                            <div className="icon">
                              <i className="zmdi zmdi-shopping-cart" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="statistic__item statistic__item--blue">
                            <h2 className="number">{ this.state.statisticNotification.responseAdminUser}</h2>
                            <span className="desc">Responses</span>
                            <div className="icon">
                              <i className="zmdi zmdi-calendar-note" />
                            </div>
                            <div>
                              <button
                                className="item download-response"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="download"
                              >
                                <i
                                  className="zmdi zmdi-cloud-download "
                                  style={{ fontSize: "40px" }}
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {/* MANAGER Company*/}
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="title-5 m-b-35 manage__company--notification">
                        Manager Notification
                      </h3>
                      <div className="table-data__tool">
                        <div className="table-data__tool-left">
                          <div className="rs-select2--light rs-select2--sm">
                            <select
                              className="js-select2 select--today__adminAccount"
                              name="time"
                            >
                              <option defaultValue>Today</option>
                              <option value>3 Days</option>
                              <option value>1 Week</option>
                              <option value>1 Month</option>
                            </select>
                            <div className="dropDownSelect2" />
                          </div>
                          <button className="au-btn-filter ml-5">
                            <i className="zmdi zmdi-filter-list" />
                            filters
                          </button>
                        </div>
                        <div className="table-data__tool-right">
                          <button
                            className="au-btn au-btn-icon au-btn--green au-btn--small"
                            onClick={() => this.openCreateNotification()}
                          >
                            <i className="zmdi zmdi-plus"></i>add item
                          </button>
                          <ModalCreateNotification
                            getListNotification={this.getListNotification}
                            showModal={this.state.showModalCreateNotification}
                            close={() => this.closeCreateNotification()}
                          />
                        </div>
                      </div>
                      <div className="table-responsive table-responsive-data2">
                        <table className="table table-data2">
                          <thead>
                            <tr>
                              <th />
                              <th>Name</th>
                              <th>Template</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th></th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.listNotification.length !== 0 ? (
                              Object.values(this.state.listNotification).map(
                                (notification, index) => {
                                  return (
                                      <tr
                                        className="tr-shadow"
                                        key={notification.id}
                                      >
                                        <td>
                                          <label className="au-checkbox">
                                            <input type="checkbox" />
                                            <span className="au-checkmark" />
                                          </label>
                                        </td>
                                        <td>{notification.name}</td>
                                        <td>{notification.template_name}</td>
                                        <td className="desc">
                                          {notification.date}
                                        </td>
                                        <td className="desc">
                                          {parseInt(notification.status) === 1
                                            ? "Send"
                                            : "Pending"}
                                        </td>
                                        <td>
                                          <div className="table-data-feature">
                                            <button
                                              className="item"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Send"
                                              onClick={() =>
                                                this.openSendNotification(
                                                  notification.id
                                                )
                                              }
                                            >
                                              <i className="zmdi zmdi-notifications-active"></i>
                                            </button>
                                            <ModalSendNotification
                                              getListNotification={
                                                this.getListNotification
                                              }
                                              showModal={
                                                this.state
                                                  .showModalSendNotification
                                              }
                                              close={() =>
                                                this.closeSendNotification()
                                              }
                                            />
                                            <button
                                              className="item"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Edit"
                                              onClick={() =>
                                                this.showStatisticNotification(
                                                  notification.id
                                                )
                                              }
                                            >
                                              <i className="zmdi zmdi-edit" />
                                            </button>
                                            <button
                                              className="item"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Delete"
                                            >
                                              <i className="zmdi zmdi-delete" />
                                            </button>
                                            <button
                                              className="item"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="More"
                                            >
                                              <i className="zmdi zmdi-more" />
                                            </button>
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
                  <div className="row">
                    <div className="col-md-12">
                      <div className="copyright">
                        <p>
                          Copyright © 2020 Colorlib. All rights reserved.
                          Template by{" "}
                          <a href="https://colorlib.com">Colorlib</a>.
                        </p>
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
    getIdNotificationChoose: (idNotification) => {
      dispatch(getIdNotificationChoose(idNotification));
    },
  };
};
export default connect(null, mapDispatchToProps)(ManageNotification);
