import * as types from '../../Constants/ActionTypes';

const initialState = {
    status: false,
}

var popupReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.PASS_POPUP_STATUS:
            return {...state, status: action.statusPopup}  
        default:
            return state;
    }
}

export default popupReducers;