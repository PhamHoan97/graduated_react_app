import React, { Component } from 'react';
import '../../Css/Process.css';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import Action from '../Create/Action';
import {connect} from 'react-redux';
import * as actions from '../../Actions/Index';
import axios from 'axios';
import * as actionAlerts from  '../../../Alert/Action/Index';
import host from '../../../Host/ServerDomain';

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
        
        this.initialDiagram ='';

        this.state = {
          isExportSVGEdit: 0,
          isExportImageEdit: 0,
          isExportBPMNEdit: 0,
          isEdit: 0,
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

  editDiagramExport = (err, xmlRender) => {
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
        
        axios.post(host + `/api/company/process/edit`,
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
              setTimeout(function(){ 
                window.location.reload();
              }, 2000);
          }
        }).catch(function (error) {
          alert(error);
        });
    }
  }
    
  editDiagram = () => {
    this.modeler.saveXML({ format: true }, (err,xmlRender) => this.editDiagramExport(err, xmlRender));
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
    if(!nextProps.isEdit && !nextProps.isExportSVGEdit && !nextProps.isExportImageEdit && !nextProps.isExportBPMNEdit){

    }else{
      if(nextProps.isEdit && nextProps.isEdit !== this.state.isEdit){
        this.editDiagram();
        this.setState({isEdit: nextProps.isEdit});
      }else if(nextProps.isExportImageEdit && nextProps.isExportImageEdit !== this.state.isExportImageEdit){
        this.downloadAsImage();
        this.setState({isExportImageEdit: nextProps.isExportImageEdit});
      }else if(nextProps.isExportSVGEdit && nextProps.isExportSVGEdit !== this.state.isExportSVGEdit){
        this.downloadAsSVG();
        this.setState({isExportSVGEdit: nextProps.isExportSVGEdit});
      }else if(nextProps.isExportBPMNEdit && nextProps.isExportBPMNEdit !== this.state.isExportBPMNEdit){
        this.downloadAsBpmn();
        this.setState({isExportBPMNEdit: nextProps.isExportBPMNEdit});
      }
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

  componentDidUpdate(){
      this.modeler.attachTo('#create-process-diagram');
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
      // var eventBus = this.modeler.get('eventBus');
      // console.log(eventBus);
      this.modeler.on('element.click',1000, (e) => this.interactPopup(e));

      this.modeler.on('shape.remove',1000, (e) => this.deleteElements(e));

      this.modeler.on('commandStack.shape.delete.revert', () => this.handleUndoDeleteElement());
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
      isEdit: state.processReducers.actionReducers.isEdit,
      isExportSVGEdit: state.processReducers.actionReducers.isExportSVGEdit,
      isExportImageEdit: state.processReducers.actionReducers.isExportImageEdit,
      isExportBPMNEdit: state.processReducers.actionReducers.isExportBPMNEdit,
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
