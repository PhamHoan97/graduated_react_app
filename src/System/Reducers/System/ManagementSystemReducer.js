import { combineReducers } from "redux";
import registrationReducer from './Registration/RegistrationReducer';
import changeDepartmentSearchReducer from './Process/ChangeDepartmentSearchReducer';
import changeDepartmentToAssignReducer from './Process/ChangeDeparmentToAssignReducer'
const manageSystemReducer = combineReducers({
    registrationReducer,
    changeDepartmentSearchReducer,
    changeDepartmentToAssignReducer,
})
export default manageSystemReducer;