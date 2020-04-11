import { combineReducers } from "redux";
import systemReducers from '../System/Reducers/Index';
const appReducers = combineReducers({
    systemReducers
})
export default appReducers;