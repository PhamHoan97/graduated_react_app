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
export default class NewRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDepartment:this.props.listDepartment,
            isDisplayAlertSuccess: false,
            isDisplayAlertFail: false,
            newNameRole: "",
            newIsProcessRole: true,
            newDepartmentRole: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.name === 'newIsProcessRole' ?event.target.checked  : event.target.value;
        this.setState({
            [name]: value
        })

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
                        name="newNameRole"
                        validations={[required]}
                        onChange={(event)=>this.handleChange(event)
                        }
                    />
                </div>
                <div className="form-group mb-3">
                <label htmlFor="exampleFormControlSelect1">Department</label>
                <br></br>
                <select className="form-control"  name="newDepartmentRole" onChange={this.handleChange}>
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
                <div className="form-group">
                    <label htmlFor="name">Permit to creat process</label>
                    <Input type="checkbox"
                        name="newIsProcessRole"
                        checked={this.state.newIsProcessRole}
                        onChange={(event)=>this.handleChange(event)
                    }
                    />
                </div>
                <div className="form-group text-left">
                    <CheckButton type="submit" className="btn btn-primary mb-2 mr-2" onClick={() => this.saveNewRole()} ref={c => { this.checkBtn = c }}>
                        Save
                    </CheckButton>
                <button
                    type="submit"
                    className="btn btn-primary mb-2 mr-2"
                    onClick={() => this.hideNewRole()}
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
            return <Alert severity="warning">You must choose department before save </Alert>;
        } else {
            return <div></div>;
        }
    };

    saveNewRole = () => {
        var self =  this;
        if(parseInt(this.state.newDepartmentRole) === 0){
            self.setState({
                isDisplayAlertFail : true,
                isDisplayAlertSuccess : false
            });
            setTimeout(() => {
                self.setState({
                    isDisplayAlertFail : false,
                    isDisplayAlertSuccess : false
                });
            }, 2000);
        }else{
            var token = localStorage.getItem('token');
            axios.post(host.URL_BACKEND+'/api/system/organization/role/new', {
                newNameRole: this.state.newNameRole,
                newIsProcessRole: this.state.newIsProcessRole,
                newDepartmentRole:this.state.newDepartmentRole,
            },{
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null) {
                    console.log(response.data.error);
                }else{
                    self.setState({
                        newDepartmentRole:0,
                        isDisplayAlertSuccess : true,
                        isDisplayAlertFail : false
                    })
                    setTimeout(() => {
                        self.setState({
                            isDisplayAlertSuccess : false,
                            isDisplayAlertFail : false
                        });
                        self.props.hideNewRole();
                    }, 2000);
                    self.props.rerenderParentCallback();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };


    hideNewRole = () => {
        this.props.hideNewRole();
        this.setState({
            isDisplayAlertSuccess: false,
            isDisplayAlertFail: false,
        });
    };
}
