import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/DetailCompany.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import CompanyInformation from "./CompanyInformation";
import ModalDetailProcess from "./ModalDetailProcess";
import ChartOrganization from "./ChartOrganization";
import axios from "axios";
import host from "../../../Host/ServerDomain";
import "../Style/DetailCompany.scss";
import ReactPaginate from "react-paginate";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionAlerts from "../../../Alert/Action/Index";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class CompanyOrganization extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataChart: [],
      listProcesses: [],
      offset: 0,
      perPage: 5,
      currentPage: 0,
      pageCount: 0,
      idProcess: "",
      listDepartment: [],
      textNameSearch: "",
      idDepartmentSearch: 0,
      initDataOrganization:[]
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getDataOrganization();
    this.getListDepartment();
    this.getProcessesTypeCompany();
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
    if(value === ""){
      this.setState({
        dataChart: this.state.initDataOrganization,
      });
    }
  }
  handleChangeSelect(event) {
    const name = event.target.name;
    const value = event.target.value;
    if(parseInt(value) === 0){
      this.setState({
        [name]: value,
        dataChart: this.state.initDataOrganization,
      });
    }else{
      this._isMounted = true;
      event.preventDefault();
      let self = this;
      var token = localStorage.getItem("token");
      axios
        .post(
          host + "/api/company/organization/detail/search/department",{
            idDepartmentSearch:value,
            token:token
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
                [name]: value,
                dataChart: response.data.dataOrganization,
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  getSearchDataOrganization = (e) =>{
    this._isMounted = true;
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/organization/detail/search/employee",{
          textNameSearch:this.state.textNameSearch,
          token:token
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
              dataChart: response.data.dataOrganization,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getListDepartment = () => {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .get(host + "/api/company/organization/department/" + token, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        if (self._isMounted) {
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              listDepartment: JSON.parse(
                JSON.stringify(response.data.departmentCompany)
              ),
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getProcessesTypeCompany = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .get(host + "/api/company/process/type/all/" + token, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        if (self._isMounted) {
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              listProcesses: response.data.processes,
              pageCount: Math.ceil(
                response.data.processes.length / self.state.perPage
              ),
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  editProcess = (e, id) => {
    e.preventDefault();
    this.setState({ isRedirectEditProcess: true, idProcess: id });
  };
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };
  getDataOrganization = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/organization/chart",
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
              dataChart: response.data.dataOrganization,
              initDataOrganization: response.data.dataOrganization,
              showModalDepartment: false,
              showModalRole: false,
              showModalUser: false,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  submitDelete = (e,idProcess) => {
     e.preventDefault();
    confirmAlert({
      title: '',
      message: 'Bạn có chắc muốn xóa quy trình ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteProcessTypeCompany(e,idProcess)
        },
        {
          label: 'No',
          onClick: () => console.log('Click No')
        }
      ]
    })
  };
  deleteProcessTypeCompany = (e, idProcess) => {
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/process/type/all/delete",
        {
          token: token,
          idProcess: idProcess,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
        } else {
          self.props.showAlert({
            message: "Xóa quy trình công ty thành công ",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            title: "Thành công",
            severity: "success",
          });
          self.getProcessesTypeCompany();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  openDetailProcess = (e, id) => {
    e.preventDefault();
    document.getElementById("clone-view-detail-process").click();
    this.setState({ idProcess: id });
  };

  render() {
    console.log(this.props.linkRedirectClickNode)
    if(this.props.linkRedirectClickNode !== ''){
      return <Redirect to={this.props.linkRedirectClickNode} />;
    }
    if (this.state.isRedirectEditProcess) {
      return <Redirect to={"/process/edit/" + this.state.idProcess} />;
    }
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
                  <LinkPage linkPage="" />
                </div>
                <CompanyInformation
                  getDataOrganization={this.getDataOrganization}
                />
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card ctm-border-radius shadow-sm flex-fill ">
                      <div className="card-header text-left">
                        <h4 className="card-title mb-0">
                          Quy trình chung của công ty
                        </h4>
                      </div>
                      <div className="card-body">
                        <div className="tab-content" id="v-pills-tabContent">
                          {/* Tab1*/}
                          <div
                            className="tab-pane fade active show"
                            id="v-pills-home"
                            role="tabpanel"
                            aria-labelledby="v-pills-home-tab"
                          >
                            <div className="employee-office-table">
                              <div className="table-responsive">
                                <table className="table custom-table table-hover table-process_type--company">
                                  <thead>
                                    <tr>
                                      <th
                                        style={{ width: "5%" }}
                                        className="cell-breakWord text-left"
                                      >
                                        #
                                      </th>
                                      <th
                                        style={{ width: "15%" }}
                                        className="cell-breakWord text-left"
                                      >
                                        Mã
                                      </th>
                                      <th
                                        style={{ width: "15%" }}
                                        className="cell-breakWord text-left"
                                      >
                                        Tên
                                      </th>
                                      <th
                                        style={{ width: "45%" }}
                                        className="cell-breakWord text-left"
                                      >
                                        Miêu tả
                                      </th>
                                      {/* <th style={{ width: "10%" }} className="text-center">Thể loại</th> */}
                                      <th style={{ width: "25%" }}></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.listProcesses.length !== 0 ? (
                                      Object.values(
                                        this.state.listProcesses.slice(
                                          this.state.offset,
                                          this.state.offset + this.state.perPage
                                        )
                                      ).map((process, index) => {
                                        return (
                                          <tr key={index}>
                                            <td
                                              style={{ width: "5%" }}
                                              className="cell-breakWord text-left"
                                            >
                                              {index + 1}
                                            </td>
                                            <td
                                              style={{ width: "10%" }}
                                              className="cell-breakWord text-left"
                                            >
                                              {process.code}{" "}
                                            </td>
                                            <td
                                              style={{ width: "15%" }}
                                              className="cell-breakWord text-left"
                                            >
                                              {process.name}
                                            </td>
                                            <td
                                              style={{ width: "45%" }}
                                              className="cell-breakWord text-left"
                                            >
                                              {process.description}
                                            </td>
                                            {/* <td style={{ width: "10%" }} className="text-center">
                                          Công ty
                                        </td> */}
                                            <td style={{ width: "25%" }}>
                                              <div className="table-action">
                                                <a
                                                  href="##"
                                                  className="btn btn-sm btn-outline-success"
                                                  onClick={(e) =>
                                                    this.openDetailProcess(
                                                      e,
                                                      process.id
                                                    )
                                                  }
                                                >
                                                  <span className="lnr lnr-pencil" />
                                                  Chi tiết
                                                </a>
                                                <a
                                                  href="##"
                                                  id="clone-view-detail-process"
                                                  data-toggle="modal"
                                                  data-target="#view-detail-process"
                                                  className="btn btn-sm btn-outline-success"
                                                  style={{ display: "none" }}
                                                >
                                                  <span className="lnr lnr-pencil" />{" "}
                                                  Chi tiết
                                                </a>
                                                <a
                                                  href="edit-review.html"
                                                  className="btn btn-sm btn-outline-success mr-2 ml-2"
                                                  onClick={(e) =>
                                                    this.editProcess(
                                                      e,
                                                      process.id
                                                    )
                                                  }
                                                >
                                                  <span className="lnr lnr-pencil" />{" "}
                                                  Sửa
                                                </a>
                                                <a
                                                  href="##"
                                                  className="btn btn-sm btn-outline-danger"
                                                  onClick={(e) =>
                                                    this.submitDelete(
                                                      e,
                                                      process.id
                                                    )
                                                  }
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
                                <div className="row mt-5">
                                  <div className="col-md-4"></div>
                                  <div className="col-md-4 text-center">
                                    <ReactPaginate
                                      previousLabel={"Trước"}
                                      nextLabel={"Sau"}
                                      breakLabel={"..."}
                                      breakClassName={"break-me"}
                                      pageCount={this.state.pageCount}
                                      marginPagesDisplayed={2}
                                      pageRangeDisplayed={5}
                                      onPageChange={this.handlePageClick}
                                      containerClassName={"pagination"}
                                      subContainerClassName={"pages pagination"}
                                      activeClassName={"active"}
                                    />
                                  </div>
                                  <div className="col-md-4"></div>
                                </div>
                              </div>
                              <ModalDetailProcess
                                idProcess={this.state.idProcess}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card ctm-border-radius shadow-sm flex-fill ">
                      <div className="card-header text-left">
                        <h4 className="card-title mb-0">
                          Hình vẽ cơ cấu tổ chức
                        </h4>
                      </div>
                      <div className="card-body">
                        <div className="row filter-row">
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group form-focus">
                              <select
                                className="select floating form-control select-department"
                                data-select2-id={1}
                                tabIndex={-1}
                                aria-hidden="true"
                                value={this.state.idDepartmentSearch}
                                onChange={(event) => this.handleChangeSelect(event)}
                                name="idDepartmentSearch"
                              >
                                <option value={0}>Chọn phòng ban</option>
                                {Object.values(this.state.listDepartment).map(
                                  (department, key) => {
                                    return (
                                      <option value={department.id} key={key}>
                                        {department.name}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-3">
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group form-focus">
                              <input
                                type="text"
                                name="textNameSearch"
                                className="form-control floating"
                                placeholder="Tên nhân viên"
                                value={this.state.textNameSearch}
                                onChange={(event) => this.handleChange(event)}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-1">
                            <a href="##" 
                            className="btn btn-success btn-block"
                            onClick={(e) =>this.getSearchDataOrganization(e)}
                            >
                              {" "}
                              <i className="fa fa-search" aria-hidden="true"></i>{" "}
                            </a>
                          </div>
                        </div>
                        <ChartOrganization nodes={this.state.dataChart} />
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
    linkRedirectClickNode:
      state.organizationReducers.companyOrganizationReducer
        .linkRedirectPage,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showAlert: (properties) => {
      dispatch(actionAlerts.showMessageAlert(properties));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyOrganization);
