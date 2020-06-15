import * as types from '../../Constants/ActionTypes';

const initialState = {
    assignElement: '',
    defaultSelect: '',
    count: 0,
}

var assignReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATEASSIGNEDEMPLOYEEFORELEMENT:
            return {...state, assignElement: action.assign};
        case types.UPDATEDEFAULTASSIGNEDEMPLOYEEFORELEMENT:
            var newCount = state.count + 1
            return {...state, defaultSelect: action.assign, count: newCount};    
        case types.RESETDEFAULTASSIGNEDEMPLOYEEFORELEMENT:
            return {...state, defaultSelect: ""};   
        default:
            return state;
    }
}

export default assignReducers;