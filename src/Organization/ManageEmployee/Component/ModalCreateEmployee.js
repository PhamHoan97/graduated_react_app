import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Validator from "../Utils/Validator";
import host from '../../../Host/ServerDomain'; 
import { isEmpty } from "validator";
import { Modal } from "react-bootstrap";
export default class ModalCreateEmployee extends Component {
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
      newNameEmployee: "",
      newEmailEmployee: "",
      newPhoneEmployee: "",
      newGender: "Nam",
      newRoleEmployee: 0,
      newDepartmentEmployee: 0,
      newAvatarEmployee: "",
      inputKey: Date.now()
    };
    const rules = [
      {
        field: "newNameEmployee",
        method: "isEmpty",
        validWhen: false,
        message: "Tên nhân viên không được trống.",
      },
      {
        field: "newEmailEmployee",
        method: "isEmpty",
        validWhen: false,
        message: "Email nhân viên không được trống.",
      },
      {
        field: "newPhoneEmployee",
        method: "isEmpty",
        validWhen: false,
        message: "Số điện thoại nhân viên không được trống.",
      },
    ];
    this.validator = new Validator(rules);
    this.handleChange = this.handleChange.bind(this);
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
        newAvatarEmployee: e.target.result,
      });
      };
      reader.readAsDataURL(file);
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
    const value = event.target.value;
    if (name === "newDepartmentEmployee") {
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

  componentWillUnmount() {
    this._isMounted = false;
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
            Thêm mới quyền nhân viên
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
                  name="newNameEmployee"
                  value={this.state.newNameEmployee}
                  onChange={(event) => this.handleChange(event)}
                />
                {errors.newNameEmployee && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.newNameEmployee}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="newEmailEmployee"
                  value={this.state.newEmailEmployee}
                  onChange={(event) => this.handleChange(event)}
                />
                {errors.newEmailEmployee && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.newEmailEmployee}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="field">Số điện thoại</label>
                <input
                  type="number"
                  className="form-control"
                  name="newPhoneEmployee"
                  value={this.state.newPhoneEmployee}
                  onChange={(event) => this.handleChange(event)}
                />
                {errors.newPhoneEmployee && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.newPhoneEmployee}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="field">Giới tính</label>
                <div className="form-check">
                  <input
                    type="radio"
                    value="Nam"
                    name="newGender"
                    checked={this.state.newGender === "Nam"}
                    onChange={(event) => this.handleChange(event)}
                    className="form-check-input"
                    /> Nam
                  <br></br>
                  <input
                    type="radio"
                    value="Nữ"
                    checked={this.state.newGender === "Nữ"}
                    onChange={(event) => this.handleChange(event)}
                    name="newGender"
                    className="form-check-input"
                  /> Nữ
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlSelect1">Department</label>
                <br></br>
                <select
                  className="form-control"
                  name="newDepartmentEmployee"
                  value={this.state.newDepartmentEmployee}
                  onChange={this.handleChange}
                >
                  <option value={0}>Choose departments</option>
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
                {errorChooseDepartment.newDepartmentEmployee && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errorChooseDepartment.newDepartmentEmployee}
                  </div>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlSelect1">Roles</label>
                <br></br>
                <select
                  className="form-control"
                  name="newRoleEmployee"
                  value={this.state.newRoleEmployee}
                  onChange={this.handleChange}
                >
                  <option value={0}>Choose roles</option>
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
                {errorChooseRole.newRoleEmployee && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errorChooseRole.newRoleEmployee}
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
                  onClick={(e) => this.saveNewEmployee(e)}
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
  saveNewEmployee = (e) => {
    e.preventDefault();
    this.setState({
      errorChooseDepartment: {},
      errorChooseRole: {},
      errors: {},
    });
    var errorChooseDepartment = {};
    var self = this;
    if (parseInt(this.state.newDepartmentEmployee) === 0) {
      errorChooseDepartment = {
        newDepartmentEmployee: "Phòng ban không được trống.",
      };
      this.setState({
        errorChooseDepartment: errorChooseDepartment,
      });
    }
    var errorChooseRole = {};
    if (parseInt(this.state.newRoleEmployee) === 0) {
      errorChooseRole = {
        newRoleEmployee: "Vai trò không được trống.",
      };
      this.setState({
        errorChooseRole: errorChooseRole,
      });
    }
    if (
      isEmpty(this.state.newNameEmployee) ||
      isEmpty(this.state.newPhoneEmployee) ||
      isEmpty(this.state.newEmailEmployee)
    ) {
      this.setState({
        errors: this.validator.validate(this.state),
      });
    }
    if (
      parseInt(this.state.newDepartmentEmployee) !== 0 &&
      parseInt(this.state.newRoleEmployee) !== 0 &&
      !isEmpty(this.state.newNameEmployee) &&
      !isEmpty(this.state.newEmailEmployee) &&
      !isEmpty(this.state.newPhoneEmployee)
    ) {
      var token = localStorage.getItem("token");
      axios
        .post(
          host + "/api/company/organization/employee/new",
          {
            newNameEmployee: this.state.newNameEmployee,
            newEmailEmployee: this.state.newEmailEmployee,
            newGender: this.state.newGender,
            newRoleEmployee: this.state.newRoleEmployee,
            newDepartmentEmployee: this.state.newDepartmentEmployee,
            newPhoneEmployee: this.state.newPhoneEmployee,
            newAvatarEmployee: this.state.newAvatarEmployee,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(function (response) {
          if (response.data.error != null && response.status === 200) {
            console.log(response.data.error);
            self.setState({
              newEmailEmployee: "",
              isDisplayAlertSuccess: false,
              isDisplayAlertFailEmail: true,
            });
            setTimeout(() => {
              self.setState({
                isDisplayAlertFailEmail: false,
                isDisplayAlertSuccess: false,
              });
            }, 4000);
          } else {
            self.setState({
                newNameEmployee: "",
                newEmailEmployee: "",
                newPhoneEmployee: "",
                newIsMale: true,
                newDepartmentEmployee:0,
                newRoleEmployee:0,
                newAvatarEmployee:"",
                inputKey: Date.now(),
                isDisplayAlertSuccess: true,
                isDisplayAlertFailEmail: false,
            });
            setTimeout(() => {
              self.setState({
                isDisplayAlertFailEmail: false,
                isDisplayAlertSuccess: false,
              });
            }, 2000);
            self.props.getListEmployee();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
