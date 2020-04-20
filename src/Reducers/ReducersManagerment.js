import { combineReducers } from "redux";
import systemReducers from '../System/Reducers/Index';
import registerReducers from '../Register/Reducers/RegisterReducers';
import processReducers from '../Process/Reducers/ProcessReducers';
const appReducers = combineReducers({
    systemReducers,
    registerReducers,
    processReducers

})
export default appReducers;