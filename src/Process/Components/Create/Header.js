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

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenShortcut: false,
            isEdit: '',
            isBackHomeCompany: false,
            isBackHomeEmployee: false,
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.isEdit){
            this.setState({isEdit:nextProps.isEdit});
        }
    }

    renderSaveOrEdit = () => {
        if(localStorage.getItem('is_company')){
            if(this.state.isEdit){
                return (
                    <Dropdown.Item onClick={(e)=> this.editDiagram(e) }>
                        <div className="action-title-left">
                            Cập nhật và chia sẻ
                        </div>
                        <div className="action-ilustration">
                            Lưu quy trình và chia sẻ với nhân viên
                        </div>
                    </Dropdown.Item>
                );
            }else{
                return (
                    <Dropdown.Item onClick={(e)=> this.saveDiagram(e) }>
                        <div className="action-title-left">
                            Lưu và chia sẻ
                        </div>
                        <div className="action-ilustration">
                            Lưu quy trình và chia sẻ với nhân viên
                        </div>
                    </Dropdown.Item>
                );
            }
        }
    }

    backToHomePage = (e) => {
        e.preventDefault();
        if(localStorage.getItem('is_company')){
            this.setState({isBackHomeCompany:true});
        }else if(localStorage.getItem('is_employee')){
            this.setState({isBackHomeEmployee:true});
        }
    }

    render() {
        if(this.state.isBackHomeCompany){
            return <Redirect to={'/company/'}/> 
        }
        if(this.state.isBackHomeEmployee){
            return <Redirect to={'/employee/'}/> 
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
                                    {this.renderSaveOrEdit()}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);