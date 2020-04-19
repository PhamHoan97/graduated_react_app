import React, { Component } from 'react'
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
export default class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRoleDepartment:[],
            listDepartment:[],
            isDisplayAlertSuccess: false,
            isDisplayAlertFail: false,
            newNameEmployee: "",
            newPhoneEmployee: "",
            newRoleEmployee: 0,
            newDepartmentEmployee: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        var token = localStorage.getItem('token');
        // get all department of company
        var idCompany = localStorage.getItem('company_id');
        var self =  this;
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
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        if(name === 'newDepartmentEmployee'){
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
 
    render() {
        if (this.props.isDisplayNewForm) {
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
                        name="newNameEmployee"
                        validations={[required]}
                        onChange={(event)=>this.handleChange(event)
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="field">Phone</label>
                    <Input type="number" className="form-control"
                        name="newPhoneEmployee"
                        validations={[required]}
                        onChange={(event)=>this.handleChange(event)}
                    />
                </div>
                <div className="form-group mb-3">
                <label htmlFor="exampleFormControlSelect1">Department</label>
                <br></br>
                <select className="form-control"  name="newDepartmentEmployee" onChange={this.handleChange}>
                    <option value={0}>Choose departments</option>
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
                <select className="form-control" name="newRoleEmployee"  onChange={this.handleChange}>
                        <option value={0}>Choose roles</option>
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
                    <CheckButton type="submit" className="btn btn-primary mb-2 mr-2" onClick={() => this.saveNewEmployee()} ref={c => { this.checkBtn = c }}>
                        Save
                    </CheckButton>
                <button
                    type="submit"
                    className="btn btn-primary mb-2 mr-2"
                    onClick={() => this.hideNewEmployee()}
                >
                    Cancel
                </button>
                </div>
            </Form>
            {this.displayAlertSuccess()}
            {this.displayAlertFail()}
            </>
        );
        } else {
        return <div></div>;
        }
    }

    displayAlertSuccess = () => {
        if (this.state.isDisplayAlertSuccess) {
        return <Alert severity="success">Save success !!!</Alert>;
        } else {
        return <div></div>;
        }
    };

    displayAlertFail = () => {
        if (this.state.isDisplayAlertFail) {
            return <Alert severity="warning">You can choose roles and department </Alert>;
        } else {
            return <div></div>;
        }
    };

    saveNewEmployee = () => {
        console.log(this.state);
        var self =  this;
        if(this.state.newDepartmentEmployee === 0 || this.state.newRoleEmployee === 0){
            self.setState({
                isDisplayAlertFail : true,
                isDisplayAlertSuccess : false
            });
        }else{
            var token = localStorage.getItem('token');
            axios.post(host.URL_BACKEND+'/api/system/organization/employee/new', {
                newNameEmployee: this.state.newNameEmployee,
                newRoleEmployee: this.state.newRoleEmployee,
                newDepartmentEmployee:this.state.newDepartmentEmployee,
                newPhoneEmployee:this.state.newPhoneEmployee,
            },{
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null) {
                    console.log(response.data.error);
                }else{
                    self.setState({
                        isDisplayAlertSuccess : true,
                        isDisplayAlertFail : false
                    })
                    self.props.rerenderParentCallback();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };


    hideNewEmployee = () => {
        this.props.hideNewEmployee();
        this.setState({
            isDisplayAlertSuccess: false,
            isDisplayAlertFail: false,
        });
    };
}
