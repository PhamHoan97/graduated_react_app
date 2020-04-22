import React, { Component } from 'react'
import {connect} from  'react-redux';
import RoleItem from '../../../Component/ManageOrganization/ManageRole/RoleItem';
import {getDetailRole} from '../../../Action/Organization/Role/Index'
import {showEditRole} from '../../../Action/Organization/Role/Index'
import {hideEditRole} from '../../../Action/Organization/Role/Index'
import {showNewRole} from '../../../Action/Organization/Role/Index'
import {hideNewRole} from '../../../Action/Organization/Role/Index'
import EditRole from '../../../Component/ManageOrganization/ManageRole/EditRole';
import NewRole from '../../../Component/ManageOrganization/ManageRole/NewRole';
import axios from "axios";
import * as host from '../../../Constants/Url'
class RoleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRole: this.props.listRole,
        }
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    }
    
    getListRole = () =>{
        let self = this;
        var idCompany = localStorage.getItem('company_id');
        var token = localStorage.getItem('token');
        axios.get(host.URL_BACKEND+'/api/system/organization/role/'+idCompany,{
            headers: {'Authorization': 'Bearer '+token}
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            } else {
                self.setState({
                    listRole: JSON.parse(JSON.stringify(response.data.roles))
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    rerenderParentCallback() {
        this.getListRole();
    }

    render() {
        return (
            <>
                <div className="btn--new__user text-right mr-5">
                    <button type="button" className="btn btn-primary" onClick={()=>this.props.showNewRole()}>New</button>
                </div>
                <NewRole
                    rerenderParentCallback={this.rerenderParentCallback}
                    hideNewRole = {this.props.hideNewRole}
                    listDepartment = {this.props.listDepartment}
                    isDisplayNewForm = {this.props.isDisplayNewForm}
                />
                <div className="form-group">
                    <div className="container-fluid">
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-stripe ">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Department</th>
                                                <th scope="col">Company</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.showItemRole(this.state.listRole)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.displayEditRole()
                }
            </>
        )
    }

    displayEditRole =()=>{
        if(this.props.isDisplayEditForm && this.props.detailRole !== null){
           return(
            <EditRole
                rerenderParentCallback={this.rerenderParentCallback}
                detailRole = {this.props.detailRole}
                listDepartment = {this.props.listDepartment}
                hideEditRole = {this.props.hideEditRole}
                showDetailRole = {this.props.showDetailRole}
            />
           )
        }else{
            return(
                <div></div>
            )
        }
    }

    showItemRole = (roles) => {
        var result;
        if(roles.length > 0){
            var {showDetailRole} = this.props;
            var {showEditRole} = this.props;
            result = roles.map((item,index)=>{
                return (
                    <RoleItem
                        rerenderParentCallback={this.rerenderParentCallback}
                        key={index}
                        item={item}
                        index={index+1}
                        showDetailRole={showDetailRole}
                        showEditRole={showEditRole}
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
}

const mapStateToProps = (state, ownProps) => {
    return {
        isDisplayEditForm : state.systemReducers.organizationReducer.showHideReducer.showHideEditRole,
        isDisplayNewForm : state.systemReducers.organizationReducer.showHideReducer.showHideNewRole,
        detailRole : state.systemReducers.organizationReducer.roleReducer.detailRole
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showDetailRole: (detailRole) => {
            dispatch(getDetailRole(detailRole))
        },
        showEditRole:()=>{
            dispatch(showEditRole())
        },
        hideEditRole:()=>{
            dispatch(hideEditRole())
        },
        showNewRole:()=>{
            dispatch(showNewRole())
        },
        hideNewRole:()=>{
            dispatch(hideNewRole())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RoleContainer)
