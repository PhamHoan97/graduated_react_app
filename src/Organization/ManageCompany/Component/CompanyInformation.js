import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/DetailCompany.scss";
import axios from "axios";
import host from '../../../Host/ServerDomain';
import ModalUpdateCompany from "./ModalUpdateCompany";
import avatarCompany from "../Image/company.png";
export default class CompanyInformation extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      detailCompany: {},
      statisticCompany:{},
      showModalEditCompany: false,
    };
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  getDetailCompany = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/information",
        {
          token: token,
        },
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
              detailCompany: response.data.company,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getStatisticCompany = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/organization/statistics",
        {
          token: token,
        },
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
                statisticCompany: response.data.statisticsCompany,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getDetailCompany();
    this.getStatisticCompany();
  }

  getImageCompany = () => {
    if (
      this.state.detailCompany.avatar === null ||
      this.state.detailCompany.avatar === ""
    ) {
      return (
        <img
          src={avatarCompany}
          alt=""
          className="img-fluid rounded-circle avatar-company"
          width={100}
        />
      );
    } else {
      return (
        <img
          src={host + this.state.detailCompany.avatar}
          alt=""
          className="img-fluid rounded-circle avatar-company"
          width={100}
        />
      );
    }
  };
  openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showModalEditCompany: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModalEditCompany: false,
    });
    this.getDetailCompany();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (this.state.detailCompany.length !== 0 && this.state.statisticCompany.length !== 0) {
      return (
        <>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="card dash-widget ctm-border-radius shadow-sm ">
                <div className="card-body">
                  <div className="card-icon bg-primary">
                    <i className="fa fa-users" aria-hidden="true" />
                  </div>
                  <div className="card-right">
                    <h4 className="card-title">Nhân viên</h4>
                        <p className="card-text">{this.state.statisticCompany.employees}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-6 col-12">
              <div className="card dash-widget ctm-border-radius shadow-sm ">
                <div className="card-body">
                  <div className="card-icon bg-warning">
                    <i className="fa fa-building-o" />
                  </div>
                  <div className="card-right">
                    <h4 className="card-title">Phòng ban</h4>
                    <p className="card-text">{this.state.statisticCompany.departments}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-6 col-12">
              <div className="card dash-widget ctm-border-radius shadow-sm ">
                <div className="card-body">
                  <div className="card-icon bg-success">
                    <i className="fa fa-bell-o" aria-hidden="true" />
                  </div>
                  <div className="card-right">
                    <h4 className="card-title">Thông báo</h4>
                    <p className="card-text">{this.state.statisticCompany.notifications}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row manage-detailCompany_organization">
            <div className="col-xl-8 col-lg-12 col-md-7 d-flex">
              <div className="card ctm-border-radius shadow-sm flex-fill">
                <div className="card-header">
                  <h4 className="card-title mb-0">
                    {this.state.detailCompany.name}
                  </h4>
                </div>
                <div className="card-body">
                  <div className="row text-left">
                    <div className="col-md-3">
                      <div className="user-avatar mb-4">
                        {this.getImageCompany()}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <span className="title-detail_company">
                          Lãnh đạo :{" "}
                        </span>
                        {this.state.detailCompany.ceo}
                      </p>
                      <p>
                        <span className="title-detail_company">Viết tắt :</span>
                        {this.state.detailCompany.signature}
                      </p>
                      <p>
                        <span className="title-detail_company">
                          Nhân lực :{" "}
                        </span>
                        {this.state.detailCompany.workforce}
                      </p>
                    </div>
                    <div className="col-md-5">
                      <p>
                        <span className="title-detail_company">Địa chỉ:</span>
                        <br />
                        {this.state.detailCompany.address}
                      </p>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                  {this.state.showModalEditCompany === true ? (
                     <ModalUpdateCompany
                     showModal={this.state.showModalEditCompany}
                     close={() => this.closeModal()}
                     detailCompany={this.state.detailCompany}
                     getDataOrganization = {this.props.getDataOrganization}
                   />
                    ) : (
                      <div></div>
                    )}
                    <button
                      className="btn btn-theme text-white ctm-border-radius button-1"
                      data-toggle="modal"
                      data-target="#add-information"
                      onClick={(e) => this.openModal(e)}
                    >
                      Cập nhật thông tin công ty
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12 col-md-4 d-flex">
              <div className="card ctm-border-radius shadow-sm flex-fill">
                <div className="card-header">
                  <h4 className="card-title mb-0">Liên lạc</h4>
                </div>
                <div className="card-body">
                  <div className="input-group mb-0">
                    <label className="title-detail_company">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      defaultValue={this.state.detailCompany.contact}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <div className="row manage-detailCompany_organization"></div>;
    }
  }
}
