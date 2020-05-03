import { combineReducers } from "redux";

import organizationReducer from './Organization/OrganizationReducer';
import manageSystemReducer from './System/ManagementSystemReducer';
import dashboardReducer from './Dashboard/DashboardReducer';
import notificationReducer from './Notification/NotificationReducer';
const systemReducers = combineReducers({
    organizationReducer,
    manageSystemReducer,
    dashboardReducer,
    notificationReducer
})
export default systemReducers;