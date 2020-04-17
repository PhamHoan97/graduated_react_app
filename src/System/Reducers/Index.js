import { combineReducers } from "redux";

import organizationReducer from './Organization/OrganizationReducer';
import manageSystemReducer from './System/ManagementSystemReducer';
import dashboardReducer from './Dashboard/DashboardReducer'
const systemReducers = combineReducers({
    organizationReducer,
    manageSystemReducer,
    dashboardReducer
})
export default systemReducers;