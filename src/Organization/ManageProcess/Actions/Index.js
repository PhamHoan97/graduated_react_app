import {
    UPDATE_ID_DEPARTMENT_SEARCH, 
    UPDATE_ID_DEPARTMENT_ASSIGN, 
    UPDATE_PROCESS_INFORMATION,
    RESET_PROCESS_INFORMATION,
    UPDATE_ID_EMPLOYEE_SEARCH
} from '../Constants/ActionTypes';

export const updateIdDepartmentSearch = (idDepartment)=>{
    return {
        type: UPDATE_ID_DEPARTMENT_SEARCH,
        idDepartment,
    }
}

export const updateIdDepartmentAssign = (idDepartment)=>{
    return {
        type: UPDATE_ID_DEPARTMENT_ASSIGN,
        idDepartment,
    }
}

export const updateProcessInformation = (information)=>{
    return {
        type: UPDATE_PROCESS_INFORMATION,
        information,
    }
}

export const resetProcessInformation = ()=>{
    return {
        type: RESET_PROCESS_INFORMATION,
    }
}

export const updateIdEmployeeSearch = (idEmployee)=>{
    return {
        type: UPDATE_ID_EMPLOYEE_SEARCH,
        idEmployee,
    }
}