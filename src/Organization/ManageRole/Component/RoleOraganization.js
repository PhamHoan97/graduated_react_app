import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/Role.scss";
import Header from "../../Header";
import Menu from "../../Menu";
import LinkPage from "../../LinkPage";
import axios from "axios";
import * as host from "../../Url";
import ModalCreateRole from "./ModalCreateRole";
import ModalEditRole from "./ModalEditRole";
import { NavLink } from "react-router-dom";
import {connect} from "react-redux"
import {editRoleOrganization} from "../Action/Index";
class RoleOraganization extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      listRole: [],
      listDepartment: [],
      textNameSearch:"",
      idDepartmentSearch:0,
      showModalNewRole: false,
      showModalEditRole: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;
    const value =event.target.value;
      this.setState({
        [name]: value,
    })
  }

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
  
  componentDidMount() {
    this.getListRole();
    this.getListDepartment();
  }

  getListRole = () => {
    this._isMounted = true;
    let self = this;
    var idCompany = localStorage.getItem("company_id");
    var token = localStorage.getItem("token");
    axios
      .get(host.URL_BACKEND + "/api/system/organization/role/" + idCompany, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        if(self._isMounted){
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              listRole: JSON.parse(JSON.stringify(response.data.roles)),
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
 

  deleteRole = (e,idDeleteRole) =>{
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem('token');
    axios.post(host.URL_BACKEND+'/api/system/organization/role/delete',{
        idDeleteRole:idDeleteRole,
    },{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
        } else {
            console.log(response);
            self.getListRole();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  openModalEditRole = (e,idEditRole) => {
    e.preventDefault();
    e.stopPropagation();
    this.getDetailRoleOrganization(idEditRole);
  };

  closeModalEditRole = () => {
      this.setState({
        showModalEditRole: false,
      });
  };

  getListDepartment = () => {
    this._isMounted = true;
    let self = this;
    var idCompany = localStorage.getItem("company_id");
    var token = localStorage.getItem("token");
    axios
      .get(
        host.URL_BACKEND + "/api/system/organization/department/" + idCompany,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if(self._isMounted){
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

  getDetailRoleOrganization = (idEditRole) =>{
    var token = localStorage.getItem('token');
    var self =  this;
    axios.get(host.URL_BACKEND+'/api/system/organization/role/detail/'+idEditRole,{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
            console.log(response.data.error);
        }else{
            var detailRole =  JSON.parse(JSON.stringify(response.data.role));
            self.props.getEditRoleOrganization(detailRole)
            self.setState({
              showModalEditRole: true,
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  getSearchRole = (e) =>{
    e.preventDefault();
    let self = this;
    var idCompany = localStorage.getItem("company_id");
    var token = localStorage.getItem("token");
    axios
      .post(
        host.URL_BACKEND + "/api/system/organization/company/role/search",{
          textNameSearch:this.state.textNameSearch,
          idDepartmentSearch:this.state.idDepartmentSearch,
          idCompany:idCompany
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
            listRole: JSON.parse(
              JSON.stringify(response.data.roles)
            ),
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
                <Menu/>
              </div>
              <div className="col-xl-9 col-lg-8  col-md-12">
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card ">
                  <LinkPage linkPage="Vai trò"/>
                  <div className="row manage-role_oraganization">
                    <div className="col-md-12">
                      <div className="card shadow-sm  ctm-border-radius">
                        <div className="card-body align-center">
                          <h4 className="card-title float-left mb-0 mt-2">
                            Cấp quyền nhân viên
                          </h4>
                          <ul className="nav nav-tabs float-right border-0 tab-list-emp">
                            <li className="nav-item pl-3">
                              <a
                                href="##"
                                className="btn btn-theme button-1 text-white ctm-border-radius p-2 add-person ctm-btn-padding add-role"
                                onClick={(e) => this.openModalAddRole(e)}
                              >
                                <i className="fa fa-plus" /> Thêm mới role
                              </a>
                              <ModalCreateRole
                                getListRole = {this.getListRole}
                                listDepartment={this.state.listDepartment}
                                showModal={this.state.showModalNewRole}
                                close={() => this.closeModalAddRole()}
                              />
                              {
                                (this.state.showModalEditRole === true)?( <ModalEditRole
                                  getListRole = {this.getListRole}
                                  showModal={this.state.showModalEditRole}
                                  close={() => this.closeModalEditRole()}
                                />):(<div></div>)
                              }
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Content Employee Organization */}
                  <div className="row manage-employee_company">
                    <div className="col-md-12 d-flex">
                      <div className="ctm-border-radius shadow-sm  card card-content_employee">
                        <div className="page-header_employee"></div>
                        <div className="row filter-row">
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group form-focus">
                              <input
                                type="text"
                                name="textNameSearch"
                                placeholder="Tên role"
                                value={this.state.textNameSearch}
                                onChange={(event) => this.handleChange(event)}
                                className="form-control floating"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group form-focus">
                              <select
                                className="select floating form-control"
                                data-select2-id={1}
                                tabIndex={-1}
                                aria-hidden="true"
                                value={this.state.idDepartmentSearch}
                                onChange={(event) => this.handleChange(event)}
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
                            <a
                             href="##"
                             className="btn btn-success btn-block"
                             onClick={(e) => this.getSearchRole(e)}
                             >
                              {" "}
                              Tìm kiếm{" "}
                            </a>
                          </div>
                        </div>
                        {/* Dang 1 */}
                        <div className="card-body">
                          <div className="table-back employee-office-table">
                            <div className="table-responsive">
                              <table className="table custom-table table-hover table-hover table-role_organization">
                                <thead>
                                  <tr>
                                    <th style={{ width: "10%" }}>Tên</th>
                                    <th
                                      style={{ width: "30%" }}
                                      className="cell-breakWord"
                                    >
                                      Miêu tả
                                    </th>
                                    <th style={{ width: "20%" }}>Phòng ban</th>
                                    <th style={{ width: "15%" }}>
                                      Quyền tạo process
                                    </th>
                                    <th style={{ width: "25%" }}>Hành động</th>
                                  </tr>
                                </thead>
                                <tbody className="text-center">
                                  {this.state.listRole.length !== 0 ? (
                                    Object.values(this.state.listRole).map(
                                      (role, index) => {
                                        return (
                                          <tr key={index}>
                                            <td style={{ width: "10%" }}>
                                              <h2>{role.name}</h2>
                                            </td>
                                            <td
                                              style={{ width: "40%" }}
                                              className="cell-breakWord"
                                            >
                                              {role.description}
                                            </td>
                                            <td style={{ width: "10%" }}>
                                              <NavLink
                                                  to={"/company/organization/department/"+
                                                  role.department_id}
                                                  exact
                                                  className="btn btn-outline-success btn-sm"
                                                >
                                                   {" "}
                                                {role.department_name}{" "}
                                              </NavLink>
                                            </td>
                                            <td style={{ width: "5%" }}>
                                              {
                                                (parseInt(role.is_process) === 1)?("Có"):("Không")
                                              }
                                            </td>
                                            <td style={{ width: "35%" }}>
                                              <div className="table-action">
                                                <NavLink
                                                  to={
                                                    "/company/organization/department/"+role.department_id+"/role/" +
                                                    role.id
                                                  }
                                                  exact
                                                  className="btn btn-sm btn-outline-success"
                                                >
                                                  <span className="lnr lnr-pencil" />{" "}
                                                  Chi tiết
                                                </NavLink>
                                                <a
                                                  href="edit-review.html"
                                                  className="btn btn-sm btn-outline-success"
                                                  onClick={(e) => this.openModalEditRole(e,role.id)}
                                                >
                                                  <span className="lnr lnr-pencil" />{" "}
                                                  Sửa
                                                </a>
                                                <a
                                                  href="##"
                                                  className="btn btn-sm btn-outline-danger"
                                                  data-toggle="modal"
                                                  data-target="#delete"
                                                  onClick={(e) => this.deleteRole(e,role.id)}
                                                >
                                                  <span className="lnr lnr-trash" />{" "}
                                                  Xóa
                                                </a>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )
                                  ) : (
                                    <tr></tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        {/* End Dang 1*/}
                      </div>
                    </div>
                  </div>
                  {/* End Content Employee Organization */}
                </div>
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
    getEditRoleOrganization: (detailRole) => {
      dispatch(editRoleOrganization(detailRole))
    }
  }
}
export default connect(null, mapDispatchToProps)(RoleOraganization)
