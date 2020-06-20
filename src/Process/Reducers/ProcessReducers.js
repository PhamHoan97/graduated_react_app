import { combineReducers } from "redux";
import popupReduders from './Popup/PopupReducers';
import elementReducers from './Element/ElementReducers';
import actionReducers from './Modeler/ActionReducers';
import headerReducers from './Header/HeaderReducers';
import assignReducers from './Element/AssignReducers';
import templateReducers from './Template/TemplateReducers';
import buttonReducers from './EditButton/ButtonReducers';

const ProcessReducers = combineReducers({
    popupReduders,
    elementReducers,
    actionReducers,
    headerReducers,
    assignReducers,
    templateReducers,
    buttonReducers,
})
export default ProcessReducers;