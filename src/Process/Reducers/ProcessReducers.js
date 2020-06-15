import { combineReducers } from "redux";
import popupReduders from './Popup/PopupReducers';
import elementReducers from './Element/ElementReducers';
import actionReducers from './Modeler/ActionReducers';
import headerReducers from './Header/HeaderReducers';
import assignReducers from './Element/AssignReducers';

const ProcessReducers = combineReducers({
    popupReduders,
    elementReducers,
    actionReducers,
    headerReducers,
    assignReducers,
})
export default ProcessReducers;