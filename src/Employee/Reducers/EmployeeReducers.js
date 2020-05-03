import * as types from '../Constants/ActionTypes';

const initState = {
    reloadPage: false,
}

var employeeReducers = (state = initState, action) => {
    switch (action.type) {
        case types.RELOAD_EMPLOYEE_PAGE:
            return {...state, reloadPage:true};
        default:
            return state;
    }
}

export default employeeReducers;