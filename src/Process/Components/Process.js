import React, { Component } from 'react';
import '../Css/Process.css';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/diagram-js.css';

class Process extends Component {
    constructor(props) {
        super(props);

        this.modeler = new BpmnModeler(
          {
            keyboard: {
              bindTo: window
            },
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
            // '<bpmn:startEvent id="StartEvent_1"/>' +
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

    componentDidMount (){

        this.modeler.attachTo('#create-process-diagram');
        this.modeler.importXML(this.initialDiagram, function(err) {

        });

        this.modeler.on('element.changed', function(event) {
            var element = event.element;
            console.log(element);
            console.log(event);
        });
    }

    render() {
        return (
            <div className="process-interact-area">
                <div id="create-process-diagram" className="process-interact"></div>
            </div>
        )
    }
}

export default Process
