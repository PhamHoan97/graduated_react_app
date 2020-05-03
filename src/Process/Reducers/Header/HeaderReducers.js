import * as types from '../../Constants/ActionTypes';

const initialState = {
    isEdit: false,
}

var headerReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGEHEADERSTATUSTOEDIT:
            return {...state, isEdit: true};           
        default:
            return state;
    }
}

export default headerReducers;