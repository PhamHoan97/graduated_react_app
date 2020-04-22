import React, { Component } from 'react'
import Process from './Process';
import Note from './Note';
import Comment from './Comment';
import Header from './Header';
import '../../Css/Process.css';
import {connect} from 'react-redux';
import * as actions from '../../Actions/Index';

class EditProcess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openDetails: false,
            initDiagram:  '<?xml version="1.0" encoding="UTF-8"?>' +
            '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                              'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                              'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
                              'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
                              'targetNamespace="http://bpmn.io/schema/bpmn" ' +
                              'id="Definitions_1">' +
              '<bpmn:process id="Process_1" isExecutable="false">' +
                '<bpmn:startEvent id="StartEvent_1"/>' +
              '</bpmn:process>' +
              '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
                '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
                  '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
                    '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
                  '</bpmndi:BPMNShape>' +
                '</bpmndi:BPMNPlane>' +
              '</bpmndi:BPMNDiagram>' +
            '</bpmn:definitions>',     
        }
    }

    openPopUp = (event) => {
        event.preventDefault();
        this.setState({openDetails:true});
        this.props.passPopupStatus(true);
    }

    closePopup = (event) => {
        event.preventDefault();
        this.setState({openDetails:false});
        this.props.passPopupStatus(false);
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        this.setState({openDetails: nextProps.statusPopup});
        //get on database and set State for init;
    }

    render() {
        if(this.state.openDetails){
            return(
                <React.Fragment>
                    <div className="row">
                        <Header />
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Process init={this.state.initDiagram}/>
                        </div>
                        <div className="button-details-right-open">
                            <button onClick={(e) => this.closePopup(e)}>
                                <i className="fas fa-align-justify"></i> Details
                            </button>
                        </div>
                        <div className="right-column-popup">
                            <Note />
                            <Comment />
                        </div>
                    </div>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <div className="row">
                        <Header />
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Process init={this.state.initDiagram}/>
                        </div>
                        <div className="button-details-right-close">
                            <button onClick={(e) => this.openPopUp(e)}>
                                <i className="fas fa-align-justify"></i> Details
                            </button>
                        </div>
                    </div>
                </React.Fragment>
            )   
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        statusPopup: state.processReducers.popupReduders.status,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        passPopupStatus: (status) => {
            dispatch(actions.passPopupStatus(status));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProcess);
