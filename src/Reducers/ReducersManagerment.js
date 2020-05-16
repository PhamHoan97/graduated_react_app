import { combineReducers } from "redux";
import systemReducers from '../System/Reducers/Index';
import registerReducers from '../Register/Reducers/RegisterReducers';
import processReducers from '../Process/Reducers/ProcessReducers';
import employeeReducers from '../EmployeeProcess/Reducers/EmployeeReducers';
import organizationReducers from '../Organization/Reducers/OragnizationReducers';
import addProcessReducers from '../Organization/ManageProcess/Reducers/AddProcessReducers'

const appReducers = combineReducers({
    systemReducers,
    registerReducers,
    processReducers,
    employeeReducers,
    organizationReducers,
    addProcessReducers
})
export default appReducers;