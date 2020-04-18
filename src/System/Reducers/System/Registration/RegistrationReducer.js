import {PASS_DATA_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN, LOAD_TABLE_AFTER_REJECT} from '../../../Constants/System/ActionTypes';

const initialState = {
    idCompany: '',
    clickCreate: 0,
    loadDataTable: false,
}

var idCompanyReducers = (state = initialState, action) => {
    switch (action.type) {
        case PASS_DATA_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN:
            return {...state, idCompany:action.idCompany, clickCreate: action.clickCreate}  
        case LOAD_TABLE_AFTER_REJECT:
            return {...state, loadDataTable: action.loadDataTable}  
        default:
            return state;
    }
}

export default idCompanyReducers;