import * as types from '../Constants/ActionTypes';

const initialState = {
    isExportBPMN: 0,
}

var exportBpmnFileReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.EXPORT_BPMN_FILE:
            var h = state.isExportBPMN + 1;
            return {...state, isExportBPMN : h};
        default:
            return state;
    }
}

export default exportBpmnFileReducers;