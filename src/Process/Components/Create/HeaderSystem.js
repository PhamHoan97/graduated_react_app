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

class HeaderSystem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenShortcut: false,
            isEdit: '',
            isBackHomeSystem: false,
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
        this.setState({isBackHomeSystem:true});
    }

    render() {
        if(this.state.isBackHomeSystem){
            return <Redirect to={'/system/'}/> 
        }
        return (
            <div className="process-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10 text-left"> 
                            <Dropdown drop={"left"}>
                                <Dropdown.Toggle id="dropdown-action" variant="actions" bsPrefix="dropdown">
                                    <div className="button-area-go-back" onClick={(e) => this.backToHomePage(e)}>
                                        <span className="text-go-back"> Trang chủ</span>
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
                                            Xuất file PNG
                                        </div>
                                        <div className="action-ilustration">
                                            Xuất quy trình ra file PNG
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.exportAsSVG(e)}>
                                        <div className="action-title-left">
                                            Xuất file SVG
                                        </div>
                                        <div className="action-ilustration">
                                            Xuất quy trình ra file SVG
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e)=>this.exportAsBPMN(e)}>
                                        <div className="action-title-left">
                                            Xuất file BPMN 2.0 XML
                                        </div>
                                        <div className="action-ilustration">
                                            Xuất quy trình ra dạng tài liệu BPMN 2.0 
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
                                            Phím tắt
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <div className="action-title">
                                            Hướng dẫn
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
            </div>

            <Modal size="lg" show={this.state.isOpenShortcut} onHide={this.closeShortcutModal}>
                <ModalHeader closeButton>
                    <ModalTitle>Phím tắt</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Shortcut />
                </ModalBody>
                <ModalFooter>
                    <Button variant="info" onClick={this.closeShortcutModal}>
                        Đóng
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSystem);