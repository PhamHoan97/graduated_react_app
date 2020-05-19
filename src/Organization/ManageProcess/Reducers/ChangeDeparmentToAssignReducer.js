import {UPDATE_ID_DEPARTMENT_ASSIGN} from '../Constants/ActionTypes';

const initialState = {
    idDepartment: '',
}

var changeDepartmentToAssignReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ID_DEPARTMENT_ASSIGN:
            return {...state, idDepartment:action.idDepartment}  
        default:
            return state;
    }
}

export default changeDepartmentToAssignReducer;