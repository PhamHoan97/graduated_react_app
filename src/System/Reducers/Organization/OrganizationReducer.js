import { combineReducers } from "redux";
import departmentReducer from './ManageDepartment/DeparmentReducer'
import showHideReducer from './ShowHideEditReducer';
import employeeReducer from './ManageUser/UserReducer';
import roleReducer from './ManageRole/RoleReducer';
const organizationReducer = combineReducers({
    departmentReducer,
    employeeReducer,
    roleReducer,
    showHideReducer
})
export default organizationReducer;