import { combineReducers } from "redux";
import organizationReducer from './Organization/OrganizationReducer';
import manageSystemReducer from './System/ManagementSystemReducer';
const systemReducers = combineReducers({
    organizationReducer,
    manageSystemReducer,
})
export default systemReducers;