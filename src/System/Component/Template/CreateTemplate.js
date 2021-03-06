import React, { Component } from 'react';
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import Process from './Process';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as actions from '../../Action/System/Index';
import {connect} from 'react-redux';
import '../../Style/ProcessTemplate/Import.css';
import * as alertActions from '../../../Alert/Action/Index';

class CreateTemplate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openModal : false,
            name: '',
            description: '',      
        }
    }

    handleOpenUpdateProcessModal = (e) => {
        e.preventDefault();
        this.setState({openModal:true});
    }

    handleCloseModal = () => {
        this.setState({openModal:false});
    }

    handleChangeName = event => {
        event.preventDefault();
        this.setState({name: event.target.value});
    }

    handleChangeDescription = event => {
        event.preventDefault();
        this.setState({description: event.target.value});
    }

    handleSubmitFieldForm = (e) => {
        e.preventDefault();
        var process = {
            field_id : this.props.match.params.id,
            name: this.state.name,
            description: this.state.description,
        }
        this.props.updateProcessTemplateInformationCreate(process);
        this.setState({openModal:false});
    }

    getExtension(filename) {
      var parts = filename.split('.');
      return parts[parts.length - 1];
    }

    loadedReaderFile = (evt) => {
        var result = evt.target.result;
        this.props.updateProcessTemplateXmlAfterImportFile(result);
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
        }
        else if(type !== "bpmn"){
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
        return (
            <div className="page-wrapper">
            <MenuHorizontal/>
            <div className="page-container">
              <MenuVertical />
              <div className="main-content">
                <div className="section__content section__content--p30">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="title-field">T???o quy tr??nh m???u </h3>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="primary">Import quy tr??nh
                              <input onChange={this.handleImportFileBPMN} className="input-import-file-bpmn-template" type="file" id="file" /> 
                              <i className="fas fa-plus"></i> 
                            </Button>
                            <Button variant="success save-right-button" style={{marginLeft:"2%"}} onClick={(e) => this.handleOpenUpdateProcessModal(e)}>
                                L??u quy tr??nh <i className="fas fa-save"></i></Button>
                        </ButtonGroup>
                      </div>
                    </div>
                    <div className="row">
                        <Process />
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="copyright">
                          <p>
                            Copyright ?? 2020 Colorlib. All rights reserved. Template
                            by <a href="https://colorlib.com">Colorlib</a>.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Modal show={this.state.openModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Th??ng tin quy tr??nh</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => this.handleSubmitFieldForm(e)}>
                                <Form.Group controlId="formGroupPassword1">
                                    <Form.Label className="required">T??n quy tr??nh</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChangeName} required placeholder="T??n quy tr??nh" />
                                </Form.Group>
                                <Form.Group controlId="formGroupEmail-updateaccount">
                                    <Form.Label className="required">M?? t??? ng???n</Form.Label>
                                    <textarea className="form-control" rows={"5"} onChange={this.handleChangeDescription} required></textarea>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    L??u quy tr??nh
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                    {/* end modal */}
                  </div>
                </div>
              </div>
            </div>
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
        updateProcessTemplateInformationCreate: (process) => {
            dispatch(actions.updateProcessTemplateInformationCreate(process));
        },
        updateProcessTemplateXmlAfterImportFile: (process) => {
          dispatch(actions.updateProcessTemplateXmlAfterImportFile(process));
        },
        showAlert: (properties) => {
          dispatch(alertActions.showMessageAlert(properties));
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps, )(CreateTemplate)
