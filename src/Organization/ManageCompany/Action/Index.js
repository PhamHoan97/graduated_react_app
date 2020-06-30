import * as types from '../Constants/ActionTypes'

export const clickRedirectPageNode = (linkRedirectPage)=>{
    return {
        type:types.REDIRECT_PAGE_NODE,
        linkRedirectPage
    }
}

export const resetRedirectPageNode = ()=>{
    return {
        type:types.REST_REDIRECT_PAGE_NODE,
    }
}