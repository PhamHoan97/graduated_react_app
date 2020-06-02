import * as types from '../../Constants/ActionTypes';

const initialState = {
    elements:[],
    current: "",
    notes: [],
    comments:[],
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
                var element = {
                    id: action.element.id,
                    type:action.element.type,
                    note: "",
                    comments: [],
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
            }else{
                //push new note
                state.notes.push({id:state.current.id, note: action.note});
            }
            return {...state, elements: updateNoteElements};
        case types.DELETE_NOTE_FOR_ELEMENT:
            var deleteNoteElements = [];
            //delete note
            for (var p of state.elements) {
                if(state.current.id === p.id){
                    p.note = "";
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
            return {...state, elements: deleteNoteElements, notes:state.notes};
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
            for (var indexH = 0; indexH < state.elements.length; indexH++) {
                if(state.current.id === state.elements[indexH].id){
                    deleteIndexElement = indexH;
                    break;
                }
            }
            state.elements.splice(deleteIndexElement,1);
            state.current = "";

            return state;
        case types.HANDLE_UNDO_AFTER_DELETE_ELEMENT:
            var deletedElement = action.element;
            var undoElement = {
                id: deletedElement.id,
                type: deletedElement.type,
                note: "",
                comments:[]
            }
            //undo note
            for (var indexM = 0; indexM < state.notes.length; indexM++) {
                if(state.notes[indexM].id === undoElement.id){
                    undoElement.note = state.notes[indexM].note;
                }
            }
            //undo comments
            for (var indexN = 0; indexN < state.comments.length; indexN++) {
                if(state.comments[indexN].id === undoElement.id){
                    undoElement.comments = state.comments[indexN].comments;
                }
            }

            state.elements.push(undoElement);
            return state;
        case types.EXTRACTDATAELEMENTWHENEDIT:
            return {...state, elements: action.elements, notes: action.notes, comments: action.comments, current: ''};
        default:
            return state;
    }
}

export default elementReducers;