import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import { isEmpty } from "validator";
import axios from "axios";
import host from '../../../Host/ServerDomain'; 
import { Modal } from "react-bootstrap";
import Validator from '../Utils/Validator';
import {showMessageAlert} from "../../../Alert/Action/Index";
import { connect } from "react-redux";
class ModalCreateDepartment extends Component {
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
          message: 'Tên phòng ban không được trống.',
        },
        {
            field: 'newSignatureDepartment',
            method: 'isEmpty',
            validWhen: false,
            message: 'Tên viết tắt không được trống.',
        },
        {
            field: 'newDescriptionDepartment',
            method: 'isEmpty',
            validWhen: false,
            message: 'Mô tả phồng ban không được trống.',
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
                <label htmlFor="name" className="required">Tên</label>
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
                <label htmlFor="role" className="required">Viết tắt</label>
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
                <label htmlFor="description" className="required">Miêu tả</label>
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
      return <Alert severity="success">Lưu thành công </Alert>;
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
            host + "/api/company/organization/department/new",
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
              self.props.showAlert({
                message:response.data.error,
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'right'
                },
                title:'Thất bại',
                severity:'error'
              });
            } else {
              self.setState({
                isDisplayAlert: false,
                newNameDepartment: "",
                errors: {},
                newSignatureDepartment: "",
                newDescriptionDepartment: "",
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties))
    }
  }
}
export default connect(null,mapDispatchToProps)(ModalCreateDepartment);
