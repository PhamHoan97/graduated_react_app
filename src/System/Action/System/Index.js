import {
    PASS_DATA_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN, 
    LOAD_TABLE_AFTER_REJECT, 
    UPDATE_PROCESS_TEMPLATE_INFORMATION_CREATE,
    UPDATE_PROCESS_TEMPLATE_INFORMATION_UPDATE,
    UPDATE_FILE_BPMN_AFTER_IMPORT_FILE,
    RESET_STATUS_TEMPLATE
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

export const updateProcessTemplateInformationCreate = (process)=>{
    return {
        type: UPDATE_PROCESS_TEMPLATE_INFORMATION_CREATE,
        process, 
    }
}

export const updateProcessTemplateInformationUpdate = (process)=>{
    return {
        type: UPDATE_PROCESS_TEMPLATE_INFORMATION_UPDATE,
        process, 
    }
}

export const updateProcessTemplateXmlAfterImportFile = (template)=>{
    return {
        type: UPDATE_FILE_BPMN_AFTER_IMPORT_FILE,
        template, 
    }
}

export const resetStatusTemplate = ()=>{
    return {
        type: RESET_STATUS_TEMPLATE,
    }
}
