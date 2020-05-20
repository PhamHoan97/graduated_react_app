import * as types from '../Constants/ActionTypes'

export const getDetailNotificationAdmin = (detailNotificationAdmin) =>{
    return {
        type:types.GET_DETAIL_NOTIFICATION_ADMIN,
        detailNotificationAdmin
    }
}