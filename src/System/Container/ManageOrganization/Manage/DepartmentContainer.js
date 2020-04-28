import React, { Component } from 'react'
import {connect} from  'react-redux';
import Alert from '@material-ui/lab/Alert';
import DepartmentItem from '../../../Component/ManageOrganization/ManageDepartment/DepartmentItem';
import {getDetailDepartment} from '../../../Action/Organization/Department/Index'
import {showEditDepartment} from '../../../Action/Organization/Department/Index'
import {hideEditDepartment} from '../../../Action/Organization/Department/Index'
import {showNewDepartment} from '../../../Action/Organization/Department/Index'
import {hideNewDepartment} from '../../../Action/Organization/Department/Index'
import EditDepartment from '../../../Component/ManageOrganization/ManageDepartment/EditDepartment';
import NewDepartment from '../../../Component/ManageOrganization/ManageDepartment/NewDepartment';
import axios from "axios";
import * as host from '../../../Constants/Url'
class DepartmentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDepartment: this.props.listDepartment,
        }
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    }

    getListDepartment = () =>{
        let self = this;
        var idCompany = localStorage.getItem('company_id');
        var token = localStorage.getItem('token');
        axios.get(host.URL_BACKEND+'/api/system/organization/department/'+idCompany,{
            headers: {'Authorization': 'Bearer '+token}
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            } else {
                self.setState({
                    listDepartment: JSON.parse(JSON.stringify(response.data.departmentCompany))
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    rerenderParentCallback() {
        this.getListDepartment();
    }
    render() {
        return (
            <>
                <div className="btn--new__department text-right mr-5">
                    <button type="button" className="btn btn-primary" onClick={()=>this.props.showNewDepartment()}>New</button>
                </div>
                <NewDepartment
                    rerenderParentCallback={this.rerenderParentCallback}
                    hideNewDepartment = {this.props.hideNewDepartment}
                    isDisplayNewForm = {this.props.isDisplayNewForm}
                />
                <div className="form-group">
                    <div className="container-fluid">
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-stripe .list-employee">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Role</th>
                                                <th scope="col"/>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.showItemDepartment(this.state.listDepartment)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.displayEditDepartment()
                }
            </>
        )
    }

    displayEditDepartment =()=>{
        if(this.props.isDisplayEditForm && this.props.detailDepartment !== null){
           return(
            <EditDepartment
                rerenderParentCallback={this.rerenderParentCallback}
                detailDepartment = {this.props.detailDepartment}
                showDetailDepartment = {this.props.showDetailDepartment}
                hideEditDepartment = {this.props.hideEditDepartment}
            />
           )
        }else{
            return(
                <div></div>
            )
        }
    }

    displayAlertDelete = () =>{
        if(this.state.isDisplayAlertDelete){
            return <Alert severity="warning">Delete success !!!</Alert>;
        }else{
            return <div></div>
        }
    }

    showItemDepartment = (department) => {
        var result;
        if(department.length > 0){
            var {showDetailDepartment} = this.props;
            var {showEditDepartment} = this.props;
            result = department.map((item,index)=>{
                return (
                    <DepartmentItem
                        rerenderParentCallback={this.rerenderParentCallback}
                        key={index}
                        item={item}
                        index={index+1}
                        showDetailDepartment={showDetailDepartment}
                        showEditDepartment={showEditDepartment}
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
        isDisplayEditForm : state.systemReducers.organizationReducer.showHideReducer.showHideEditDepartment,
        isDisplayNewForm : state.systemReducers.organizationReducer.showHideReducer.showHideNewDepartment,
        detailDepartment : state.systemReducers.organizationReducer.departmentReducer.detailDepartment
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showDetailDepartment: (detailDepartment) => {
            dispatch(getDetailDepartment(detailDepartment))
        },
        showEditDepartment:()=>{
            dispatch(showEditDepartment())
        },
        hideEditDepartment:()=>{
            dispatch(hideEditDepartment())
        },
        showNewDepartment:()=>{
            dispatch(showNewDepartment())
        },
        hideNewDepartment:()=>{
            dispatch(hideNewDepartment())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DepartmentContainer)
