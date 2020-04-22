import React, { Component } from 'react';
import '../../Css/Process.css';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import minimapModule from 'diagram-js-minimap';
import '../../Css/Minimap.css';
import Action from './Action';
import {connect} from 'react-redux';
import * as actions from '../../Actions/Index';
import Detail from "../View/Detail";
import IsoRule from "../View/IsoRule";

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
        if(this.props.init){
          this.initialDiagram =this.props.init;
        }else{
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
        }

        this.state = {
          reload: false,
        }
    }
    
    interactPopup = (event) => {
      var element = event.element;
      if(element.type !== "bpmn:Process"){
        this.props.passPopupStatus(true);
        this.props.updateDataOfElement(element);
      }  
    }

    deleteElements = (event) =>{
      var element = event.element;
      if(element.type !== "bpmn:Process"){
        this.props.passPopupStatus(false);
        this.props.deleteElement(element);
      }  
    }

    handleUndoDeleteElement = (event) => {
      var element = event.context.shape;
      this.props.handleUndoAfterDeleteElement(element);
    }

    exportDiagram = () => {
      this.modeler.saveXML({ format: true }, function (err, xml) {
          if(err){
              console.log(err);
          }
          else{
              console.log(xml);
          }
      });
    }

  downloadAsSVG = () => {
    this.modeler.saveSVG({ format: true }, function (error, svg) {
        if (error) {
            return;
        }
        var svgBlob = new Blob([svg], {
            type: 'image/svg+xml'
        });
        var fileName = Math.random(36).toString().substring(7) + '.svg';
        var downloadLink = document.createElement('a');
        downloadLink.download = fileName;
        downloadLink.innerHTML = 'Get BPMN SVG';
        downloadLink.href = window.URL.createObjectURL(svgBlob);
        downloadLink.onclick = function (event) {
            document.body.removeChild(event.target);
        };
        downloadLink.style.visibility = 'hidden';
        document.body.appendChild(downloadLink);
        downloadLink.click();                                        
    });
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
        downloadLink.onclick = function (event) {
            document.body.removeChild(event.target);
        };
        downloadLink.style.visibility = 'hidden';
        document.body.appendChild(downloadLink);
        downloadLink.click();                                        
    });
  }

  downloadAsImage = () =>{
    this.modeler.saveSVG({ format: true }, function (error, svg) {
      if (error) {
        return;
      }
      function triggerDownload (imgURI) {
          var evt = new MouseEvent('click', {
            view: window,
            bubbles: false,
            cancelable: true
          });
        
          var a = document.createElement('a');
          var imageName = Math.random(36).toString().substring(7) + '.png';
          a.setAttribute('download', imageName);
          a.setAttribute('href', imgURI);
          a.setAttribute('target', '_blank');
        
          a.dispatchEvent(evt);
      }
      var canvas = document.createElement("CANVAS");
      var ctx = canvas.getContext('2d');
      ctx.canvas.width  = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      var DOMURL = window.URL || window.webkitURL || window;
    
      var img = new Image();
      var svgBlob = new Blob([svg], {type: 'image/svg+xml;charset=utf-8'});
      var url = DOMURL.createObjectURL(svgBlob);
    
      img.onload = function () {

        DOMURL.revokeObjectURL(url);
        ctx.drawImage(img, 0, 0);
        var imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
    
        triggerDownload(imgURI);
      };
    
      img.src = url;                                 
    });
  }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.isSave){
          this.exportDiagram();
        }else if(nextProps.isExportImage){
          this.downloadAsImage();
        }else if(nextProps.isExportSVG){
          this.downloadAsSVG();
        }else if(nextProps.isExportBPMN){
          this.downloadAsBpmn();
        }
    }

    componentDidMount (){
        this.modeler.attachTo('#create-process-diagram');
        this.modeler.importXML(this.initialDiagram, function(err) {

        });
        var eventBus = this.modeler.get('eventBus');
        console.log(eventBus);
        this.modeler.on('element.click',1000, (e) => this.interactPopup(e));

        this.modeler.on('shape.remove',1000, (e) => this.deleteElements(e));

        this.modeler.on('commandStack.shape.delete.revert', () => this.handleUndoDeleteElement());
    }

    render() {
        return (
            <div className="process-interact-area">
                <div id="create-process-diagram" className="process-interact"></div>
                <Action modeler={this.modeler}/>
                <div className="row footer-view-process">  
                    <div className="col-md-6">
                        <Detail />
                    </div>
                    <div className="col-md-3">
                      <IsoRule process={true} />
                    </div>
                </div>
                <div className="space-area"></div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      statusPopup: state.processReducers.popupReduders.status,
      elements: state.processReducers.elementReducers.elements,
      isSave: state.processReducers.actionReducers.isSave,
      isExportSVG: state.processReducers.actionReducers.isExportSVG,
      isExportImage: state.processReducers.actionReducers.isExportImage,
      isExportBPMN: state.processReducers.actionReducers.isExportBPMN,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      passPopupStatus: (status) => {
        dispatch(actions.passPopupStatus(status));
      },
      updateDataOfElement: (element) => {
        dispatch(actions.updateDataOfElements(element));
      },
      deleteElement: (element) => {
        dispatch(actions.deleteElement(element));
      },
      handleUndoAfterDeleteElement: (element) => {
        dispatch(actions.handleUndoAfterDeleteElement(element));
      },
      resetActionStatus: () => {
        dispatch(actions.resetActionStatus());
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Process);
