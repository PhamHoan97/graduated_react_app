import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Validator from "../Utils/Validator";
import * as host from "../../Url";
import { isEmpty } from "validator";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";


class ModalEditEmployeeRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isDisplayAlertSuccess: false,
          isDisplayAlertFailEmail: false,
          errors: {},
          editNameEmployee: this.props.editEmployee.name,
          editEmailEmployee: this.props.editEmployee.email,
          editPhoneEmployee: this.props.editEmployee.phone,
          editGender: this.props.editEmployee.gender,
          editAvatarEmployee: "",
          inputKey: Date.now()
        };
        const rules = [
            {
                field: "editNameEmployee",
                method: "isEmpty",
                validWhen: false,
                message: "The Name Employee field is required.",
            },
            {
                field: "editEmailEmployee",
                method: "isEmpty",
                validWhen: false,
                message: "The Email Employee field is required.",
            },
            {
                field: "editPhoneEmployee",
                method: "isEmpty",
                validWhen: false,
                message: "The Phone Employee field is required.",
            },
        ];
        this.validator = new Validator(rules);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
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
                <label htmlFor="name">Name</label>
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
                <label htmlFor="field">Phone</label>
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
  saveEditEmployee = (e) => {
    e.preventDefault();
    this.setState({
      errors: {},
    });
    var self =  this;
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
      !isEmpty(this.state.editNameEmployee) &&
      !isEmpty(this.state.editEmailEmployee) &&
      !isEmpty(this.state.editPhoneEmployee)
    ) {
      var token = localStorage.getItem("token");
      axios
        .post(
          host.URL_BACKEND + "/api/system/organization/employee/update",
          {
            editNameEmployee: this.state.editNameEmployee,
            editEmailEmployee: this.state.editEmailEmployee,
            editPhoneEmployee: this.state.editPhoneEmployee,
            editGender: this.state.editGender,
            idChooseRole: this.props.idRole,
            idChooseEmployee: this.props.editEmployee.id,
            idChooseDepartment: this.props.idDepartment,
            editAvatarEmployee: this.state.editAvatarEmployee,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(function (response) {
          if (response.data.error != null && response.status === 200) {
            console.log(response.data.error);
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
            console.log(response.data.error);
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
            self.props.getInformationDetailRole();
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
      state.organizationReducers.roleOrganizationReducer
        .editEmployeeOrganization,
  };
};
export default connect(mapStateToProps, null)(ModalEditEmployeeRole);
