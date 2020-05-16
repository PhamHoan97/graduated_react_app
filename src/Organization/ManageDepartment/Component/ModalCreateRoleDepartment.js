import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Validator from "../Utils/Validator";
import * as host from "../../Url";
import { isEmpty } from "validator";
import { Modal } from "react-bootstrap";
export default class ModalCreateRoleDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayAlertSuccess: false,
      errors: {},
      newNameRole: "",
      newDescriptionRole: "",
      newIsProcessRole: false,
    };
    const rules = [
      {
        field: "newNameRole",
        method: "isEmpty",
        validWhen: false,
        message: "The Name Role field is required.",
      },
      {
        field: "newDescriptionRole",
        method: "isEmpty",
        validWhen: false,
        message: "The Description Department field is required.",
      },
    ];
    this.validator = new Validator(rules);
    this.handleChange = this.handleChange.bind(this);
   }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: {},
    })
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
              <div className="form-group">
                <input
                  type="checkbox"
                  name="newIsProcessRole"
                  checked={this.state.newIsProcessRole}
                  onChange={(event) => this.handleChange(event)}
                />
                <label htmlFor="name" className="ml-2">
                  Quyền tạo process
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
      errors: {},
    });
    var self = this;
    if (
      isEmpty(this.state.newNameRole) ||
      isEmpty(this.state.newDescriptionRole)
    ) {
      this.setState({
        errors: this.validator.validate(this.state),
      });
    }
    if (
      !isEmpty(this.state.newNameRole) &&
      !isEmpty(this.state.newDescriptionRole)
    ) {
      var token = localStorage.getItem("token");
      axios
        .post(
          host.URL_BACKEND + "/api/system/organization/role/new",
          {
            newNameRole: this.state.newNameRole,
            newDescriptionRole: this.state.newDescriptionRole,
            newIsProcessRole: this.state.newIsProcessRole,
            newDepartmentRole: this.props.idDepartment,
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
              newNameRole: "",
              newDescriptionRole: "",
              isDisplayAlertSuccess: true,
            });
            setTimeout(() => {
              self.setState({
                isDisplayAlertSuccess: false,
              });
            }, 2000);
            self.props.getDetailDepartment();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
