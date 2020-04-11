import {UPDATE_COMPANY_REGISTER_IN_STORE, DELETE_COMPANY_REGISTER_IN_STORE} from '../Constants/ActionTypes';

export const updateCompanyInformationAfterRegisterInStore = (company)=>{
    return {
        type:UPDATE_COMPANY_REGISTER_IN_STORE,
        company
    }
}

export const deleteCompanyInformationAfterRegisterInStore = ()=>{
    return {
        type:DELETE_COMPANY_REGISTER_IN_STORE
    }
}
