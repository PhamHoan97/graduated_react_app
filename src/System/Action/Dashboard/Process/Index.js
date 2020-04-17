import * as types from '../../../Constants/Dashboard/ActionType'
export const listProcessSearch = (textSearch) =>{
    return {
        type:types.LIST_PROCESS_SEARCH,
        textSearch
    }
}