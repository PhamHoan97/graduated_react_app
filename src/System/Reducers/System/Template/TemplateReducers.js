import {UPDATE_PROCESS_TEMPLATE_INFORMATION_CREATE, UPDATE_PROCESS_TEMPLATE_INFORMATION_UPDATE} from '../../../Constants/System/ActionTypes';

const initialState = {
    process: '',
    isSave : false,
    isUpdate: false,
}

var templateReducers = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROCESS_TEMPLATE_INFORMATION_CREATE:
            return {...state, process : action.process, isSave: true};
        case UPDATE_PROCESS_TEMPLATE_INFORMATION_UPDATE:
            return {...state, process : action.process, isUpdate: true};        
        default:
            return state;
    }
}

export default templateReducers;