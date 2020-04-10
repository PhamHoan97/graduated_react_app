import { combineReducers } from "redux";
import organizationReducer from './Organization/OrganizationReducer'
const appReducers = combineReducers({
    organizationReducer
})
export default appReducers;