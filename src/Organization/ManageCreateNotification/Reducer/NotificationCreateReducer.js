import * as types from '../Constants/ActionTypes'
var initialState = {
    idNotificationChoose:0,
}
function notificationCreateReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_ID_NOTIFICATION_CHOOSE:
            return {...state, idNotificationChoose:action.idNotificationChoose}
        default:
            return state
    }
}
export default  notificationCreateReducer;