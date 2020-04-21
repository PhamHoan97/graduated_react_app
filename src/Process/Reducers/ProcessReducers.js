import { combineReducers } from "redux";
import popupReduders from './Popup/PopupReducers';
import elementReducers from './Element/ElementReducers';
import actionReducers from './Modeler/ActionReducers';

const ProcessReducers = combineReducers({
    popupReduders,
    elementReducers,
    actionReducers,
})
export default ProcessReducers;