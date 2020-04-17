import * as types from '../../../Constants/Dashboard/ActionType'

var initialState = {
    field:''
}
function companyReducer(state = initialState, action) {
    switch (action.type) {
        case types.LIST_FIELD_COMPANY:
            return {...state, field:action.field}
        default:
            return state
    }
}
export default companyReducer;