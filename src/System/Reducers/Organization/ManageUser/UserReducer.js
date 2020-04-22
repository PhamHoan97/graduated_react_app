import * as types from '../../../Constants/Orgranization/ActionTypes'

var initialState = {
    detailEmployee:[]
}

function employeeReducer(state = initialState, action) {
    switch (action.type) {
        case types.DETAIL_EMPLOYEE:
            var detailEmployee = action.detailEmployee;
            return {...state,detailEmployee:detailEmployee}
        default:
            return state
    }
}

export default employeeReducer;