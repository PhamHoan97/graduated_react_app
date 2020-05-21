import { combineReducers } from "redux";
import systemReducers from '../System/Reducers/Index';
import registerReducers from '../Register/Reducers/RegisterReducers';
import processReducers from '../Process/Reducers/ProcessReducers';
import employeeReducers from '../EmployeeProcess/Reducers/EmployeeReducers';
import organizationReducers from '../Organization/Reducers/OragnizationReducers';
import addProcessReducers from '../Organization/ManageProcess/Reducers/AddProcessReducers'
import notificationAlertReducer from '../Alert/Reducers/AlertReduce';
import fieldIdSelectReducers from '../Organization/ManageDashboard/Reducers/FieldIdSelectReducers';
import exportBpmnFileReducers from '../Organization/ManageDashboard/Reducers/ExportBpmnFileReducers';

const appReducers = combineReducers({
    systemReducers,
    registerReducers,
    processReducers,
    employeeReducers,
    organizationReducers,
    addProcessReducers,
    notificationAlertReducer,
    fieldIdSelectReducers,
    exportBpmnFileReducers,
})
export default appReducers;