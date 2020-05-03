import * as types from '../../Constants/ActionTypes';

const initialState = {
    isSave: 0,
    isExportSVG: 0,
    isExportImage: 0,
    isExportBPMN: 0,
    isEdit: 0,
}

var actionReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_DIAGRAM:
            var i = state.isSave + 1; 
            return {...state, isSave: i}; 
        case types.EXPORT_DIAGRAM_AS_SVG:
            var j = state.isExportSVG + 1;
            return {...state, isExportSVG : j};
        case types.EXPORT_DIAGRAM_AS_IMAGE:
            var k = state.isExportImage + 1;
            return {...state, isExportImage : k};
        case types.EXPORT_DIAGRAM_AS_BPMN:
            var h = state.isExportBPMN + 1;
            return {...state, isExportBPMN : h};
        case types.EDIT_DIAGRAM:
            var l = state.isEdit + 1; 
            return {...state, isEdit: l};                  
        default:
            return state;
    }
}

export default actionReducers;