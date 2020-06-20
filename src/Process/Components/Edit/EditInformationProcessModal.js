import React, { Component } from 'react';
import SelectDepartmentToAssign from '../../../Organization/ManageProcess/Component/SelectDepartmentToAssign';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {connect} from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../Organization/ManageProcess/Actions/Index';
import DatePicker from "react-datepicker";
import FormCheck from 'react-bootstrap/FormCheck';
import host from '../../../Host/ServerDomain';

class EditInformationProcessModal extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
          employeesFilter: '',
          rolesFilter: '',
          departmentsFilter: '',
          selected: '', 
          detail: '',
          name: '',
          description: '',
          deadline: '',
          file: '',
          type: '',
          assign: '',
          code: '',
          selectedEmployees: '', 
          selectedDepartments: '', 
          selectedRoles: '', 
          collabration: '',
          initRolesFilter: '',
          initDepartmentsFilter: '',
          initEmployeesFilter: '',
        }
    }

    convertddMMyyyyToDate(string) {
      var [day, month, year] = string.split("-");
      return new Date(year, month - 1, day);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps.detail){
        var token = localStorage.getItem('token');
        if(nextProps.idDepartmentAssign){
          axios.get(host + `/api/company/department/`+ nextProps.idDepartmentAssign + `/employee/role`,
          {
              headers: { 'Authorization': 'Bearer ' + token}
          }).then(res => {
              if(res.data.error != null){
                  console.log(res.data.message);
              }else{
                  this.setState({employeesFilter: res.data.employees, rolesFilter: res.data.roles});
              }
          }).catch(function (error) {
              alert(error);
          }); 
        }else{
          if(nextProps.detail.type !== 5){
            this.setState({
              detail : nextProps.detail,
              selected: nextProps.detail.assign,
              name: nextProps.detail.name,
              description: nextProps.detail.description,
              id: nextProps.detail.id,
              type: nextProps.detail.type,
              deadline: this.convertddMMyyyyToDate(nextProps.detail.deadline),
              assign: nextProps.detail.assign,
              code: nextProps.detail.code,
            });
          }else{
            var assign = nextProps.detail.assign;
            var employees = assign.employees;
            var departments = assign.departments;
            var roles = assign.roles;
            var collabration;
            if(roles && roles.length){
              collabration = 1; 
            }else{
              collabration = 2;
            }
            var data = {
              listEmployees: employees,
              token: token,
            }
            axios.post(host + `/api/company/organization/department/role/except/employee`,
            data,
            {
                headers: { 'Authorization': 'Bearer ' + token}
            }).then(res => {
              if(res.data.error != null){
                  console.log(res.data.message);
              }else{
                this.setState({
                  detail : nextProps.detail,
                  name: nextProps.detail.name,
                  description: nextProps.detail.description,
                  id: nextProps.detail.id,
                  type: nextProps.detail.type,
                  deadline: this.convertddMMyyyyToDate(nextProps.detail.deadline),
                  assign: nextProps.detail.assign,
                  code: nextProps.detail.code,
                  selectedEmployees: employees, 
                  selectedDepartments: departments, 
                  selectedRoles: roles, 
                  collabration: collabration,
                  rolesFilter: res.data.roles, 
                  departmentsFilter: res.data.departments,
                });
              }
            }).catch(function (error) {
              alert(error);
            });
          }
        }
      }
    }
    
    componentDidMount () {
      this._isMounted = true;
      let self = this;
      var token = localStorage.getItem('token');
      axios.get(host + `/api/company/`+ token + `/employee/role/department`,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(self._isMounted){
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
            self.setState({
              employeesFilter: res.data.employees, 
              rolesFilter: res.data.roles, 
              departmentsFilter: res.data.departments,
              initRolesFilter: res.data.roles,
              initDepartmentsFilter: res.data.departments,
              initEmployeesFilter: res.data.employees,
            });
          }
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    convertEmployeesToOptions(){
      var options = [];
      var employees = this.state.employeesFilter;
      for (let index = 0; index < employees.length; index++) {
          var option = {value: employees[index].id_employee, label: employees[index].name + " (" + employees[index].department_name + '-' +employees[index].role_name + ")"};
          options.push(option);
      }
      return options;
    }


    convertRolesToOptions(){
      var options = [];
      var roles = this.state.rolesFilter;
      for (let index = 0; index < roles.length; index++) {
          var option = {value: roles[index].id_role, label: roles[index].role + " (" + roles[index].department_name + ")"};
          options.push(option);
      }
      return options;
    }

    convertDepartmentsToOptions(){
      var options = [];
      var departments = this.state.departmentsFilter;
      for (let index = 0; index < departments.length; index++) {
          var option = {value: departments[index].id_department, label: departments[index].department_name};
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

    handleChangeSelectDepartment = selectedOption => {
      this.setState({selected: selectedOption, assign: selectedOption});
    };

    handleSubmitEditProcess = (e) => {
      e.preventDefault();
      if((!this.state.assign && this.state.type !== 4 && this.state.type !== 5) || 
      (this.state.type === 5 && !this.state.selectedEmployees) ||
      (this.state.type === 5 && !this.state.selectedRoles && !this.state.selectedDepartments)
      ){
        
      }else{
        document.getElementById('close-modal-add-update-process').click();
        var information = {
          id: this.state.id,
          name :this.state.name,
          description: this.state.description,
          time: this.getCurrentTime(),
          deadline: this.convertDate(this.state.deadline),
          type: this.state.type,
          code: this.state.code,
        }
        if(this.state.type !== 5){
          information.assign = this.state.selected;
        }else{
          var assignCollabration = {};
          var typeCollabration;
          assignCollabration.employees = this.state.selectedEmployees;
          if(this.state.collabration === 1){
            assignCollabration.roles = this.state.selectedRoles;
            typeCollabration = 1;
          }else if(this.state.collabration === 2){
            assignCollabration.departments = this.state.selectedDepartments;
            typeCollabration = 2;
          }
          information.assign = assignCollabration;
          information.collabration = typeCollabration;
        }
        this.props.updateProcessInformation(information);
      }
    }

    handleChangeSelectEmployeeCollabration = selectedOption => {
      var token = localStorage.getItem('token');
      var data = {
        listEmployees: selectedOption,
        token: token,
      }
      this.setState({ selectedEmployees: selectedOption});
      axios.post(host + `/api/company/organization/department/role/except/employee`,
      data,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
          this.setState({
            rolesFilter: res.data.roles, 
            departmentsFilter: res.data.departments,
            selectedDepartments: '',
            selectedRoles: '',
          });
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    handleChangeSelectRoleCollabration = selectedOption => {
      this.setState({selectedRoles: selectedOption});
    }

    handleChangeSelectDepartmentCollabration = selectedOption => {
      this.setState({selectedDepartments: selectedOption});
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
      if(event.target.checked){
        document.getElementById('check-type-assign-2').checked = false;
        document.getElementById('check-type-assign-3').checked = false;
        document.getElementById('check-type-assign-4').checked = false;
        document.getElementById('check-type-assign-5').checked = false;
        this.setState({
          type: 1 ,
          selected: '',
          selectedEmployees: '', 
          selectedDepartments: '', 
          selectedRoles: '', 
          collabration: '',
          rolesFilter: this.state.initRolesFilter,
          departmentsFilter: this.state.initDepartmentsFilter,
          employeesFilter: this.state.initEmployeesFilter,
        });
      }else{
        document.getElementById('check-type-assign-2').checked = false;
        document.getElementById('check-type-assign-3').checked = false;
        document.getElementById('check-type-assign-4').checked = false;
        document.getElementById('check-type-assign-5').checked = false;
        this.setState({type: '' ,selected: ''});
      }
    }

    handleChangeTypeRole= event => {
      if(event.target.checked){
        document.getElementById('check-type-assign-1').checked = false;
        document.getElementById('check-type-assign-3').checked = false;
        document.getElementById('check-type-assign-4').checked = false;
        document.getElementById('check-type-assign-5').checked = false;
        this.setState({
          type: 2 ,
          selected: '',
          selectedEmployees: '', 
          selectedDepartments: '', 
          selectedRoles: '', 
          collabration: '',
          rolesFilter: this.state.initRolesFilter,
          departmentsFilter: this.state.initDepartmentsFilter,
          employeesFilter: this.state.initEmployeesFilter,
        });
      }else{
        document.getElementById('check-type-assign-1').checked = false;
        document.getElementById('check-type-assign-3').checked = false;
        document.getElementById('check-type-assign-4').checked = false;
        document.getElementById('check-type-assign-5').checked = false;
        this.setState({type: '', selected: ''});
      }
    }

    handleChangeTypeDepartment = event => {
      if(event.target.checked){
        document.getElementById('check-type-assign-1').checked = false;
        document.getElementById('check-type-assign-2').checked = false;
        document.getElementById('check-type-assign-4').checked = false;
        document.getElementById('check-type-assign-5').checked = false;
        this.setState({
          type: 3,
          selected: '',
          selectedEmployees: '', 
          selectedDepartments: '', 
          selectedRoles: '', 
          collabration: '',
          rolesFilter: this.state.initRolesFilter,
          departmentsFilter: this.state.initDepartmentsFilter,
          employeesFilter: this.state.initEmployeesFilter,
        });
      }else{
        document.getElementById('check-type-assign-1').checked = false;
        document.getElementById('check-type-assign-2').checked = false;
        document.getElementById('check-type-assign-4').checked = false;
        document.getElementById('check-type-assign-5').checked = false;
        this.setState({type: '', selected: ''});      
      }
    }

    handleChangeTypeCompany = event => {
      if(event.target.checked){
        document.getElementById('check-type-assign-1').checked = false;
        document.getElementById('check-type-assign-2').checked = false;
        document.getElementById('check-type-assign-3').checked = false;
        document.getElementById('check-type-assign-5').checked = false;
        this.setState({
          type: 4,
          selected: '',
          selectedEmployees: '', 
          selectedDepartments: '', 
          selectedRoles: '', 
          collabration: '',
          rolesFilter: this.state.initRolesFilter,
          departmentsFilter: this.state.initDepartmentsFilter,
          employeesFilter: this.state.initEmployeesFilter,
        });
      }else{
        document.getElementById('check-type-assign-1').checked = false;
        document.getElementById('check-type-assign-2').checked = false;
        document.getElementById('check-type-assign-3').checked = false;
        document.getElementById('check-type-assign-5').checked = false;
        this.setState({type: '', selected: ''});
      }
    }

    handleChangeColabration = event => {
      if(event.target.checked){
        document.getElementById('check-type-assign-1').checked = false;
        document.getElementById('check-type-assign-2').checked = false;
        document.getElementById('check-type-assign-3').checked = false;
        document.getElementById('check-type-assign-4').checked = false;
        this.setState({
          type: 5, 
          selected: '',
          selectedEmployees: '', 
          selectedDepartments: '', 
          selectedRoles: '', 
          collabration: '',
          rolesFilter: this.state.initRolesFilter,
          departmentsFilter: this.state.initDepartmentsFilter,
          employeesFilter: this.state.initEmployeesFilter,
        });
      }else{
        document.getElementById('check-type-assign-1').checked = false;
        document.getElementById('check-type-assign-2').checked = false;
        document.getElementById('check-type-assign-3').checked = false;
        document.getElementById('check-type-assign-4').checked = false;
        this.setState({type: '', selected: ''});
      }
    }

    
    handleChangeTypeRoleCollabration = event => {
      if(event.target.checked){
        document.getElementById('check-type-collabration-2').checked = false;
        this.setState({
          collabration: 1,
          selectedDepartments: '',
        });
      }else{
        document.getElementById('check-type-collabration-2').checked = false;
        this.setState({
          collabration: '',
          selectedRoles: '',
        });
      }
    }

    handleChangeTypeDepartmentCollabration = event => {
      if(event.target.checked){
        document.getElementById('check-type-collabration-1').checked = false;
        this.setState({
          collabration: 2,
          selectedRoles: '',
        });
      }else{
        document.getElementById('check-type-collabration-1').checked = false;
        this.setState({
          collabration: '',
          selectedDepartments: '',
        });
      }
    }

    renderRowAssign = () =>{
      if(!this.state.type || this.state.type === 4){
        return (<div></div>);
      }
      else if(this.state.type === 1){
        return (
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
              <Select placeholder="Lựa chọn nhân viên" id="select-employee-to-assign" required value={this.state.selected} 
              isMulti options={this.convertEmployeesToOptions()} onChange={this.handleChangeSelectEmployee} />
            </div>
          </div>
        );
      }else if(this.state.type === 2){
        return(
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
              <Select placeholder="Lựa chọn chức vụ" id="select-employee-to-assign" required value={this.state.selected} 
              isMulti options={this.convertRolesToOptions()} onChange={this.handleChangeSelectRole} />
            </div>
         </div>
        );
      }else if(this.state.type === 3){
        return(
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
              <Select placeholder="Lựa chọn phòng ban" id="select-department-to-assign" required value={this.state.selected} 
              isMulti options={this.convertDepartmentsToOptions()} onChange={this.handleChangeSelectDepartment} />
            </div>
         </div>
        );
      }else if(this.state.type === 5){
        return(
            <>
              <div className="row form-group">
                <div className="col col-md-3">
                  <label
                    htmlFor="disabled-input"
                    className=" form-control-label"
                  >
                    Nhân viên
                  </label>
                </div>
                <div className="col-12 col-md-9">
                <Select placeholder="Lựa chọn nhân viên" id="select-employee-to-assign-1" required value={this.state.selectedEmployees} 
                  isMulti options={this.convertEmployeesToOptions()} onChange={this.handleChangeSelectEmployeeCollabration} />
                </div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3">
                  <label
                    htmlFor="disabled-input"
                    className=" form-control-label"
                  >
                    Kiểu kết hợp
                  </label>
                </div>
                <div className="col-12 col-md-9" style={{display:"flex"}} key={`custom-inline-radio-1`}>
                  <Form.Check>
                    <FormCheck.Input value="1" name="collabration1" id="check-type-collabration-1" type={"checkbox"} checked={this.state.collabration === 1 ? "checked": ""} onChange={this.handleChangeTypeRoleCollabration} />
                    <FormCheck.Label className="form-check-label-1">Chức vụ</FormCheck.Label>
                  </Form.Check>
                  <Form.Check style={{marginLeft:"5%"}}>
                    <FormCheck.Input value="2" name="collabration2" type={"checkbox"} id="check-type-collabration-2" checked={this.state.collabration === 2 ? "checked": ""} onChange={this.handleChangeTypeDepartmentCollabration} />
                    <FormCheck.Label className="form-check-label-1">Phòng ban</FormCheck.Label>
                  </Form.Check>
                </div>
              </div>
              {this.renderAssignCollabration()}
          </>
        );
      }
    }

    renderAssignCollabration = () =>{
      if(this.state.collabration === 1){
        return (
          <div className="row form-group">
            <div className="col col-md-3">
              <label
                htmlFor="disabled-input"
                className=" form-control-label"
              >
                Chức vụ
              </label>
            </div>
            <div className="col-12 col-md-9">
              <Select placeholder="Lựa chọn chức vụ" id="select-role-to-assign-1" required value={this.state.selectedRoles} 
                isMulti options={this.convertRolesToOptions()} onChange={this.handleChangeSelectRoleCollabration} />
            </div>
          </div>
        );
      }else if(this.state.collabration === 2){
        return (
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
              <Select placeholder="Lựa chọn phòng ban" id="select-department-to-assign-1" required value={this.state.selectedDepartments} 
                isMulti options={this.convertDepartmentsToOptions()} onChange={this.handleChangeSelectDepartmentCollabration} />
            </div>
          </div>
        );
      }else {
        return (<div></div>);
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

    renderFilterDepartment = () =>{
      if(!this.state.type || this.state.type === 1 || this.state.type === 2){
        return (
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
        );
      }
      else {
        return (<div></div>);
      }
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
                        id="close-modal-add-update-process"
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
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
                                <Form.Control onChange={(e) => this.handleChangeName(e)} value={this.state.name} type="text" id="name" required name="name" placeholder="Tên..." />
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
                                <Form.Control as={"textarea"} onChange={(e) => this.handleChangeDescription(e)} value={this.state.description} type="text" required name="description" id="description" placeholder="Mô tả..." rows={9} />
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
                                  <FormCheck.Label className="form-check-label-1">Cá nhân</FormCheck.Label>
                                </Form.Check>
                                <Form.Check style={{marginLeft:"5%"}}>
                                  <FormCheck.Input value="2" name="type2" type={"checkbox"} id="check-type-assign-2" checked={this.state.type === 2 ? "checked": ""} onChange={this.handleChangeTypeRole} />
                                  <FormCheck.Label className="form-check-label-1">Chức vụ</FormCheck.Label>
                                </Form.Check>
                                <Form.Check style={{marginLeft:"5%"}}>
                                <FormCheck.Input value="5" name="type5" type={"checkbox"} id="check-type-assign-5" checked={this.state.type === 5 ? "checked": ""} onChange={this.handleChangeColabration} />
                                <FormCheck.Label className="form-check-label-1">Kết hợp</FormCheck.Label>
                              </Form.Check>
                                <Form.Check style={{marginLeft:"5%"}}>
                                  <FormCheck.Input value="3" name="type3" type={"checkbox"} id="check-type-assign-3" checked={this.state.type === 3 ? "checked": ""} onChange={this.handleChangeTypeDepartment} />
                                  <FormCheck.Label className="form-check-label-1">Phòng ban</FormCheck.Label>
                                </Form.Check>
                                <Form.Check style={{marginLeft:"5%"}}>
                                  <FormCheck.Input value="4" name="type4" type={"checkbox"} id="check-type-assign-4" checked={this.state.type === 4 ? "checked": ""} onChange={this.handleChangeTypeCompany} />
                                  <FormCheck.Label className="form-check-label-1">Công ty</FormCheck.Label>
                                </Form.Check>
                              </div>
                            </div>
                          {/* renderFilterDepartment */}
                            {this.renderFilterDepartment()}
                          {/* renderFilterDepartment */}
                          {/* renderAssign */}
                            {this.renderRowAssign()}
                          {/* renderAssign */}
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
                                <div className="btn btn-group" style={{float:"left", padding: "0"}}>
                                  <button type="submit" className="btn btn-primary" style={{float:"left"}}>
                                      Cập nhật <i className="fas fa-edit"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Form>
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
      clickOpenModal: state.processReducers.buttonReducers.clickOpenModal,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProcessInformation: (information) => {
      dispatch(actions.updateProcessInformation(information));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInformationProcessModal);
