import * as types from '../../Constants/ActionTypes';

const initialState = {
    isSave: "",
    isExportSVG: "",
    isExportImage: "",
    isExportBPMN: "",
}

var actionReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_DIAGRAM:
            return {...state, isSave: true}; 
        case types.EXPORT_DIAGRAM_AS_SVG:
            return {...state, isExportSVG : true};
        case types.EXPORT_DIAGRAM_AS_IMAGE:
            return {...state, isExportImage : true};
        case types.EXPORT_DIAGRAM_AS_BPMN:
            return {...state, isExportBPMN : true};   
        case types.RESET_ACTION_STATES:
            return {...state, isSave : false, isExportSVG : false, isExportImage : false, isExportBPMN : false};           
        default:
            return state;
    }
}

export default actionReducers;