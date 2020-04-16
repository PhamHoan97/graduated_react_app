import {PASS_DATA_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN} from '../../../Constants/System/ActionTypes';

const initialState = {
    idCompany: '',
    clickCreate: 0
}

var idCompanyReducers = (state = initialState, action) => {
    switch (action.type) {
        case PASS_DATA_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN:
            return {...state, idCompany:action.idCompany, clickCreate: action.clickCreate}  

        default:
            return state;
    }
}

export default idCompanyReducers;