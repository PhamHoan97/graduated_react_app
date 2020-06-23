import * as types from '../../Constants/ActionTypes';

const initialState = {
    elements:[],
    current: "",
    notes: [],
    assigns: [],
    files: [],
    comments:[],
    isSaveNotes: [],
    names: [],
}

function isExistElementInStore(elements, element) {
    for (var x of elements) {
        if(element.id === x.id){
            return true;
        }
    }
    return false;
};

function getCurrentElement(elements,element){
    for (var x of elements) {
        if(element.id === x.id){
            return x;
        }
    }
};

function getCurrentTime (){
    var date = new Date();
    var yyyy = date.getFullYear();
    var dd = date.getDate();
    var mm = (date.getMonth() + 1);
    if (dd < 10){
      dd = "0" + dd;
    }
    if (mm < 10){
      mm = "0" + mm;
    }
    var current = dd + "-" + mm + "-" + yyyy;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10){
      hours = "0" + hours;
    }
    if (minutes < 10){
      minutes = "0" + minutes;
    }
    if (seconds < 10){
      seconds = "0" + seconds;
    }
    return current + " " + hours + ":" + minutes + ":" + seconds;
}

var elementReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_AND_UPDATE_ELEMENTS:
            var oldelements = state.elements;
            if(!isExistElementInStore(oldelements, action.element)){
                //add new element
                var element;
                var nameElement;
                if(action.element.businessObject && action.element.businessObject.name){
                    nameElement = action.element.businessObject.name;
                }else{
                    if(action.element.type === "bpmn:StartEvent"){
                        nameElement = "Bắt đầu quy trình";
                    }
                    else if(action.element.type === "bpmn:EndEvent"){
                        nameElement = "Kết thúc quy trình";
                    }else {
                        nameElement = "";
                    }
                }
                element = {
                    id: action.element.id,
                    name: nameElement,
                    type: action.element.type,
                    note: "",
                    assign: "",
                    file: "", 
                    comments: [],
                    isSaveNote: false,
                }
                oldelements.push(element);
                return {...state, elements: oldelements, current: element} 
            }else{
                //get element to update old element
                var currentElement = getCurrentElement(oldelements, action.element);
                return {...state, elements: oldelements,current: currentElement} 
            }
        case types.SAVE_NOTE_FOR_ELEMENT:
            var updateNoteElements = [];
            //update note
            for (var x of state.elements) {
                if(state.current.id === x.id){
                    x.note = action.note;
                    if(action.assign){
                        x.assign = action.assign;
                    }
                    if(action.file.url){
                        x.file = action.file;
                    }
                    x.isSaveNote = true;
                }
                updateNoteElements.push(x);
            }
            //get index of notes if update note for element
            var mark;
            for (var index = 0; index < state.notes.length; index++) {
                if(state.notes[index].id === state.current.id){
                    mark = index;
                }
            }
            //update old note
            if(typeof mark !== "undefined"){
                state.notes[mark] = {id:state.current.id, note: action.note};
                if(action.assign){
                    state.assigns[mark] = {id:state.current.id, assign: action.assign};
                }
                if(action.file.url){
                    state.files[mark] = {id:state.current.id, file: action.file};
                }
                state.isSaveNotes[mark] = {id:state.current.id, isSaveNote: true};
            }else{
                //push new note
                state.notes.push({id:state.current.id, note: action.note});
                if(action.assign){
                    state.assigns.push({id:state.current.id, assign: action.assign});
                }
                if(action.file.url){
                    state.files.push({id:state.current.id, file: action.file});
                }
                state.isSaveNotes.push({id:state.current.id, isSaveNote: true});
            }
            return {...state, elements: updateNoteElements};
        case types.DELETE_NOTE_FOR_ELEMENT:
            var deleteNoteElements = [];
            //delete note
            for (var p of state.elements) {
                if(state.current.id === p.id){
                    p.note = "";
                    p.assign = "";
                    p.file = "";
                    p.isSaveNote = false;
                }
                deleteNoteElements.push(p);
            }
            //get index of notes if delete note of element
            var markDeleteNote;
            for (var indexP = 0; indexP < state.notes.length; indexP++) {
                if(state.notes[indexP].id === state.current.id){
                    markDeleteNote = indexP;
                }
            }
            //delete note in notes
            state.notes.splice(markDeleteNote,1);
            //get index of assigns if delete note of element
            var markDeleteAssign;
            for (var indexT = 0; indexT < state.assigns.length; indexT++) {
                if(state.assigns[indexT].id === state.current.id){
                    markDeleteAssign = indexT;
                }
            }
            //delete assign in assigns
            state.assigns.splice(markDeleteAssign,1);
            //get index of files if delete note of element
            var markDeleteFile;
            for (var indexL = 0; indexL < state.files.length; indexL++) {
                if(state.files[indexL].id === state.current.id){
                    markDeleteFile = indexL;
                }
            }
            //delete files in notes
            state.files.splice(markDeleteFile,1);
            //get index of isSaveNotes if delete note of element
            var markDeleteIsSaveNote;
            for (var indexX = 0; indexX < state.isSaveNotes.length; indexX++) {
                if(state.isSaveNotes[indexX].id === state.current.id){
                    markDeleteIsSaveNote = indexX;
                }
            }
            //delete isSaveNotes in notes
            state.isSaveNotes.splice(markDeleteIsSaveNote,1);

            return {...state, elements: deleteNoteElements, notes:state.notes, assigns:state.assigns, files:state.files, isSaveNotes: state.isSaveNotes};
        case types.SAVE_COMMENT_FOR_ELEMENT:
            var updateCommentElements = [];
            var dataComment= {
                time: getCurrentTime(),
                token: localStorage.getItem("token"),
                content: action.comment,
            }
            //add comment to comments in element
            for (var y of state.elements) {
                if(state.current.id === y.id){
                    y.comments.push(dataComment);
                }
                updateCommentElements.push(y);
            }
            //add comment to comments
            if(!state.comments.length){
                var subComment = [];
                subComment.push(dataComment);
                state.comments.push({id:state.current.id, comments:subComment});
            }else{
                var isExistCommentOfCurrentElement = false;
                for (var indexC = 0; indexC < state.comments.length; indexC++) {
                    if(state.current.id === state.comments[indexC].id){
                        if(!state.current.isSaved){
                            state.comments[indexC].comments.push(dataComment);
                        }
                        isExistCommentOfCurrentElement = true;
                    }
                }
                //add new element with comment Data
                if(!isExistCommentOfCurrentElement){
                    subComment = [];
                    subComment.push(dataComment);
                    state.comments.push({id:state.current.id, comments:subComment}); 
                }
            }
            return {...state, elements: updateCommentElements};
        case types.DELETE_COMMENT_OF_ELEMENT:
            var updateDeleteElements = [];
            var deleteComment = action.comment;
            //delete comment in elements
            for (var z of state.elements) {
                if(state.current.id === z.id){
                    var indexDelete;
                    for(var i=0; i < z.comments.length; i++){
                        if(z.comments[i].time === deleteComment.time){
                            indexDelete = i;
                        }
                    }
                    z.comments.splice(indexDelete,1);
                }
                updateDeleteElements.push(z);
            }

            //delete comment in comments
            for (var indexD = 0; indexD < state.comments.length; indexD++) {
                if(state.current.id === state.comments[indexD].id){
                    var indexF; 
                    for(var indexE = 0; indexE < state.comments[indexD].comments.length; indexE++){
                        if(state.comments[indexD].comments[indexE].time === deleteComment.time){
                            indexF = indexE;
                        }
                    }
                    state.comments[indexD].comments.splice(indexF,1);
                }
            }
            return {...state, elements: updateDeleteElements};
        case types.DELETE_ELEMENT:
            var deleteIndexElement;
            var newElementDelete = state.elements;
            for (var indexH = 0; indexH < state.elements.length; indexH++) {
                if(action.element.id === state.elements[indexH].id){
                    deleteIndexElement = indexH;
                    newElementDelete = state.elements;
                    newElementDelete.splice(deleteIndexElement,1);
                    state.current = "";
                    break;
                }
            }
            return {...state, elements: newElementDelete};
        case types.UPDATENAMEOFELEMENT:
            var updateElements = [];
            //update name in element
            var Op = 0;
            for (var jx of state.elements) {
                if(action.element.id === jx.id){
                    jx.name = action.name;
                    Op = 1;
                }
                updateElements.push(jx);
            }
            if(Op !== 1){
                //no element in store
                var oldelementsInUpdateName = state.elements;
                element = {
                    id: action.element.id,
                    name: action.name,
                    type: action.element.type,
                    note: "",
                    assign: "",
                    file: "",
                    comments: [],
                    isSaveNote: false,
                }
                if(!isExistElementInStore(oldelementsInUpdateName, element)){
                    oldelementsInUpdateName.push(element);
                }
                return {...state, elements: oldelementsInUpdateName}
            }
            //get index of names if update name for element
            var markName;
            for (var indexJ = 0; indexJ < state.names.length; indexJ++) {
                if(state.names[indexJ].id === action.element.id){
                    markName = indexJ;
                }
            }
             //update old name
            if(typeof markName !== "undefined"){
                state.names[markName] = {id:action.element.id, name: action.name};
            }else{
            //push new name
                state.names.push({id:action.element.id, name: action.name});
            }
            return {...state, elements: updateElements};
        case types.HANDLE_UNDO_AFTER_DELETE_ELEMENT:
            var deletedElement = action.element;
            var undoElement = {
                id: deletedElement.id,
                name: deletedElement.businessObject.name,
                type: deletedElement.type,
                note: "",
                assign: "",
                file: "",
                isSaveNote: true,
                comments:[]
            }
            //undo note
            for (var indexM = 0; indexM < state.notes.length; indexM++) {
                if(state.notes[indexM].id === undoElement.id){
                    undoElement.note = state.notes[indexM].note;
                }
            }
            //undo assign
            for (var indexO = 0; indexO < state.assigns.length; indexO++) {
                if(state.assigns[indexO].id === undoElement.id){
                    undoElement.assign = state.assigns[indexO].assign;
                }
            }
            //undo file
            for (var indexU = 0; indexU < state.files.length; indexU++) {
                if(state.files[indexU].id === undoElement.id){
                    undoElement.files = state.files[indexU].file;
                }
            }

            //undo comments
            for (var indexN = 0; indexN < state.comments.length; indexN++) {
                if(state.comments[indexN].id === undoElement.id){
                    undoElement.comments = state.comments[indexN].comments;
                }
            }

            var newElementUndo = state.elements;
                newElementUndo.push(undoElement);
            return {...state, elements: newElementUndo};
        case types.EXTRACTDATAELEMENTWHENEDIT:
            return {
                    ...state, 
                    elements: action.elements, 
                    notes: action.notes, 
                    comments: action.comments, 
                    assigns: action.assigns, 
                    files: action.files, 
                    isSaveNotes: action.issavenotes, 
                    names: action.names, 
                    current: ''
                };
        case types.CHANGEISSAVENOTETOFALSE:
            var updateElementsIsSaveNote = [];
            //update isSaveNote in element
            for (var jy of state.elements) {
                if(action.element.id === jy.id){
                    jy.isSaveNote = false;
                }
                updateElementsIsSaveNote.push(jy);
            }
            //update isSaveNote in current
            state.current.isSaveNote = false;
            return {...state, elements: updateElementsIsSaveNote};
        default:
            return state;
    }
}

export default elementReducers;