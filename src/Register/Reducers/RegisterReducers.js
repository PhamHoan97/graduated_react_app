import {UPDATE_COMPANY_REGISTER_IN_STORE, DELETE_COMPANY_REGISTER_IN_STORE} from '../Constants/ActionTypes';

const initState = {
    companyRegister: ''
}

var registerReducers = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_COMPANY_REGISTER_IN_STORE:
            var company = action.company;
            return {...state,companyRegister:company};
        case DELETE_COMPANY_REGISTER_IN_STORE:
            return {...state,companyRegister:''};
        default:
            return state;
    }
}

export default registerReducers;