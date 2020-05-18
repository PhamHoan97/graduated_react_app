import * as types from '../Constants/ActionTypes'
var initialState = {
    detailNotificationAdmin:[]
}
function notificationCompanyReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_DETAIL_NOTIFICATION_ADMIN:
            return {...state, detailNotificationAdmin:action.detailNotificationAdmin}
        default:
            return state
    }
}
export default notificationCompanyReducer;