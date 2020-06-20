import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Validator from "../Utils/Validator";
import host from '../../../Host/ServerDomain'; 
import { isEmpty } from "validator";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {showMessageAlert} from "../../../Alert/Action/Index";
class ModalEditRoleDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayAlertSuccess: false,
      errors: {},
      editNameRole: this.props.editRole.name,
      editDescriptionRole: this.props.editRole.description,
      editIsCreateProcessRole: this.props.editRole.is_create_process,
      editIsEditProcessRole: this.props.editRole.is_edit_process,
    };
    const rules = [
      {
        field: "editNameRole",
        method: "isEmpty",
        validWhen: false,
        message: "Tên vai trò không được trống.",
      },
      {
        field: "editDescriptionRole",
        method: "isEmpty",
        validWhen: false,
        message: "Mô tả của vai trò không được trống.",
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
    const value = (event.target.name === "editIsCreateProcessRole" || event.target.name === "editIsEditProcessRole")?event.target.checked:event.target.value;
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
            Sửa quyền nhân viên
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
                  name="editNameRole"
                  value={this.state.editNameRole}
                  onChange={(event) => this.handleChange(event)}
                />
                {errors.editNameRole && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.editNameRole}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Miêu tả</label>
                <textarea
                  className="form-control"
                  name="editDescriptionRole"
                  onChange={(event) => this.handleChange(event)}
                  value={this.state.editDescriptionRole}
                  id="exampleFormControlTextarea1"
                  rows="3"
                />
                {errors.editDescriptionRole && (
                  <div
                    className="validation"
                    style={{ display: "block", color: "red" }}
                  >
                    {errors.editDescriptionRole}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="editIsCreateProcessRole"
                  checked={this.state.editIsCreateProcessRole}
                  onChange={(event) => this.handleChange(event)}
                />
                <label htmlFor="name" className="ml-2">
                  Quyền tạo quy trình
                </label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="editIsEditProcessRole"
                  checked={this.state.editIsEditProcessRole}
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
                  onClick={(e) => this.saveEditRole(e)}
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
      return <Alert severity="success">Cập nhật thành công</Alert>;
    } else {
      return <div></div>;
    }
  };
  saveEditRole = (e) => {
    e.preventDefault();
    this.setState({
      errors: {},
    });
    if (
      isEmpty(this.state.editNameRole) ||
      isEmpty(this.state.editDescriptionRole)
    ) {
      this.setState({
        errors: this.validator.validate(this.state),
      });
    }
    if (
      !isEmpty(this.state.editNameRole) &&
      !isEmpty(this.state.editDescriptionRole)
    ) {
      var token = localStorage.getItem("token");
      var self =  this;
      axios
        .post(
          host + "/api/company/organization/role/update",
          {
            editNameRole: this.state.editNameRole,
            editDescriptionRole: this.state.editDescriptionRole,
            editIsCreateProcessRole: this.state.editIsCreateProcessRole,
            editIsEditProcessRole: this.state.editIsEditProcessRole,
            idChooseRole: this.props.editRole.id,
            idChooseDepartment: this.props.idDepartment,
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
                isDisplayAlertSuccess: true,
            });
            setTimeout(() => {
              self.setState({ isDisplayAlertSuccess: false });
            }, 5000);
            self.props.getDetailDepartment();
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
    editRole:
      state.organizationReducers.departmentOrganizationReducer.editRoleOrganization,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditRoleDepartment);
