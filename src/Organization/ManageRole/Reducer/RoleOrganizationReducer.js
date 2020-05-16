import * as types from '../Constants/ActionType';

var initialState = {
    editRoleOrganization:[],
    editEmployeeOrganization:[]
}

function roleOrganizationReducer(state = initialState, action) {
    switch (action.type) {
        case types.EDIT_ROLE:
            var editRoleOrganization = action.editRoleOrganization;
            return {...state,editRoleOrganization:editRoleOrganization}
        case types.EDIT_EMPLOYEE:
            var editEmployeeOrganization = action.editEmployeeOrganization;
            return {...state,editEmployeeOrganization:editEmployeeOrganization}
        default:
            return state
    }
}

export default roleOrganizationReducer;