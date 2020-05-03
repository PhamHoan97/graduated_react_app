import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmpty } from "validator";
import axios from 'axios';
import * as host from '../../Constants/Url'
import Alert from '@material-ui/lab/Alert';

export default class ModalCreateNotification extends Component {
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
            newNameNotification: "",
            newDescriptionNotification: "",
            newTypeNotification: 0,
            newTemplateNotification: 0,
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
    
    getlistType =() =>{
        var self =  this;
        var token = localStorage.getItem('token');
        axios.get(host.URL_BACKEND+"/api/system/notification/type/list",{
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
        if(name === 'newTypeNotification'){
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
            return <Alert severity="success">Save success !!!</Alert>;
        }else{
            return <div></div>
        }
    }
    createNewNotification = () => {
        this.setState({
            errorName: {},
            errorDescription: {},
            errorSelect: {},
            errorTemplate: {},
            errorType: {},
        });
        if (isEmpty(this.state.newNameNotification)) {
            var errorName = {
                selectedName: "Select name is required.",
            };
            this.setState({
                errorName: errorName,
            });
        }
        if (isEmpty(this.state.newDescriptionNotification)) {
            var errorDescription = {
                selectedDescription: "Select description is required.",
            };
            this.setState({
                errorDescription: errorDescription,
            });
        }
        if(parseInt(this.state.newTypeNotification) === 0){
            var errorType = {
                selectedType: "Select type is required.",
            };
            this.setState({
                errorType: errorType,
            });
        }
        if(parseInt(this.state.newTemplateNotification) === 0){
            var errorTemplate = {
                selectedTemplate: "Select template is required.",
            };
            this.setState({
                errorTemplate: errorTemplate,
            });
        }
        if(
            this.state.newNameNotification !== ""
            &&this.state.newDescriptionNotification !== ""
            && parseInt(this.state.newTypeNotification) !== 0
            && parseInt(this.state.newTemplateNotification) !== 0
        ){
            var self =  this;
            var token = localStorage.getItem('token');
            var idSystem = localStorage.getItem('system_id');
            axios.post(host.URL_BACKEND+"/api/system/notification/create",{
                newNameNotification: this.state.newNameNotification,
                newDescriptionNotification: this.state.newDescriptionNotification,
                newTemplateNotification: this.state.newTemplateNotification,
                idSystem: idSystem
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
                        newNameNotification: "",
                        newDescriptionNotification: "",
                        newTypeNotification: 0,
                        newTemplateNotification: 0,
                    });
                    setTimeout(() => {
                        self.setState({isDisplayAlert : false});
                    }, 2000);
                    self.props.getListNotification()
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
                Create Notification
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
                <label htmlFor="name">Name</label>
                <Input
                    type="text"
                    className="form-control"
                    name="newNameNotification"
                    value = {this.state.newNameNotification}
                    onChange={(event) => this.handleChange(event)}
                />
                {errorName.selectedName && (
                <div className="validation" style={{ display: "block",color: "red"}}>
                {errorName.selectedName}
                </div>
                )}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Description</label>
                    <textarea
                        className="form-control"
                        name="newDescriptionNotification"
                        value = {this.state.newDescriptionNotification}
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
                    <label htmlFor="exampleFormControlSelect1">Types</label>
                    <br></br>
                    <select
                        className="form-control"
                        name="newTypeNotification"
                        value = {this.state.newTypeNotification}
                        onChange={this.handleChange}
                    >
                        <option value={0}>Choose type</option>
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
                        name="newTemplateNotification"
                        onChange={this.handleChange}
                        value = {this.state.newTemplateNotification}
                    >
                        <option value={0}>Choose template</option>
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
                    onClick={() => this.createNewNotification()}
                    ref={(c) => {
                    this.checkBtn = c;
                    }}
                >
                    Save
                </CheckButton>
                </div>
            </Form>
            {this.displayAlert()}
            </Modal.Body>
        </Modal>
        );
    }
}
