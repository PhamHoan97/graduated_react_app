import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/DetailRole.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import host from "../../../Host/ServerDomain";
import axios from "axios";
import avatarMale from "../Image/avatar_employee1.png";
import avatarFeMale from "../Image/avatar_employee2.png";
import ModalCreateEmployeeRole from "./ModalCreateEmployeeRole";
import { editEmployeeOrganization } from "../Action/Index";
import { connect } from "react-redux";
import ModalEditEmployeeRole from "./ModalEditEmployeeRole";
import { NavLink } from "react-router-dom";
import { showMessageAlert } from "../../../Alert/Action/Index";
import ReactPaginate from "react-paginate";
import ModalDetailProcess from './ModalDetailProcess';
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
class DetailRole extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      detailRole: {},
      showModalNewEmployee: false,
      showModalEditEmployee: false,
      listProcesses:[],
      offset: 0,
      perPage: 7,
      currentPage: 0,
      pageCount: 0,
      offsetProcess: 0,
      perPageProcess: 4,
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

  getInformationDetailRole = () => {
    this._isMounted = true;
    var token = localStorage.getItem("token");
    var self = this;
    axios
      .post(
        host + "/api/company/organization/department/role/detail",
        {
          idRole: this.props.match.params.idRole,
          idDepartment: this.props.match.params.idDepartment,
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
            var detailRole = JSON.parse(
              JSON.stringify(response.data.detailRole)
            );
            self.setState({
              detailRole: detailRole,
              pageCount: Math.ceil(
                detailRole.employees.length / self.state.perPage
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
  getProcessesTypeRole = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/process/type/role",{
          token:token,
          idRole:this.props.match.params.idRole
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this.getInformationDetailRole();
    this.getProcessesTypeRole();
  }
  openModalAddEmployee = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showModalNewEmployee: true,
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

  submitDelete = (e,idProcess) => {
    e.preventDefault();
   confirmAlert({
     title: '',
     message: 'Bạn có chắc muốn xóa quy trình ?',
     buttons: [
       {
         label: 'Yes',
         onClick: () => this.deleteProcessTypeRole(e,idProcess)
       },
       {
         label: 'No',
         onClick: () => console.log('Click No')
       }
     ]
   })
  };
  deleteProcessTypeRole = (e,idProcess) =>{
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem('token');
    axios.post(host + '/api/company/process/type/role/delete',{
        idRole:this.props.match.params.idRole,
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
              message:response.data.message,
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thành công',
              severity:'success'
            });
            self.getProcessesTypeRole();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  closeModalAddEmployee = () => {
    this.setState({
      showModalNewEmployee: false,
    });
  };
  deleteEmployee = (e, idDeleteEmployee) => {
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/organization/employee/delete",
        {
          idDeleteEmployee: idDeleteEmployee,
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
            message:response.data.message,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            title: "Thành công",
            severity: "success",
          });
          self.getInformationDetailRole();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  openModalEditEmployee = (e, idEditEmployee) => {
    e.preventDefault();
    e.stopPropagation();
    this.getDetailEmployeeOrganization(idEditEmployee);
  };

  closeModalEditEmployee = () => {
    this.setState({
      showModalEditEmployee: false,
    });
  };

  getDetailEmployeeOrganization = (idEditEmployee) => {
    var token = localStorage.getItem("token");
    var self = this;
    axios
      .get(
        host + "/api/company/organization/employee/detail/" + idEditEmployee,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          var detailEmployee = JSON.parse(
            JSON.stringify(response.data.employee)
          );
          self.props.editEmployee(detailEmployee);
          self.setState({
            showModalEditEmployee: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                  <LinkPage linkPage="Vai trò / Chi tiết" />
                </div>
                {!isEmpty(this.state.detailRole) ? (
                  <>
                    <div className="card shadow-sm  ctm-border-radius">
                      <div className="card-body text-center">
                        <h4
                          className="card-title  mb-0 mt-2"
                          style={{ fontWeight: 700 }}
                        >
                          {this.state.detailRole.name}
                        </h4>
                        <h5 className="card-title  mb-0 mt-2">
                          {this.state.detailRole.description}
                        </h5>
                      </div>
                    </div>
                    <div className="row text-left">
                      <div className="col-md-12 d-flex">
                        <div className="ctm-border-radius shadow-sm card ">
                          <div className="card-body">
                            <div className="page-header mb-5">
                              <div className="row">
                                <div className="col-md-9">
                                  <h4 className="page-title_detailEmployee">
                                    Danh sách nhân viên
                                    {/* <span
                                      style={{ color: "red", fontSize: "30px" }}
                                    >
                                      {" " +
                                        this.state.detailRole.employees.length}
                                    </span> */}
                                  </h4>
                                </div>
                                <div className="col-md-3">
                                  <ModalCreateEmployeeRole
                                    getInformationDetailRole={
                                      this.getInformationDetailRole
                                    }
                                    idRole={this.props.match.params.idRole}
                                    idDepartment={
                                      this.props.match.params.idDepartment
                                    }
                                    showModal={this.state.showModalNewEmployee}
                                    close={() => this.closeModalAddEmployee()}
                                  />
                                  {this.state.showModalEditEmployee === true ? (
                                    <ModalEditEmployeeRole
                                      getInformationDetailRole={
                                        this.getInformationDetailRole
                                      }
                                      idRole={this.props.match.params.idRole}
                                      idDepartment={
                                        this.props.match.params.idDepartment
                                      }
                                      showModal={
                                        this.state.showModalEditEmployee
                                      }
                                      close={() =>
                                        this.closeModalEditEmployee()
                                      }
                                    />
                                  ) : (
                                    <div></div>
                                  )}
                                  <a
                                    href="add-employee.html"
                                    onClick={(e) =>
                                      this.openModalAddEmployee(e)
                                    }
                                    className="btn btn-theme button-1 text-white ctm-border-radius p-2 add-person ctm-btn-padding"
                                  >
                                    <i className="fa fa-plus" /> Thêm nhân viên
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="table-back employee-office-table">
                              <div className="table-responsive">
                                <table className="table custom-table table-hover table-hover">
                                  <thead>
                                    <tr>
                                      <th>Tên</th>
                                      <th>Phòng ban</th>
                                      <th>Vai trò</th>
                                      <th>Email</th>
                                      <th>Hành động</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.detailRole.employees.length !==
                                    0 ? (
                                      Object.values(
                                        this.state.detailRole.employees.slice(
                                          this.state.offset,
                                          this.state.offset + this.state.perPage
                                        )
                                      ).map((employee, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>
                                              <a
                                                href="employment.html"
                                                className="avatar"
                                              >
                                                {employee.avatar !== null &&
                                                employee.avatar !== "" ? (
                                                  <img
                                                    alt="avatar employee 1"
                                                    src={host + employee.avatar}
                                                    className="img-fluid"
                                                  />
                                                ) : employee.gender ===
                                                  "Nam" ? (
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
                                              </a>
                                              <h2>
                                                <a href="employment.html">
                                                  {employee.name}
                                                </a>
                                              </h2>
                                            </td>
                                            <td>
                                              <NavLink
                                                to={
                                                  "/company/organization/department/" +
                                                  employee.department_id
                                                }
                                                exact
                                                className="btn btn-outline-success btn-sm"
                                              >
                                                {" "}
                                                {employee.department_name}{" "}
                                              </NavLink>
                                            </td>
                                            <td> {employee.role_name} </td>
                                            <td>{employee.email}</td>
                                            <td>
                                              <div className="dropdown action-label drop-active">
                                                <a
                                                  href="##"
                                                  className="btn btn-white btn-sm dropdown-toggle"
                                                  data-toggle="dropdown"
                                                >
                                                  {" "}
                                                  Hành động{" "}
                                                  <i className="caret" />
                                                </a>
                                                <div className="dropdown-menu">
                                                  <a
                                                    className="dropdown-item"
                                                    href="##"
                                                    onClick={(e) =>
                                                      this.openModalEditEmployee(
                                                        e,
                                                        employee.id
                                                      )
                                                    }
                                                  >
                                                    {" "}
                                                    Sửa
                                                  </a>
                                                  <a
                                                    className="dropdown-item"
                                                    href="##"
                                                    onClick={(e) =>
                                                      this.deleteEmployee(
                                                        e,
                                                        employee.id
                                                      )
                                                    }
                                                  >
                                                    {" "}
                                                    Xóa
                                                  </a>
                                                  <NavLink
                                                    to={
                                                      "/company/organization/department/" +
                                                      employee.department_id +
                                                      "/role/" +
                                                      employee.role_id +
                                                      "/employee/" +
                                                      employee.id
                                                    }
                                                    exact
                                                    className="dropdown-item"
                                                  >
                                                    {" "}
                                                    Chi tiết
                                                  </NavLink>
                                                </div>
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
                              </div>
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
                                <div className="col-md-4"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 d-flex">
                        <div className="card ctm-border-radius shadow-sm flex-fill manage-detailrole_organization">
                          <div className="card-header">
                            <h4 className="card-title mb-0">
                              Danh sách quy trình
                            </h4>
                          </div>
                          <div className="card-body">
                            <div
                              className="tab-content"
                              id="v-pills-tabContent"
                            >
                              {/* Tab1*/}
                              <div
                                className="tab-pane fade active show"
                                id="v-pills-home"
                                role="tabpanel"
                                aria-labelledby="v-pills-home-tab"
                              >
                                <div className="employee-office-table">
                                  <div className="table-responsive">
                                    <table className="table custom-table table-hover table-process_type--role">
                                      <thead>
                                        <tr>
                                          <th
                                            style={{ width: "5%" }}
                                            className="cell-breakWord text-center"
                                          >
                                            STT
                                          </th>
                                          <th
                                            style={{ width: "15%" }}
                                            className="cell-breakWord text-center"
                                          >
                                            Mã
                                          </th>
                                          <th
                                            style={{ width: "15%" }}
                                            className="cell-breakWord text-center"
                                          >
                                            Tên
                                          </th>
                                          <th
                                            style={{ width: "45%" }}
                                            className="cell-breakWord text-center"
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
                                        {this.state.listProcesses.length !==
                                        0 ? (
                                          Object.values(
                                            this.state.listProcesses.slice(
                                              this.state.offsetProcess,
                                              this.state.offsetProcess +
                                                this.state.perPageProcess
                                            )
                                          ).map((process, index) => {
                                            return (
                                              <tr key={index}>
                                                <td
                                                  style={{ width: "5%" }}
                                                  className="cell-breakWord text-center"
                                                >
                                                  {index + 1}
                                                </td>
                                                <td
                                                  style={{ width: "10%" }}
                                                  className="cell-breakWord text-center"
                                                >
                                                  {process.code}{" "}
                                                </td>
                                                <td
                                                  style={{ width: "15%" }}
                                                  className="cell-breakWord text-center"
                                                >
                                                  {process.name}
                                                </td>
                                                <td
                                                  style={{ width: "45%" }}
                                                  className="cell-breakWord text-center"
                                                >
                                                  {process.description}
                                                </td>
                                                {/* <td
                                                  style={{ width: "10%" }}
                                                  className="text-center"
                                                >
                                                  Chức vụ
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
                                                      onClick={(e) => this.submitDelete(e,process.id)}
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
                                          subContainerClassName={
                                            "pages pagination"
                                          }
                                          activeClassName={"active"}
                                          forcePage={this.state.currentPageProcess}
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
                  </>
                ) : (
                  <div></div>
                )}
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
    editEmployee: (detailEmployee) => {
      dispatch(editEmployeeOrganization(detailEmployee));
    },
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties));
    },
  };
};
export default connect(null, mapDispatchToProps)(DetailRole);
