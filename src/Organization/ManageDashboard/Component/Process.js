import React, { Component } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import minimapModule from 'diagram-js-minimap';
import '../Css/Process.css';
import {connect} from 'react-redux';

class Process extends Component {
    constructor(props) {
        super(props);

        this.modeler = new BpmnModeler(
            {
                keyboard: {
                    bindTo: window,
                },
                additionalModules: [
                    minimapModule,
                    {
                        contextPad: [ 'value', null ],
                        contextPadProvider: [ 'value', null ]
                    }
                ]
            }
        );

        this.initialDiagram ='';
        this.state = {
            isExportBPMN: 0, 
        }
    }

    downloadAsBpmn = () =>{
        this.modeler.saveXML({ format: true }, function (error, xml) {
            if (error) {
              return;
            } 
            var bpmnBlob = new Blob([xml], {
                type: 'xml'
            });
            var fileName = Math.random(36).toString().substring(7) + '.bpmn';
            var downloadLink = document.createElement('a');
            downloadLink.download = fileName;
            downloadLink.innerHTML = 'Get BPMN';
            downloadLink.href = window.URL.createObjectURL(bpmnBlob);
            downloadLink.click();                                          
        });
      }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.isExportBPMN && nextProps.isExportBPMN !== this.state.isExportBPMN){
            this.downloadAsBpmn();
            this.setState({isExportBPMN: nextProps.isExportBPMN});
        }
    }

    componentDidUpdate (){
        this.modeler.attachTo('#view-process-template-diagram');
        this.modeler.importXML(this.initialDiagram, function(err) {

        });
        // var eventBus = this.modeler.get('eventBus');
        // console.log(eventBus);
        var tool = document.getElementsByClassName("djs-palette")[0];
        tool.style.visibility  = "hidden"; 
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
            <div id="view-process-template-diagram" className="process-template-view">

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isExportBPMN: state.exportBpmnFileReducers.isExportBPMN,
    }
}

export default connect(mapStateToProps, )(Process)
