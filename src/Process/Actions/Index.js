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

export const saveNoteForElement = (note, assign, file)=>{
    return {
        type: types.SAVE_NOTE_FOR_ELEMENT,
        note, assign, file
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

export const extractDataElementWhenEdit = (elements, notes, comments, assigns, files, issavenotes, names)=> {
    return {
        type: types.EXTRACTDATAELEMENTWHENEDIT,
        elements, notes, comments, assigns, files, issavenotes, names
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

export const updateImportBpmnFile = (result)=> {
    return {
        type: types.UPDATEIMPORTBPMNFILE,
        result
    }
}

export const resetImportBpmnFile = ()=> {
    return {
        type: types.RESETIMPORTBPMNFILE,
    }
}

export const exportDiagramAsSVGEdit =()=> {
    return {
        type: types.EXPORT_DIAGRAM_AS_SVG_EDIT,
    }
}

export const exportDiagramAsImageEdit =()=> {
    return {
        type: types.EXPORT_DIAGRAM_AS_IMAGE_EDIT,
    }
}

export const exportDiagramAsBPMNEdit =()=> {
    return {
        type: types.EXPORT_DIAGRAM_AS_BPMN_EDIT,
    }
}

export const resetActionToDiagram =()=> {
    return {
        type: types.RESETACTIONTODIAGRAM,
    }
}

export const updateAssignedEmployeeElement = (assign)=> {
    return {
        type: types.UPDATEASSIGNEDEMPLOYEEFORELEMENT,
        assign
    }
}

export const resetAssignedEmployeeElement = ()=> {
    return {
        type: types.RESETASSIGNEDEMPLOYEEFORELEMENT,
    }
}

export const updateDefaultAssignedEmployeeElement = (assign)=> {
    return {
        type: types.UPDATEDEFAULTASSIGNEDEMPLOYEEFORELEMENT,
        assign
    }
}

export const resetDefaultAssignedEmployeeElement = ()=> {
    return {
        type: types.RESETDEFAULTASSIGNEDEMPLOYEEFORELEMENT,
    }
}

export const updateNameOfElement = (element, name)=> {
    return {
        type: types.UPDATENAMEOFELEMENT,
        element, name
    }
}

export const changeIsSaveNoteToFalse = (element)=> {
    return {
        type: types.CHANGEISSAVENOTETOFALSE,
        element
    }
}

