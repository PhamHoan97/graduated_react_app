import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/DetailDepartment.scss";
import Header from "../../Header";
import Menu from "../../Menu";
import host from "../../../Host/ServerDomain";
import axios from "axios";
import ModalCreateRoleDepartment from "./ModalCreateRoleDepartment";
import ModalEditRoleDepartment from "./ModalEditRoleDepartment";
import { connect } from "react-redux";
import { editRoleOrganization } from "../Action/Index";
import { NavLink } from "react-router-dom";
import LinkPage from "../../LinkPage";
import { showMessageAlert } from "../../../Alert/Action/Index";
import ReactPaginate from "react-paginate";
import { Redirect } from 'react-router-dom';
import ModalDetailProcess from './ModalDetailProcess';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
class DetailEmployeeOraganization extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      detailCompany: [],
      showModalNewRole: false,
      showModalEditRole: false,
      listProcesses:[],
      offset: 0,
      perPage: 3,
      currentPage: 0,
      pageCount: 0,
      offsetProcess: 0,
      perPageProcess: 3,
      currentPageProcess: 0,
      pageCountProcess: 0,
      idProcess: '',
      isRedirectEditProcess: false,
    };
  }
  editProcess = (e, id) => {
    e.preventDefault();
    this.setState({isRedirectEditProcess: true, idProcess: id});
  }
  openDetailProcess = (e, id) => {
    e.preventDefault();
    document.getElementById('clone-view-detail-process').click();
    this.setState({idProcess: id});
  }
  getDetailDepartment = () => {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .get(
        host +
          "/api/company/organization/department/detail/" +
          this.props.match.params.id,
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
              detailCompany: JSON.parse(
                JSON.stringify(response.data.detailDepartment)
              ),
              pageCount: Math.ceil(
                response.data.detailDepartment.role.length / self.state.perPage
              ),
              currentPage: 0,
              offset: 0,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getProcessesTypeDepartment = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/process/type/department",{
          token:token,
          idDepartment:this.props.match.params.id
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
              listProcesses: response.data.processes,
              pageCountProcess: Math.ceil(
                response.data.processes.length / self.state.perPageProcess
              ),
              currentPageProcess: 0,
              offsetProcess: 0,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };
  handlePageClickProcess = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPageProcess;
    this.setState({
      currentPageProcess: selectedPage,
      offsetProcess: offset,
    });
  };

  UNSAFE_componentWillMount() {
    this.getDetailDepartment();
    this.getProcessesTypeDepartment();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  openModalEditRole = (e, idEditRole) => {
    e.preventDefault();
    e.stopPropagation();
    this.getDetailRoleOrganization(idEditRole);
  };

  getDetailRoleOrganization = (idEditRole) => {
    var token = localStorage.getItem("token");
    var self = this;
    axios
      .get(host + "/api/company/organization/role/detail/" + idEditRole, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          var detailRole = JSON.parse(JSON.stringify(response.data.role));
          self.props.getEditRoleOrganization(detailRole);
          self.setState({
            showModalEditRole: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  closeModalEditRole = () => {
    this.setState({
      showModalEditRole: false,
    });
  };
  openModalAddRole = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showModalNewRole: true,
    });
  };

  closeModalAddRole = () => {
    this.setState({
      showModalNewRole: false,
    });
  };

  deleteRole = (e, idDeleteRole) => {
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/organization/role/delete",
        {
          idDeleteRole: idDeleteRole,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
          self.props.showAlert({
            message:response.data.error,
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Thất bại',
            severity:'error'
          });
        } else {
          self.props.showAlert({
            message: response.data.message,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            title: "Thành công",
            severity: "success",
          });
          self.getDetailDepartment();
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
         onClick: () => this.deleteProcessTypeDepartment(e,idProcess)
       },
       {
         label: 'No',
         onClick: () => console.log('Click No')
       }
     ]
   })
  };
  deleteProcessTypeDepartment = (e,idProcess) =>{
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem('token');
    axios.post(host + '/api/company/process/type/department/delete',{
        idDepartment:this.props.match.params.id,
        idProcess:idProcess,
    },{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
          self.props.showAlert({
            message:response.data.error,
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Thất bại',
            severity:'error'
          });
        } else {
            self.props.showAlert({
              message:'Xóa quy trình phòng ban thành công ',
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thành công',
              severity:'success'
            });
            self.getProcessesTypeDepartment();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  render() {
    if(this.state.isRedirectEditProcess){
      return <Redirect to={'/process/edit/' + this.state.idProcess} />
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
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card">
                  <LinkPage linkPage="Phòng ban / Chi tiết" />
                </div>
                <div className="card shadow-sm  ctm-border-radius">
                  <div className="card-body align-center">
                    <ul className="nav nav-tabs float-right border-0 tab-list-emp">
                      <ModalCreateRoleDepartment
                        getDetailDepartment={this.getDetailDepartment}
                        idDepartment={this.props.match.params.id}
                        showModal={this.state.showModalNewRole}
                        close={() => this.closeModalAddRole()}
                      />
                      {this.state.showModalEditRole === true ? (
                        <ModalEditRoleDepartment
                          getDetailDepartment={this.getDetailDepartment}
                          idDepartment={this.props.match.params.id}
                          showModal={this.state.showModalEditRole}
                          close={() => this.closeModalEditRole()}
                        />
                      ) : (
                        <div></div>
                      )}
                      <li className="nav-item pl-3">
                        <a
                          href="add-employee.html"
                          onClick={(e) => this.openModalAddRole(e)}
                          className="btn btn-theme button-1 text-white ctm-border-radius p-2 add-person ctm-btn-padding"
                        >
                          <i className="fa fa-plus" /> Thêm chức vụ
                        </a>
                      </li>
                    </ul>
                  </div>
                  {this.state.detailCompany.length !== 0 ? (
                    <div className="ctm-border-radius shadow-sm  card mt-5 mb-5">
                      <div className="card-header text-center">
                        <h4
                          className="card-title mb-0"
                          style={{ fontWeight: "700" }}
                        >
                          {this.state.detailCompany.name} -{" "}
                          {this.state.detailCompany.signature}
                        </h4>
                        <h5 className="card-title mb-0">
                          {this.state.detailCompany.description}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="row people-grid-row">
                          {Object.values(
                            this.state.detailCompany.role.slice(
                              this.state.offset,
                              this.state.offset + this.state.perPage
                            )
                          ).map((role, index) => {
                            return (
                              <div
                                className="col-md-6 col-lg-6 col-xl-4"
                                key={index}
                              >
                                <div className="card ctm-border-radius shadow-sm  h-100">
                                  <div className="card-header">
                                    <div className="d-inline-block text-center">
                                      <h4
                                        className="card-title mb-0 mb-3"
                                        style={{
                                          fontWeight: 600,
                                          fontSize: "23px",
                                        }}
                                      >
                                        {role.name}
                                      </h4>
                                      <p className="mb-0 ctm-text-sm text-left">
                                        {role.description}
                                      </p>
                                    </div>
                                    <div className="text-center mt-2">
                                      <button
                                        type="button"
                                        className="btn btn-success mr-2"
                                        onClick={(e) =>
                                          this.openModalEditRole(e, role.id)
                                        }
                                      >
                                        Sửa
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={(e) =>
                                          this.deleteRole(e, role.id)
                                        }
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </div>
                                  <div className="card-body">
                                    <h4 className="card-title">Thành viên</h4>
                                    <h4
                                      className="card-title"
                                      style={{ color: "red" }}
                                    >
                                      {role.employees}
                                    </h4>
                                    <NavLink
                                      to={
                                        "/company/organization/role/" +
                                        role.id
                                      }
                                      exact
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-dark"
                                      >
                                        Chi tiết
                                      </button>
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
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
                              forcePage={this.state.currentPage}
                            />
                          </div>
                          <div className="col-md-4"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="card shadow-sm ctm-border-radius  manage-department_organization">
                  <div className="card-header text-center">
                    <h4 className="card-title mb-0 d-inline-block text-center">
                      Danh sách quy trình
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
                            <table className="table custom-table table-hover table-process_type--department">
                              <thead>
                                <tr>
                                  <th
                                    style={{ width: "5%" }}
                                    className="cell-breakWord text-left"
                                  >
                                    STT
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
                                  {/* <th
                                    style={{ width: "10%" }}
                                    className="text-center"
                                  >
                                    Thể loại
                                  </th> */}
                                  <th style={{ width: "25%" }}></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.listProcesses.length !== 0 ? (
                                  Object.values(
                                    this.state.listProcesses.slice(
                                      this.state.offsetProcess,
                                      this.state.offsetProcess + this.state.perPageProcess
                                    )
                                  ).map((process, index) => {
                                    return (
                                      <tr key={index}>
                                        <td
                                          style={{ width: "5%" }}
                                          className="cell-breakWord text-left"
                                        >
                                          #{index + 1}
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
                                        {/* <td
                                          style={{ width: "10%" }}
                                          className="text-center"
                                        >
                                          Phòng ban
                                        </td> */}
                                        <td style={{ width: "25%" }}>
                                          <div className="table-action">
                                          <a
                                                href="##"
                                                className="btn btn-sm btn-outline-success"
                                                onClick={(e) => this.openDetailProcess(e, process.id)}
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
                                                style={{display:"none"}}
                                            >
                                                <span className="lnr lnr-pencil" />{" "}
                                                Chi tiết
                                            </a>
                                            <a
                                              href="edit-review.html"
                                              className="btn btn-sm btn-outline-success mr-2 ml-2"
                                              onClick={(e) => this.editProcess(e,process.id)}
                                            >
                                              <span className="lnr lnr-pencil" />{" "}
                                              Sửa
                                            </a>
                                            <a
                                              href="##"
                                              className="btn btn-sm btn-outline-danger"
                                              onClick={(e) =>this.submitDelete(e,process.id)}
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
                                  pageCount={this.state.pageCountProcess}
                                  marginPagesDisplayed={2}
                                  pageRangeDisplayed={5}
                                  onPageChange={this.handlePageClickProcess}
                                  containerClassName={"pagination"}
                                  forcePage={this.state.currentPageProcess}
                                  subContainerClassName={"pages pagination"}
                                  activeClassName={"active"}
                                />
                              </div>
                              <div className="col-md-4"></div>
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
        <ModalDetailProcess  idProcess={this.state.idProcess} />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEditRoleOrganization: (detailRole) => {
      dispatch(editRoleOrganization(detailRole));
    },
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties));
    },
  };
};
export default connect(null, mapDispatchToProps)(DetailEmployeeOraganization);
