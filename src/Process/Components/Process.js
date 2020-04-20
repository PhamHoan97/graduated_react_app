import React, { Component } from 'react';
import '../Css/Process.css';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import minimapModule from 'diagram-js-minimap';
import '../Css/Minimap.css';
import Action from './Action';
import {connect} from 'react-redux';
import * as actions from '../Actions/Index';

class Process extends Component {
    constructor(props) {
        super(props);

        this.modeler = new BpmnModeler(
          {
            keyboard: {
              bindTo: window,
            },
            additionalModules: [
              minimapModule
            ]
          }
        );

        this.initialDiagram = 
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                          'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                          'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
                          'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
                          'targetNamespace="http://bpmn.io/schema/bpmn" ' +
                          'id="Definitions_1">' +
          '<bpmn:process id="Process_1" isExecutable="false">' +
  
          '</bpmn:process>' +
          '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
            '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
              '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
                '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
              '</bpmndi:BPMNShape>' +
            '</bpmndi:BPMNPlane>' +
          '</bpmndi:BPMNDiagram>' +
        '</bpmn:definitions>';

        this.state = {
                 
        }
    }
    
    interactPopup = (event) => {
      var element = event.element;
      if(element.type !== "bpmn:Process"){
        this.props.passPopupStatus(true);
        this.props.updateDataOfElement(element);
      }  
    }

    componentDidMount (){
        this.modeler.attachTo('#create-process-diagram');
        this.modeler.importXML(this.initialDiagram, function(err) {

        });
        // var eventBus = this.modeler.get('eventBus');
        // this.modeler.on('element.changed', function(event) {
        //     var element = event.element;
        //     console.log(element);
        // });

        this.modeler.on('element.click',2000, (e) => this.interactPopup(e));
    }

    render() {
        return (
            <div className="process-interact-area">
                <div id="create-process-diagram" className="process-interact"></div>
                <Action modeler={this.modeler}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      statusPopup: state.processReducers.popupReduders.status,
      elements: state.processReducers.elementReducers.elements,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      passPopupStatus: (status) => {
          dispatch(actions.passPopupStatus(status));
      },
      updateDataOfElement: (element) => {
        dispatch(actions.updateDataOfElements(element));
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Process);
