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

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenShortcut: false,
            isEdit: '',
            isBackHomeCompany: false,
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

    editDiagram = (e) => {
        e.preventDefault();
        this.props.editDiagram()
    }

    exportAsSVGEdit = (e) => {
        e.preventDefault();
        this.props.exportDiagramAsSVGEdit();
    }

    exportAsImageEdit = (e) => {
        e.preventDefault();
        this.props.exportDiagramAsImageEdit();
    }

    exportAsBPMNEdit = (e) => {
        e.preventDefault();
        this.props.exportDiagramAsBPMNEdit();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.isEdit){
            this.setState({isEdit:nextProps.isEdit});
        }
    }

    renderSaveOrEdit = () => {
        if(this.state.isEdit){
            return (
                <>
                    <Dropdown.Item onClick={(e)=> this.editDiagram(e) }>
                        <div className="action-title-left">
                            C???p nh???t v?? chia s???
                        </div>
                        <div className="action-ilustration">
                            L??u quy tr??nh v?? chia s??? v???i nh??n vi??n
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => this.exportAsImageEdit(e)}>
                        <div className="action-title-left">
                            Xu???t file PNG
                        </div>
                        <div className="action-ilustration">
                            Xu???t quy tr??nh ra file PNG
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => this.exportAsSVGEdit(e)}>
                        <div className="action-title-left">
                            Xu???t file SVG
                        </div>
                        <div className="action-ilustration">
                            Xu???t quy tr??nh ra file SVG
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e)=>this.exportAsBPMNEdit(e)}>
                        <div className="action-title-left">
                            Xu???t file BPMN 2.0 XML
                        </div>
                        <div className="action-ilustration">
                            Xu???t quy tr??nh ra d???ng t??i li???u BPMN 2.0 
                        </div>
                    </Dropdown.Item>
                </>
            );
        }else{
            return (
                <>
                    <Dropdown.Item onClick={(e)=> this.saveDiagram(e) }>
                        <div className="action-title-left">
                            L??u v?? chia s???
                        </div>
                        <div className="action-ilustration">
                            L??u quy tr??nh v?? chia s??? v???i nh??n vi??n
                        </div>
                    </Dropdown.Item>
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
                </>
            );
        }
    }

    backToHomePage = (e) => {
        e.preventDefault();
        localStorage.removeItem("processInfo");
        this.props.resetActionToDiagram();
        this.setState({isBackHomeCompany:true});
    }

    renderImportButton = () => {
        if(this.state.isEdit){
            return <div></div>;
        }else{
            return (
                <Dropdown drop={"left"}>
                    <Dropdown.Toggle id="dropdown-action" variant="actions" bsPrefix="dropdown">
                        <div className="button-area">
                            <i className="fas fa-cloud-upload-alt" htmlFor="file">
                            </i>
                            <input onChange={this.handleImportFileBPMN} className="input-import-file-bpmn" type="file" id="file" />
                        </div>
                    </Dropdown.Toggle>
                </Dropdown>
            );
        }
    }

    getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }

    loadedReaderFile = (evt) => {
        var result = evt.target.result;
        this.props.updateImportBpmnFile(result);
    }

    handleImportFileBPMN = event => {
        var files = event.target.files;
        var fileName = files[0].name;
        var type = this.getExtension(fileName);
        if(files && files.length !== 1){
            this.props.showAlert({
                message: "Ch??? ???????c import m???t file",
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'right'
                },
                title:'Th???t b???i',
                severity:'error'
            });
            event.target.value = null;
        }else if(type !== "bpmn"){
            this.props.showAlert({
                message: "Ch??? ???????c import file c?? ?????nh d???ng bpmn",
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'right'
                },
                title:'Th???t b???i',
                severity:'error'
            });
            event.target.value = null; 
        }else{
            try{
                var reader = new FileReader();
            }catch(e){
                this.props.showAlert({
                    message: "Tr??nh duy???t kh??ng h??? tr??? ?????c file bpmn",
                    anchorOrigin:{
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    title:'Th???t b???i',
                    severity:'error'
                });
            }
            reader.readAsText(files[0], "UTF-8");
            reader.onloadend = this.loadedReaderFile;
    
            this.props.showAlert({
                message: "Import th??nh c??ng file bpmn",
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'right'
                },
                title:'Th??nh c??ng',
                severity:'success'
            });
        }
    }

    render() {
        if(this.state.isBackHomeCompany){
            return <Redirect to={'/company/manage/process'}/> 
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
                            {this.renderImportButton()}
                            <Dropdown drop={"left"}>
                                <Dropdown.Toggle id="dropdown-action" variant="actions" bsPrefix="dropdown">
                                    <div className="button-area">
                                        <i className="fas fa-share-alt fa-sm icon"></i>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {this.renderSaveOrEdit()}
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
                                    <Dropdown.Item href="https://www.youtube.com/watch?v=PXOjuei5jt4&t=639s" target="_blank" rel="noopener noreferrer">
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
        editDiagram: () => {
            dispatch(actions.editDiagram())
        },
        showAlert: (properties) => {
            dispatch(alertActions.showMessageAlert(properties));
        },
        updateImportBpmnFile: (data) => {
            dispatch(actions.updateImportBpmnFile(data));
        },
        exportDiagramAsSVGEdit: () => {
            dispatch(actions.exportDiagramAsSVGEdit())
        },
        exportDiagramAsImageEdit: () => {
            dispatch(actions.exportDiagramAsImageEdit())
        },
        exportDiagramAsBPMNEdit: () => {
            dispatch(actions.exportDiagramAsBPMNEdit())
        },
        resetActionToDiagram: () => {
            dispatch(actions.resetActionToDiagram());
        }, 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);