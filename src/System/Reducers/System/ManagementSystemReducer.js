import { combineReducers } from "redux";
import registrationReducer from './Registration/RegistrationReducer';
const manageSystemReducer = combineReducers({
    registrationReducer,
})
export default manageSystemReducer;