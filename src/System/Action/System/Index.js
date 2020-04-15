import {PASS_COMPANY_ID_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN} from '../../Constants/System/ActionTypes';
export const passCompanyIdFromFormToModalInCreateAccountAdmin = (idCompany)=>{
    return {
        type: PASS_COMPANY_ID_FROM_FORM_TO_MODAL_IN_CREATE_ACCOUNT_ADMIN,
        idCompany
    }
}