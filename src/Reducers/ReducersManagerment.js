import { combineReducers } from "redux";
import systemReducers from '../System/Reducers/Index';
import registerReducers from '../Register/Reducers/RegisterReducers';
const appReducers = combineReducers({
    systemReducers,
    registerReducers

})
export default appReducers;