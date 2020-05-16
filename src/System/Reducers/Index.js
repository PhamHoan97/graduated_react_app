import { combineReducers } from "redux";

import manageSystemReducer from './System/ManagementSystemReducer';
import dashboardReducer from './Dashboard/DashboardReducer';
const systemReducers = combineReducers({
    manageSystemReducer,
    dashboardReducer,
})
export default systemReducers;