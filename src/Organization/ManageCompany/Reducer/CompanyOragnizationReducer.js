import * as types from '../Constants/ActionTypes';

var initialState = {
    linkRedirectPage:''
}

function companyOrganizationReducer(state = initialState, action) {
    switch (action.type) {
        case types.REDIRECT_PAGE_NODE:
            var linkRedirectPage = action.linkRedirectPage;
            return {...state,linkRedirectPage:linkRedirectPage}
        case types.REST_REDIRECT_PAGE_NODE:
            return {...state,linkRedirectPage:''}
        default:
            return state
    }
}

export default companyOrganizationReducer;