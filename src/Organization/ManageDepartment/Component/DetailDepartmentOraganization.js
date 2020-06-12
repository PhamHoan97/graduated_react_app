import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/Department.scss";
import Header from "../../Header";
import Menu from "../../Menu";
import host from '../../../Host/ServerDomain'; 
import axios from "axios";
import ModalCreateRoleDepartment from "./ModalCreateRoleDepartment";
import ModalEditRoleDepartment from "./ModalEditRoleDepartment";
import {connect} from "react-redux"
import {editRoleOrganization} from "../Action/Index";
import {NavLink} from "react-router-dom";
import LinkPage from "../../LinkPage";
import {showMessageAlert} from "../../../Alert/Action/Index";
class DetailEmployeeOraganization extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      detailCompany: [],
      showModalNewRole: false,
      showModalEditRole: false,
    };
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
        if(self._isMounted){
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              detailCompany: JSON.parse(
                JSON.stringify(response.data.detailDepartment)
              ),
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  UNSAFE_componentWillMount() {
    this.getDetailDepartment();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  openModalEditRole = (e,idEditRole) => {
    e.preventDefault();
    e.stopPropagation();
    this.getDetailRoleOrganization(idEditRole);
  };

  getDetailRoleOrganization = (idEditRole) =>{
    var token = localStorage.getItem('token');
    var self =  this;
    axios.get(host + '/api/company/organization/role/detail/'+idEditRole,{
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

  deleteRole = (e,idDeleteRole) =>{
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem('token');
    axios.post(host + '/api/company/organization/role/delete',{
        idDeleteRole:idDeleteRole,
    },{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
        } else {
            self.props.showAlert({
              message:'Xóa vai trò nhân viên thành công ',
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Success',
              severity:'success'
            });
            self.getDetailDepartment();
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
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card">
                  <LinkPage linkPage="Phòng ban / Chi tiết"/>
                  <div className="shadow-sm  ctm-border-radius">
                    <div className="card-body align-center">
                      <ul className="nav nav-tabs float-right border-0 tab-list-emp">
                        <ModalCreateRoleDepartment
                          getDetailDepartment = {this.getDetailDepartment}
                          idDepartment={this.props.match.params.id}
                          showModal={this.state.showModalNewRole}
                          close={() => this.closeModalAddRole()}
                        />
                        {
                          (this.state.showModalEditRole === true)?( <ModalEditRoleDepartment
                            getDetailDepartment = {this.getDetailDepartment}
                            idDepartment={this.props.match.params.id}
                            showModal={this.state.showModalEditRole}
                            close={() => this.closeModalEditRole()}
                          />):(<div></div>)
                        }
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
                            {Object.values(this.state.detailCompany.role).map(
                              (role, index) => {
                                return (
                                  <div className="col-md-6 col-lg-6 col-xl-4" key={index}>
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
                                            {
                                              role.name
                                            }
                                          </h4>
                                          <p className="mb-0 ctm-text-sm">
                                           {
                                             role.description
                                           }
                                          </p>
                                        </div>
                                        <div className="text-center mt-2">
                                          <button
                                            type="button"
                                            className="btn btn-success mr-2"
                                            onClick={(e) => this.openModalEditRole(e,role.id)}
                                          >
                                            Sửa
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={(e) => this.deleteRole(e,role.id)}
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
                                          {
                                             role.employees
                                          }
                                        </h4>
                                        <NavLink
                                          to={"/company/organization/department/"+this.props.match.params.id+"/role/"+role.id}
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
                              }
                            )}
                          </div>
                        </div>
                     </div>
                    ) : (
                      <div></div>
                    )}
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEditRoleOrganization: (detailRole) => {
      dispatch(editRoleOrganization(detailRole))
    },
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties))
    }
  }
}
export default connect(null, mapDispatchToProps)(DetailEmployeeOraganization)
