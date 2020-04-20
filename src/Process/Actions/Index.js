import * as types from '../Constants/ActionTypes';

export const passPopupStatus = (statusPopup)=>{
    return {
        type: types.PASS_POPUP_STATUS,
        statusPopup,
    }
}

export const updateDataOfElements = (element)=>{
    return {
        type: types.ADD_AND_UPDATE_ELEMENTS,
        element,
    }
}

export const saveNoteForElement = (note)=>{
    return {
        type: types.SAVE_NOTE_FOR_ELEMENT,
        note,
    }
}