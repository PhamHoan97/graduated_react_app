import React, { Component } from 'react'
import {connect} from  'react-redux';
import UserItem from '../../../Component/ManageOrganization/ManageUser/UserItem';
import {detailUser} from '../../../Action/Organization/User/Index'
import {showEditUser} from '../../../Action/Organization/User/Index'
import {hideEditUser} from '../../../Action/Organization/User/Index'
import {showNewUser} from '../../../Action/Organization/User/Index'
import {hideNewUser} from '../../../Action/Organization/User/Index'
import EditUser from '../../../Component/ManageOrganization/ManageUser/EditUser';
import NewUser from '../../../Component/ManageOrganization/ManageUser/NewUser';
class UserContainer extends Component {
    render() {
        return (
            <>
                <div className="btn--new__user text-right mr-5">
                    <button type="button" className="btn btn-primary" onClick={()=>this.showNewUser()}>New</button>
                </div>
                <NewUser
                    hideNewUser = {this.props.hideNewUser}
                    isDisplayNewForm = {this.props.isDisplayNewForm}
                />
                <div className="form-group">
                    <div className="container-fluid">
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-stripe list-member">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Department</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.showItemUser(this.props.listUser)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <EditUser
                    hideEditUser = {this.props.hideEditUser}
                    isDisplayEditForm = {this.props.isDisplayEditForm}
                    idEditUser = {this.props.idEditUser}
                />
            </>
        )
    }

    showItemUser = (user) => {
        var result = "Không có phong ban nào";
        if(user.length > 0){
            var {showDetailUser} = this.props;
            var {showEditUser} = this.props;
            result = user.map((item,index)=>{
                return (
                    <UserItem
                        key={index}
                        item={item}
                        index={index+1}
                        showDetailUser = {showDetailUser}
                        showEditUser = {showEditUser}
                    />
                )
            })
        }
        return result;
    }

    showNewUser = () =>{
        this.props.showNewUser();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        test : state,
        listUser : state.systemReducers.organizationReducer.userReducer["user"],
        isDisplayEditForm : state.systemReducers.organizationReducer["showHideReducer"].showHideEditUser,
        isDisplayNewForm : state.systemReducers.organizationReducer["showHideReducer"].showHideNewUser,
        idEditUser : state.systemReducers.organizationReducer.userReducer.idEditUser
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showDetailUser: (idUser) => {
            dispatch(detailUser(idUser))
        },
        showEditUser:()=>{
            dispatch(showEditUser())
        },
        hideEditUser:()=>{
            dispatch(hideEditUser())
        },
        showNewUser:()=>{
            dispatch(showNewUser())
        },
        hideNewUser:()=>{
            dispatch(hideNewUser())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserContainer)
