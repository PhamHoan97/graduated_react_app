import { combineReducers } from "redux";
import registrationReducer from './Registration/RegistrationReducer';
import changeDepartmentSearchReducer from './Process/ChangeDepartmentSearchReducer';
import changeDepartmentToAssignReducer from './Process/ChangeDeparmentToAssignReducer';
import informationProcessReducer from './Process/InformationProcessReducer';
const manageSystemReducer = combineReducers({
    registrationReducer,
    changeDepartmentSearchReducer,
    changeDepartmentToAssignReducer,
    informationProcessReducer
})
export default manageSystemReducer;