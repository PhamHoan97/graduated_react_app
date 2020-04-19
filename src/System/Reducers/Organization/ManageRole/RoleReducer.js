import * as types from '../../../Constants/Orgranization/ActionTypes'

var initialState = {
    detailRole:[]
}

function roleReducer(state = initialState, action) {
    switch (action.type) {
        case types.DETAIL_ROLE:
            var detailRole = action.detailRole;
            return {...state,detailRole:detailRole}
        default:
            return state
    }
}

export default roleReducer;