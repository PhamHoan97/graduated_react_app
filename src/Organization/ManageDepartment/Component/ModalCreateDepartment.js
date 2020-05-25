import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import { isEmpty } from "validator";
import axios from "axios";
import * as host from "../../Url";
import { Modal } from "react-bootstrap";
import Validator from '../Utils/Validator';

export default class ModalCreateDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayAlert: false,
      errors: {},
      newNameDepartment: "",
      newSignatureDepartment: "",
      newDescriptionDepartment: "",
    };
    const rules = [
        {
          field: 'newNameDepartment',
          method: 'isEmpty',
          validWhen: false,
          message: 'The Name Department field is required.',
        },
        {
            field: 'newSignatureDepartment',
            method: 'isEmpty',
            validWhen: false,
            message: 'The Signture Department field is required.',
        },
        {
            field: 'newDescriptionDepartment',
            method: 'isEmpty',
            validWhen: false,
            message: 'The Description field is required.',
        }
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
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }
  render() {
    const {errors} = this.state;
    return (
      <Modal
        size="lg"
        show={this.props.showModal}
        onHide={this.props.close}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Thêm mới phòng ban
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
                  name="newNameDepartment"
                  value = {this.state.newNameDepartment}
                  onChange={(event) => this.handleChange(event)}
                />
                {errors.newNameDepartment && <div className="validation" style={{display: 'block',color:'red'}}>{errors.newNameDepartment}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="role">Viết tắt</label>
                <input
                  type="text"
                  className="form-control"
                  name="newSignatureDepartment"
                  value = {this.state.newSignatureDepartment}
                  onChange={(event) => this.handleChange(event)}
                />
                {errors.newSignatureDepartment && <div className="validation" style={{display: 'block',color:'red'}}>{errors.newSignatureDepartment}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="description">Miêu tả</label>
                <textarea
                  className="form-control"
                  name="newDescriptionDepartment"
                  onChange={(event) => this.handleChange(event)}
                  value = {this.state.newDescriptionDepartment}
                  id="exampleFormControlTextarea1"
                  rows="3"
                />
                {errors.newDescriptionDepartment && <div className="validation" style={{display: 'block',color:'red'}}>{errors.newDescriptionDepartment}</div>}
              </div>
              <div className="form-group text-left">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-2"
                  onClick={(e) => this.saveNewDepartment(e)}
                >
                  Lưu
                </button>
              </div>
            </form>
            {this.displayAlert()}
          </>
        </Modal.Body>
      </Modal>
    );
  }

  displayAlert = () => {
    if (this.state.isDisplayAlert) {
      return <Alert severity="success">Lưu thành công !!!</Alert>;
    } else {
      return <div></div>;
    }
  };

  saveNewDepartment = (e) => {
    e.preventDefault();
    if(
        isEmpty(this.state.newNameDepartment)
        ||isEmpty(this.state.newSignatureDepartment)
        ||isEmpty(this.state.newDescriptionDepartment)
        )
    {
        this.setState({
          errors: this.validator.validate(this.state),
        });
    }else{
        var self = this;
        var token = localStorage.getItem("token");
        axios
          .post(
            host.URL_BACKEND + "/api/company/organization/department/new",
            {
              newNameDepartment: this.state.newNameDepartment,
              newSignatureDepartment: this.state.newSignatureDepartment,
              newDescriptionDepartment: this.state.newDescriptionDepartment,
              token: token,
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
                isDisplayAlert: true,
                newNameDepartment: "",
                errors: {},
                newSignatureDepartment: "",
                newDescriptionDepartment: "",
              });
              setTimeout(() => {
                self.setState({ isDisplayAlert: false });
              }, 2000);
              self.props.getListDepartment();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    }
}
