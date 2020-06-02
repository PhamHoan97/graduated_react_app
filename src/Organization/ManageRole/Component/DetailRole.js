import React, { Component } from "react";
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import host from '../../../Host/ServerDomain'; 
import axios from "axios";
import avatarMale from "../Image/avatar_employee1.png";
import avatarFeMale from "../Image/avatar_employee2.png";
import ModalCreateEmployeeRole from "./ModalCreateEmployeeRole";
import { editEmployeeOrganization } from "../Action/Index";
import {connect} from "react-redux"
import ModalEditEmployeeRole from "./ModalEditEmployeeRole";
import {NavLink} from "react-router-dom";
import {showMessageAlert} from "../../../Alert/Action/Index";
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
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
    };
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
        if(self._isMounted){
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            console.log(response.data.detailRole)
            var detailRole = JSON.parse(JSON.stringify(response.data.detailRole));
            self.setState({
              detailRole: detailRole,
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
  }
  openModalAddEmployee = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showModalNewEmployee: true,
    });
  };

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
        } else {
          self.props.showAlert({
            message:'Xóa nhân viên thành công ',
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Success',
            severity:'success'
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
        host +
          "/api/company/organization/employee/detail/" +
          idEditEmployee,
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
                <Menu/>
              </div>
              <div className="col-xl-9 col-lg-8  col-md-12">
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card">
                  <LinkPage linkPage="Vai trò / Chi tiết"/>
                </div>
                {(!isEmpty(this.state.detailRole)) ? (
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
                                  </h4>
                                </div>
                                <div className="col-md-3">
                                  <ModalCreateEmployeeRole
                                    getInformationDetailRole={this.getInformationDetailRole}
                                    idRole = {this.props.match.params.idRole}
                                    idDepartment = {this.props.match.params.idDepartment}
                                    showModal={this.state.showModalNewEmployee}
                                    close={() => this.closeModalAddEmployee()}
                                  />
                                  {this.state.showModalEditEmployee === true ? (
                                    <ModalEditEmployeeRole
                                      getInformationDetailRole={this.getInformationDetailRole}
                                      idRole = {this.props.match.params.idRole}
                                      idDepartment = {this.props.match.params.idDepartment}
                                      showModal={this.state.showModalEditEmployee}
                                      close={() => this.closeModalEditEmployee()}
                                    />
                                  ) : (
                                    <div></div>
                                  )}
                                  <a
                                    href="add-employee.html"
                                    onClick={(e) => this.openModalAddEmployee(e)}
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
                                        this.state.detailRole.employees
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
                                                  src={
                                                    host +
                                                    employee.avatar
                                                  }
                                                  className="img-fluid"
                                                />
                                              ) : (employee.gender) ===
                                                'Nam' ? (
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
                                            <td>
                                              {" "}
                                                {employee.role_name}{" "}
                                            </td>
                                            <td>{employee.email}</td>
                                            <td>
                                              <div className="dropdown action-label drop-active">
                                                <a
                                                  href="##"
                                                  className="btn btn-white btn-sm dropdown-toggle"
                                                  data-toggle="dropdown"
                                                >
                                                  {" "}
                                                  Hành động <i className="caret" />
                                                </a>
                                                <div className="dropdown-menu">
                                                  <a
                                                      className="dropdown-item"
                                                      href="##"
                                                      onClick={(e) => this.openModalEditEmployee(e,employee.id)}
                                                    >
                                                      {" "}
                                                      Sửa
                                                    </a>
                                                  <a
                                                    className="dropdown-item"
                                                    href="##"
                                                    onClick={(e) => this.deleteEmployee(e,employee.id)}
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
      dispatch(showMessageAlert(properties))
    }
  };
};
export default connect(null, mapDispatchToProps)(DetailRole);
