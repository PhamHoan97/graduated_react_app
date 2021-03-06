import React, { Component } from "react";
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import "../Style/DetailNotificationCompany.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import host from '../../../Host/ServerDomain'; 
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
  UNSAFE_componentWillMount() {
    this.getDetailNotification(this.props.match.params.id);
  }
  getDetailNotification = (idNotificationAdmin) => {
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/notification/response",
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
        host + "/api/company/notification/create/response",
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
            C???m ??n b???n khi ???? d??nh th???i gian ph???n h???i th?? n??y !
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
                Quay l???i
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
          {/* <div className="description">
            {this.state.detailNotification[0].description_form}
          </div> */}
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
              Hi???n th???
            </a>
            {this.state.isDisplayAlert === true ? (
              <Alert severity="success">
                Ph???n h???i th??nh c??ng t???i h??? th???ng !{" "}
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
      console.log(this.state.detailNotification[0].file !== '');
      return (
        <div className="content-notification text-center">
          <div className="card-header">
            <h3 className="card-title mb-0">{this.state.detailNotification[0].name}</h3>
          </div>
          <div> {this.state.detailNotification[0].description}</div>
          {(this.state.detailNotification[0].file !== null && this.state.detailNotification[0].file !== '') ? (
            <div className="text-center mt-3">
              <a
                href={host + '/' + this.state.detailNotification[0].file}
                className="btn btn-theme button-1 ctm-border-radius text-white"
              >
                T??i li???u ????nh k??m{" "}
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
                  <LinkPage linkPage=" chi ti???t th??ng b??o c??ng ty " />
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card ctm-border-radius shadow-sm flex-fill detail-notification_company">
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
