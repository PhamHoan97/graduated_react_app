import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import * as host from "../../../Constants/Url";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { isEmpty } from "validator";
import CheckButton from 'react-validation/build/button';
const required = (value) => {
  if (isEmpty(value)) {
    return (
      <small className="form-text text-danger">This field is required</small>
    );
  }
};
export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRoleDepartment:[],
            listDepartment:[],
            isDisplayAlert: false,
            editNameEmployee: "",
            editPhoneEmployee: "",
            editRoleEmployee: 0,
            editDepartmentEmployee: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        if(name === 'editDepartmentEmployee'){
            var self =  this;
            var token = localStorage.getItem('token');
            axios.get(host.URL_BACKEND+'/api/system/organization/role/department/'+value,{
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null) {
                    console.log(response.data.error);
                }else{
                    console.log(response.data.roleDepartment);
                    self.setState({
                        [name]: value,
                        listRoleDepartment:response.data.roleDepartment
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            this.setState({
                [name]: value
            })
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.form.validateAll();
    };
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        if (this.props.detailEmployee.length !== 0) {
            var token = localStorage.getItem('token');
            // Get all role of department 
            var self =  this;
            axios.get(host.URL_BACKEND+'/api/system/organization/role/department/'+this.props.detailEmployee.department_id,{
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null) {
                    console.log(response.data.error);
                }else{
                    self.setState({
                        listRoleDepartment:response.data.roleDepartment
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            // get all department of company
            var idCompany = localStorage.getItem('company_id');
            axios.get(host.URL_BACKEND+'/api/system/organization/department/'+idCompany,{
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null) {
                    console.log(response.data.error);
                }else{
                    self.setState({
                        listDepartment:response.data.departmentCompany
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            this.setState({
                editNameEmployee: this.props.detailEmployee.name,
                editPhoneEmployee: this.props.detailEmployee.phone,
                editRoleEmployee: this.props.detailEmployee.role_id,
                editDepartmentEmployee: this.props.detailEmployee.department_id,
            });
        }
    }

  render() {
    if (this.props.isDisplayEditForm && this.props.detailDepartment !== null) {
      return (
        <>
          <Form
            onSubmit={(e) => this.onSubmit(e)}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input type="text"
                    className="form-control"
                    name="editNameEmployee"
                    validations={[required]}
                    value={this.state.editNameEmployee}
                    onChange={(event)=>this.handleChange(event)
                    }
                />
            </div>
            <div className="form-group">
                <label htmlFor="field">Phone</label>
                <Input type="text" className="form-control"
                    name="editRoleEmployee"
                    validations={[required]}
                    value={this.state.editPhoneEmployee}
                    onChange={(event)=>this.handleChange(event)}
                />
            </div>
            <div className="form-group mb-3">
               <label htmlFor="exampleFormControlSelect1">Department</label>
               <br></br>
               <select className="form-control"  name="editDepartmentEmployee" value={this.state.editDepartmentEmployee} onChange={this.handleChange}>
                   {
                        Object.values(this.state.listDepartment).map((department, key) => {
                            return (
                            <option value={department.id} key={key}>{department.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="form-group mb-3">
               <label htmlFor="exampleFormControlSelect1">Roles</label>
               <br></br>
               <select className="form-control" name="editRoleEmployee" value={this.state.editRoleEmployee} onChange={this.handleChange}>
                    {
                        Object.values(this.state.listRoleDepartment).map((role, key) => {
                            return (
                            <option value={role.id} key={key}>{role.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="form-group text-left">
               <CheckButton type="submit" className="btn btn-primary mb-2 mr-2" onClick={() => this.saveEditEmployee()} ref={c => { this.checkBtn = c }}>
                Save
                </CheckButton>
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-2"
                onClick={() => this.hideEditEmployee()}
              >
                Cancel
              </button>
            </div>
          </Form>
          {this.displayAlert()}
        </>
      );
    } else {
      return <div></div>;
    }
  }

  displayAlert = () => {
    if (this.state.isDisplayAlert) {
      return <Alert severity="success">Edit success !!!</Alert>;
    } else {
      return <div></div>;
    }
  };

  saveEditEmployee = () => {
    var self = this;
    var token = localStorage.getItem('token');
    axios.post(host.URL_BACKEND+'/api/system/organization/employee/update', {
        editNameEmployee: this.state.editNameEmployee,
        editPhoneEmployee: this.state.editPhoneEmployee,
        idChooseRole:this.state.editRoleEmployee,
        idChooseEmployee:this.props.detailEmployee.id,
        idChooseDepartment:this.state.editDepartmentEmployee
    },{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
            console.log(response.data.error);
        }else{
            self.setState({
                isDisplayAlert : true
            })
        }
    })
    .catch(function (error) {
        console.log(error);
    });

    // 
    axios.get(host.URL_BACKEND+'/api/system/organization/employee/detail/'+this.props.detailEmployee.id,{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
            console.log(response.data.error);
        }else{
            var detailEmployee =  JSON.parse(JSON.stringify(response.data.employee));
            self.props.showDetailEmployee(detailEmployee);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    this.props.rerenderParentCallback();
    
  };

  hideEditEmployee = () => {
    this.props.hideEditEmployee();
    this.setState({
      isDisplayAlert: false,
    });
  };
}
