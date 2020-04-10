import { combineReducers } from "redux";
import departmentReducer from './ManageDepartment/DeparmentReducer'
import showHideReducer from './ShowHideEditReducer';
import userReducer from './ManageUser/UserReducer';
const organizationReducer = combineReducers({
    departmentReducer,
    userReducer,
    showHideReducer
})
export default organizationReducer;