import { combineReducers } from "redux";
import organizationReducer from './Organization/OrganizationReducer'
const systemReducers = combineReducers({
    organizationReducer
})
export default systemReducers;