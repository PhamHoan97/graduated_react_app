import * as types from '../../../Constants/Dashboard/ActionType'

var initialState = {
    textSearch:''
}
function processReducer(state = initialState, action) {
    switch (action.type) {
        case types.LIST_FIELD_COMPANY:
            return {...state, textSearch:action.textSearch}
        default:
            return state
    }
}
export default processReducer;