import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/DetailEmployee.scss";
import Header from "../../Header";
import Menu from "../../Menu";
import LinkPage from "../../LinkPage";
import avatarMale from "../Image/avatar_employee1.png";
import avatarFeMale from "../Image/avatar_employee2.png";
import axios from "axios";
import * as host from "../../Url";
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
export default class DetailEmployeeOraganization extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      detailEmployee: {},
    };
  }
  getDetailEmployeeOrganization = () => {
    this._isMounted = true;
    var token = localStorage.getItem("token");
    var self = this;
    axios
      .get(
        host.URL_BACKEND +
          "/api/system/organization/employee/detail/" +
          this.props.match.params.idEmployee,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if(self._isMounted){
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            var detailEmployee = JSON.parse(
              JSON.stringify(response.data.employee)
            );
            self.setState({
              detailEmployee: detailEmployee,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentWillMount() {
    this.getDetailEmployeeOrganization();
  }
  componentWillUnmount() {
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
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card">
                  <LinkPage linkPage="Nhân viên / Chi tiết "/>
                </div>
                {/*Content Detail Employee Organization */}
                <div className="row manage-detailemployee_company text-left">
                  <div className="col-md-12 d-flex">
                    <div className="ctm-border-radius shadow-sm  card">
                      <div className="page-header">
                        <div className="row">
                          <div className="col-sm-12">
                            <h3 className="page-title_detailEmployee">
                              Chi tiết thông tin nhân viên
                            </h3>
                          </div>
                        </div>
                      </div>
                      {!isEmpty(this.state.detailEmployee) ? (
                        <div className="card mb-0">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="profile-view">
                                  <div className="profile-img-wrap">
                                    <div className="profile-img">
                                      {this.state.detailEmployee.avatar !==
                                        null &&
                                      this.state.detailEmployee.avatar !==
                                        "" ? (
                                        <img
                                          alt="avatar employee 1"
                                          src={
                                            host.URL_BACKEND +
                                            this.state.detailEmployee.avatar
                                          }
                                          className="img-fluid"
                                        />
                                      ) : (this.state.detailEmployee.gender === "Nam") ? (
                                        <img
                                          alt="avataremployee 1"
                                          src={avatarMale}
                                          className="img-fluid"
                                        />
                                      ) : (
                                        <img
                                          alt="avatar employee 1"
                                          src={avatarFeMale}
                                          className="img-fluid"
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="profile-basic">
                                    <div className="row">
                                      <div className="col-md-5">
                                        <div className="profile-info-left">
                                          <h3 className="user-name m-t-0 mb-0">
                                            {this.state.detailEmployee.name}
                                          </h3>
                                          <div className="staff-id">
                                            Employee ID :{" "}
                                            {this.state.detailEmployee.id}
                                          </div>
                                          {/* <div className="staff-msg">
                                            <a
                                              className="btn btn-custom"
                                              href="chat.html"
                                            >
                                              Send Message
                                            </a>
                                          </div> */}
                                        </div>
                                      </div>
                                      <div className="col-md-7">
                                        <ul className="personal-info">
                                          <li>
                                            <div className="title">Phone:</div>
                                            <div className="text">
                                              <a href="##">
                                                {
                                                  this.state.detailEmployee
                                                    .phone
                                                }
                                              </a>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="title">Email:</div>
                                            <div className="text">
                                              <a href="##">
                                                {
                                                  this.state.detailEmployee
                                                    .email
                                                }
                                              </a>
                                            </div>
                                          </li>
                                          {/* <li>
                                            <div className="title">
                                              Birthday:
                                            </div>
                                            <div className="text">
                                            {this.state.detailEmployee.birth}
                                            </div>
                                            <br></br>
                                          </li>
                                          <li>
                                            <div className="title">
                                              Address:
                                            </div>
                                            <div className="text">
                                            {this.state.detailEmployee.address}
                                            </div>
                                            <br></br>
                                          </li> */}
                                          <li>
                                            <div className="title">Gender:</div>
                                            <div className="text">
                                              <a href="##">
                                                {" "}
                                                {
                                                   this.state.detailEmployee
                                                   .gender
                                                }
                                              </a>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="pro-edit">
                                    <a
                                      data-target="#profile_info"
                                      data-toggle="modal"
                                      className="edit-icon"
                                      href="##"
                                    >
                                      <i className="fa fa-pencil" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
                {/* End Content Detail Employee Organization */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
