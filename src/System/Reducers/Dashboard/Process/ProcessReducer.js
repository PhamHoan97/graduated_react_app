import * as types from '../../../Constants/Dashboard/ActionType'

var initialState = {
    textSearch:'all'
}
function processReducer(state = initialState, action) {
    switch (action.type) {
        case types.TEXT_SEARCH_PROCESS:
            return {...state, textSearch:action.textSearch}
        default:
            return state
    }
}
export default processReducer;