import * as types from '../Constants/ActionTypes';

var initialState = {
    idField: '',
}

function fieldIdSelectReducers(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_ID_FIELD_SELECT:
            return {...state, idField: action.idField}
        default:
            return state;
    }
}

export default fieldIdSelectReducers;