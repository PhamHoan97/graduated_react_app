import {
    UPDATE_PROCESS_TEMPLATE_INFORMATION_CREATE, 
    UPDATE_PROCESS_TEMPLATE_INFORMATION_UPDATE,
    UPDATE_FILE_BPMN_AFTER_IMPORT_FILE,
    RESET_STATUS_TEMPLATE,
} from '../../../Constants/System/ActionTypes';

const initialState = {
    process: '',
    isSave : false,
    isUpdate: false,
    template: '',
}

var templateReducers = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROCESS_TEMPLATE_INFORMATION_CREATE:
            return {...state, process : action.process, isSave: true};
        case UPDATE_PROCESS_TEMPLATE_INFORMATION_UPDATE:
            return {...state, process : action.process, isUpdate: true};  
        case UPDATE_FILE_BPMN_AFTER_IMPORT_FILE:
            return {...state, template : action.template};   
        case RESET_STATUS_TEMPLATE:
            return {...state, isSave : false, isUpdate: false};           
        default:
            return state;
    }
}

export default templateReducers;