import * as types from '../Constants/ActionType';

var initialState = {
    editDepartmentOrganization:[],
    editRoleOrganization:[]
}

function departmentOrganizationReducer(state = initialState, action) {
    switch (action.type) {
        case types.EDIT_DEPARTMENT:
            var editDepartmentOrganization = action.editDepartmentOrganization;
            return {...state,editDepartmentOrganization:editDepartmentOrganization}
        case types.EDIT_ROLE:
            var editRoleOrganization = action.editRoleOrganization;
            return {...state,editRoleOrganization:editRoleOrganization}
        default:
            return state
    }
}

export default departmentOrganizationReducer;