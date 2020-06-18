import * as types from '../../Constants/ActionTypes';

const initialState = {
    templates: [],
    editTemplates: [],
}

var templateReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_FILE_TEMPLATES_FOR_PROCESS:
            return {...state, templates: action.templates};
            case types.UPDATE_FILE_TEMPLATES_IN_EDIT_PROCESS:
                return {...state, editTemplates: action.templates};  
        default:
            return state;
    }
}

export default templateReducers;