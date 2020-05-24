import React, { Component } from "react";
import Menu from "../Menu";
import Sidebar from "../Sidebar";
import "../Style/EmployeeProcess.scss";
import "../Style/DetailNotificaionSystemEmployee.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import * as host from "../Url";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
class DetailNotificationComponent extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isDisplayContentForm: true,
      isDisplayAlert: false,
      detailNotification: this.props.detailNotificationSystemEmployee,
    };
  }
  componentWillMount() {
    this.getDetailNotificationSystem(this.props.match.params.id);
  }
  getDetailNotificationSystem = (idNotificationSystemEmployee) => {
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host.URL_BACKEND + "/api/employee/notification/response",
        {
          idNotificationSystemEmployee: idNotificationSystemEmployee,
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
            detailNotification: response.data.notificationEmployee,
          });
          window.displayForm(
            response.data.notificationEmployee[0].template_content,
            false
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  renderLinkDownloadDocument(info) {
    if(info && info.document){
        return (<a className="link-download-document" href={host.URL_BACKEND + '/' + info.document}> Download document here</a>);
    }else{
        return (<></>)
    }
  }

  componentDidMount() {
    if (
      this.state.isDisplayContentForm &&
      this.props.detailNotificationSystemEmployee.length !== 0
    ) {
      window.displayForm(
        this.props.detailNotificationSystemEmployee[0].template_content,
        false
      );
    }
  }

  handleClick = (e,idNotificationEmployee) => {
    e.preventDefault();
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host.URL_BACKEND + "/api/employee/notification/create/response",
        {
          idNotificationEmployee: idNotificationEmployee,
          token: token,
          contentResponse: JSON.parse(localStorage.getItem("dataForm")).data,
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
            isDisplayAlert: true,
            detailNotification: [],
            isDisplayContentForm: false,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  showContentForm = () => {
    if (
      this.state.detailNotification.length === 0 &&
      this.state.isDisplayContentForm === true
    ) {
      return <div></div>;
    }
    if (
      this.state.detailNotification.length === 0 &&
      this.state.isDisplayContentForm === false
    ) {
      return (
        <form className="contact100-form validate-form">
          <span className="contact100-form-title"></span>
          <div className="description">
            Tôi xin chân thành cảm ơn ông/bà đã dành thời gian phản hồi thư này
          </div>
          <div style={{ marginLeft:"160px"}}>
            <button type="button" className="btn btn-primary btn-back_response">
              <NavLink
                to={"/employee/notification"}
                exact
                activeClassName="selected"
                activeStyle={{
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                Back
              </NavLink>
            </button>
          </div>
        </form>
      );
    }
    if (
      this.state.detailNotification.length !== 0 &&
      this.state.isDisplayContentForm === true
    ) {
      return (
        <form className="contact100-form validate-form">
          <span className="contact100-form-title">
            {this.state.detailNotification[0].name_form}
          </span>
          <div className="description">
            {this.state.detailNotification[0].description_form}
          </div>
          <div className="content-formio">
            <div id="formio"></div>
            <a
              name=""
              id="sendDatabase"
              style={{ display: "none" }}
              className="btn btn-primary"
              href="##"
              role="button"
              onClick={(e) => this.handleClick(e, this.props.match.params.id)}
            >
              Display
            </a>
            {this.state.isDisplayAlert === true ? (
              <Alert severity="success">
                Phản hồi thành công tới hệ thống !{" "}
              </Alert>
            ) : (
              ""
            )}
          </div>
        </form>
      );
    }
  };
  showDetailNotification = () => {
    if (this.state.isDisplayContentForm === false) {
      return <div></div>;
    }
    if (
      this.state.detailNotification.length === 0 &&
      this.state.isDisplayContentForm === true
    ) {
      return <div></div>;
    }
    if (
      this.state.detailNotification.length !== 0 &&
      this.state.isDisplayContentForm === true
    ) {
      return (
        <div className="content-notification text-center">
          <div> {this.state.detailNotification[0].name}</div>
          <div> {this.state.detailNotification[0].description}</div>
          {this.state.detailNotification[0].file !== null ? (
            <div className="text-center mt-3">
              <a href={host.URL_BACKEND + '/' + this.state.detailNotification[0].file} className="btn btn-primary btn-lg active btn-download_document" role="button" aria-pressed="true">Tài liệu đính kèm{" "}</a>
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
                <h3 className="page-title_employee">Danh sách thông báo</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex">
                <div className="card ctm-border-radius shadow-sm flex-fill detail-notification_employee">
                  <div className="card-body">
                    {this.showDetailNotification()}
                    <div className="container-contact100 mt-3">
                      <div className="wrap-contact100">
                        {this.showContentForm()}
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
const mapStateToProps = (state, ownProps) => {
  return {
    detailNotificationSystemEmployee:
      state.employeeReducers.detailNotificationSystemEmployee,
  };
};
export default connect(mapStateToProps, null)(DetailNotificationComponent);
