import * as types from '../../Constants/ActionTypes';

const initialState = {
    clickOpenModal: 1,
}

var buttonReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.CLICK_OPEN_MODAL_EDIT_PROCESS_INFO:
            var timeClick = state.clickOpenModal + 1;
            return {...state, clickOpenModal: timeClick};
        default:
            return state;
    }
}

export default buttonReducers;