import React, { Component } from 'react'
import Department from '../../../Component/Content/ManageOrganization/ManageDepartment/Department'
import {connect} from  'react-redux';
import DepartmentItem from '../../../Component/Content/ManageOrganization/ManageDepartment/DepartmentItem';
import {detailDepartment} from '../../../Action/Organization/Department/Index'
import {showEditDepartment} from '../../../Action/Organization/Department/Index'
import {hideEditDepartment} from '../../../Action/Organization/Department/Index'
import {showNewDepartment} from '../../../Action/Organization/Department/Index'
import {hideNewDepartment} from '../../../Action/Organization/Department/Index'
import EditDepartment from '../../../Component/Content/ManageOrganization/ManageDepartment/EditDepartment';
import NewDepartment from '../../../Component/Content/ManageOrganization/ManageDepartment/NewDepartment';
class DepartmentContainer extends Component {
    render() {
        return (
            <>
                <div className="btn--new__department text-right mr-5">
                    <button type="button" className="btn btn-primary" onClick={()=>this.showNewDepartment()}>New</button>
                </div>
                <NewDepartment
                    hideNewDepartment = {this.props.hideNewDepartment}
                    isDisplayNewForm = {this.props.isDisplayNewForm}
                />
                <Department>
                    {
                        this.showItemDepartment(this.props.listDepartment)
                    }
                </Department>
                <EditDepartment
                    hideEditDepartment = {this.props.hideEditDepartment}
                    isDisplayEditForm = {this.props.isDisplayEditForm}
                    idEditDepartment = {this.props.idEditDepartment}
                />
            </>
        )
    }

    showItemDepartment = (department) => {
        var result = "Không có phong ban nào";
        if(department.length > 0){
            var {showDetailDepartment} = this.props;
            var {showEditDepartment} = this.props;
            result = department.map((item,index)=>{
                return (
                    <DepartmentItem
                        key={index}
                        item={item}
                        index={index+1}
                        showDetailDepartment = {showDetailDepartment}
                        showEditDepartment = {showEditDepartment}
                    />
                )
            })
        }
        return result;
    }

    showNewDepartment = () =>{
        this.props.showNewDepartment();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        listDepartment : state.organizationReducer.departmentReducer["department"],
        isDisplayEditForm : state.organizationReducer.showHideReducer.showHideEditDepartment,
        isDisplayNewForm : state.organizationReducer.showHideReducer.showHideNewDepartment,
        idEditDepartment : state.organizationReducer.departmentReducer.idEditDepartment
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showDetailDepartment: (idDepartment) => {
            dispatch(detailDepartment(idDepartment))
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
