import * as types from '../../Constants/Notification/ActionTypes'
var initialState = {
    idNotificationChoose:0,
    detailNotificationAdmin:[]
}
function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_ID_NOTIFICATION_CHOOSE:
            return {...state, idNotificationChoose:action.idNotificationChoose}
        case types.GET_DETAIL_NOTIFICATION_ADMIN:
            return {...state, detailNotificationAdmin:action.detailNotificationAdmin}
        default:
            return state
    }
}
export default notificationReducer;