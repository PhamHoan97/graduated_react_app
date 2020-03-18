import React,{ Component } from "react";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/diagram-js.css';

class Democreateprocess extends Component{

    constructor(){
        super();
        this.modeler = new BpmnModeler();
        this.generateId = 'createprocess';
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
    }

    render(){
        return (
            <div>
                <div id={this.generateId}></div>
                <button onClick={this.exportDiagram}>Export XML</button>
                <button onClick={this.downloadAsSVG}>Save SVG</button>
                <button onClick={this.downloadAsImage}>Save Image</button>
                <button onClick={this.downloadAsBpmn}>Download BPMN</button>
            </div>
        );
    }

    componentDidMount (){
        this.modeler.attachTo('#'+ this.generateId);
        this.modeler.importXML(this.initialDiagram, function(err) {

        });
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
                a.setAttribute('download', 'MY_COOL_IMAGE.png');
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
}

export default Democreateprocess;