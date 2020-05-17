import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Validator from "../Utils/Validator";
import * as host from "../../Url";
import { isEmpty } from "validator";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
class ModalEditRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDepartment: [],
      isDisplayAlertSuccess: false,
      errors: {},
      errorChooseDepartment: {},
      editNameRole: this.props.editRole.name,
      editDescriptionRole: this.props.editRole.description,
      editIsProcessRole: this.props.editRole.is_process,
      editDepartmentRole: this.props.editRole.department_id,
    };
    const rules = [
      {
        field: "editNameRole",
        method: "isEmpty",
        validWhen: false,
        message: "The Name Role field is required.",
      },
      {
        field: "editDescriptionRole",
        method: "isEmpty",
        validWhen: false,
        message: "The Description Department field is required.",
      },
    ];
    this.validator = new Validator(rules);
    this.handleChange = this.handleChange.bind(this);
  }

  getListDepartment = () => {
    let self = this;
    var idCompany = localStorage.getItem("company_id");
    var token = localStorage.getItem("token");
    axios
      .get(
        host.URL_BACKEND + "/api/system/organization/department/" + idCompany,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          self.setState({
            listDepartment: JSON.parse(
              JSON.stringify(response.data.departmentCompany)
            ),
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getListDepartment();
  }

  handleChange(event) {
    const name = event.target.name;
    const value =
      event.target.name === "editIsProcessRole"
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
              <div className="form-group mb-3">
                <label htmlFor="exampleFormControlSelect1">Phòng ban</label>
                <br></br>
                <select
                  className="form-control"
                  name="editDepartmentRole"
                  onChange={this.handleChange}
                  value={this.state.editDepartmentRole}
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
              {errorChooseDepartment.editDepartmentRole && (
                <div
                  className="validation"
                  style={{ display: "block", color: "red" }}
                >
                  {errorChooseDepartment.editDepartmentRole}
                </div>
              )}
              <div className="form-group">
                <input
                  type="checkbox"
                  name="editIsProcessRole"
                  checked={this.state.editIsProcessRole}
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
      return <Alert severity="success">Edit thành công</Alert>;
    } else {
      return <div></div>;
    }
  };
  saveEditRole = (e) => {
    e.preventDefault();
    this.setState({
      errorChooseDepartment: {},
      errors: {},
    });
    var errorChooseDepartment = {};
    var self = this;
    if (parseInt(this.state.editDepartmentRole) === 0) {
      errorChooseDepartment = {
        editDepartmentRole: "Select department is required.",
      };
      this.setState({
        errorChooseDepartment: errorChooseDepartment,
      });
    }
    if (
      isEmpty(this.state.editNameRole) ||
      isEmpty(this.state.editDescriptionRole)
    ) {
      this.setState({
        errors: this.validator.validate(this.state),
      });
    }
    if (
      parseInt(this.state.editDepartmentRole) !== 0 &&
      !isEmpty(this.state.editNameRole) &&
      !isEmpty(this.state.editDescriptionRole)
    ) {
      var token = localStorage.getItem("token");
      axios
        .post(
          host.URL_BACKEND + "/api/system/organization/role/update",
          {
            editNameRole: this.state.editNameRole,
            editDescriptionRole: this.state.editDescriptionRole,
            editIsProcessRole: this.state.editIsProcessRole,
            idChooseRole: this.props.editRole.id,
            idChooseDepartment: this.state.editDepartmentRole,
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
                isDisplayAlertSuccess: true,
            });
            setTimeout(() => {
              self.setState({ isDisplayAlertSuccess: false });
            }, 5000);
            self.props.getListRole();
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
      state.organizationReducers.roleOrganizationReducer.editRoleOrganization,
  };
};
export default connect(mapStateToProps, null)(ModalEditRole);
