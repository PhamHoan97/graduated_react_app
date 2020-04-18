import React, { Component } from 'react'
import '../Css/Header.css';
import Shortcut from './Shortcut';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import ModalTitle from 'react-bootstrap/ModalTitle';

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenShortcut: false,
        }
    }

    openShortcutModal = event =>{
        this.setState({isOpenShortcut:true});
    }

    closeShortcutModal = event =>{
        this.setState({isOpenShortcut:false});
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
                                <div className="action-title-left">
                                    Save and share
                                </div>
                                <div className="action-ilustration">
                                    Save the diagram and share to employee
                                </div>
                            </a>
                            <a className="dropdown-item" href="/process/new">
                                <div className="action-title-left">
                                    Export as PNG
                                </div>
                                <div className="action-ilustration">
                                    Export the diagram as a PNG image
                                </div>
                            </a>
                            <a className="dropdown-item" href="/process/new">
                                <div className="action-title-left">
                                    Export as SVG
                                </div>
                                <div className="action-ilustration">
                                    Export the diagram as a SVG image
                                </div>
                            </a>
                            <a className="dropdown-item" href="/process/new">
                                <div className="action-title-left">
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
                            <button className="dropdown-item"  onClick={this.openShortcutModal}>
                                <div className="action-title">
                                    Keyboard Shortcuts
                                </div>
                            </button>
                            
                            <button className="dropdown-item">
                                <div className="action-title">
                                    User guide
                                </div>
                            </button>   
                        </div>
                     </div>
                </div>

                <Modal size="lg" show={this.state.isOpenShortcut} onHide={this.closeShortcutModal}>
                    <ModalHeader closeButton>
                        <ModalTitle>Keyboard Shortcuts</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Shortcut />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="info" onClick={this.closeShortcutModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Header
