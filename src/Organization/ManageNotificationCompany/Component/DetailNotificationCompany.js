import React, { Component } from "react";
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import "../Style/DetailNotificationCompany.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import * as host from "../../Url";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
class DetailNotificationComponent extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isDisplayContentForm: true,
      isDisplayAlert: false,
      detailNotification: this.props.detailNotificationAdmin,
    };
  }
  componentWillMount() {
    this.getDetailNotification(this.props.match.params.id);
  }
  getDetailNotification = (idNotificationAdmin) => {
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host.URL_BACKEND + "/api/company/notification/response",
        {
          idNotificationAdmin: idNotificationAdmin,
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
            detailNotification: response.data.notificationAdmin,
          });
          window.displayForm(
            response.data.notificationAdmin[0].template_content,
            false
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    if (
      this.state.isDisplayContentForm &&
      this.props.detailNotificationAdmin.length !== 0
    ) {
      window.displayForm(
        this.props.detailNotificationAdmin[0].template_content,
        false
      );
    }
  }

  handleClick = (e, idNotificationAdmin) => {
    e.preventDefault();
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host.URL_BACKEND + "/api/company/notification/create/response",
        {
          idNotificationAdmin: idNotificationAdmin,
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
            <button type="button" className="btn btn-primary" style={{ color:"#ffffff"}}>
              <NavLink
                to={"/company/notification/system"}
                exact
                activeClassName="selected"
                activeStyle={{
                  fontWeight: "bold",
                  color: "#0074D9",
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
      return (
        <div></div>
      );
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
              <a
                href={host.URL_BACKEND + '/' + this.state.detailNotification[0].file}
                className="btn btn-theme button-1 ctm-border-radius text-white"
              >
                Tài liệu đính kèm{" "}
              </a>
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
                  <LinkPage linkPage=" chi tiết thông báo công ty " />
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card ctm-border-radius shadow-sm flex-fill detail-notification_company">
                      <div className="card-header">
                        <h4 className="card-title mb-0">Thông báo</h4>
                      </div>
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    detailNotificationAdmin:
      state.organizationReducers.notificationCompanyReducer
        .detailNotificationAdmin,
  };
};
export default connect(mapStateToProps, null)(DetailNotificationComponent);
