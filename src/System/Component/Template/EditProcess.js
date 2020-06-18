import React, { Component } from 'react';
import minimapModule from 'diagram-js-minimap';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import '../../Style/ProcessTemplate/Process.css';
import {connect} from 'react-redux';
import axios from 'axios';
import host from '../../../Host/ServerDomain';

class EditProcess extends Component {
    constructor(props) {
        super(props)

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

        this.initialDiagram =  '<?xml version="1.0" encoding="UTF-8"?>' +
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
        '</bpmn:definitions>';

        this.state = {
            
        }
    }

    saveDiagramOfProcessTemplate = (err, xmlRender, process) => {
        if(err){
            console.log(err);
        }
        else{
            var tokenData = localStorage.getItem('token');
            //edit
            var dataEdit = {
                id: process.id,
                name : process.name,
                description : process.description,
                xml :xmlRender,
            }

            axios.post(host + `/api/system/template/edit`,
            dataEdit,
            {
                headers: { 'Authorization': 'Bearer ' + tokenData}
            }).then(res => {
                if(res.data.error != null){
                    console.log(res.data.message);
                }else{
                    window.location.reload();
                }
            }).catch(function (error) {
                alert(error);
            });
        }
    }

    saveDiagram = (process) => {
        this.modeler.saveXML({ format: true }, (err,xmlRender) => this.saveDiagramOfProcessTemplate(err, xmlRender, process));
    }

    componentDidUpdate (){
        this.modeler.attachTo('#create-process-template-diagram');
        var modeler = this.modeler;
        modeler.importXML(this.initialDiagram, function(err) {
            var canvas = modeler.get('canvas');
            canvas.zoom('fit-viewport');
            var viewBox = canvas._cachedViewbox;
            if(viewBox){
                var currentScale = canvas._cachedViewbox.scale;
                currentScale -= 0.2;
                canvas.zoom(currentScale);
            }
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.isUpdate && nextProps.process){
            this.saveDiagram(nextProps.process);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.init && nextProps.init === this.initialDiagram){
            return false;
          }else{
            this.initialDiagram = nextProps.init;
          }
          return true;
    }

    render() {
        return (
            <div id="create-process-template-diagram" className="process-template-interact">

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        process: state.systemReducers.manageSystemReducer.templateReducers.process,
        isUpdate: state.systemReducers.manageSystemReducer.templateReducers.isUpdate,
    }
}

export default connect(mapStateToProps, )(EditProcess)
