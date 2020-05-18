import { combineReducers } from "redux";

import manageSystemReducer from './System/ManagementSystemReducer';
import dashboardReducer from './Dashboard/DashboardReducer';
import notificationReducer from './Notification/NotificationReducer';
const systemReducers = combineReducers({
    manageSystemReducer,
    dashboardReducer,
    notificationReducer
})
export default systemReducers;