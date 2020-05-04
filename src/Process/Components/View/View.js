import React, { Component } from 'react';
import '../../Css/Process.css';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import minimapModule from 'diagram-js-minimap';
import '../../Css/Minimap.css';
import ViewAction from './ViewAction';
import {connect} from 'react-redux';
import * as actions from '../../Actions/Index';

class View extends Component {
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
    
    this.initialDiagram ='';

    this.state = {
      reload: false,
      isExportSVG: 0,
      isExportImage: 0,
      isExportBPMN: 0,
    }
  }
    
  interactPopup = (event) => {
    var element = event.element;
    if(element.type !== "bpmn:Process"){
      this.props.passPopupStatus(true);
      this.props.updateDataOfElement(element);
    }  
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
      if(!nextProps.isExportSVG && !nextProps.isExportImage && !nextProps.isExportBPMN){

      }else{
       if(nextProps.isExportImage && nextProps.isExportImage !== this.state.isExportImage){
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

    shouldComponentUpdate(nextProps, nextState) {
      if(nextProps.init && nextProps.init === this.initialDiagram){
        return false;
      }else{
        this.initialDiagram = nextProps.init;
      }
      return true;
    }

    componentDidUpdate (){
        this.modeler.attachTo('#view-process-diagram');
        console.log(this.initialDiagram)
        this.modeler.importXML(this.initialDiagram, function(err) {

        });
        var eventBus = this.modeler.get('eventBus');
        console.log(eventBus);
        this.modeler.on('element.click',1000, (e) => this.interactPopup(e));

        var tool = document.getElementsByClassName("djs-palette")[0];
        tool.style.visibility  = "hidden"; 
    }

    render() {
        return (
            <div className="process-interact-area">
                <div id="view-process-diagram" className="process-view"></div>
                <ViewAction modeler={this.modeler}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      statusPopup: state.processReducers.popupReduders.status,
      elements: state.processReducers.elementReducers.elements,
      isExportSVG: state.processReducers.actionReducers.isExportSVG,
      isExportImage: state.processReducers.actionReducers.isExportImage,
      isExportBPMN: state.processReducers.actionReducers.isExportBPMN,
      detail: state.systemReducers.manageSystemReducer.informationProcessReducer.information,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
