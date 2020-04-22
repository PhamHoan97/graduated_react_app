import React, { Component } from 'react';
import {connect} from 'react-redux';

class Action extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    } 
    
    fullScreen = (event) => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
            document.exitFullscreen(); 
            }
        }
    }
      
    zoomIn = (event) => {
        event.preventDefault();
        var canvas = this.props.modeler.get('canvas');
        var viewBox = canvas._cachedViewbox;
        if(viewBox){
            var currentScale = viewBox.scale;
            if(currentScale && currentScale < 1.5){
            currentScale += 0.1;
            canvas.zoom(currentScale);
            }
        }
    }

    zoomOut = (event) => {
        event.preventDefault();
        var canvas = this.props.modeler.get('canvas');
        var viewBox = canvas._cachedViewbox;
        if(viewBox){
            var currentScale = canvas._cachedViewbox.scale;
            if(currentScale && currentScale > 0.5){
            currentScale -= 0.1;
            canvas.zoom(currentScale);
            }
        }
    }

    toggleMiniMap = (event) => {
        event.preventDefault();
        var miniMap = this.props.modeler.get('minimap');
        console.log(miniMap);
        var state = miniMap._state.isOpen;
        if(!state){
            miniMap.open();
            if(this.props.statusPopup){
                document.getElementsByClassName("djs-minimap")[0].style.right  = "500px";
            }else{
                document.getElementsByClassName("djs-minimap")[0].style.right  = "100px";
            }
            document.getElementsByClassName("djs-minimap")[0].style.visibility  = "visible";
        }else{
            document.getElementsByClassName("djs-minimap")[0].style.visibility  = "hidden";
            miniMap.close();
        }
    }

    render() {
        if(this.props.statusPopup){
            return (
                <div className="btn-group button-zoom-action-open"> 
                    <button className="button-zoom-in" onClick={(e) => this.zoomIn(e)} title="Zoom in"><i className="fas fa-plus"></i></button>
                    <button className="button-zoom-out" onClick={(e) => this.zoomOut(e)} title="Zoom out"><i className="fas fa-minus"></i></button>
                    <button className="button-full-screen" onClick={(e) => this.fullScreen(e)} title="Full screen"><i className="fas fa-desktop"></i></button>
                    <button className="button-toggle-minimap" onClick={(e) => this.toggleMiniMap(e)} title="Toggle minimap"><i className="far fa-map"></i></button>
                  </div>
                )
        }else{
            return (
                <div className="btn-group button-zoom-action-close"> 
                    <button className="button-zoom-in" onClick={(e) => this.zoomIn(e)} title="Zoom in"><i className="fas fa-plus"></i></button>
                    <button className="button-zoom-out" onClick={(e) => this.zoomOut(e)} title="Zoom out"><i className="fas fa-minus"></i></button>
                    <button className="button-full-screen" onClick={(e) => this.fullScreen(e)} title="Full screen"><i className="fas fa-desktop"></i></button>
                    <button className="button-toggle-minimap" onClick={(e) => this.toggleMiniMap(e)} title="Toggle minimap"><i className="far fa-map"></i></button>
                  </div>
                )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        statusPopup: state.processReducers.popupReduders.status
    }
}

export default connect(mapStateToProps)(Action);
