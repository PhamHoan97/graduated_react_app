import React, { Component } from 'react'
import {connect} from  'react-redux';
import UserItem from '../../../Component/ManageOrganization/ManageUser/UserItem';
import {getDetailEmloyee} from '../../../Action/Organization/User/Index'
import {showEditEmployee} from '../../../Action/Organization/User/Index'
import {hideEditEmployee} from '../../../Action/Organization/User/Index'
import {showNewEmployee} from '../../../Action/Organization/User/Index'
import {hideNewEmployee} from '../../../Action/Organization/User/Index'
import EditUser from '../../../Component/ManageOrganization/ManageUser/EditUser';
import NewUser from '../../../Component/ManageOrganization/ManageUser/NewUser';
import axios from "axios";
import * as host from '../../../Constants/Url'
class UserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: this.props.listUser,
        }
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    }

    getListUser = () =>{
        let self = this;
        var idCompany = localStorage.getItem('company_id');
        var token = localStorage.getItem('token');
        axios.get(host.URL_BACKEND+'/api/system/organization/company/'+idCompany+'/employee',{
            headers: {'Authorization': 'Bearer '+token}
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            } else {
                self.setState({
                    listUser: JSON.parse(JSON.stringify(response.data.employees))
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    rerenderParentCallback() {
        this.getListUser();
    }

    render() {
        return (
            <>
                <div className="btn--new__user text-right mr-5">
                    <button type="button" className="btn btn-primary" onClick={()=>this.props.showNewEmployee()}>New</button>
                </div>
                <NewUser
                    rerenderParentCallback={this.rerenderParentCallback}
                    hideNewEmployee = {this.props.hideNewEmployee}
                    listDepartment = {this.props.listDepartment}
                    listRole = {this.props.listRole}
                    isDisplayNewForm = {this.props.isDisplayNewForm}
                />
                <div className="form-group">
                    <div className="container-fluid">
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-stripe">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Employee</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.showItemUser(this.state.listUser)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.displayEditUser()
                }
            </>
        )
    }

    displayEditUser =()=>{
        if(this.props.isDisplayEditForm && this.props.detailEmployee !== null){
           return(
            <EditUser
                rerenderParentCallback={this.rerenderParentCallback}
                listDepartment={this.props.listDepartment}
                listRole={this.props.listRole}
                detailEmployee = {this.props.detailEmployee}
                hideEditEmployee = {this.props.hideEditEmployee}
                showDetailEmployee = {this.props.showDetailEmployee}
            />
           )
        }else{
            return(
                <div></div>
            )
        }
    }

    showItemUser = (employees) => {
        var result;
        if(employees.length > 0){
            var {showDetailEmployee} = this.props;
            var {showEditEmployee} = this.props;
            result = employees.map((item,index)=>{
                return (
                    <UserItem
                        rerenderParentCallback={this.rerenderParentCallback}
                        key={index}
                        item={item}
                        index={index+1}
                        showDetailEmployee={showDetailEmployee}
                        showEditEmployee={showEditEmployee}
                    />
                )
            })
            return result;
        }else{
            return (
                <tr></tr>
            )
        }
    }

    showNewUser = () =>{
        this.props.showNewUser();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isDisplayEditForm : state.systemReducers.organizationReducer.showHideReducer.showHideEditEmployee,
        isDisplayNewForm : state.systemReducers.organizationReducer.showHideReducer.showHideNewEmployee,
        detailEmployee : state.systemReducers.organizationReducer.employeeReducer.detailEmployee
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showDetailEmployee: (detailEmployee) => {
            dispatch(getDetailEmloyee(detailEmployee))
        },
        showEditEmployee:()=>{
            dispatch(showEditEmployee())
        },
        hideEditEmployee:()=>{
            dispatch(hideEditEmployee())
        },
        showNewEmployee:()=>{
            dispatch(showNewEmployee())
        },
        hideNewEmployee:()=>{
            dispatch(hideNewEmployee())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserContainer)
