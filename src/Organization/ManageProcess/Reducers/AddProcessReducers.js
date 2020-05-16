import { combineReducers } from "redux";
import changeDepartmentToAssignReducer from './ChangeDeparmentToAssignReducer';
import changeDepartmentSearchReducer from './ChangeDepartmentSearchReducer';
import informationProcessReducer from './InformationProcessReducer';

const addProcessReducers = combineReducers({
    changeDepartmentToAssignReducer,
    changeDepartmentSearchReducer,
    informationProcessReducer,
})
export default addProcessReducers;