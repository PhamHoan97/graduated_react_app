import { combineReducers } from "redux";
import popupReduders from './Popup/PopupReducers';
import elementReducers from './Element/ElementReducers';
const ProcessReducers = combineReducers({
    popupReduders,
    elementReducers,
})
export default ProcessReducers;