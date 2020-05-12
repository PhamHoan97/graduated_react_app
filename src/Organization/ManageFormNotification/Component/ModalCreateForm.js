import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmpty } from "validator";
import axios from 'axios';
import * as host from '../../Url'
import Alert from '@material-ui/lab/Alert';

export default class ModalCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayAlert: false,
            errorTemplate: {},
            errorType: {},
            errorDescription: {},
            errorName: {},
            listType: [],
            listTemplate: [],
            newNameForm: "",
            newDescriptionForm: "",
            newTypeForm: 0,
            newTemplateForm: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    UNSAFE_componentWillMount() {
        this.getListTemplate();
        this.getlistType();

    }
    getListTemplate =() =>{
        var self =  this;
        var token = localStorage.getItem('token');
        axios.get(host.URL_BACKEND+"/api/system/notification/template/list",{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            self.setState({
                listTemplate:response.data.templates
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        this.setState({
            errorTemplate: {},
            errorType: {},
            errorDescription: {},
            errorName: {},
        })
    }
    getlistType =() =>{
        var self =  this;
        var token = localStorage.getItem('token');
        var idAdmin = localStorage.getItem('admin_id');
        axios.get(host.URL_BACKEND+"/api/system/notification/type/list/"+idAdmin,{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            self.setState({
                listType:response.data.types
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        if(name === 'newTypeForm'){
            var self =  this;
            var token = localStorage.getItem('token');
            if(parseInt(value) !== 0){
                axios.get(host.URL_BACKEND+'/api/system/notification/template/list/'+value,{
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                .then(function (response) {
                    if (response.data.error != null) {
                        console.log(response.data.error);
                    }else{
                        self.setState({
                            [name]: value,
                            listTemplate:response.data.templates
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                axios.get(host.URL_BACKEND+'/api/system/notification/template/list',{
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                .then(function (response) {
                    if (response.data.error != null) {
                        console.log(response.data.error);
                    }else{
                        self.setState({
                            [name]: value,
                            listTemplate:response.data.templates
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }else{
            this.setState({
                [name]: value
            })
        }
    }
    displayAlert = () =>{
        if(this.state.isDisplayAlert){
            return <Alert severity="success">Lưu thành công !!!</Alert>;
        }else{
            return <div></div>
        }
    }
    createNewForm = () => {
        this.setState({
            errorName: {},
            errorDescription: {},
            errorSelect: {},
            errorTemplate: {},
            errorType: {},
        });
        if (isEmpty(this.state.newNameForm)) {
            var errorName = {
                selectedName: "Select name is required.",
            };
            this.setState({
                errorName: errorName,
            });
        }
        if (isEmpty(this.state.newDescriptionForm)) {
            var errorDescription = {
                selectedDescription: "Select description is required.",
            };
            this.setState({
                errorDescription: errorDescription,
            });
        }
        if(parseInt(this.state.newTypeForm) === 0){
            var errorType = {
                selectedType: "Select type is required.",
            };
            this.setState({
                errorType: errorType,
            });
        }
        if(parseInt(this.state.newTemplateForm) === 0){
            var errorTemplate = {
                selectedTemplate: "Select template is required.",
            };
            this.setState({
                errorTemplate: errorTemplate,
            });
        }
        if(
            this.state.newNameForm !== ""
            &&this.state.newDescriptionForm !== ""
            && parseInt(this.state.newTypeForm) !== 0
            && parseInt(this.state.newTemplateForm) !== 0
        ){
            var self =  this;
            var token = localStorage.getItem('token');
            var idAdmin = localStorage.getItem('admin_id');
            axios.post(host.URL_BACKEND+"/api/system/notification/form/create",{
                newNameForm: this.state.newNameForm,
                newDescriptionForm: this.state.newDescriptionForm,
                newTemplateForm: this.state.newTemplateForm,
                idAdmin: idAdmin
            },
            {
              headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null) {
                    console.log(response.data.error);
                }else{
                    self.setState({
                        isDisplayAlert:true,
                        errorName: {},
                        errorDescription: {},
                        errorTemplate: {},
                        errorType: {},
                        newNameForm: "",
                        newDescriptionForm: "",
                        newTypeForm: 0,
                        newTemplateForm: 0,
                    });
                    setTimeout(() => {
                        self.setState({isDisplayAlert : false});
                    }, 2000);
                    self.props.getlistForm()
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };
    onSubmit = (event) => {
        event.preventDefault();
        this.form.validateAll();
    };
    render() {
        const {errorName} = this.state;
        const {errorDescription} = this.state;
        const {errorType} = this.state;
        const {errorTemplate} = this.state;
        return (
        <Modal
            size="lg"
            show={this.props.showModal}
            onHide={this.props.close}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                Tạo form
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form
                onSubmit={(e) => this.onSubmit(e)}
                ref={(c) => {
                this.form = c;
                }}
            >
                <div className="form-group">
                <label htmlFor="name">Tên</label>
                <Input
                    type="text"
                    className="form-control"
                    name="newNameForm"
                    value = {this.state.newNameForm}
                    onChange={(event) => this.handleChange(event)}
                />
                {errorName.selectedName && (
                <div className="validation" style={{ display: "block",color: "red"}}>
                {errorName.selectedName}
                </div>
                )}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Miêu tả</label>
                    <textarea
                        className="form-control"
                        name="newDescriptionForm"
                        value = {this.state.newDescriptionForm}
                        onChange={(event) => this.handleChange(event)}
                        rows="3"
                    >
                    </textarea>
                    {errorDescription.selectedDescription && (
                    <div className="validation" style={{ display: "block",color: "red"}}>
                    {errorDescription.selectedDescription}
                    </div>
                    )}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleFormControlSelect1">Thể loại</label>
                    <br></br>
                    <select
                        className="form-control"
                        name="newTypeForm"
                        value = {this.state.newTypeForm}
                        onChange={this.handleChange}
                    >
                        <option value={0}>Chọn type</option>
                        {
                            Object.values(this.state.listType).map((type, key) => {
                                return (
                                <option value={type.id} key={key}>{type.name}</option>
                                )
                            })
                        }
                    </select>
                    {errorType.selectedType && (
                        <div className="validation" style={{ display: "block",color: "red"}}>
                        {errorType.selectedType}
                        </div>
                    )}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleFormControlSelect1">Template</label>
                    <br></br>
                    <select
                        className="form-control"
                        name="newTemplateForm"
                        onChange={this.handleChange}
                        value = {this.state.newTemplateForm}
                    >
                        <option value={0}>Chọn template</option>
                        {
                            Object.values(this.state.listTemplate).map((template, key) => {
                                return (
                                <option value={template.id} key={key}>{template.name}</option>
                                )
                            })
                        }
                    </select>
                    {errorTemplate.selectedTemplate && (
                        <div className="validation" style={{ display: "block",color: "red"}}>
                        {errorTemplate.selectedTemplate}
                        </div>
                    )}
                </div>
                <div className="form-group text-left">
                <CheckButton
                    type="submit"
                    className="btn btn-primary mb-2 mr-2"
                    onClick={() => this.createNewForm()}
                    ref={(c) => {
                    this.checkBtn = c;
                    }}
                >
                    Lưu
                </CheckButton>
                </div>
            </Form>
            {this.displayAlert()}
            </Modal.Body>
        </Modal>
        );
    }
}
