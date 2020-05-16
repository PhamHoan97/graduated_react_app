import React, { Component } from 'react';
import SelectDepartmentToAssign from '../../../Organization/ManageProcess/Component/SelectDepartmentToAssign';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {connect} from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../Organization/ManageProcess/Actions/Index';
import DatePicker from "react-datepicker";
import FormCheck from 'react-bootstrap/FormCheck';

class EditInformationProcessModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
          employeesFilter: '',
          rolesFilter: '',
          selected: '', 
          detail: '',
          name: '',
          description: '',
          deadline: '',
          file: '',
          type: '',
          assign: '',
        }
    }

    convertddMMyyyyToDate(string) {
      var [day, month, year] = string.split("-");
      return new Date(year, month - 1, day);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.detail){
          this.setState({
            detail : nextProps.detail,
            selected: nextProps.detail.assign,
            name: nextProps.detail.name,
            description: nextProps.detail.description,
            id: nextProps.detail.id,
            type: nextProps.detail.type,
            deadline: this.convertddMMyyyyToDate(nextProps.detail.deadline),
            assign: nextProps.detail.assign,
          });
        }
        if(nextProps.idDepartmentAssign){
            var token = localStorage.getItem('token');
            axios.get(`http://127.0.0.1:8000/api/company/department/`+ nextProps.idDepartmentAssign + `/employee/role`,
            {
                headers: { 'Authorization': 'Bearer ' + token}
            }).then(res => {
                if(res.data.error != null){
                    console.log(res.data.message);
                }else{
                    console.log(res.data); 
                    this.setState({employeesFilter: res.data.employees, selected: '', rolesFilter: res.data.roles, assign: ''});
                }
            }).catch(function (error) {
                alert(error);
            }); 
        }
    }
    
    UNSAFE_componentWillMount () {
      var token = localStorage.getItem('token');
      var company_id = localStorage.getItem('company_id');
      axios.get(`http://127.0.0.1:8000/api/company/`+ company_id + `/employee/role`,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
            console.log(res.data); 
            this.setState({employeesFilter: res.data.employees,  rolesFilter: res.data.roles});
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    convertEmployeesToOptions(){
      var options = [];
      var employees = this.state.employeesFilter;
      for (let index = 0; index < employees.length; index++) {
          var option = {value: employees[index].id_employee, label: employees[index].name + "-" + employees[index].department_name};
          options.push(option);
      }
      return options;
    }

  convertRolesToOptions(){
    var options = [];
    var roles = this.state.rolesFilter;
    for (let index = 0; index < roles.length; index++) {
        var option = {value: roles[index].id_role, label: roles[index].department_name + "-" + roles[index].role};
        options.push(option);
    }
    return options;
  }
    
    getCurrentTime (){
      var date = new Date();
      var yyyy = date.getFullYear();
      var dd = date.getDate();
      var mm = (date.getMonth() + 1);
      if (dd < 10){
        dd = "0" + dd;
      }
      if (mm < 10){
        mm = "0" + mm;
      }
      var current = dd + "-" + mm + "-" + yyyy;
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds();
      if (hours < 10){
        hours = "0" + hours;
      }
      if (minutes < 10){
        minutes = "0" + minutes;
      }
      if (seconds < 10){
        seconds = "0" + seconds;
      }
      return current + " " + hours + ":" + minutes + ":" + seconds;
    }

    handleChangeSelectEmployee = selectedOption => {
        this.setState({selected: selectedOption});
    };

    handleChangeSelectRole = selectedOption => {
      this.setState({selected: selectedOption, assign: selectedOption});
   };

    handleSubmitEditProcess = (e) => {
      e.preventDefault();
      document.getElementById('close-modal-add-new-process').click();
      var information = {
        id: this.state.id,
        name :this.state.name,
        description: this.state.description,
        assign: this.state.selected,
        time: this.getCurrentTime(),
        deadline: this.convertDate(this.state.deadline),
        type: this.state.type,
      }
      this.props.updateProcessInformation(information);
    }

    handleChangeDeadline = date => {
      this.setState({
        deadline: date
      });
    }

    handleChangeName = (event) => {
      event.preventDefault();
      this.setState({name: event.target.value});
    }

    handleChangeTypeEmployee= event => {
      document.getElementById('check-type-assign-2').checked = false;
      this.setState({type: 1 ,selected: ''});
    }

    handleChangeTypeRole= event => {
      document.getElementById('check-type-assign-1').checked = false;
      this.setState({type: 2, selected: ''});
    }

    renderRowAssign = () =>{
      if(!this.state.type){
        return (<div></div>);
      }
      else if(this.state.type === 1){
        return (
          <Select placeholder="Lựa chọn nhân viên" id="select-employee-to-assign" required value={this.state.selected} 
          isMulti options={this.convertEmployeesToOptions()} onChange={this.handleChangeSelectEmployee} />
        );
      }else{
        return(
          <Select placeholder="Lựa chọn chức vụ" id="select-employee-to-assign" required value={this.state.selected}
          isMulti options={this.convertRolesToOptions()} onChange={this.handleChangeSelectRole} />
        );
      }
    }

    handleChangeFile = event => {
      event.preventDefault();
      this.setState({file: event.target.files[0]});
    }

    convertDate(str){
      var date = new Date(str);
      var yyyy = date.getFullYear();
      var dd = date.getDate();
      var mm = (date.getMonth() + 1);
      if (dd < 10){
        dd = "0" + dd;
      }
      if (mm < 10){
        mm = "0" + mm;
      }
      var result = dd + "-" + mm + "-" + yyyy;
      return result;
    }

    handleChangeDescription = (event) => {
      event.preventDefault();
      this.setState({description: event.target.value});
    }

    render() {
        if(this.state.detail){
            return (
                <div
                className="modal fade"
                id="form-edit-process"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="scrollmodalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="scrollmodalLabel">
                        Sửa quy trình
                      </h5>
                      <button
                        id="close-modal-add-new-process"
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="card">
                        <div className="card-body card-block">
                          <Form
                            encType="multipart/form-data"
                            className="form-horizontal"
                            onSubmit={(e) => this.handleSubmitEditProcess(e)}
                          >
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <Form.Label>Tên quy trình</Form.Label>
                              </div>
                              <div className="col-12 col-md-9">
                                <Form.Control onChange={(e) => this.handleChangeName(e)} defaultValue={this.state.name} type="text" id="name" required name="name" placeholder="Tên..." />
                                <small className="form-text text-muted">
                                </small>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <Form.Label>Deadline</Form.Label>
                              </div>
                              <div className="col-12 col-md-9">
                                <DatePicker onChange={this.handleChangeDeadline} selected={this.state.deadline} className="form-control" dateFormat="dd-MM-yyyy"  id="deadline" required name="deadline" placeholder="Deadline" />
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <Form.Label>Mô tả ngắn</Form.Label>
                              </div>
                              <div className="col-12 col-md-9">
                                <Form.Control as={"textarea"} onChange={(e) => this.handleChangeDescription(e)} defaultValue={this.state.description} type="text" required name="description" id="description" placeholder="Mô tả..." rows={9} />
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <label
                                  htmlFor="disabled-input"
                                  className=" form-control-label"
                                >
                                  Phòng ban
                                </label>
                              </div>
                              <div className="col-12 col-md-9">
                                <SelectDepartmentToAssign />
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <label
                                  htmlFor="disabled-input"
                                  className=" form-control-label"
                                >
                                  Kiểu giao
                                </label>
                              </div>
                              <div className="col-12 col-md-9" style={{display:"flex"}} key={`custom-inline-radio`}>
                              <Form.Check>
                                  <FormCheck.Input value="1" name="type1" id="check-type-assign-1" checked={this.state.type === 1 ? "checked": ""} type={"checkbox"} onChange={this.handleChangeTypeEmployee} />
                                  <FormCheck.Label>Cá nhân</FormCheck.Label>
                                </Form.Check>
                                <Form.Check style={{marginLeft:"5%"}}>
                                  <FormCheck.Input value="2" name="type2" type={"checkbox"} id="check-type-assign-2" checked={this.state.type === 2 ? "checked": ""} onChange={this.handleChangeTypeRole} />
                                  <FormCheck.Label>Chức vụ</FormCheck.Label>
                                </Form.Check>
                              </div>
                            </div>
                          <div className="row form-group">
                            <div className="col col-md-3">
                              <label
                                htmlFor="disabled-input"
                                className=" form-control-label"
                              >
                                Giao cho
                              </label>
                            </div>
                            <div className="col-12 col-md-9">
                              {this.renderRowAssign()}
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col col-md-3">
                              <Form.Label>Tài liệu</Form.Label>
                            </div>
                            <div className="col-12 col-md-9">
                              <Form.File.Input id="file-input" onChange={this.handleChangeFile} name="file-input"/>
                            </div>
                          </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                              </div>
                              <div className="col-12 col-md-9">
                                <button type="submit" className="btn btn-primary" style={{float:"left"}}>
                                    Cập nhật
                                </button>
                              </div>
                            </div>
                          </Form>
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
        }else{
            return (<div></div>);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      idDepartmentAssign: state.addProcessReducers.changeDepartmentToAssignReducer.idDepartment,
      detail: state.addProcessReducers.informationProcessReducer.information,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProcessInformation: (information) => {
      dispatch(actions.updateProcessInformation(information));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInformationProcessModal);
