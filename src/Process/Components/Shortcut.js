import React, { Component } from 'react';

class Shortcut extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className="shorcut-modal">
            <form
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
            >
                <div className="row form-group">
                    <div className="col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Undo
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> Ctrl + Z</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Redo
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> Ctrl + ⇧ + Z</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Select All	
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> Ctrl + A</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Scrolling (Vertical)	
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> Ctrl + Scrolling </p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Scrolling (Horizontal)	
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> Ctrl + ⇧ + Scrolling </p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Direct Editing	
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> E</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Hand Tool		
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> H</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Lasso Tool		
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> L</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Lasso Tool		
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> S</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Search BPMN Symbol	
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> Search BPMN Symbol</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Search BPMN Symbol		
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> A</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Search BPMN Symbol		
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> A</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col col-md-6">
                    <label
                        htmlFor="text-input"
                        className=" form-control-label"
                    >
                        Create Milestone			
                    </label>
                    </div>
                    <div className="col-md-6">
                        <p> ⇧ + M</p>
                        <small className="form-text text-muted">
                        </small>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}

export default Shortcut
