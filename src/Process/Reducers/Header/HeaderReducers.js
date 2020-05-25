import * as types from '../../Constants/ActionTypes';

const initialState = {
    isEdit: false,
    importData: '',
}

var headerReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGEHEADERSTATUSTOEDIT:
            return {...state, isEdit: true}; 
        case types.UPDATEIMPORTBPMNFILE:
            return {...state, importData: action.result};           
        default:
            return state;
    }
}

export default headerReducers;