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
import {Redirect } from 'react-router-dom';
import * as alertActions from '../../../Alert/Action/Index';

class HeaderEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenShortcut: false,
            isEdit: '',
            isBackHomeEmployee: false,
        }
    }

    openShortcutModal = event =>{
        this.setState({isOpenShortcut:true});
    }

    closeShortcutModal = event =>{
        this.setState({isOpenShortcut:false});
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.isEdit){
            this.setState({isEdit:nextProps.isEdit});
        }
    }

    backToHomePage = (e) => {
        e.preventDefault();
        this.props.resetActionToDiagram();
        this.setState({isBackHomeEmployee:true});
    }

    render() {
        if(this.state.isBackHomeEmployee){
            return <Redirect to={'/employee/'}/> 
        }
        return (
            <div className="process-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10 text-left"> 
                            <Dropdown drop={"left"}>
                                <Dropdown.Toggle id="dropdown-action" variant="actions btn-info back-home-btn" bsPrefix="dropdown">
                                    <div className="button-area-go-back" onClick={(e) => this.backToHomePage(e)}>
                                        <span className="text-go-back"> Trang ch???</span>
                                    </div>
                                </Dropdown.Toggle>
                            </Dropdown>
                        </div>
                        <div className="col-md-2" style={{display: "flex"}}> 
                            <Dropdown drop={"left"}>
                                <Dropdown.Toggle id="dropdown-action" variant="actions" bsPrefix="dropdown">
                                    <div className="button-area">
                                        <i className="fas fa-share-alt fa-sm icon"></i>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={(e) => this.exportAsImage(e)}>
                                        <div className="action-title-left">
                                            Xu???t file PNG
                                        </div>
                                        <div className="action-ilustration">
                                            Xu???t quy tr??nh ra file PNG
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.exportAsSVG(e)}>
                                        <div className="action-title-left">
                                            Xu???t file SVG
                                        </div>
                                        <div className="action-ilustration">
                                            Xu???t quy tr??nh ra file SVG
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.exportAsBPMN(e)}>
                                        <div className="action-title-left">
                                            Xu???t file BPMN 2.0 XML
                                        </div>
                                        <div className="action-ilustration">
                                            Xu???t quy tr??nh ra d???ng t??i li???u BPMN 2.0 
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
                                            Ph??m t???t
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <div className="action-title">
                                            H?????ng d???n
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
            </div>

            <Modal size="lg" show={this.state.isOpenShortcut} onHide={this.closeShortcutModal}>
                <ModalHeader closeButton>
                    <ModalTitle>Ph??m t???t</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Shortcut />
                </ModalBody>
                <ModalFooter>
                    <Button variant="info" onClick={this.closeShortcutModal}>
                        ????ng
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isEdit: state.processReducers.headerReducers.isEdit,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        exportDiagramAsSVG: () => {
            dispatch(actions.exportDiagramAsSVG())
        },
        exportDiagramAsImage: () => {
            dispatch(actions.exportDiagramAsImage())
        },
        exportDiagramAsBPMN: () => {
            dispatch(actions.exportDiagramAsBPMN())
        },
        showAlert: (properties) => {
            dispatch(alertActions.showMessageAlert(properties));
        },
        resetActionToDiagram: () => {
            dispatch(actions.resetActionToDiagram());
        }, 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderEmployee);