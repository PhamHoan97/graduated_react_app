import {PASS_COMPANY_ID_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN} from '../../../Constants/System/ActionTypes';

const initialState = {
    idCompany: '',
}

var idCompanyReducers = (state = initialState, action) => {
    switch (action.type) {
        case PASS_COMPANY_ID_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN:
            return {...state, idCompany:action.idCompany}

        default:
            return state;
    }
}

export default idCompanyReducers;