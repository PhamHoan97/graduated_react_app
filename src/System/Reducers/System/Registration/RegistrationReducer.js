import {PASS_COMPANY_ID_TO_MODAL} from '../../../Constants/System/ActionTypes';

const initialState = {
    idCompany: '',
}

var idCompanyReducers = (state = initialState, action) => {
    switch (action.type) {
        case PASS_COMPANY_ID_TO_MODAL:
            return {...state, idCompany:action.idCompany}

        default:
            return state;
    }
}

export default idCompanyReducers;