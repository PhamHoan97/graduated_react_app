import {
    PASS_DATA_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN, 
    LOAD_TABLE_AFTER_REJECT, 
    UPDATE_ID_DEPARTMENT_SEARCH, 
    UPDATE_ID_DEPARTMENT_ASSIGN, 
    UPDATE_PROCESS_INFORMATION,
    RESET_PROCESS_INFORMATION
} from '../../Constants/System/ActionTypes';
export const passDataFromFormToModalInCreateAccountAdmin = (idCompany,clickCreate)=>{
    return {
        type: PASS_DATA_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN,
        idCompany,
        clickCreate
    }
}

export const loadTableAfterReject = (loadDataTable)=>{
    return {
        type: LOAD_TABLE_AFTER_REJECT,
        loadDataTable,
    }
}

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