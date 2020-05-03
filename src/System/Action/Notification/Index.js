import * as types from '../../Constants/Notification/ActionTypes'

export const getIdNotificationChoose = (idNotificationChoose) =>{
    return {
        type:types.GET_ID_NOTIFICATION_CHOOSE,
        idNotificationChoose
    }
}

export const getDetailNotificationAdmin = (detailNotificationAdmin) =>{
    return {
        type:types.GET_DETAIL_NOTIFICATION_ADMIN,
        detailNotificationAdmin
    }
}