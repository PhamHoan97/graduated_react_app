import * as types from '../../../Constants/Orgranization/ActionTypes'

var initialState = {
    detailDepartment:[]
}

function departmentReducer(state = initialState, action) {
    switch (action.type) {
        case types.DETAIL_DEPARTMENT:
            var detailDepartment = action.detailDepartment;
            return {...state,detailDepartment:detailDepartment}
        default:
            return state
    }
}

export default departmentReducer;