import * as types from '../../Constants/Orgranization/ActionTypes';

var initialState = {
   showHideEditDepartment:false,
   showHideNewDepartment:false,
   showHideEditUser:false,
   showHideNewUser:false,
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
        case types.SHOW_EDIT_USER:
            return {...state,showHideEditUser:true}
        case types.HIDE_EDIT_USER:
            return {...state,showHideEditUser:false}
        case types.SHOW_NEW_USER:
            return {...state,showHideNewUser:true}
        case types.HIDE_NEW_USER:
            return {...state,showHideNewUser:false}
        default:
            return state
    }
}
export default showHideReducer;