import * as types from '../../../Constants/Orgranization/ActionTypes'

export const addUser = (text)=>{
    return {
        type:types.ADD_USER,
        text
    }
}

export const detailUser = (idUser)=>{
    return {
        type:types.DETAIL_USER,
        idUser
    }
}

export const editUser = (idUser,text)=>{
    return {
        type:types.EDIT_USER,
        idUser,
        text
    }
}

export const deleteUser = (idUser,text)=>{
    return {
        type:types.DELETE_USER,
        idUser,
        text
    }
}

export const showEditUser = ()=>{
    return {
        type:types.SHOW_EDIT_USER,
    }
}

export const hideEditUser = (t)=>{
    return {
        type:types.HIDE_EDIT_USER,
    }
}

export const showNewUser = ()=>{
    return {
        type:types.SHOW_NEW_USER,
    }
}

export const hideNewUser = ()=>{
    return {
        type:types.HIDE_NEW_USER,
    }
}