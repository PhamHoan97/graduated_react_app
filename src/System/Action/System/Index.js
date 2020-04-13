import {PASS_COMPANY_ID_TO_MODAL} from '../../Constants/System/ActionTypes';
export const passCompanyIdToModal = (idCompany)=>{
    return {
        type: PASS_COMPANY_ID_TO_MODAL,
        idCompany
    }
}