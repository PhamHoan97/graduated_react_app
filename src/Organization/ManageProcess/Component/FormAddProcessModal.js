import React, { Component } from 'react';
import SelectDepartmentToAssign from './SelectDepartmentToAssign';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import makeAnimated from 'react-select/animated';
import {connect} from 'react-redux';
import Select from 'react-select';
import {Redirect } from 'react-router-dom';
import * as actions from '../Actions/Index';
import DatePicker from "react-datepicker";
import FormCheck from 'react-bootstrap/FormCheck';
import "../Css/FormAddProcess.css";
import host from '../../../Host/ServerDomain'; 
import * as actionAlerts from '../../../Alert/Action/Index';

const animatedComponents = makeAnimated();

class FormAddProcessModal extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
          employeesFilter: '',
          rolesFilter: '',
          departmentsFilter: '',
          selected: '', 
          code: '',
          name: '',
          description: '',
          assign: '',
          time: '',
          deadline: '',
          file: '',
          type: '',
          redirect: false,
          selectedEmployees: '', 
          selectedDepartments: '', 
          selectedRoles: '', 
          collabration: '',
          initRolesFilter: '',
          initDepartmentsFilter: '',
          initEmployeesFilter: '',
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps.idDepartmentAssign){
          var token = localStorage.getItem('token');
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
      }
    }
    
    componentDidMount () {
      this._isMounted = true;
      let self = this;
      var token = localStorage.getItem('token');
      axios.get(host  + `/api/company/`+ token + `/employee/role/department`,
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

    componentWillUnmount(){
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
        this.setState({selected: selectedOption, assign: selectedOption});
    };

    handleChangeSelectRole = selectedOption => {
      this.setState({selected: selectedOption, assign: selectedOption});
    };

    handleChangeSelectDepartment = selectedOption => {
      this.setState({selected: selectedOption, assign: selectedOption});
    };

    handleChangeSelectEmployeeCollabration = selectedOption => {
      var token = localStorage.getItem('token');
      var data = {
        listEmployees: selectedOption,
        token: token,
      }
      this.setState({ selectedEmployees: selectedOption})
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

    handleChangeFile = event => {
      event.preventDefault();
      document.getElementById("next-step-create-process").disabled = true;
      var file = event.target.files[0];
      var tokenData = localStorage.getItem('token');
      let data = new FormData();
      data.append('token', tokenData);
      data.append('file',  file);

      axios.post(host + `/api/company/process/upload/document`,
      data,
      {
          headers: { 'Authorization': 'Bearer ' + tokenData}
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
          this.props.showAlert({
            message: res.data.message,
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Thành công',
            severity:'success'
          });
          this.setState({file: res.data.url});
          document.getElementById("next-step-create-process").disabled = false;
        }
      }).catch(function (error) {
        alert(error);
      });
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

    handleSubmitAddProcess = (e) => {
      e.preventDefault();
      if((!this.state.assign && this.state.type !== 4 && this.state.type !== 5) || 
        (this.state.type === 5 && !this.state.selectedEmployees) ||
        (this.state.type === 5 && !this.state.selectedRoles && !this.state.selectedDepartments)
      ){
        
      }else{
        document.getElementById('close-modal-add-new-process').click();
        var information = {
          name :this.state.name,
          description: this.state.description,
          time: this.getCurrentTime(),
          deadline: this.convertDate(this.state.deadline),
          file: this.state.file,
          type: this.state.type,
        }
        if(this.state.type !== 5){
          information.assign = this.state.assign;
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
        if(!this.state.code){
          information.code = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
        }else{
          information.code = this.state.code
        }
        localStorage.setItem("processInfo",  JSON.stringify(information));
        this.props.updateProcessInformation(information);
        this.setState({redirect: true});
      }
    }

    handleChangeName = (event) => {
      event.preventDefault();
      this.setState({name: event.target.value});
    }

    handleChangeCode = (event) => {
      event.preventDefault();
      this.setState({code: event.target.value});
    }
    
    handleChangeDescription = (event) => {
      event.preventDefault();
      this.setState({description: event.target.value});
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
          type: 2, 
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
      if(!this.state.type){
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
              <Select placeholder="Lựa chọn nhân viên" id="select-employee-to-assign" required value={this.state.selected} components={animatedComponents} 
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
              <Select placeholder="Lựa chọn chức vụ" id="select-role-to-assign" required value={this.state.selected} components={animatedComponents} 
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
              <Select placeholder="Lựa chọn phòng ban" id="select-department-to-assign" required value={this.state.selected} components={animatedComponents} 
              isMulti options={this.convertDepartmentsToOptions()} onChange={this.handleChangeSelectDepartment} />
            </div>
         </div>
        );
      }
      else if(this.state.type === 5){
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
                <Select placeholder="Lựa chọn nhân viên" id="select-employee-to-assign-1" required value={this.state.selectedEmployees} components={animatedComponents} 
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
                    <FormCheck.Input value="1" name="collabration1" id="check-type-collabration-1" type={"checkbox"} onChange={this.handleChangeTypeRoleCollabration} />
                    <FormCheck.Label className="form-check-label-1">Chức vụ</FormCheck.Label>
                  </Form.Check>
                  <Form.Check style={{marginLeft:"5%"}}>
                    <FormCheck.Input value="2" name="collabration2" type={"checkbox"} id="check-type-collabration-2" onChange={this.handleChangeTypeDepartmentCollabration} />
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
              <Select placeholder="Lựa chọn chức vụ" id="select-role-to-assign-1" required value={this.state.selectedRoles} components={animatedComponents} 
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
              <Select placeholder="Lựa chọn phòng ban" id="select-department-to-assign-1" required value={this.state.selectedDepartments} components={animatedComponents} 
                isMulti options={this.convertDepartmentsToOptions()} onChange={this.handleChangeSelectDepartmentCollabration} />
            </div>
          </div>
        );
      }else {
        return (<div></div>);
      }
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
                Hỗ trợ tìm kiếm
              </label>
            </div>
            <div className="col-12 col-md-9">
              <SelectDepartmentToAssign />
              <Form.Text className="text-muted">
                Sử dụng để tìm kiếm nhân viên và chức vụ
              </Form.Text>
            </div>
          </div>
        );
      }
      else {
        return (<div></div>);
      }
    }

    render() {
        if(this.state.redirect){
          return <Redirect to={{ pathname: "/process/new"}}/> 
        }
        return (
            <div
            className="modal fade"
            id="form-add-new-process"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="scrollmodalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="scrollmodalLabel">
                    Quy trình mới
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
                    <div className="card-body card-block form-add-process">
                      <Form
                        encType="multipart/form-data"
                        className="form-horizontal"
                        onSubmit={(e) => this.handleSubmitAddProcess(e)}
                      >
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label>Mã quy trình</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <Form.Control onChange={(e) => this.handleChangeCode(e)} type="text" id="code" name="code" placeholder="Mã quy trình" />
                              <Form.Text className="text-muted">
                              Tự động sinh mã quy trình nếu để trống
                            </Form.Text>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label className="required">Tên quy trình</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <Form.Control onChange={(e) => this.handleChangeName(e)} type="text" id="name" required name="name" placeholder="Tên quy trình" />
                            <small className="form-text text-muted">
                            </small>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label className="required">Ban hành</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <DatePicker onChange={this.handleChangeDeadline} selected={this.state.deadline} className="form-control" dateFormat="dd-MM-yyyy"  id="deadline" required name="deadline" placeholder="Deadline" />
                            <Form.Text className="text-muted">
                              Thời gian đưa vào sử dụng quy trình
                            </Form.Text>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label className="required">Mô tả ngắn</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <Form.Control as={"textarea"} onChange={(e) => this.handleChangeDescription(e)}  type="text" required name="description" id="description" placeholder="Nội dung" />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="disabled-input"
                              className=" form-control-label required"
                            >
                              Kiểu giao
                            </label>
                          </div>
                          <div className="col-12 col-md-9" style={{display:"flex"}} key={`custom-inline-radio`}>
                            <Form.Check>
                              <FormCheck.Input value="1" name="type1" id="check-type-assign-1" type={"checkbox"} onChange={this.handleChangeTypeEmployee} />
                              <FormCheck.Label className="form-check-label-1">Cá nhân</FormCheck.Label>
                            </Form.Check>
                            <Form.Check style={{marginLeft:"5%"}}>
                              <FormCheck.Input value="2" name="type2" type={"checkbox"} id="check-type-assign-2" onChange={this.handleChangeTypeRole} />
                              <FormCheck.Label className="form-check-label-1">Chức vụ</FormCheck.Label>
                            </Form.Check>
                            <Form.Check style={{marginLeft:"5%"}}>
                              <FormCheck.Input value="5" name="type5" type={"checkbox"} id="check-type-assign-5" onChange={this.handleChangeColabration} />
                              <FormCheck.Label className="form-check-label-1">Kết hợp</FormCheck.Label>
                            </Form.Check>
                            <Form.Check style={{marginLeft:"5%"}}>
                              <FormCheck.Input value="3" name="type3" type={"checkbox"} id="check-type-assign-3" onChange={this.handleChangeTypeDepartment} />
                              <FormCheck.Label className="form-check-label-1">Phòng ban</FormCheck.Label>
                            </Form.Check>
                            <Form.Check style={{marginLeft:"5%"}}>
                              <FormCheck.Input value="4" name="type4" type={"checkbox"} id="check-type-assign-4" onChange={this.handleChangeTypeCompany} />
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
                            <button type="submit" id="next-step-create-process" className="btn btn-primary" style={{float:"left"}}>
                              Bước tiếp theo
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
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      idDepartmentAssign: state.addProcessReducers.changeDepartmentToAssignReducer.idDepartment,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProcessInformation: (information) => {
      dispatch(actions.updateProcessInformation(information));
    },
    showAlert: (properties) => {
      dispatch(actionAlerts.showMessageAlert(properties));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddProcessModal);
