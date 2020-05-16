import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Validator from "../Utils/Validator";
import * as host from "../../Url";
import { isEmpty } from "validator";
import { Modal } from "react-bootstrap";
export default class ModalCreateEmployeeRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayAlertSuccess: false,
      isDisplayAlertFailEmail: false,
      errors: {},
      newNameEmployee: "",
      newEmailEmployee: "",
      newPhoneEmployee: "",
      newIsMale: false,
    };
    const rules = [
      {
        field: "newNameEmployee",
        method: "isEmpty",
        validWhen: false,
        message: "The Name Employee field is required.",
      },
      {
        field: "newEmailEmployee",
        method: "isEmpty",
        validWhen: false,
        message: "The Email Employee field is required.",
      },
      {
        field: "newPhoneEmployee",
        method: "isEmpty",
        validWhen: false,
        message: "The Phone Employee field is required.",
      },
    ];
    this.validator = new Validator(rules);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log("Handle change");
    const name = event.target.name;
    const value =
      event.target.name === "newIsMale"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { errors } = this.state;
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
                <label htmlFor="name">Name</label>
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
                <label htmlFor="field">Phone</label>
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
                    className="form-check-input"
                    type="checkbox"
                    name="newIsMale"
                    value={this.state.newIsMale}
                    onChange={(event) => this.handleChange(event)}
                    id="defaultCheck1"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Nam
                  </label>
                </div>
              </div>
              <div className="form-group text-left">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-2"
                  onClick={(e) => this.saveNewEmployee(e)}
                >
                  Save
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
      return <Alert severity="warning">Email existed in company</Alert>;
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
    var self =  this;
    this.setState({
      errors: {},
    });
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
      !isEmpty(this.state.newNameEmployee) &&
      !isEmpty(this.state.newEmailEmployee) &&
      !isEmpty(this.state.newPhoneEmployee)
    ) {
      var token = localStorage.getItem("token");
      axios
        .post(
          host.URL_BACKEND + "/api/system/organization/employee/new",
          {
            newNameEmployee: this.state.newNameEmployee,
            newEmailEmployee: this.state.newEmailEmployee,
            newIsMale: this.state.newIsMale,
            newRoleEmployee: this.props.idRole,
            newDepartmentEmployee: this.props.idDepartment,
            newPhoneEmployee: this.state.newPhoneEmployee,
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
              isDisplayAlertSuccess: true,
              isDisplayAlertFailEmail: false,
            });
            setTimeout(() => {
              self.setState({
                isDisplayAlertFailEmail: false,
                isDisplayAlertSuccess: false,
              });
            }, 2000);
            self.props.getInformationDetailRole();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
