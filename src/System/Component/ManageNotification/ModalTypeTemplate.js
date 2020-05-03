import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Alert from '@material-ui/lab/Alert';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmpty } from 'validator';
import axios from "axios";
import * as host from '../../Constants/Url'
const required = (value) => {
  if (isEmpty(value)) {
    return (
      <small className="form-text text-danger">This field is required</small>
    );
  }
};
export default class ModalTypeTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayAlert : false,
            newTypeTemplate :'',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        });
    }
    saveNewTypeTemplate = () =>{
        var self = this;
        var token = localStorage.getItem('token');
        axios.post(host.URL_BACKEND+'/api/system/notification/type/create', {
            newTypeTemplate: this.state.newTypeTemplate,
        },{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            }else{
                self.setState({
                    newTypeTemplate:'',
                    isDisplayAlert : true
                })
                setTimeout(() => {
                    self.setState({isDisplayAlert : false});
                }, 2000);
                self.props.getListTypeSystem()
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    displayAlert = () =>{
        if(this.state.isDisplayAlert){
            return <Alert severity="success">Save success !!!</Alert>;
        }else{
            return <div></div>
        }
    }
    onSubmit = event => {
        event.preventDefault();
        this.form.validateAll();
    }
    render() {
        return (
            <Modal
                size="lg"
                show={this.props.showModal}
                onHide={this.props.close}
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    New type
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
                            name="newTypeTemplate"
                            value = {this.state.newTypeTemplate}
                            onChange={(event) => this.handleChange(event)}
                            validations={[required]}
                        />
                        </div>
                        <div className="form-group text-left">
                        <CheckButton
                            type="submit"
                            className="btn btn-primary mb-2 mr-2"
                            onClick={() => this.saveNewTypeTemplate()}
                            ref={(c) => {
                            this.checkBtn = c;
                            }}
                        >
                            Save
                        </CheckButton>
                        </div>
                    </Form>
                    {
                        this.displayAlert()
                    }
                </Modal.Body>
            </Modal>
        );
    }
}
