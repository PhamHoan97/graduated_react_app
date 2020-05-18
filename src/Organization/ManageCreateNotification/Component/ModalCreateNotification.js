import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmpty } from "validator";
import axios from 'axios';
import * as host from '../../Url'
import Alert from '@material-ui/lab/Alert';

export default class ModalCreateNotification extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isDisplayAlert: false,
            errorDescription: {},
            errorName: {},
            listForm: [],
            newNameNotification: "",
            newDescriptionNotification: "",
            newFileNotification: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
    }
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        this.setState({
            errorDescription: {},
            errorName: {},
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    displayAlert = () =>{
        if(this.state.isDisplayAlert){
            return <Alert severity="success">Lưu thành công</Alert>;
        }else{
            return <div></div>
        }
    }
    createNewNotification = () => {
        this.setState({
            errorName: {},
            errorDescription: {},
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
        if(
            !isEmpty(this.state.newDescriptionNotification)
            &&!isEmpty(this.state.newNameNotification)
        ){
            var self =  this;
            var token = localStorage.getItem('token');
            var idCompany = localStorage.getItem("company_id");
            let data = new FormData();
            data.append('newNameNotification',this.state.newNameNotification);
            data.append('newDescriptionNotification',this.state.newDescriptionNotification);
            data.append('newFileNotification',this.state.newFileNotification);
            data.append('idCompany',idCompany);
            axios.post(host.URL_BACKEND+"/api/company/notification/create",
                data
            ,
            {
              headers: { 'Authorization': 'Bearer ' + token,'content-type': 'multipart/form-data' }
            })
            .then(function (response) {
                if (response.data.error != null) {
                    console.log(response.data.error);
                }else{
                    self.setState({
                        isDisplayAlert:true,
                        errorName: {},
                        errorDescription: {},
                        newNameNotification: "",
                        newDescriptionNotification: "",
                        newFileNotification: "",
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
    handleChangeFile = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            newFileNotification: event.target.files[0]
        });
    }
    render() {
        const {errorName} = this.state;
        const {errorDescription} = this.state;
        return (
        <Modal
            size="lg"
            show={this.props.showModal}
            onHide={this.props.close}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                Tạo thông báo
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
                    <label htmlFor="name">Miêu tả</label>
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
                    <label htmlFor="exampleFormControlSelect1">File</label>
                    <br></br>
                    <input
                        type="file"
                        id="file-input"
                        name="newFileNotification"
                        className="form-control-file"
                        onChange={(event) => this.handleChangeFile(event)}
                    />
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
