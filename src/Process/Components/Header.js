import React, { Component } from 'react'
import '../Css/Header.css';

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className="process-header">
                <div className="button-group-header btn-group">
                    <div className="dropdown dropleft">
                        <button className="button-save-action" data-toggle="dropdown" title="Action">
                            <div className="button-area" style={{fontSize: "28px"}}>
                                <i className="fas fa-share-alt fa-sm icon"></i>
                            </div>
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/process/new">
                                <div className="action-title">
                                    Save and share
                                </div>
                                <div className="action-ilustration">
                                    Save the diagram and share to employee
                                </div>
                            </a>
                            <a className="dropdown-item" href="/process/new">
                                <div className="action-title">
                                    Export as PNG
                                </div>
                                <div className="action-ilustration">
                                    Export the diagram as a PNG image
                                </div>
                            </a>
                            <a className="dropdown-item" href="/process/new">
                                <div className="action-title">
                                        Export as SVG
                                    </div>
                                    <div className="action-ilustration">
                                        Export the diagram as a SVG image
                                    </div>
                            </a>
                            <a className="dropdown-item" href="/process/new">
                                <div className="action-title">
                                    Export as BPMN 2.0 XML
                                </div>
                                <div className="action-ilustration">
                                    Export the diagram in the BPMN 2.0 document format
                                </div>
                            </a>
                        </div>
                     </div>

                     <div className="dropdown dropleft">
                        <button className="button-support-action" data-toggle="dropdown" title="Help">
                            <div className="button-area" style={{fontSize: "28px"}}>
                                <i className="far fa-question-circle fa-sm icon"></i>
                            </div>
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/process/new">
                                <div className="action-title">
                                    Shortcuts
                                </div>
                            </a>
                            <a className="dropdown-item" href="/process/new">
                                <div className="action-title">
                                    Guide
                                </div>
                            </a>   
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}

export default Header
