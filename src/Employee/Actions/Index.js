import * as types from '../Constants/ActionTypes';

export const reloadEmployeePage = ()=>{
    return {
        type:types.RELOAD_EMPLOYEE_PAGE
    }
}

export const updateEmployeeInformation = (employee)=>{
    return {
        type:types.UPDATE_EMPLOYEE_INFORMATION,
        employee
    }
}

