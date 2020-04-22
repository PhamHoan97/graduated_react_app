import * as types from '../../../Constants/Dashboard/ActionType'
export const getTextSearchProcess = (textSearch) =>{
    return {
        type:types.TEXT_SEARCH_PROCESS,
        textSearch
    }
}