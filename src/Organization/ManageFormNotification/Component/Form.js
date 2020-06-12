import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/Notification.scss";
import Header from "../../Header";
import Menu from "../../Menu";
import LinkPage from "../../LinkPage";
import ModalCreateForm from "./ModalCreateForm";
import axios from "axios";
import host from '../../../Host/ServerDomain';

export default class Form extends Component {
  _isMounted = false
  constructor(props, context) {
    super(props, context);
    this.state = {
      listForm: [],
      showModalCreateForm: false,
    };
  }

  closeCreateForm = () => {
    this.setState({
      showModalCreateForm: false,
    });
  };
  openCreateForm = (e) => {
    e.preventDefault();
    this.setState({
      showModalCreateForm: true,
    });
  };

  getlistForm = () => {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem("token");
    var idAdmin = localStorage.getItem("admin_id");
    axios
      .get(host + "/api/system/notification/form/list/" + idAdmin, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        if(self._isMounted){
          self.setState({
            listForm: response.data.forms,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getlistForm();
  }

  componentWillUnmount(){
    this._isMounted = false;
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
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card grow">
                  <LinkPage linkPage=" Form "/>
                </div>
                <div className="card shadow-sm ctm-border-radius grow manage-notification_organization">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <ModalCreateForm
                       getlistForm={this.getlistForm}
                      showModal={this.state.showModalCreateForm}
                      close={() => this.closeCreateForm()}
                    />
                    <a
                      href="create-review.html"
                      className="btn btn-theme button-1 ctm-border-radius text-white float-right"
                      onClick={(e) => this.openCreateForm(e)}
                    >
                      <span /> Tạo Form thông báo
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
                                  <th style={{ width: "15%" }}>Template</th>
                                  <th style={{ width: "15%" }}>Ngày tạo</th>
                                  <th style={{ width: "25%" }}>Hành động</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.listForm.length !== 0 ? (
                                  Object.values(this.state.listForm).map(
                                    (form, key) => {
                                      return (
                                        <tr>
                                          <td
                                            style={{ width: "15%" }}
                                            className="cell-breakWord"
                                          >
                                            {form.name}{" "}
                                          </td>
                                          <td
                                            style={{ width: "30%" }}
                                            className="cell-breakWord"
                                          >
                                            {form.description}
                                          </td>
                                          <td
                                            style={{ width: "15%" }}
                                            className="cell-breakWord"
                                          >
                                            {form.template_name}
                                          </td>
                                          <td style={{ width: "15%" }}>
                                            {form.date}
                                          </td>
                                          <td style={{ width: "25%" }}>
                                            <div className="table-action">
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
    );
  }
}
