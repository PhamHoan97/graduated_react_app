import React, { Component } from 'react';
import '../../Css/Process.css';
import {connect} from 'react-redux';

class ViewNote extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentElement: "",
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
            });
        }else{
            this.setState({
                currentElement: nextProps.currentElement,
            });
        }
    }

    render() {
        return (
            <section className="note-element">
                <h4 className="note-title"> {this.convertTitleOfElement(this.state.currentElement)}</h4>
                <div className="note-content form-group">
                    <form>
                        <div className="note-content-textarea">
                            {this.state.currentElement.note}
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentElement: state.processReducers.elementReducers.current,
    }
}

export default connect(mapStateToProps)(ViewNote);
