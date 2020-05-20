import * as types from '../Constants/ActionTypes';

const initState = {
    reloadPage: false,
    employee: '',
    detailNotificationSystemEmployee:[]
}

var employeeReducers = (state = initState, action) => {
    switch (action.type) {
        case types.RELOAD_EMPLOYEE_PAGE:
            return {...state, reloadPage:true};
        case types.UPDATE_EMPLOYEE_INFORMATION:
            return {...state, employee : action.employee};
        case types.GET_DETAIL_NOTIFICATION__SYSTEM_EMPLOYEE:
            return {...state, detailNotificationSystemEmployee:action.detailNotificationSystemEmployee}    
        default:
            return state;
    }
}

export default employeeReducers;