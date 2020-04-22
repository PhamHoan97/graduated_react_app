import * as types from '../../../Constants/Orgranization/ActionTypes'

export const getDetailRole = (detailRole)=>{
    return {
        type:types.DETAIL_ROLE,
        detailRole
    }
}

export const showEditRole = ()=>{
    return {
        type:types.SHOW_EDIT_ROLE,
    }
}

export const hideEditRole = ()=>{
    return {
        type:types.HIDE_EDIT_ROLE,
    }
}

export const showNewRole= ()=>{
    return {
        type:types.SHOW_NEW_ROLE,
    }
}

export const hideNewRole = ()=>{
    return {
        type:types.HIDE_NEW_ROLE,
    }
}