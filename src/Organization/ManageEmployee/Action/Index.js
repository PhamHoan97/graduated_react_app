import * as types from '../Constants/ActionType'

export const editEmployeeOrganization = (editEmployeeOrganization)=>{
    return {
        type:types.EDIT_EMPLOYEE,
        editEmployeeOrganization
    }
}