import { combineReducers } from "redux";

import departmentOrganizationReducer from '../ManageDepartment/Reducer/DepartmentOrganizationReducer';
import companyOrganizationReducer from '../ManageCompany/Reducer/CompanyOragnizationReducer';
import roleOrganizationReducer from '../ManageRole/Reducer/RoleOrganizationReducer';
import employeeOrganizationReducer from '../ManageEmployee/Reducer/EmployeeOrganizationReducer';
import notificationCompanyReducer from '../ManageNotificationCompany/Reducer/NotificationCompanyReducer';
import notificationCreateReducer from '../ManageCreateNotification/Reducer/NotificationCreateReducer';

const organizationReducers = combineReducers({
    companyOrganizationReducer,
    departmentOrganizationReducer,
    roleOrganizationReducer,
    employeeOrganizationReducer,
    notificationCompanyReducer,
    notificationCreateReducer
})
export default organizationReducers;