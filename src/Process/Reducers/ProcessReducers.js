import { combineReducers } from "redux";
import popupReduders from './Popup/PopupReducers';
import elementReducers from './Element/ElementReducers';
import actionReducers from './Modeler/ActionReducers';
import headerReducers from './Header/HeaderReducers';

const ProcessReducers = combineReducers({
    popupReduders,
    elementReducers,
    actionReducers,
    headerReducers,
})
export default ProcessReducers;