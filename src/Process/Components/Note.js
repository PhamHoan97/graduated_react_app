import React, { Component } from 'react';
import '../Css/Process.css';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import {isEmpty} from 'validator';
import * as actions from '../Actions/Index';

class Note extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentElement: "",
            note: "",
        }
    }

    convertTitleOfElement(element){
        var result;
        switch (element.type) {
            case "bpmn:StartEvent":
                result =  "StartEvent";
                break;
            case "bpmn:IntermediateThrowEvent":
                result =  "IntermediateThrowEvent";
                break;
            case "bpmn:EndEvent":
                result =  "EndEvent";
                break;
            case "bpmn:ExclusiveGateway":
                result =  "ExclusiveGateway";
                break;
            case "bpmn:Task":
                result =  "Task";
                break;  
            case "bpmn:SubProcess":
                result =  "SubProcess";
                break;  
            case "bpmn:DataObjectReference":
                result =  "DataObjectReference";
                break;  
            case "bpmn:DataStoreReference":
                result =  "DataStoreReference";
                break;   
            case "bpmn:Participant":
                result =  "Participant";
                break; 
            case "bpmn:Collaboration":
                result =  "Collaboration";
                break;                       
            default:
                break;
        }
        return result;
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        this.setState({
            currentElement: nextProps.currentElement,
        });
    }

    changeNoteContent = event => {
        this.setState({note:event.target.value});
    } 

    allowSaveNote = function() {
        if(!isEmpty(this.state.note)){
            return false;
        }
        return true;
    }
    
    saveNoteForElement = (event) => {
        event.preventDefault();
        this.props.saveNoteForElement(this.state.note);
    }
    
    render() {
        if(this.state.currentElement.id){
            return (
                <section className="note-element">
                    <h4 className="note-title"> {this.convertTitleOfElement(this.state.currentElement)}</h4>
                    <div className="note-content form-group">
                        <textarea onChange={this.changeNoteContent} className="note-content-textarea form-control" rows="12" 
                            id="note" placeholder="note for element">

                        </textarea>
                        <Button onClick={(e) => this.saveNoteForElement(e)} disabled={this.allowSaveNote()} variant="primary" className="save-note-button">Save</Button>
                    </div>
                </section>
            )
        }else{
            return (
                <section className="note-element">
                    <h4 className="note-title"> New Diagram</h4>
                    <div className="note-content form-group">
                        <textarea className="note-content-textarea form-control" rows="12" id="note" placeholder="Note for element"></textarea>
                        <Button disabled={true} variant="primary" className="save-note-button">Save</Button>
                    </div>
                </section>
            )
        }
        
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentElement: state.processReducers.elementReducers.current,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveNoteForElement: (note) => {
            dispatch(actions.saveNoteForElement(note));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
