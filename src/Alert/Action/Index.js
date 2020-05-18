import * as types from '../Constants/ActionTypes';

export const showMessageAlert = (properties)=>{
    return {
        type:types.SHOW_MESSAGE,
        properties
    }
}

