import React, { Component } from 'react';
import '../../Css/Process.css';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import {isEmpty} from 'validator';
import * as actions from '../../Actions/Index';

class Note extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentElement: "",
            note: "",
            savedNote: false,
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
                result =  "New Diagram";
                break;
        }
        return result;
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if(nextProps.currentElement.note){
            this.setState({
                currentElement: nextProps.currentElement,
                savedNote:true
            });
        }else{
            this.setState({
                currentElement: nextProps.currentElement,
                savedNote:false,
                note: ""
            });
            if(document.getElementById("note-element")){
                document.getElementById("note-element").value = "";
            }
        }
    }

    changeNoteContent = event => {
        this.setState({note:event.target.value});
    } 

    allowSaveNote = function() {
        if((typeof this.state.currentElement.id === "undefined")){
            return true;
        }else if(isEmpty(this.state.note)){
            return true;
        }
        return false;
    }
    
    saveNoteForElement = (event) => {
        event.preventDefault();
        this.props.saveNoteForElement(this.state.note);
        this.setState({savedNote:true});
    }
    
    updateNoteForElement = (event) => {
        event.preventDefault();
        this.setState({savedNote:false});
    }

    deleteNoteForElement = (event) => {
        event.preventDefault();
        this.props.deleteNoteForElement();
        this.setState({savedNote:false});
    }

    render() {
        if(this.state.savedNote){
            return (
                <section className="note-element">
                    <h4 className="note-title"> {this.convertTitleOfElement(this.state.currentElement)}</h4>
                    <div className="note-content form-group">
                        <div className="note-content-show">
                            <p>{this.state.currentElement.note}</p>
                        </div>
                        <Button onClick={(e) => this.deleteNoteForElement(e)} variant="danger" className="delete-note-button">Xóa ghi chú</Button>
                        <Button onClick={(e) => this.updateNoteForElement(e)} variant="primary" className="save-note-button">Cập nhật</Button>
                    </div>
                </section>
            )
        }else{
            return (
                <section className="note-element">
                    <h4 className="note-title"> {this.convertTitleOfElement(this.state.currentElement)}</h4>
                    <div className="note-content form-group">
                        <form>
                            <textarea onChange={this.changeNoteContent} className="note-content-textarea form-control" rows="12" 
                                id="note-element" defaultValue={this.state.currentElement.note} placeholder="Ghi chú...">
                                            
                            </textarea>
                            <Button onClick={(e) => this.saveNoteForElement(e)} disabled={this.allowSaveNote()} variant="primary" className="save-note-button">Lưu ghi chú</Button>
                        </form>
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
        deleteNoteForElement: () => {
            dispatch(actions.deleteNoteForElement());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
