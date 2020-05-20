import { combineReducers } from "redux";
import registrationReducer from './Registration/RegistrationReducer';
import templateReducers from './Template/TemplateReducers';

const manageSystemReducer = combineReducers({
    registrationReducer,
    templateReducers,
})
export default manageSystemReducer;