import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Validator from "../Utils/Validator";
import host from '../../../Host/ServerDomain'; 
import { isEmpty } from "validator";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
class ModalEditRole extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      listDepartment: [],
      isDisplayAlertSuccess: false,
      errors: {},
      errorChooseDepartment: {},
      editNameRole: this.props.editRole.name,
      editDescriptionRole: this.props.editRole.description,
      editIsCreateProcessRole: this.props.editRole.is_create_process,
      editIsEditProcessRole: this.props.editRole.is_edit_process,
      editDepartmentRole: this.props.editRole.department_id,
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
        message: "Mô tả phòng ban không được trống.",
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

  componentWillUnmount(){
    this._isMounted = false;
  }

  handleChange(event) {
    const name = event.target.name;
    const value = (event.target.name === "editIsCreateProcessRole" || event.target.name === "editIsEditProcessRole")
    ?event.target.checked:event.target.value;
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
      return <Alert severity="success">Sửa thành công</Alert>;
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
        editDepartmentRole: "Phòng ban không được trống.",
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
          host + "/api/company/organization/role/update",
          {
            editNameRole: this.state.editNameRole,
            editDescriptionRole: this.state.editDescriptionRole,
            editIsCreateProcessRole: this.state.editIsCreateProcessRole,
            editIsEditProcessRole: this.state.editIsEditProcessRole,
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
