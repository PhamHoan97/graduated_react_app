import {UPDATE_ID_DEPARTMENT_SEARCH} from '../Constants/ActionTypes';

const initialState = {
    idDepartment: '',
}

var changeDepartmentSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ID_DEPARTMENT_SEARCH:
            return {...state, idDepartment:action.idDepartment}  
        default:
            return state;
    }
}

export default changeDepartmentSearchReducer;