import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import ModalCreateForm from "./ModalCreateForm";
import axios from "axios";
import * as host from "../../Constants/Url";
import "../../Style/Notification/manageNotification.css";

export default class ManageFormSend extends Component {
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
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .get(host.URL_BACKEND + "/api/system/notification/form/list", {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        self.setState({
          listForm: response.data.forms,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentWillMount() {
    this.getlistForm();
  }

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
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="title-5 m-b-35 manage__company--notification">
                        Quản lí form
                      </h3>
                      <div className="table-data__tool">
                        <div className="table-data__tool-left">
                        </div>
                        <div className="table-data__tool-right">
                          <button
                            className="au-btn au-btn-icon au-btn--green au-btn--small"
                            onClick={(e) => this.openCreateForm(e)}
                          >
                            <i className="zmdi zmdi-plus"></i>Tạo Form thông báo
                          </button>
                          <ModalCreateForm
                            getlistForm={this.getlistForm}
                            showModal={this.state.showModalCreateForm}
                            close={() => this.closeCreateForm()}
                            />
                        </div>
                      </div>
                      <div className="table-responsive table-responsive-data2">
                      <table className="table custom-table table-hover table-notification_organization">
                              <thead class="thead-dark">
                                <tr>
                                  <th style={{ width: "15%" }} className="text-center">Tên</th>
                                  <th style={{ width: "30%" }} className="text-center">Miêu tả</th>
                                  <th style={{ width: "15%" }} className="text-center">Template</th>
                                  <th style={{ width: "15%" }} className="text-center">Ngày tạo</th>
                                  <th style={{ width: "25%" }} className="text-center">Hành động</th>
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