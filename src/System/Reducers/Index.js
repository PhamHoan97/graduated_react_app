import { combineReducers } from "redux";
import organizationReducer from './Organization/OrganizationReducer'
import dashboardReducer from './Dashboard/DashboardReducer'
const systemReducers = combineReducers({
    organizationReducer,
    dashboardReducer
})
export default systemReducers;