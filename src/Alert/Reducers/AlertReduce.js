import * as types from '../Constants/ActionTypes';

const initState = {
    notification: {
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
        },
        isOpenAlert:false,
        severity:'',
        title:'',
        message: '',
    },
}

var notificationAlertReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SHOW_MESSAGE:
            return {...state,
                notification:{
                    ...state.notification,
                    isOpenAlert: true,
                    anchorOrigin: action.properties.anchorOrigin,
                    severity: action.properties.severity,
                    title: action.properties.title,
                    message: action.properties.message
                }};
        default:
            return state;
    }
}

export default notificationAlertReducer;