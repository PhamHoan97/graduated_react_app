import React, { Component } from "react";
import Menu from "../Menu";
import Sidebar from "../Sidebar";
import "../Style/EmployeeProcess.scss";
import "../Style/DetailNotificaionSystemEmployee.scss";
import axios from "axios";
import host from '../../Host/ServerDomain';

export default class DetailNotificationCompanyEmployee extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isDisplayAlert: false,
      detailNotification: [],
    };
  }
  updateStatusNotificationCompany = (idNotificationFromCompany) =>{
    var token = localStorage.getItem("token");
    axios.post(host +'/api/employee/notification/company/status/update', {
      idNotificationFromCompany:idNotificationFromCompany
    },{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
        console.log(response.data.error);
        } else {
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  UNSAFE_componentWillMount() {
    this.updateStatusNotificationCompany(this.props.match.params.id);
    this.getDetailNotificationCompany(this.props.match.params.id);
  }
  getDetailNotificationCompany = (idNotificationCompanyEmployee) => {
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .get(
        host + "/api/employee/notification/detail/" + idNotificationCompanyEmployee,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          self.setState({
            detailNotification: response.data.detailNotificationCompanyEmployee,
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  showDetailNotification = () => {
    if (
      this.state.detailNotification.length === 0 
    ) {
      return <div></div>;
    }
    if (
      this.state.detailNotification.length !== 0
    ) {
      return (
        <div className="content-notification text-center">
          <div> {this.state.detailNotification.name}</div>
          <div> {this.state.detailNotification.description}</div>
          {this.state.detailNotification.file !== null ? (
            <div className="text-center mt-3">
              <a href={host.URL_BACKEND + '/' + this.state.detailNotification.file} className="btn btn-primary btn-lg active btn-download_document" role="button" aria-pressed="true">Tài liệu đính kèm{" "}</a>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
  };
  render() {
    return (
      <div id="content-employee_page" className="main-wrapper">
        <Menu />
        <Sidebar />
        <div className="page-wrapper content-notification">
          <div className="container-fluid">
            <div className="row mb-4 mt-4">
              <div className="col-sm-6 col-md-4">
                <h3 className="page-title_employee">Chi tiết thông báo</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex">
                <div className="card ctm-border-radius shadow-sm flex-fill detail-notification_employee">
                  <div className="card-body">
                  <div className="container-contact100 mt-3">
                      <div className="wrap-contact100">
                      {this.showDetailNotification()}
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

