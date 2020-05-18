import { combineReducers } from "redux";

import departmentOrganizationReducer from '../ManageDepartment/Reducer/DepartmentOrganizationReducer';
import roleOrganizationReducer from '../ManageRole/Reducer/RoleOrganizationReducer';
import employeeOrganizationReducer from '../ManageEmployee/Reducer/EmployeeOrganizationReducer';
import notificationCompanyReducer from '../ManageNotificationCompany/Reducer/NotificationCompanyReducer';


const organizationReducers = combineReducers({
    departmentOrganizationReducer,
    roleOrganizationReducer,
    employeeOrganizationReducer,
    notificationCompanyReducer
})
export default organizationReducers;