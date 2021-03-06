import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/Employee.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import ModalCreateEmployee from "./ModalCreateEmployee";
import ModalEditEmployee from "./ModalEditEmployee";
import axios from "axios";
import host from '../../../Host/ServerDomain'; 
import avatarMale from "../Image/avatar_employee1.png";
import avatarFeMale from "../Image/avatar_employee2.png";
import { connect } from "react-redux";
import { editEmployeeOrganization } from "../Action/Index";
import ReactPaginate from "react-paginate";
import {NavLink} from "react-router-dom";
import {showMessageAlert} from "../../../Alert/Action/Index";
class EmployeeOrganization extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      listEmployee: [],
      listDepartment:[],
      textEmailSearch:"",
      textNameSearch:"",
      idDepartmentSearch:0,
      showTemplateEmployee: true,
      showModalNewEmployee: false,
      showModalEditEmployee: false,
      offset: 0,
      listProcess: [],
      perPage: 10,
      currentPage: 0,
      pageCount: 0,
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

  showTemplate1Employee = (e) => {
    e.preventDefault();
    this.setState({
      showTemplateEmployee: true,
    });
  };

  showTemplate2Employee = (e) => {
    e.preventDefault();
    this.setState({
      showTemplateEmployee: false,
    });
  };

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

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };

  getListEmployee = () => {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .get(
        host +
          "/api/company/organization/employee/" +
          token,
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
              listEmployee: JSON.parse(JSON.stringify(response.data.employees)),
              pageCount: Math.ceil(
                response.data.employees.length / self.state.perPage
              ),
              currentPage: 0,
              offset:0
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getListEmployee();
    this.getListDepartment();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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
            title:'Th???t b???i',
            severity:'error'
          });
        } else {
          self.props.showAlert({
            message:response.data.message,
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Th??nh c??ng',
            severity:'success'
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      this.getListEmployee();
  };

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

  getSearchEmployee = (e) =>{
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/company/organization/employee/search",{
          textNameSearch:this.state.textNameSearch,
          textEmailSearch:this.state.textEmailSearch,
          idDepartmentSearch:this.state.idDepartmentSearch,
          token:token
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
            listEmployee: JSON.parse(
              JSON.stringify(response.data.employees)
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
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card">
                  <LinkPage linkPage="Nh??n vi??n"/>
                </div>
                {/*Content Employee Organization */}
                <div className="row manage-employee_company">
                  <div className="col-md-12 d-flex">
                    <div className="ctm-border-radius shadow-sm  card card-content_employee">
                      <div className="page-header_employee">
                        <div className="row align-items-center">
                          <div className="col-6">
                            <h3 className="page-title_employee">Nh??n vi??n</h3>
                          </div>
                          <div className="col-6 float-right ml-auto">
                            <a
                              href="##"
                              className="btn add-btn"
                              data-toggle="modal"
                              data-target="#add_employee"
                              onClick={(e) => this.openModalAddEmployee(e)}
                            >
                              <i className="fa fa-plus" /> Th??m nh??n vi??n
                            </a>
                            <ModalCreateEmployee
                              getListEmployee={this.getListEmployee}
                              listDepartment={this.state.listDepartment}
                              showModal={this.state.showModalNewEmployee}
                              close={() => this.closeModalAddEmployee()}
                            />
                            {this.state.showModalEditEmployee === true ? (
                              <ModalEditEmployee
                                getListEmployee={this.getListEmployee}
                                showModal={this.state.showModalEditEmployee}
                                close={() => this.closeModalEditEmployee()}
                              />
                            ) : (
                              <div></div>
                            )}
                            <div className="view-icons">
                              <a
                                href="employees.html"
                                onClick={(e) => this.showTemplate1Employee(e)}
                                className="grid-view btn btn-link active"
                              >
                                <i className="fa fa-th" />
                              </a>
                              <a
                                href="employees-list.html"
                                onClick={(e) => this.showTemplate2Employee(e)}
                                className="list-view btn btn-link"
                              >
                                <i className="fa fa-bars" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row filter-row">
                        <div className="col-sm-6 col-md-3">
                          <div className="form-group form-focus">
                            <input
                              type="text"
                              name="textEmailSearch"
                              placeholder="Email Nh??n vi??n"
                              className="form-control floating"
                              value={this.state.textEmailSearch}
                              onChange={(event) => this.handleChange(event)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                          <div className="form-group form-focus">
                            <input
                              type="text"
                              name="textNameSearch"
                              className="form-control floating"
                              placeholder="T??n nh??n vi??n"
                              value={this.state.textNameSerach}
                              onChange={(event) => this.handleChange(event)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
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
                              <option value={0}>Ch???n ph??ng ban</option>
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
                          <a href="##" 
                          className="btn btn-success btn-block"
                          onClick={(e) =>this.getSearchEmployee(e)}
                          >
                            {" "}
                            T??m ki???m{" "}
                          </a>
                        </div>
                      </div>
                      {/* Dang 1 */}
                      {this.state.showTemplateEmployee === true ? (
                        <div className="card-body">
                          <div className="table-back employee-office-table">
                            <div className="table-responsive">
                              <table className="table custom-table table-hover table-hover table-employee_organization">
                                <thead>
                                  <tr>
                                    <th style={{ width: "5%" }} className="cell-breakWord text-left">#</th>
                                    <th style={{ width: "25%" }} className="cell-breakWord text-left">T??n</th>
                                    <th style={{ width: "25%" }} className="cell-breakWord text-left">Email</th>
                                    <th style={{ width: "15%" }} className="cell-breakWord text-left">Ph??ng ban</th>
                                    <th style={{ width: "18%" }} className="cell-breakWord text-left">Ch???c v???</th>
                                    <th style={{ width: "12%" }} className="cell-breakWord text-left"></th>
                                  </tr>
                                </thead>
                                <tbody className="text-left">
                                  {this.state.listEmployee.length !== 0 ? (
                                    Object.values(
                                      this.state.listEmployee.slice(
                                        this.state.offset,
                                        this.state.offset + this.state.perPage
                                      )
                                    ).map((employee, index) => {
                                      return (
                                        <tr key={index}>
                                          <td style={{ width: "5%" }} className="cell-breakWord">{index+1}</td>
                                          <td style={{ width: "25%" }} className="cell-breakWord">
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
                                          <td style={{ width: "25%" }} className="cell-breakWord">{employee.email}</td>
                                          <td style={{ width: "15%" }} >
                                            <NavLink
                                                to={"/company/organization/department/"+
                                                employee.id_department}
                                                exact
                                                className="btn btn-outline-success btn-sm cell-breakWord"
                                              >
                                                {" "}
                                              {employee.department_name}{" "}
                                            </NavLink>
                                          </td>
                                          <td style={{ width: "18%" }}>
                                            <NavLink
                                                to={"/company/organization/role/"+
                                                employee.id_role}
                                                exact
                                                className="btn btn-outline-warning btn-sm cell-breakWord"
                                              >
                                                 {" "}
                                              {employee.role}{" "}
                                            </NavLink>
                                          </td>
                                          <td style={{ width: "12%" }} className="cell-breakWord text-left">
                                            <div className="dropdown action-label drop-active">
                                              <a
                                                href="##"
                                                className="btn btn-white btn-sm dropdown-toggle"
                                                data-toggle="dropdown"
                                              >
                                                {" "}
                                                Chi ti???t <i className="caret" />
                                              </a>
                                              <div className="dropdown-menu">
                                              <NavLink
                                                  to={"/company/organization/employee/"+
                                                  employee.id_employee}
                                                  exact
                                                  className="dropdown-item"
                                                >
                                                  <span>Chi ti???t</span>
                                              </NavLink>
                                                <a
                                                  className="dropdown-item"
                                                  href="##"
                                                  onClick={(e) =>
                                                    this.openModalEditEmployee(
                                                      e,
                                                      employee.id_employee
                                                    )
                                                  }
                                                >
                                                  {" "}
                                                  S???a
                                                </a>
                                                <a
                                                  className="dropdown-item"
                                                  href="##"
                                                  onClick={(e) =>
                                                    this.deleteEmployee(
                                                      e,
                                                      employee.id_employee
                                                    )
                                                  }
                                                >
                                                  {" "}
                                                  X??a
                                                </a>
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
                      ) : (
                        <div className="row staff-grid-row">
                          {this.state.listEmployee.length !== 0 ? (
                            Object.values(
                              this.state.listEmployee.slice(
                                this.state.offset,
                                this.state.offset + this.state.perPage
                              )
                            ).map((employee, index) => {
                              return (
                                <React.Fragment key={index}>
                                <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                                  <div className="profile-widget">
                                    <div className="profile-img">
                                      <a href="profile.html" className="avatar">
                                        {employee.avatar !== null &&
                                        employee.avatar !== "" ? (
                                          <img
                                            alt="avatar employee 1"
                                            src={
                                              host + employee.avatar
                                            }
                                            className="img-fluid"
                                          />
                                        ) : parseInt(employee.gender) === 1 ? (
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
                                    </div>
                                    <div className="dropdown profile-action">
                                      <a
                                        href="##"
                                        className="action-icon dropdown-toggle"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                      >
                                        <i
                                          className="fa fa-ellipsis-v"
                                          aria-hidden="true"
                                        />
                                      </a>
                                      <div
                                        className="dropdown-menu dropdown-menu-right"
                                        x-placement="bottom-end"
                                        style={{
                                          position: "absolute",
                                          willChange: "transform",
                                          top: "0px",
                                          left: "0px",
                                          transform:
                                            "translate3d(-136px, 32px, 0px)",
                                        }}
                                      >
                                        <a
                                          className="dropdown-item"
                                          href="##"
                                          data-toggle="modal"
                                          data-target="#edit_employee"
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          S???a
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          href="##"
                                          data-toggle="modal"
                                          data-target="#edit_employee"
                                        >
                                          <i className="fa fa-pencil m-r-5" />{" "}
                                          X??a
                                        </a>
                                        <a
                                          className="dropdown-item"
                                          href="##"
                                          data-toggle="modal"
                                          data-target="#delete_employee"
                                        >
                                          <i className="fa fa-trash-o m-r-5" />{" "}
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                    <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                                      <a href="profile.html">{employee.name}</a>
                                    </h4>
                                    <div className="small text-muted">
                                      {employee.role}
                                    </div>
                                  </div>
                                </div>
                                </React.Fragment>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* End Content Employee Organization */}
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4 text-center">
                    <ReactPaginate
                      previousLabel={"Tr?????c"}
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
export default connect(null, mapDispatchToProps)(EmployeeOrganization);
