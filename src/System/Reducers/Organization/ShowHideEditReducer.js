import * as types from '../../Constants/Orgranization/ActionTypes';

var initialState = {
   showHideEditDepartment:false,
   showHideNewDepartment:false,
   showHideEditEmployee:false,
   showHideNewEmployee:false,
   showHideEditRole:false,
   showHideNewRole:false,
};

function showHideReducer(state = initialState, action) {
    switch (action.type) {
        // DEPARTMENT
        case types.SHOW_EDIT_DEPARTMENT:
            return {...state,showHideEditDepartment:true}
        case types.HIDE_EDIT_DEPARTMENT:
            return {...state,showHideEditDepartment:false}
        case types.SHOW_NEW_DEPARTMENT:
            return {...state,showHideNewDepartment:true}
        case types.HIDE_NEW_DEPARTMENT:
            return {...state,showHideNewDepartment:false}
        // USER
        case types.SHOW_EDIT_EMPLOYEE:
            return {...state,showHideEditEmployee:true}
        case types.HIDE_EDIT_EMPLOYEE:
            return {...state,showHideEditEmployee:false}
        case types.SHOW_NEW_EMPLOYEE:
            return {...state,showHideNewEmployee:true}
        case types.HIDE_NEW_EMPLOYEE:
            return {...state,showHideNewEmployee:false}

        // ROLE
        case types.SHOW_EDIT_ROLE:
            return {...state,showHideEditRole:true}
        case types.HIDE_EDIT_ROLE:
            return {...state,showHideEditRole:false}
        case types.SHOW_NEW_ROLE:
            return {...state,showHideNewRole:true}
        case types.HIDE_NEW_ROLE:
            return {...state,showHideNewRole:false}
        default:
            return state
    }
}
export default showHideReducer;