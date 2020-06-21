import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import * as actions from '../Actions/Index';
import {connect} from 'react-redux';
import host from '../../Host/ServerDomain'; 
import * as actionAlerts from '../../Alert/Action/Index';

class EditInformationEmployeeModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
          birth: '',
          name: '',
          avatar: '',
          address: '',
          phone: '',
          about_me: '',
          email: '',
        }
    }
    
    handleChangeName = event => {
      this.setState({
        name: event.target.value
      });
    };

    handleChangeEmail = event => {
      this.setState({
        email: event.target.value
      });
    };

    handleChangeAddress = event => {
      this.setState({
        address: event.target.value
      });
    };

    handleChangePhone = event => {
      this.setState({
        phone: event.target.value
      });
    };

    handleChangeAboutMe = event => {
      this.setState({
        about_me: event.target.value
      });
    };
    
    handleChangeBirth = date => {
      this.setState({
        birth: date
      });
    };

    handleChangeAvatar = event => {
      this.setState({
        avatar: event.target.files[0]
      });
    };

    handleUpdateEmployeeInformation= (e) => {
      e.preventDefault();
      var token = localStorage.getItem('token');
      let data = new FormData();
      data.append('birth', this.state.birth);
      data.append('name', this.state.name);
      data.append('address',  this.state.address);
      data.append('phone',  this.state.phone);
      data.append('about_me',  this.state.about_me);
      data.append('email',  this.state.email);
      data.append('tokenData', token);
      if(this.state.avatar){
        data.append('avatar', this.state.avatar, this.state.avatar.name);
      }
      axios.post(host + `/api/employee/update/information`,
      data,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(res.data.error != null){
          this.props.showAlert({
            message: res.data.message,
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Thất bại',
            severity:'error'
          });
        }else{
            document.getElementById("close-update-information-modal").click(); 
            this.props.reloadEmployeePage();
            this.props.showAlert({
              message: res.data.message,
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thành công',
              severity:'success'
            });
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps.employee){
        this.setState({
          birth: new Date(nextProps.employee.birth),
          name: nextProps.employee.name,
          address: nextProps.employee.address,
          phone: nextProps.employee.phone,
          about_me: nextProps.employee.about_me,
          email: nextProps.employee.email,
        });
      }
    }

    render() {
        return (
            <div
            className="modal fade"
            id="update-information-employee"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="scrollmodalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="scrollmodalLabel">
                    Thông tin cá nhân
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    id="close-update-information-modal"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="">
                    <div className="card-body card-block">
                      <form
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal"
                      >
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="text-input"
                              className=" form-control-label"
                            >
                              Tên 
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                              defaultValue={this.state.name}
                              onChange={this.handleChangeName}
                            />
                            <small className="form-text text-muted">
                            </small>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="hf-email"
                              className=" form-control-label"
                            >
                              Email
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="email"
                              name="hf-email"
                              className="form-control"
                              defaultValue={this.state.email}
                              onChange={this.handleChangeEmail}
                            />
                            <span className="help-block">
                            </span>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="hf-email"
                              className=" form-control-label"
                            >
                              Ngày sinh
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <DatePicker dateFormat="dd-MM-yyyy" className="form-control" selected={this.state.birth} onChange={this.handleChangeBirth}/>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="hf-email"
                              className=" form-control-label"
                            >
                              Số điện thoại
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"
                              name="hf-email"
                              className="form-control"
                              defaultValue={this.state.phone}
                              onChange={this.handleChangePhone}
                            />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="hf-email"
                              className=" form-control-label"
                            >
                              Địa chỉ
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"
                              name="hf-email"
                              className="form-control"
                              defaultValue={this.state.address}
                              onChange={this.handleChangeAddress}
                            />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="hf-email"
                              className=" form-control-label"
                            >
                              Mô tả bản thân
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <textarea rows="5" className="form-control" defaultValue={this.state.about_me}  onChange={this.handleChangeAboutMe}>

                            </textarea>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="file-input"
                              className=" form-control-label"
                            >
                              Avatar
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="file"
                              id="file-input"
                              name="file-input"
                              className="form-control-file"
                              onChange={this.handleChangeAvatar}
                            />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
       
                          </div>
                          <div className="col-12 col-md-9">
                            <button type="button" className="btn btn-primary" style={{float:"left"}} onClick={(e) => this.handleUpdateEmployeeInformation(e)}>
                              Cập nhật
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reloadEmployeePage: () => {
      dispatch(actions.reloadEmployeePage());
    },
    showAlert: (properties) => {
      dispatch(actionAlerts.showMessageAlert(properties))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(EditInformationEmployeeModal)
