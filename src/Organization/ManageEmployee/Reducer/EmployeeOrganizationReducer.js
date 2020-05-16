import * as types from '../Constants/ActionType';

var initialState = {
    editEmployeeOrganization:[]
}

function employeeOrganizationReducer(state = initialState, action) {
    switch (action.type) {
        case types.EDIT_EMPLOYEE:
            var editEmployeeOrganization = action.editEmployeeOrganization;
            return {...state,editEmployeeOrganization:editEmployeeOrganization}
        default:
            return state
    }
}

export default employeeOrganizationReducer;