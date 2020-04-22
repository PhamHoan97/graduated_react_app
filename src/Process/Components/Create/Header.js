import React, { Component } from 'react'
import '../../Css/Header.css';
import Shortcut from './Shortcut';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import ModalTitle from 'react-bootstrap/ModalTitle';
import {connect} from 'react-redux';
import * as actions from '../../Actions/Index';
import Dropdown from 'react-bootstrap/Dropdown';


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

    saveDiagram = (e) => {
        e.preventDefault();
        this.props.saveDiagram()
    }

    exportAsSVG = (e) => {
        e.preventDefault();
        this.props.exportDiagramAsSVG();
    }

    exportAsImage = (e) => {
        e.preventDefault();
        this.props.exportDiagramAsImage();
    }

    exportAsBPMN = (e) => {
        e.preventDefault();
        this.props.exportDiagramAsBPMN();
    }

    render() {
        return (
            <div className="process-header">
                <div className="button-group-header btn-group">
                <Dropdown drop={"left"}>
                    <Dropdown.Toggle id="dropdown-action" variant="actions" bsPrefix="dropdown">
                        <div className="button-area">
                            <i className="fas fa-share-alt fa-sm icon"></i>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e)=> this.saveDiagram(e) }>
                            <div className="action-title-left">
                                Save and share
                            </div>
                            <div className="action-ilustration">
                                Save the diagram and share to employee
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e) => this.exportAsImage(e)}>
                            <div className="action-title-left">
                                Export as PNG
                            </div>
                            <div className="action-ilustration">
                                Export the diagram as a PNG image
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e) => this.exportAsSVG(e)}>
                            <div className="action-title-left">
                                Export as SVG
                            </div>
                            <div className="action-ilustration">
                                Export the diagram as a SVG image
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>this.exportAsBPMN(e)}>
                            <div className="action-title-left">
                                Export as BPMN 2.0 XML
                            </div>
                            <div className="action-ilustration">
                                Export the diagram in the BPMN 2.0 document format
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown drop={"left"}>
                    <Dropdown.Toggle id="dropdown-action" variant="guide" bsPrefix="dropdown">
                        <div className="button-area">
                            <i className="far fa-question-circle fa-sm icon"></i>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.openShortcutModal}>
                            <div className="action-title">
                                Keyboard Shortcuts
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div className="action-title">
                                User guide
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveDiagram: () => {
            dispatch(actions.saveDiagram())
        },
        exportDiagramAsSVG: () => {
            dispatch(actions.exportDiagramAsSVG())
        },
        exportDiagramAsImage: () => {
            dispatch(actions.exportDiagramAsImage())
        },
        exportDiagramAsBPMN: () => {
            dispatch(actions.exportDiagramAsBPMN())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);