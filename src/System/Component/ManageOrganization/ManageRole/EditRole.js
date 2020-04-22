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
export default class EditRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDepartment:[],
            isDisplayAlert: false,
            editNameRole: "",
            editDepartmentRole: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.form.validateAll();
    };
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        if (this.props.detailRole.length !== 0) {
            var token = localStorage.getItem('token');
            // get all department of company
            var self =  this;
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
                editNameRole: this.props.detailRole.name,
                editDepartmentRole: this.props.detailRole.department_id,
            });
        }
    }

  render() {
    if (this.props.isDisplayEditForm && this.props.detailRole !== null) {
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
                    name="editNameRole"
                    validations={[required]}
                    value={this.state.editNameRole}
                    onChange={(event)=>this.handleChange(event)
                    }
                />
            </div>
            <div className="form-group mb-3">
               <label htmlFor="exampleFormControlSelect1">Department</label>
               <br></br>
               <select className="form-control"  name="editDepartmentRole" value={this.state.editDepartmentRole} onChange={this.handleChange}>
                   {
                        Object.values(this.state.listDepartment).map((department, key) => {
                            return (
                            <option value={department.id} key={key}>{department.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="form-group text-left">
               <CheckButton type="submit" className="btn btn-primary mb-2 mr-2" onClick={() => this.saveEditRole()} ref={c => { this.checkBtn = c }}>
                Save
                </CheckButton>
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-2"
                onClick={() => this.hideEditRole()}
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

  saveEditRole = () => {
    var self = this;
    var token = localStorage.getItem('token');
    axios.post(host.URL_BACKEND+'/api/system/organization/role/update', {
        editNameRole: this.state.editNameRole,
        idChooseRole:this.props.detailRole.id,
        idChooseDepartment:this.state.editDepartmentRole
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
    axios.get(host.URL_BACKEND+'/api/system/organization/role/detail/'+this.props.detailRole.id,{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
            console.log(response.data.error);
        }else{
            var detailRole =  JSON.parse(JSON.stringify(response.data.role));
            self.props.showDetailRole(detailRole);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    this.props.rerenderParentCallback();
  };

  hideEditRole = () => {
    this.props.hideEditRole();
    this.setState({
      isDisplayAlert: false,
    });
  };
}
