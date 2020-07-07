import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import ModalCreateForm from "./ModalCreateForm";
import axios from "axios";
import host from '../../../Host/ServerDomain';
import "../../Style/Notification/manageNotification.css";
import  {connect} from 'react-redux';
import {showMessageAlert} from "../../../Alert/Action/Index";

class ManageFormSend extends Component {
  _isMounted = false;
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
    axios
      .get(host + "/api/system/notification/form/list", {
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

  componentWillUnmount(){
    this._isMounted = false;
  }

  deleteForm = (e,idForm) =>{
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem('token');
    axios.post(host + '/api/system/notification/form/delete',{
      idForm:idForm,
    },{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
        } else {
            self.props.showAlert({
              message:'Xóa Form thành công ',
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thành công',
              severity:'success'
            });
            self.getlistForm();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  UNSAFE_componentWillMount() {
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
                              <thead className="thead-dark">
                                <tr>
                                  <th style={{ width: "5%" }} className="text-left">#</th>
                                  <th style={{ width: "15%" }} className="text-left">Tên</th>
                                  <th style={{ width: "30%" }} className="text-left">Miêu tả</th>
                                  <th style={{ width: "15%" }} className="text-left">Mẫu câu hỏi</th>
                                  <th style={{ width: "15%" }} className="text-left">Ngày tạo</th>
                                  <th style={{ width: "20%" }} className="text-left"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.listForm.length !== 0 ? (
                                  Object.values(this.state.listForm).map(
                                    (form, key) => {
                                      return (
                                        <tr key={key}>
                                          <td
                                            style={{ width: "5%" }}
                                            className="cell-breakWord text-left"
                                          >
                                            {key+1}{" "}
                                          </td>
                                          <td
                                            style={{ width: "15%" }}
                                            className="cell-breakWord text-left"
                                          >
                                            {form.name}{" "}
                                          </td>
                                          <td
                                            style={{ width: "30%" }}
                                            className="cell-breakWord text-left"
                                          >
                                            {form.description}
                                          </td>
                                          <td
                                            style={{ width: "15%" }}
                                            className="cell-breakWord text-left"
                                          >
                                            {form.template_name}
                                          </td>
                                          <td
                                            className="text-left"
                                            style={{ width: "15%" }}
                                          >
                                            {form.date}
                                          </td>
                                          <td style={{ width: "20%" }} className="text-left">
                                            <div className="table-action">
                                              <a
                                                href="##"
                                                className="btn btn-sm btn-outline-danger"
                                                data-toggle="modal"
                                                data-target="#delete"
                                                onClick={(e) => this.deleteForm(e,form.id)}
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties))
    }
  }
}
export default connect(null,mapDispatchToProps)(ManageFormSend);
