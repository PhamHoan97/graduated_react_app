import * as types from '../../../Constants/Dashboard/ActionType'

export const listFieldCompany = (field) =>{
    return {
        type:types.LIST_FIELD_COMPANY,
        field
    }
}