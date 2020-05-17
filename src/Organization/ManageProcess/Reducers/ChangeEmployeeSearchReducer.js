import {UPDATE_ID_EMPLOYEE_SEARCH} from '../Constants/ActionTypes';

const initialState = {
    idEmployee: '',
}

var changeEmployeeSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ID_EMPLOYEE_SEARCH:
            return {...state, idEmployee:action.idEmployee}  
        default:
            return state;
    }
}

export default changeEmployeeSearchReducer;