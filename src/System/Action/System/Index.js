import {
    PASS_DATA_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN, 
    LOAD_TABLE_AFTER_REJECT, 
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
