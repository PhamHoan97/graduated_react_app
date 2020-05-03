import { combineReducers } from "redux";
import systemReducers from '../System/Reducers/Index';
import registerReducers from '../Register/Reducers/RegisterReducers';
import processReducers from '../Process/Reducers/ProcessReducers';
import employeeReducers from '../Employee/Reducers/EmployeeReducers';

const appReducers = combineReducers({
    systemReducers,
    registerReducers,
    processReducers,
    employeeReducers
})
export default appReducers;