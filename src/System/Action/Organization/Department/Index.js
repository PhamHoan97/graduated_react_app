import * as types from '../../../Constants/Orgranization/ActionTypes'

export const addDepartment = (text)=>{
    return {
        type:types.ADD_DEPARMENT,
        text
    }
}

export const detailDepartment = (idDepartment)=>{
    return {
        type:types.DETAIL_DEPARMENT,
        idDepartment
    }
}

export const editDepartment = (idDepartment,text)=>{
    return {
        type:types.EDIT_DEPARMENT,
        idDepartment,
        text
    }
}

export const deleteDepartment = (idDepartment,text)=>{
    return {
        type:types.DELETE_DEPARMENT,
        idDepartment,
        text
    }
}

export const showEditDepartment = ()=>{
    return {
        type:types.SHOW_EDIT_DEPARMENT,
    }
}

export const hideEditDepartment = (t)=>{
    return {
        type:types.HIDE_EDIT_DEPARMENT,
    }
}

export const showNewDepartment = ()=>{
    return {
        type:types.SHOW_NEW_DEPARMENT,
    }
}

export const hideNewDepartment = ()=>{
    return {
        type:types.HIDE_NEW_DEPARMENT,
    }
}