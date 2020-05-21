import {
    UPDATE_ID_FIELD_SELECT, 
    EXPORT_BPMN_FILE
} from '../Constants/ActionTypes';

export const updateIdFieldSelect= (idField)=>{
    return {
        type: UPDATE_ID_FIELD_SELECT,
        idField,
    }
}

export const exportBpmnFile= ()=>{
    return {
        type: EXPORT_BPMN_FILE,
    }
}