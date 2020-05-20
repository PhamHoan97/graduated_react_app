import * as types from '../Constants/ActionTypes'

export const getIdNotificationChoose = (idNotificationChoose) =>{
    return {
        type:types.GET_ID_NOTIFICATION_CHOOSE,
        idNotificationChoose
    }
}