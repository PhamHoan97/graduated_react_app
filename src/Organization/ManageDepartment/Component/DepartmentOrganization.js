import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/Department.scss";
import Header from "../../Header";
import Menu from "../../Menu";
import LinkPage from "../../LinkPage";
import axios from "axios";
import host from '../../../Host/ServerDomain'; 
import ModalCreateDepartment from './ModalCreateDepartment';
import ModalEditDepartment from './ModalEditDepartment';
import  {connect} from 'react-redux';
import {editDepartmentOrganization} from '../Action/Index';
import {showMessageAlert} from "../../../Alert/Action/Index";
import {NavLink} from "react-router-dom";
class DepartmentOrganization extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      listDepartment: [],
      showModalNewDepartment: false,
      showModalEditDepartment: false,
    };
  }
  getListDepartment = () => {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .get(
        host + "/api/company/organization/department/" + token,
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

  componentDidMount() {
    this.getListDepartment();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }


  openModalAddDepartment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showModalNewDepartment: true,
    });
  };

  closeModalAddDepartment = () => {
      this.setState({
        showModalNewDepartment: false,
      });
  };

  openModalEditDepartment = (e,idEditDepartment) => {
    e.preventDefault();
    e.stopPropagation();
    this.getDetailDepartmentOrganization(idEditDepartment);
  };

  closeModalEditDepartment = () => {
      this.setState({
        showModalEditDepartment: false,
      });
  };

  getDetailDepartmentOrganization = (idEditDepartment) =>{
    var token = localStorage.getItem('token');
    var self =  this;
    axios.get(host + '/api/company/organization/department/edit/'+idEditDepartment,{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
            console.log(response.data.error);
        }else{
            var detailDepartment =  JSON.parse(JSON.stringify(response.data.department));
            self.props.getDepartmentById(detailDepartment);
            self.setState({
              showModalEditDepartment: true,
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  deleteDepartment = (e,idDeleteDepartment) =>{
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem('token');
    axios.post(host + '/api/company/organization/department/delete',{
        idDeleteDepartment:idDeleteDepartment,
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
            self.getListDepartment();
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
                    <LinkPage linkPage="Phòng ban"/>
                </div>
                <div className="card shadow-sm ctm-border-radius  manage-department_organization">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title mb-0 d-inline-block">
                      Danh sách phòng ban
                    </h4>
                    <ModalCreateDepartment
                        getListDepartment = {this.getListDepartment}
                        showModal={this.state.showModalNewDepartment}
                        close={() => this.closeModalAddDepartment()}
                    />
                    {
                      (this.state.showModalEditDepartment === true)?( <ModalEditDepartment
                        getListDepartment = {this.getListDepartment}
                        showModal={this.state.showModalEditDepartment}
                        close={() => this.closeModalEditDepartment()}
                      />):(<div></div>)
                    }
                    <a
                      href="create-review.html"
                      className="btn btn-theme button-1 ctm-border-radius text-white float-right"
                      onClick={(e) => this.openModalAddDepartment(e)}
                    >
                      <span /> Thêm mới phòng ban
                    </a>
                  </div>
                  <div className="card-body align-center">
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
                            <table className="table custom-table table-hover table-department_organization">
                              <thead>
                                <tr>
                                  <th style={{ width: "15%" }} className="cell-breakWord">Tên</th>
                                  <th
                                    style={{ width: "40%" }}
                                    className="cell-breakWord"
                                  >
                                    Miêu tả
                                  </th>
                                  <th style={{ width: "10%" }}>Viết tắt</th>
                                  <th style={{ width: "35%" }}>Hành động</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.listDepartment.length !== 0 ? (
                                  Object.values(this.state.listDepartment).map(
                                    (department, index) => {
                                      return (
                                        <tr key={index}>
                                          <td style={{ width: "15%" }} className="cell-breakWord">
                                      {department.name}{" "}
                                          </td>
                                          <td
                                            style={{ width: "40%" }}
                                            className="cell-breakWord"
                                          >
                                            {department.description}
                                          </td>
                                          <td style={{ width: "10%" }}>{department.signature}</td>
                                          <td style={{ width: "35%" }}>
                                            <div className="table-action">
                                              <NavLink
                                                to={"/company/organization/department/"+department.id}
                                                exact
                                                className="btn btn-sm btn-outline-success"
                                              >
                                                <span className="lnr lnr-pencil" />{" "}
                                                Chi tiết
                                              </NavLink>
                                              <a
                                                href="edit-review.html"
                                                className="btn btn-sm btn-outline-success"
                                                onClick={(e) => this.openModalEditDepartment(e,department.id)}
                                              >
                                                <span className="lnr lnr-pencil" />{" "}
                                                Sửa
                                              </a>
                                              <a
                                                href="##"
                                                className="btn btn-sm btn-outline-danger"
                                                data-toggle="modal"
                                                data-target="#delete"
                                                onClick={(e) => this.deleteDepartment(e,department.id)}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDepartmentById: (editDepartment) => {
      dispatch(editDepartmentOrganization(editDepartment))
    },
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties))
    }
  }
}
export default connect(null,mapDispatchToProps)(DepartmentOrganization);
