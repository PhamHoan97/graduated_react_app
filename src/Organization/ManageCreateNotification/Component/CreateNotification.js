import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/CreateNotification.scss";
import Header from "../../Header";
import Menu from "../../Menu";
import LinkPage from "../../LinkPage";
import ModalCreateNotification from "./ModalCreateNotification";
import ModalSendNotificationCompany from "./ModalSendNotificationCompany";
import axios from "axios";
import host from '../../../Host/ServerDomain'; 
import { connect } from "react-redux";
import { getIdNotificationChoose } from "../Action/Index";
import {showMessageAlert} from "../../../Alert/Action/Index";
class CreateNotification extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      listNotification: [],
      showModalCreateNotification: false,
      showModalSendNotification: false,
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
  closeSendNotification = () => {
    this.setState({
      showModalSendNotification: false,
    });
  };
  openSendNotification = (e, idNotificationChoose) => {
    e.preventDefault();
    this.props.getIdNotificationChoose(idNotificationChoose);
    this.setState({
      showModalSendNotification: true,
    });
  };

  getListNotification = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .get(
        host + "/api/company/notification/create/list/" + token,
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
              listNotification: response.data.notifications,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteNotificationCreated = (e,idNotificateCreate) => {
    e.preventDefault();
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/notification/create/delete",{
          idNotificateCreate:idNotificateCreate
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          self.props.showAlert({
            message:'Xóa thông báo thành công ',
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Success',
            severity:'success'
          });
          self.getListNotification();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  UNSAFE_componentWillMount() {
    this.getListNotification();
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
                <Menu />
              </div>
              <div className="col-xl-9 col-lg-8  col-md-12">
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card ">
                  <LinkPage linkPage=" Thông báo " />
                </div>
                <div className="card shadow-sm ctm-border-radius  manage-notification_organization">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="card-title mb-0 d-inline-block"></div>
                    <ModalCreateNotification
                      getListNotification={this.getListNotification}
                      showModal={this.state.showModalCreateNotification}
                      close={() => this.closeCreateNotification()}
                    />
                    <ModalSendNotificationCompany
                      getListNotification={this.getListNotification}
                      showModal={this.state.showModalSendNotification}
                      close={() => this.closeSendNotification()}
                    />
                    <a
                      href="create-review.html"
                      className="btn btn-theme button-1 ctm-border-radius text-white  text-right"
                      onClick={(e) => this.openCreateNotification(e)}
                    >
                      <span /> Tạo thông báo
                    </a>
                  </div>
                  <div className="card-body align-center">
                    <div className="tab-content" id="v-pills-tabContent">
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
                                  <th style={{ width: "30%" }}>Miêu tả</th>
                                  <th style={{ width: "20%" }}>Ngày tạo</th>
                                  <th style={{ width: "10%" }}>Trạng thái</th>
                                  <th style={{ width: "25%" }} className="text-left ml-4"></th>
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
                                          style={{ width: "30%" }}
                                          className="cell-breakWord"
                                        >
                                          {notification.description}
                                        </td>
                                        <td style={{ width: "20%" }}>
                                          {notification.update_at}
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
                                        <td style={{ width: "25%" }} className="text-left">
                                          <div className="table-action ml-5">
                                            {parseInt(notification.status) ===
                                            1 ? (
                                              <div></div>
                                            ) : (
                                              <a
                                                href="edit-review.html"
                                                className="btn btn-sm btn-outline-success"
                                                onClick={(e) =>
                                                  this.openSendNotification(
                                                    e,
                                                    notification.id
                                                  )
                                                }
                                              >
                                                <span className="lnr lnr-pencil" />{" "}
                                                Gửi
                                              </a>
                                            )}

                                            {/* <a
                                              href="edit-review.html"
                                              className="btn btn-sm btn-outline-success"
                                            >
                                              <span className="lnr lnr-pencil" />{" "}
                                              Chi tiết
                                            </a> */}
                                            <a
                                              href="##"
                                              className="btn btn-sm btn-outline-danger"
                                              data-toggle="modal"
                                              data-target="#delete"
                                              onClick={(e) => this.deleteNotificationCreated(e,notification.id)}
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getIdNotificationChoose: (idNotification) => {
      dispatch(getIdNotificationChoose(idNotification));
    },
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties))
    }
  };
};
export default connect(null, mapDispatchToProps)(CreateNotification);
