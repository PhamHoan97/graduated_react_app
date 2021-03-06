import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmpty } from "validator";
import axios from 'axios';
import host from '../../../Host/ServerDomain';
import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
import {showMessageAlert} from "../../../Alert/Action/Index";
class ModalCreateForm extends Component {
    _isMounted = false;
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
    
    UNSAFE_componentWillMount() {
        this.getListTemplate();
        this.getlistType();

    }
    getListTemplate =() =>{
        this._isMounted = true;
        let self = this;
        var token = localStorage.getItem('token');
        axios.get(host + "/api/system/notification/template/list",{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if(self._isMounted){
                self.setState({
                    listTemplate:response.data.templates
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    
    componentWillUnmount(){
        this._isMounted = false;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            errorTemplate: {},
            errorType: {},
            errorDescription: {},
            errorName: {},
        })
    }

    getlistType =() =>{
        this._isMounted = true;
        let self = this;
        var token = localStorage.getItem('token');
        axios.get(host + "/api/system/notification/type/list",{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if(self._isMounted){
                self.setState({
                    listType:response.data.types
                })
            }
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
                axios.get(host + '/api/system/notification/template/list/'+value,{
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
                axios.get(host + '/api/system/notification/template/list',{
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
            return <Alert severity="success">L??u th??nh c??ng !!!</Alert>;
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
                selectedName: "T??n kh??ng ???????c tr???ng.",
            };
            this.setState({
                errorName: errorName,
            });
        }
        if (isEmpty(this.state.newDescriptionForm)) {
            var errorDescription = {
                selectedDescription: "M?? t??? kh??ng ???????c tr???ng.",
            };
            this.setState({
                errorDescription: errorDescription,
            });
        }
        if(parseInt(this.state.newTypeForm) === 0){
            var errorType = {
                selectedType: "Th??? lo???i kh??ng ???????c tr???ng.",
            };
            this.setState({
                errorType: errorType,
            });
        }
        if(parseInt(this.state.newTemplateForm) === 0){
            var errorTemplate = {
                selectedTemplate: "M???u kh??ng ???????c tr???ng.",
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
            axios.post(host + "/api/system/notification/form/create",{
                newNameForm: this.state.newNameForm,
                newDescriptionForm: this.state.newDescriptionForm,
                newTemplateForm: this.state.newTemplateForm,
                token: token
            },
            {
              headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null) {
                    console.log(response.data.error);
                }else{
                    self.setState({
                        isDisplayAlert:false,
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
                        self.props.close();
                        self.setState({isDisplayAlert : false});
                    }, 2000);
                    self.props.showAlert({
                        message:'T???o form th??ng b??o th??nh c??ng',
                        anchorOrigin:{
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        title:'Th??nh c??ng',
                        severity:'success'
                      });
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
                T???o form
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
                <label htmlFor="name" className="required">T??n</label>
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
                    <label htmlFor="name" className="required">Mi??u t???</label>
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
                    <label htmlFor="exampleFormControlSelect1" className="required">Th??? lo???i</label>
                    <br></br>
                    <select
                        className="form-control"
                        name="newTypeForm"
                        value = {this.state.newTypeForm}
                        onChange={this.handleChange}
                    >
                        <option value={0}>Ch???n th??? lo???i</option>
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
                    <label htmlFor="exampleFormControlSelect1" className="required">M???u</label>
                    <br></br>
                    <select
                        className="form-control"
                        name="newTemplateForm"
                        onChange={this.handleChange}
                        value = {this.state.newTemplateForm}
                    >
                        <option value={0}>Ch???n m???u c??u h???i</option>
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
                    L??u
                </CheckButton>
                </div>
            </Form>
            {this.displayAlert()}
            </Modal.Body>
        </Modal>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      showAlert: (properties) => {
        dispatch(showMessageAlert(properties))
      }
    };
  };
export default connect(null, mapDispatchToProps)(ModalCreateForm);
