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
            listRoleDepartment:this.props.listRole,
            listDepartment:this.props.listDepartment,
            isDisplayAlertSuccess: false,
            isDisplayAlertFailRequire: false,
            isDisplayAlertFailEmail: false,
            newNameEmployee: "",
            newEmailEmployee: "",
            newPhoneEmployee: "",
            newRoleEmployee: 0,
            newDepartmentEmployee: 0,
        };
        this.handleChange = this.handleChange.bind(this);
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
                    <label htmlFor="name">Email</label>
                    <Input type="email"
                        className="form-control"
                        name="newEmailEmployee"
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
            {this.displayAlertFailRequire()}
            {this.displayAlertFailEmail()}
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

    displayAlertFailRequire = () => {
        if (this.state.isDisplayAlertFailRequire) {
            return <Alert severity="warning">You can choose roles and department </Alert>;
        } else {
            return <div></div>;
        }
    };

    displayAlertFailEmail = () => {
        if (this.state.isDisplayAlertFailEmail) {
            return <Alert severity="warning">Email existed in company</Alert>;
        } else {
            return <div></div>;
        }
    };


    saveNewEmployee = () => {
        var self =  this;
        if(parseInt(this.state.newDepartmentEmployee) === 0 || parseInt(this.state.newRoleEmployee) === 0){
            self.setState({
                isDisplayAlertFailRequire : true,
                isDisplayAlertFailEmail : false,
                isDisplayAlertSuccess : false
            });
            setTimeout(() => {
                self.setState({
                    isDisplayAlertFailRequire : false,
                    isDisplayAlertFailEmail : false,
                    isDisplayAlertSuccess : false
                });
            }, 2000);
        }else{
            var token = localStorage.getItem('token');
            axios.post(host.URL_BACKEND+'/api/system/organization/employee/new', {
                newNameEmployee: this.state.newNameEmployee,
                newEmailEmployee: this.state.newEmailEmployee,
                newRoleEmployee: this.state.newRoleEmployee,
                newDepartmentEmployee:this.state.newDepartmentEmployee,
                newPhoneEmployee:this.state.newPhoneEmployee,
            },{
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null && response.status === 200) {
                    console.log(response.data.error);
                    self.setState({
                        newDepartmentEmployee:0,
                        newRoleEmployee:0,
                        isDisplayAlertSuccess :false,
                        isDisplayAlertFailRequire : false,
                        isDisplayAlertFailEmail : true
                    })
                    setTimeout(() => {
                        self.setState({
                            isDisplayAlertFailRequire : false,
                            isDisplayAlertFailEmail : false,
                            isDisplayAlertSuccess : false
                        });
                    }, 2000);
                }else{
                    self.setState({
                        newDepartmentEmployee:0,
                        newRoleEmployee:0,
                        isDisplayAlertSuccess : true,
                        isDisplayAlertFailRequire : false,
                        isDisplayAlertFailEmail : false
                    })
                    setTimeout(() => {
                        self.setState({
                            isDisplayAlertFailRequire : false,
                            isDisplayAlertFailEmail : false,
                            isDisplayAlertSuccess : false
                        });
                        self.props.hideNewEmployee();
                    }, 2000);
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
            isDisplayAlertFailRequire: false,
            isDisplayAlertFailEmail: false,
        });
    };
}
