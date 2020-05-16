import {UPDATE_PROCESS_INFORMATION,RESET_PROCESS_INFORMATION} from '../Constants/ActionTypes';

const initialState = {
    information: {},
}

var informationProcessReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROCESS_INFORMATION:
            return {...state, information:action.information}
        case RESET_PROCESS_INFORMATION:
            return {...state, information:{}}    
        default:
            return state;
    }
}

export default informationProcessReducer;