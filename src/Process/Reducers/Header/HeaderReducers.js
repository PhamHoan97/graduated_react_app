import * as types from '../../Constants/ActionTypes';

const initialState = {
    isEdit: 0,
    importData: '',
}

var headerReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGEHEADERSTATUSTOEDIT:
            var m = state.isEdit + 1;
            return {...state, isEdit: m}; 
        case types.UPDATEIMPORTBPMNFILE:
            return {...state, importData: action.result}; 
        case types.RESETIMPORTBPMNFILE:
            return {...state, importData: ""};           
        default:
            return state;
    }
}

export default headerReducers;