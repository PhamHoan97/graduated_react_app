import { combineReducers } from "redux";

import departmentOrganizationReducer from '../ManageDepartment/Reducer/DepartmentOrganizationReducer';
import roleOrganizationReducer from '../ManageRole/Reducer/RoleOrganizationReducer';
import employeeOrganizationReducer from '../ManageEmployee/Reducer/EmployeeOrganizationReducer';


const organizationReducers = combineReducers({
    departmentOrganizationReducer,
    roleOrganizationReducer,
    employeeOrganizationReducer
})
export default organizationReducers;