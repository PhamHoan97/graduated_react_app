import React, { Component } from 'react';
import minimapModule from 'diagram-js-minimap';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import '../../Style/ProcessTemplate/Process.css';
import {connect} from 'react-redux';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import * as actions from '../../../Alert/Action/Index';

class Process extends Component {
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

        this.initialDiagram = 
        '<?xml version="1.0" encoding="UTF-8"?>' +
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
            isRedirectEdit: false,
            idProcess: '',
        }
    }

    saveDiagramOfProcessTemplate = (err, xmlRender, process) => {
        if(err){
            console.log(err);
        }
        else{
            var tokenData = localStorage.getItem('token');
            var dataNew = {
                name : process.name,
                description : process.description,
                field_id : process.field_id,
                xml :xmlRender,
            }

            axios.post(`http://127.0.0.1:8000/api/system/template/new`,
            dataNew,
            {
                headers: { 'Authorization': 'Bearer ' + tokenData}
            }).then(res => {
                if(res.data.error != null){
                    this.props.showAlert({
                        message: res.data.message,
                        anchorOrigin:{
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        title:'Thất bại',
                        severity:'error'
                    });
                }else{
                    this.props.showAlert({
                        message: res.data.message,
                        anchorOrigin:{
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        title:'Thành công',
                        severity:'success'
                      });
                    this.setState({isRedirectEdit: true, idProcess: res.data.process.id});
                }
            }).catch(function (error) {
                alert(error);
            });
        }
    }

    saveDiagram = (process) => {
        this.modeler.saveXML({ format: true }, (err,xmlRender) => this.saveDiagramOfProcessTemplate(err, xmlRender, process));
    }

    componentDidMount (){
        this.modeler.attachTo('#create-process-template-diagram');
        this.modeler.importXML(this.initialDiagram, function(err) {

        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.isSave && nextProps.process){
            this.saveDiagram(nextProps.process);
        }
    }

    render() {
        if(this.state.isRedirectEdit){
            return <Redirect to={'/system/edit/template/' + this.state.idProcess} />
        }
        return (
            <div id="create-process-template-diagram" className="process-template-interact">

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        process: state.systemReducers.manageSystemReducer.templateReducers.process,
        isSave: state.systemReducers.manageSystemReducer.templateReducers.isSave,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      showAlert: (properties) => {
        dispatch(actions.showMessageAlert(properties))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Process)
