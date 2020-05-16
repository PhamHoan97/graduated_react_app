import * as types from '../Constants/ActionType'

export const editDepartmentOrganization = (editDepartmentOrganization)=>{
    return {
        type:types.EDIT_DEPARTMENT,
        editDepartmentOrganization
    }
}
export const editRoleOrganization = (editRoleOrganization)=>{
    return {
        type:types.EDIT_ROLE,
        editRoleOrganization
    }
}