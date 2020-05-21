import React, { Component } from 'react';
import '../../Css/Process.css';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import Action from './Action';
import {connect} from 'react-redux';
import * as actions from '../../Actions/Index';
import axios from 'axios';
import {Redirect } from 'react-router-dom';
import * as actionAlerts from  '../../../Alert/Action/Index';

class Process extends Component {
    constructor(props) {
        super(props);

        this.modeler = new BpmnModeler(
          {
            keyboard: {
              bindTo: window,
            },
            additionalModules: [
              
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
          reload: false,
          isSave: 0,
          isExportSVG: 0,
          isExportImage: 0,
          isExportBPMN: 0,
          redirectEdit: false,
          idEditProcess: ''
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

  saveDiagramExport = (err, xmlRender) =>{
    if(err){
        console.log(err);
    }
    else{
        var tokenData = localStorage.getItem('token');
        let data = new FormData();
        data.append('elements', JSON.stringify(this.props.elements));
        data.append('xml', xmlRender);
        data.append('information',  JSON.stringify(this.props.detail));
        data.append('token', tokenData);
        data.append('file',  this.props.detail.file);

        axios.post(`http://127.0.0.1:8000/api/company/process/new`,
        data,
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
              title:'Thành công',
              severity:'success'
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
            this.setState({redirectEdit:true, idEditProcess: res.data.process.id});
          }
        }).catch(function (error) {
          alert(error);
        });
    }
  }
    
  exportDiagram = () => {
    this.modeler.saveXML({ format: true }, (err,xmlRender) => this.saveDiagramExport(err, xmlRender));
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
        downloadLink.click();                                        
    });
    this.props.showAlert({
      message: "Tải thành công SVG",
      anchorOrigin:{
          vertical: 'top',
          horizontal: 'right'
      },
      title:'Thành công',
      severity:'success'
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
        downloadLink.click();                                        
    });
    this.props.showAlert({
      message: "Tải thành công BPMN",
      anchorOrigin:{
          vertical: 'top',
          horizontal: 'right'
      },
      title:'Thành công',
      severity:'success'
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
    this.props.showAlert({
      message: "Tải thành công ảnh",
      anchorOrigin:{
          vertical: 'top',
          horizontal: 'right'
      },
      title:'Thành công',
      severity:'success'
    });
  }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(!nextProps.isSave && !nextProps.isExportSVG && !nextProps.isExportImage && !nextProps.isExportBPMN){

        }else{
          if(nextProps.isSave && nextProps.isSave !== this.state.isSave){
            this.exportDiagram();
            this.setState({isSave: nextProps.isSave});
          }else if(nextProps.isExportImage && nextProps.isExportImage !== this.state.isExportImage){
            this.downloadAsImage();
            this.setState({isExportImage: nextProps.isExportImage});
          }else if(nextProps.isExportSVG && nextProps.isExportSVG !== this.state.isExportSVG){
            this.downloadAsSVG();
            this.setState({isExportSVG: nextProps.isExportSVG});
          }else if(nextProps.isExportBPMN && nextProps.isExportBPMN !== this.state.isExportBPMN){
            this.downloadAsBpmn();
            this.setState({isExportBPMN: nextProps.isExportBPMN});
          }
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
        if(this.state.redirectEdit){
          return <Redirect to={'/process/edit/' + this.state.idEditProcess}/> 
        }
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
      isSave: state.processReducers.actionReducers.isSave,
      isExportSVG: state.processReducers.actionReducers.isExportSVG,
      isExportImage: state.processReducers.actionReducers.isExportImage,
      isExportBPMN: state.processReducers.actionReducers.isExportBPMN,
      detail: state.addProcessReducers.informationProcessReducer.information,
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
      showAlert: (properties) => {
        dispatch(actionAlerts.showMessageAlert(properties))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Process);
