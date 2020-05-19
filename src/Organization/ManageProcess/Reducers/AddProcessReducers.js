import { combineReducers } from "redux";
import changeDepartmentToAssignReducer from './ChangeDeparmentToAssignReducer';
import changeDepartmentSearchReducer from './ChangeDepartmentSearchReducer';
import informationProcessReducer from './InformationProcessReducer';
import changeEmployeeSearchReducer from './ChangeEmployeeSearchReducer';

const addProcessReducers = combineReducers({
    changeDepartmentToAssignReducer,
    changeDepartmentSearchReducer,
    informationProcessReducer,
    changeEmployeeSearchReducer,
})
export default addProcessReducers;