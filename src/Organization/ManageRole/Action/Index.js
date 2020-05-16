import * as types from '../Constants/ActionType'

export const editRoleOrganization = (editRoleOrganization)=>{
    return {
        type:types.EDIT_ROLE,
        editRoleOrganization
    }
}

export const editEmployeeOrganization = (editEmployeeOrganization)=>{
    return {
        type:types.EDIT_EMPLOYEE,
        editEmployeeOrganization
    }
}