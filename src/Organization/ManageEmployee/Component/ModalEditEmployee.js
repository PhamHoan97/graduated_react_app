import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Validator from "../Utils/Validator";
import host from '../../../Host/ServerDomain'; 
import { isEmpty } from "validator";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

class ModalEditEmployee extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      listDepartment: [],
      listRoleDepartment: [],
      isDisplayAlertSuccess: false,
      isDisplayAlertFailEmail: false,
      errors: {},
      errorChooseDepartment: {},
      errorChooseRole: {},
      editNameEmployee: this.props.editEmployee.name,
      editEmailEmployee: this.props.editEmployee.email,
      editPhoneEmployee: this.props.editEmployee.phone,
      editGender: this.props.editEmployee.gender,
      editRoleEmployee: this.props.editEmployee.role_id,
      editDepartmentEmployee: this.props.editEmployee.department_id,
      editAvatarEmployee: "",
      inputKey: Date.now()
    };
    const rules = [
      {
        field: "editNameEmployee",
        method: "isEmpty",
        validWhen: false,
        message: "Tên nhân viên không được trống.",
      },
      {
        field: "editEmailEmployee",
        method: "isEmpty",
        validWhen: false,
        message: "Email nhân viên không được trống.",
      },
      {
        field: "editPhoneEmployee",
        method: "isEmpty",
        validWhen: false,
        message: "Số điện thoại nhân viên không được trống.",
      },
    ];
    this.validator = new Validator(rules);
    this.handleChange = this.handleChange.bind(this);
    console.log(this.props.editEmployee);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      errors: {},
      errorChooseDepartment: {},
      errorChooseRole: {},
    })
  }
  handleChange(event) {
    const name = event.target.name;
    const value =event.target.value;
    if (name === "editDepartmentEmployee") {
      var self = this;
      var token = localStorage.getItem("token");
      axios
        .get(
          host +
            "/api/company/organization/role/department/" +
            value,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(function (response) {
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              [name]: value,
              listRoleDepartment: response.data.roleDepartment,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.setState({
        [name]: value,
      });
    }
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
  getListRole = () => {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .get(host + "/api/company/organization/role/" + token, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        if(self._isMounted){ 
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              listRoleDepartment: JSON.parse(JSON.stringify(response.data.roles)),
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
    this.getListRole();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  handleOnChangeFile(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    this.createImage(files[0]);
  }
  createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
      this.setState({
        editAvatarEmployee: e.target.result,
      });
      };
      reader.readAsDataURL(file);
  }

  render() {
    const { errors } = this.state;
    const { errorChooseDepartment } = this.state;
    const { errorChooseRole } = this.state;
    return (
      <Modal
        size="lg"
        show={this.props.showModal}
        onHide={this.props.close}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Sửa quyền nhân viên
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <form>
              <div className="form-group">
                <label htmlFor="name">Tên nhân viên</label>
                <input
                  type="text"
                  className="form-control"
                  name="editNameEmployee"
                  value={this.state.editNameEmployee}
                  onChange={(event) => this.handleChange(event)}
                />
                {errors.editNameEmployee && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.editNameEmployee}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="editEmailEmployee"
                  value={this.state.editEmailEmployee}
                  onChange={(event) => this.handleChange(event)}
                />
                {errors.editEmailEmployee && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.editEmailEmployee}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="field">Số điện thoại</label>
                <input
                  type="number"
                  className="form-control"
                  name="editPhoneEmployee"
                  value={this.state.editPhoneEmployee}
                  onChange={(event) => this.handleChange(event)}
                />
                {errors.editPhoneEmployee && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.editPhoneEmployee}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="field">Giới tính</label>
                <div className="form-check">
                  <input
                      type="radio"
                      value="Nam"
                      name="editGender"
                      checked={this.state.editGender === "Nam"}
                      onChange={(event) => this.handleChange(event)}
                      className="form-check-input"
                      /> Nam
                    <br></br>
                  <input
                      type="radio"
                      value="Nữ"
                      checked={this.state.editGender === "Nữ"}
                      onChange={(event) => this.handleChange(event)}
                      name="editGender"
                      className="form-check-input"
                    /> Nữ
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlSelect1">Phòng ban</label>
                <br></br>
                <select
                  className="form-control"
                  name="editDepartmentEmployee"
                  value={this.state.editDepartmentEmployee}
                  onChange={this.handleChange}
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
                {errorChooseDepartment.editDepartmentEmployee && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errorChooseDepartment.editDepartmentEmployee}
                  </div>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlSelect1">Vai trò</label>
                <br></br>
                <select
                  className="form-control"
                  name="editRoleEmployee"
                  value={this.state.editRoleEmployee}
                  onChange={this.handleChange}
                >
                  <option value={0}>Chọn vai trò</option>
                  {Object.values(this.state.listRoleDepartment).map(
                    (role, key) => {
                      return (
                        <option value={role.id} key={key}>
                          {role.name}
                        </option>
                      );
                    }
                  )}
                </select>
                {errorChooseRole.editRoleEmployee && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errorChooseRole.editRoleEmployee}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="avatar">Ảnh đại diện</label>
                <input
                  type="file"
                  key={this.state.inputKey}
                  id="file-avatar"
                  name="file-input"
                  className="form-control-file"
                  onChange={(e) => this.handleOnChangeFile(e)}
                  />
              </div>
              <div className="form-group text-left">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-2"
                  onClick={(e) => this.saveEditEmployee(e)}
                >
                  Lưu
                </button>
              </div>
            </form>
            {this.displayAlertSuccess()}
            {this.displayAlertFailEmail()}
          </>
        </Modal.Body>
      </Modal>
    );
  }
  displayAlertFailEmail = () => {
    if (this.state.isDisplayAlertFailEmail) {
      return <Alert severity="warning">Email đã được sử dụng</Alert>;
    } else {
      return <div></div>;
    }
  };

  displayAlertSuccess = () => {
    if (this.state.isDisplayAlertSuccess) {
      return <Alert severity="success">Lưu thành công</Alert>;
    } else {
      return <div></div>;
    }
  };
  saveEditEmployee = (e) => {
    e.preventDefault();
    this.setState({
      errorChooseDepartment: {},
      errorChooseRole: {},
      errors: {},
    });
    var errorChooseDepartment = {};
    var self = this;
    if (parseInt(this.state.editDepartmentEmployee) === 0) {
      errorChooseDepartment = {
        editDepartmentEmployee: "Phòng ban không được trống.",
      };
      this.setState({
        errorChooseDepartment: errorChooseDepartment,
      });
    }
    var errorChooseRole = {};
    if (parseInt(this.state.editRoleEmployee) === 0) {
      errorChooseRole = {
        editRoleEmployee: "Vai trò không được trống.",
      };
      this.setState({
        errorChooseRole: errorChooseRole,
      });
    }
    if (
      isEmpty(this.state.editNameEmployee) ||
      isEmpty(this.state.editPhoneEmployee) ||
      isEmpty(this.state.editEmailEmployee)
    ) {
      this.setState({
        errors: this.validator.validate(this.state),
      });
    }
    if (
      parseInt(this.state.editDepartmentEmployee) !== 0 &&
      parseInt(this.state.editRoleEmployee) !== 0 &&
      !isEmpty(this.state.editNameEmployee) &&
      !isEmpty(this.state.editEmailEmployee) &&
      !isEmpty(this.state.editPhoneEmployee)
    ) {
      var token = localStorage.getItem("token");
      axios
        .post(
          host + "/api/company/organization/employee/update",
          {
            editNameEmployee: this.state.editNameEmployee,
            editEmailEmployee: this.state.editEmailEmployee,
            editPhoneEmployee: this.state.editPhoneEmployee,
            editGender: this.state.editGender,
            idChooseRole: this.state.editRoleEmployee,
            idChooseEmployee: this.props.editEmployee.id,
            idChooseDepartment: this.state.editDepartmentEmployee,
            editAvatarEmployee: this.state.editAvatarEmployee,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(function (response) {
          if (response.data.error != null && response.status === 200) {
            self.props.showAlert({
              message:response.data.error,
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thất bại',
              severity:'error'
            });
            self.setState({
              isDisplayAlertSuccess: false,
              isDisplayAlertFailEmail: true,
            });
            setTimeout(() => {
              self.setState({
                isDisplayAlertSuccess: false,
                isDisplayAlertFailEmail: false,
              });
            }, 5000);
          } else if (response.data.error != null && response.status === 400) {
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
            self.setState({
              isDisplayAlertSuccess: true,
              inputKey: Date.now(),
              isDisplayAlertFailEmail: false,
            });
            setTimeout(() => {
              self.setState({
                isDisplayAlertSuccess: false,
                isDisplayAlertFailEmail: false,
              });
            }, 5000);
            self.props.getListEmployee();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
const mapStateToProps = (state, ownProps) => {
  return {
    editEmployee:
      state.organizationReducers.employeeOrganizationReducer
        .editEmployeeOrganization,
  };
};
export default connect(mapStateToProps, null)(ModalEditEmployee);
