import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import ModalTitle from 'react-bootstrap/ModalTitle';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actionAlerts from  '../../../Alert/Action/Index';
import host from '../../../Host/ServerDomain';
import * as actions from '../../Actions/Index';

class Templates extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenModal: false,
            templates: [],
            name: '',
            file: '',
        }
    }

    openModalCreateTemplate = (e) => {
        e.preventDefault();
        this.setState({isOpenModal: true});
    }

    closeTemplateModal = () => {
        this.setState({isOpenModal:false});
    }

    handleChangeName = event => {
        event.preventDefault();
        this.setState({name: event.target.value});
    }

    handleChangeFile = event => {
        event.preventDefault();
        var fileUpload = event.target.files[0];
        this.setState({file: fileUpload});
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        var tokenData = localStorage.getItem('token');
        var file = this.state.file;
        let data = new FormData();
        data.append('token', tokenData);
        data.append('file',  file);
        axios.post(host + `/api/company/process/upload/template`,
        data,
        {
            headers: { 'Authorization': 'Bearer ' + tokenData}
        }).then(res => {
          if(res.data.error != null){
            this.props.showAlert({
              message: res.data.message,
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thất bại',
              severity:'error'
            });
          }else{
            this.props.showAlert({
              message: res.data.message,
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thành công',
              severity:'success'
            });
            var idTemplate = Math.random().toString(36).substring(7);
            var template = {id: idTemplate, name: this.state.name, link: res.data.link};
            var newTemplates = this.state.templates;
                newTemplates.push(template);
            this.props.updateFileTemplatesForProcess(newTemplates);
            this.setState({templates: newTemplates, name: '', file: '', isOpenModal: false});
            document.getElementById('file-input-update-template').value = "";
            document.getElementById('template-name').value = "";
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    deleteTemplate = (e, idTempalte) => {
        e.preventDefault();
        var newTemplates = this.state.templates;
        var indexDelete; 
        for (let index = 0; index < newTemplates.length; index++) {
            if(idTempalte === newTemplates[index].id){
                indexDelete = index;
            }
        }
        newTemplates.splice(indexDelete,1);
        this.props.updateFileTemplatesForProcess(newTemplates);
        this.setState({templates: newTemplates});
    }

    renderListTemplate = () => {
            var templates = this.state.templates;
            return Object.values(templates).map((value, key) => {
                return (
                    <React.Fragment key={key}>
                        <tr>
                            <th>{value.name}</th>
                            <td>
                                <div className="btn-group mr-2" role="group">
                                    <a className="btn btn-info" href={host + '/' + value.link}>Tải về</a>
                                    <a style={{marginLeft: "5px"}} href="##" className="btn btn-danger" onClick={(e) => this.deleteTemplate(e, value.id)}> Xóa</a>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                )
            })
    }

    render() {
        return (
            <div className="detail-area-view-template-process">
                <div className="row">
                    <div className="col-md-5 title-footer">
                        <h4>Biểu mẫu</h4>
                    </div>
                </div>
              
                <div className="row">
                    <table className="table">
                        <thead>
                        </thead>
                        <tbody>
                            {this.renderListTemplate()}
                            <tr>
                                <th></th>
                                <td >
                                    <button className="btn btn-success" onClick={(e) => this.openModalCreateTemplate(e)}>Thêm mới</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <Modal size="md" show={this.state.isOpenModal} onHide={this.closeTemplateModal}>
                    <ModalHeader closeButton>
                        <ModalTitle>Thêm biểu mẫu</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => this.handleSubmitForm(e)}>
                            <Form.Group>
                                <Form.Label>Tên biểu mẫu</Form.Label>
                                <Form.Control type="text" id="template-name" onChange={this.handleChangeName} required placeholder="Tên biểu mẫu" />
                            </Form.Group>
                            <Form.Group controlId="formGroupEmail-updateaccount">
                                <Form.Label>Upload</Form.Label>
                                <Form.File.Input id="file-input-update-template" required onChange={this.handleChangeFile} name="file-input-update-template"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Lưu biểu mẫu
                            </Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="info" onClick={this.closeTemplateModal}>
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

    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showAlert: (properties) => {
            dispatch(actionAlerts.showMessageAlert(properties))
        },
        updateFileTemplatesForProcess: (templates) => {
            dispatch(actions.updateFileTemplatesForProcess(templates));
        },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Templates);

