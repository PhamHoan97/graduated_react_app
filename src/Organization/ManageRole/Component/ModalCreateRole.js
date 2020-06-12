import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Validator from "../Utils/Validator";
import host from '../../../Host/ServerDomain'; 
import { isEmpty } from "validator";
import { Modal } from "react-bootstrap";
export default class ModalCreateRole extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      listDepartment: [],
      isDisplayAlertSuccess: false,
      errors: {},
      errorChooseDepartment: {},
      newNameRole: "",
      newDescriptionRole: "",
      newIsProcessRole: false,
      newDepartmentRole: 0,
    };
    const rules = [
      {
        field: "newNameRole",
        method: "isEmpty",
        validWhen: false,
        message: "Tên vai trò không được trống.",
      },
      {
        field: "newDescriptionRole",
        method: "isEmpty",
        validWhen: false,
        message: "Mô tả vai trò không được trống.",
      },
    ];
    this.validator = new Validator(rules);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    const name = event.target.name;
    const value =
      event.target.name === "newIsProcessRole"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [name]: value,
    });
  }
  render() {
    const { errors } = this.state;
    const { errorChooseDepartment } = this.state;
    return (
      <Modal
        size="lg"
        show={this.props.showModal}
        onHide={this.props.close}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Thêm mới chức vụ nhân viên
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <form>
              <div className="form-group">
                <label htmlFor="name">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  name="newNameRole"
                  value = {this.state.newNameRole}
                  onChange={(event) => this.handleChange(event)}
                />
                {errors.newNameRole && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.newNameRole}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Miêu tả</label>
                <textarea
                  className="form-control"
                  name="newDescriptionRole"
                  onChange={(event) => this.handleChange(event)}
                  value = {this.state.newDescriptionRole}
                  id="exampleFormControlTextarea1"
                  rows="3"
                />
                {errors.newDescriptionRole && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.newDescriptionRole}
                  </div>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlSelect1">Phòng ban</label>
                <br></br>
                <select
                  className="form-control"
                  name="newDepartmentRole"
                  onChange={this.handleChange}
                  value = {this.state.newDepartmentRole}
                >
                  <option value={0}>Chọn phòng ban</option>
                  {this.state.listDepartment.length !== 0 ? (
                    Object.values(this.state.listDepartment).map(
                      (department, key) => {
                        return (
                          <option value={department.id} key={key}>
                            {department.name}
                          </option>
                        );
                      }
                    )
                  ) : (
                    <option></option>
                  )}
                </select>
              </div>
              {errorChooseDepartment.newDepartmentRole && (
                <div
                  className="validation"
                  style={{ display: "block", color: "red" }}
                >
                  {errorChooseDepartment.newDepartmentRole}
                </div>
              )}
              <div className="form-group">
                <input
                  type="checkbox"
                  name="newIsProcessRole"
                  checked={this.state.newIsProcessRole}
                  onChange={(event) => this.handleChange(event)}
                />
                <label htmlFor="name" className="ml-2">
                  Quyền tạo quy trình
                </label>
              </div>
              <div className="form-group text-left">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-2"
                  onClick={(e) => this.saveNewRole(e)}
                >
                  Lưu
                </button>
              </div>
            </form>
            {this.displayAlertSuccess()}
          </>
        </Modal.Body>
      </Modal>
    );
  }

  displayAlertSuccess = () => {
    if (this.state.isDisplayAlertSuccess) {
      return <Alert severity="success">Lưu thành công</Alert>;
    } else {
      return <div></div>;
    }
  };

  saveNewRole = (e) => {
    e.preventDefault();
    this.setState({
      errorChooseDepartment: {},
      errors: {},
    });
    var errorChooseDepartment = {};
    var self = this;
    if (parseInt(this.state.newDepartmentRole) === 0) {
      errorChooseDepartment = {
        newDepartmentRole: "Phòng ban không được trống.",
      };
      this.setState({
        errorChooseDepartment: errorChooseDepartment,
      });
    }
    if (
      isEmpty(this.state.newNameRole) ||
      isEmpty(this.state.newDescriptionRole)
    ) {
      this.setState({
        errors: this.validator.validate(this.state),
      });
    }
    if (
      parseInt(this.state.newDepartmentRole) !== 0 &&
      !isEmpty(this.state.newNameRole) &&
      !isEmpty(this.state.newDescriptionRole)
    ) {
      var token = localStorage.getItem("token");
      axios
        .post(
          host + "/api/company/organization/role/new",
          {
            newNameRole: this.state.newNameRole,
            newDescriptionRole: this.state.newDescriptionRole,
            newIsProcessRole: this.state.newIsProcessRole,
            newDepartmentRole: this.state.newDepartmentRole,
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
              newDepartmentRole: 0,
              newNameRole: "",
              newDescriptionRole: "",
              isDisplayAlertSuccess: true,
            });
            setTimeout(() => {
              self.setState({
                isDisplayAlertSuccess: false,
              });
            }, 2000);
            self.props.getListRole();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
