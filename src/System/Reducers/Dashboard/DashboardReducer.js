import { combineReducers } from "redux";
import companyReducer from './Company/CompanyReducer'
import processReducer from './Process/ProcessReducer';
const dashboardReducer = combineReducers({
    companyReducer,
    processReducer
})
export default dashboardReducer;