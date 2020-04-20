import * as types from '../../Constants/ActionTypes';

const initialState = {
    elements:[],
    current: "",
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
                    comment: "",
                }
                oldelements.push(element);
                return {...state, elements: oldelements, current: element} 
            }else{
                //get element to update old element
                var currentElement = getCurrentElement(oldelements, action.element);
                return {...state, elements: oldelements,current: currentElement} 
            }
        case types.SAVE_NOTE_FOR_ELEMENT:
            var updateElements = [];
            //update notes
            for (var x of state.elements) {
                if(state.current.id === x.id){
                    x.note = action.note;
                }
                updateElements.push(x);
            }
            //update current element
            var newCurrentElement = state.current;
                newCurrentElement.note = action.note;
            return {...state, elements: updateElements, current: newCurrentElement};
        default:
            return state;
    }
}

export default elementReducers;