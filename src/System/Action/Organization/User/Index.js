import * as types from '../../../Constants/Orgranization/ActionTypes'

export const getDetailEmloyee = (detailEmployee)=>{
    return {
        type:types.DETAIL_EMPLOYEE,
        detailEmployee
    }
}

export const showEditEmployee = ()=>{
    return {
        type:types.SHOW_EDIT_EMPLOYEE,
    }
}

export const hideEditEmployee = ()=>{
    return {
        type:types.HIDE_EDIT_EMPLOYEE,
    }
}

export const showNewEmployee = ()=>{
    return {
        type:types.SHOW_NEW_EMPLOYEE,
    }
}

export const hideNewEmployee = ()=>{
    return {
        type:types.HIDE_NEW_EMPLOYEE,
    }
}