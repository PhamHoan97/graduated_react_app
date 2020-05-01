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

export const deleteNoteForElement = ()=>{
    return {
        type: types.DELETE_NOTE_FOR_ELEMENT,
    }
}

export const saveCommentForElement = (comment)=>{
    return {
        type: types.SAVE_COMMENT_FOR_ELEMENT,
        comment,
    }
}

export const deleteCommentOfElemment = (comment)=>{
    return {
        type: types.DELETE_COMMENT_OF_ELEMENT,
        comment,
    }
}

export const deleteElement = (element)=>{
    return {
        type: types.DELETE_ELEMENT,
        element,
    }
}

export const handleUndoAfterDeleteElement = (element)=>{
    return {
        type: types.HANDLE_UNDO_AFTER_DELETE_ELEMENT,
        element,
    }
}

export const saveDiagram = ()=> {
    return {
        type: types.SAVE_DIAGRAM,
    }
}

export const exportDiagramAsSVG =()=> {
    return {
        type: types.EXPORT_DIAGRAM_AS_SVG,
    }
}

export const exportDiagramAsImage =()=> {
    return {
        type: types.EXPORT_DIAGRAM_AS_IMAGE,
    }
}

export const exportDiagramAsBPMN =()=> {
    return {
        type: types.EXPORT_DIAGRAM_AS_BPMN,
    }
}

export const extractDataElementWhenEdit = (elements, notes, comments)=> {
    return {
        type: types.EXTRACTDATAELEMENTWHENEDIT,
        elements, notes, comments
    }
}

export const changeHeaderStatusToEdit = ()=> {
    return {
        type: types.CHANGEHEADERSTATUSTOEDIT,
    }
}

export const editDiagram = ()=> {
    return {
        type: types.EDIT_DIAGRAM,
    }
}
