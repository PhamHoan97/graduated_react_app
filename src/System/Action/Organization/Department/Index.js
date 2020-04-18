import * as types from '../../../Constants/Orgranization/ActionTypes'

export const getDetailDepartment = (detailDepartment)=>{
    return {
        type:types.DETAIL_DEPARTMENT,
        detailDepartment
    }
}

export const showEditDepartment = ()=>{
    return {
        type:types.SHOW_EDIT_DEPARTMENT,
    }
}

export const hideEditDepartment = (t)=>{
    return {
        type:types.HIDE_EDIT_DEPARTMENT,
    }
}

export const showNewDepartment = ()=>{
    return {
        type:types.SHOW_NEW_DEPARTMENT,
    }
}

export const hideNewDepartment = ()=>{
    return {
        type:types.HIDE_NEW_DEPARTMENT,
    }
}