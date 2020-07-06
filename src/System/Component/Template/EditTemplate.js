import React, { Component } from 'react'
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import EditProcess from './EditProcess';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as actions from '../../Action/System/Index';
import {connect} from 'react-redux';
import axios from 'axios';
import host from '../../../Host/ServerDomain';
import * as alertActions from '../../../Alert/Action/Index';

class EditTemplate extends Component {
  _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
            openModal : false,
            name: '',
            description: '',    
            process : '' 
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
            id: this.state.process.id,
            name: this.state.name,
            description: this.state.description,
        }
        this.props.updateProcessTemplateInformationUpdate(process);
        this.setState({openModal:false});
    }

    componentDidMount() {
      this._isMounted = true;
      let self = this
      var token = localStorage.getItem('token');
      var idProcess = this.props.match.params.id;
      axios.get(host + `/api/system/field/template/` + idProcess,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(self._isMounted){
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
            self.setState({process: res.data.process, name: res.data.process.name, description: res.data.process.description});
          }
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    getExtension(filename) {
      var parts = filename.split('.');
      return parts[parts.length - 1];
    }

    handleImportFileBPMN = event => {
      var files = event.target.files;
      var fileName = files[0].name;
      var type = this.getExtension(fileName);
      if(files && files.length !== 1){
          this.props.showAlert({
              message: "Chỉ được import một file",
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thất bại',
              severity:'error'
          });
          event.target.value = null;
      }
      else if(type !== "bpmn"){
          this.props.showAlert({
              message: "Chỉ được import file có định dạng bpmn",
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thất bại',
              severity:'error'
          });
          event.target.value = null; 
      }else{
        try{
          var reader = new FileReader();
        }catch(e){
            this.props.showAlert({
                message: "Trình duyệt không hỗ trợ đọc file bpmn",
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'right'
                },
                title:'Thất bại',
                severity:'error'
            });
        }
        reader.readAsText(files[0], "UTF-8");
        reader.onloadend = this.loadedReaderFile;

        this.props.showAlert({
            message: "Import thành công file bpmn",
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Thành công',
            severity:'success'
        });
      }
  }

    componentWillUnmount(){
      this._isMounted = false;
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
                        <h3 className="title-field">Sửa quy trình mẫu </h3>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-6"></div>
                      <div className="col-md-2">
                        <ButtonGroup aria-label="Basic example">
                            {/* <Button variant="primary">Import quy trình 
                              <input onChange={this.handleImportFileBPMN} className="input-import-file-bpmn-template" type="file" id="file" /> 
                              <i className="fas fa-plus"></i> 
                            </Button> */}
                            <Button variant="success save-right-button" style={{marginLeft:"2%"}} onClick={(e) => this.handleOpenUpdateProcessModal(e)}>
                                Lưu quy trình <i className="fas fa-save"></i></Button>
                        </ButtonGroup>
                      </div>
                    </div>
                    <div className="row">
                        <EditProcess init={this.state.process.xml}/>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="copyright">
                          <p>
                            Copyright © 2020 Colorlib. All rights reserved. Template
                            by <a href="https://colorlib.com">Colorlib</a>.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Modal show={this.state.openModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Thông tin quy trình</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => this.handleSubmitFieldForm(e)}>
                                <Form.Group controlId="formGroupPassword1">
                                    <Form.Label>Tên quy trình</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChangeName} defaultValue={this.state.process.name} required placeholder="Tên quy trình" />
                                </Form.Group>
                                <Form.Group controlId="formGroupEmail-updateaccount">
                                    <Form.Label>Mô tả ngắn</Form.Label>
                                    <textarea className="form-control" rows={"5"} defaultValue={this.state.process.description} onChange={this.handleChangeDescription} required></textarea>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Lưu quy trình
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
        updateProcessTemplateInformationUpdate: (process) => {
            dispatch(actions.updateProcessTemplateInformationUpdate(process));
        },
        showAlert: (properties) => {
          dispatch(alertActions.showMessageAlert(properties));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps, )(EditTemplate)
