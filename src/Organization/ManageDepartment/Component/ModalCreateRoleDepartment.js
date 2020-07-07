import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Validator from "../Utils/Validator";
import host from '../../../Host/ServerDomain'; 
import { isEmpty } from "validator";
import { Modal } from "react-bootstrap";
import {showMessageAlert} from "../../../Alert/Action/Index";
import { connect } from "react-redux";
class ModalCreateRoleDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayAlertSuccess: false,
      errors: {},
      newNameRole: "",
      newDescriptionRole: "",
      newIsCreateProcessRole: false,
      newIsEditProcessRole: false,
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
        message: "Mô tả về vai trò không được trống.",
      },
    ];
    this.validator = new Validator(rules);
    this.handleChange = this.handleChange.bind(this);
   }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      errors: {},
    })
  }

  handleChange(event) {
    const name = event.target.name;
    const value = (event.target.name === "newIsCreateProcessRole" || event.target.name === "newIsEditProcessRole")?event.target.checked:event.target.value;
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
                <label htmlFor="name" className="required">Tên</label>
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
                <label htmlFor="description" className="required">Miêu tả</label>
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
                  name="newIsCreateProcessRole"
                  checked={this.state.newIsCreateProcessRole}
                  onChange={(event) => this.handleChange(event)}
                />
                <label htmlFor="name" className="ml-2">
                  Quyền tạo quy trình
                </label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="newIsEditProcessRole"
                  checked={this.state.newIsEditProcessRole}
                  onChange={(event) => this.handleChange(event)}
                />
                <label htmlFor="name" className="ml-2">
                  Quyền sửa quy trình
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
          host + "/api/company/organization/role/new",
          {
            newNameRole: this.state.newNameRole,
            newDescriptionRole: this.state.newDescriptionRole,
            newIsCreateProcessRole: this.state.newIsCreateProcessRole,
            newIsEditProcessRole: this.state.newIsEditProcessRole,
            newDepartmentRole: this.props.idDepartment,
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
              title:'Thất bại',
              severity:'error'
            });
            console.log(response.data.error);
          } else {
            self.setState({
              newNameRole: "",
              newDescriptionRole: "",
              newIsCreateProcessRole: false,
              newIsEditProcessRole: false,
              isDisplayAlertSuccess: false,
            });
            self.props.showAlert({
              message:response.data.message,
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thành công',
              severity:'success'
            });
            setTimeout(() => {
              self.props.close();
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties))
    }
  }
}
export default connect(null,mapDispatchToProps)(ModalCreateRoleDepartment);
