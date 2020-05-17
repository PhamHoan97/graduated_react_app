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
import "../Css/FormAddProcess.css"

const animatedComponents = makeAnimated();

class FormAddProcessModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
          employeesFilter: '',
          rolesFilter: '',
          selected: '', 
          name: '',
          description: '',
          assign: '',
          time: '',
          deadline: '',
          file: '',
          type: '',
          redirect: false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps.idDepartmentAssign){
          var token = localStorage.getItem('token');
          axios.get(`http://127.0.0.1:8000/api/company/department/`+ nextProps.idDepartmentAssign + `/employee/role`,
          {
              headers: { 'Authorization': 'Bearer ' + token}
          }).then(res => {
            if(res.data.error != null){
                console.log(res.data.message);
            }else{
                this.setState({employeesFilter: res.data.employees, rolesFilter: res.data.roles, selected: '', assign: ''});
            }
          }).catch(function (error) {
            alert(error);
          }); 
      }
    }
    
    componentDidMount () {
      var token = localStorage.getItem('token');
      var company_id = localStorage.getItem('company_id');
      axios.get(`http://127.0.0.1:8000/api/company/`+ company_id + `/employee/role`,
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
        this.setState({selected: selectedOption, assign: selectedOption});
    };

    handleChangeSelectRole = selectedOption => {
      this.setState({selected: selectedOption, assign: selectedOption});
   };

    handleChangeDeadline = date => {
      this.setState({
        deadline: date
      });
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

    handleSubmitAddProcess = (e) => {
      e.preventDefault();
      if(!this.state.assign){

      }else{
        document.getElementById('close-modal-add-new-process').click();
        var information = {
          name :this.state.name,
          description: this.state.description,
          assign: this.state.assign,
          time: this.getCurrentTime(),
          deadline: this.convertDate(this.state.deadline),
          file: this.state.file,
          type: this.state.type,
        }
        this.props.updateProcessInformation(information);
        this.setState({redirect: true});
      }
    }

    handleChangeName = (event) => {
      event.preventDefault();
      this.setState({name: event.target.value});
    }

    handleChangeDescription = (event) => {
      event.preventDefault();
      this.setState({description: event.target.value});
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
          <Select placeholder="Lựa chọn nhân viên" id="select-employee-to-assign" required value={this.state.selected} components={animatedComponents} 
          isMulti options={this.convertEmployeesToOptions()} onChange={this.handleChangeSelectEmployee} />
        );
      }else{
        return(
          <Select placeholder="Lựa chọn chức vụ" id="select-employee-to-assign" required value={this.state.selected} components={animatedComponents} 
          isMulti options={this.convertRolesToOptions()} onChange={this.handleChangeSelectRole} />
        );
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
                            <Form.Label>Tên quy trình</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <Form.Control onChange={(e) => this.handleChangeName(e)} type="text" id="name" required name="name" placeholder="Tên" />
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
                            <Form.Control as={"textarea"} onChange={(e) => this.handleChangeDescription(e)}  type="text" required name="description" id="description" placeholder="Nội dung" />
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
                              <FormCheck.Input value="1" name="type1" id="check-type-assign-1" type={"checkbox"} onChange={this.handleChangeTypeEmployee} />
                              <FormCheck.Label>Cá nhân</FormCheck.Label>
                            </Form.Check>
                            <Form.Check style={{marginLeft:"5%"}}>
                              <FormCheck.Input value="2" name="type2" type={"checkbox"} id="check-type-assign-2" onChange={this.handleChangeTypeRole} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddProcessModal);