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
class ModalCreateNotification extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isDisplayAlert: false,
            errorDescription: {},
            errorName: {},
            errorForm: {},
            listForm: [],
            newNameNotification: "",
            newDescriptionNotification: "",
            newFileNotification: "",
            newFormNotification: 0,
            inputKey: Date.now()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.getlistForm();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            errorDescription: {},
            errorName: {},
            errorForm: {},
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    getlistForm = () => {
        this._isMounted = true;
        var self = this;
        var token = localStorage.getItem("token");
        axios
          .get(host + "/api/system/notification/form/list", {
            headers: { Authorization: "Bearer " + token },
          })
          .then(function (response) {
            if(self._isMounted){
                self.setState({
                    listForm: response.data.forms,
                });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    displayAlert = () =>{
        if(this.state.isDisplayAlert){
            return <Alert severity="success">L??u th??nh c??ng</Alert>;
        }else{
            return <div></div>
        }
    }
    createNewNotification = () => {
        this.setState({
            errorName: {},
            errorDescription: {},
            errorForm: {},
        });
        if (isEmpty(this.state.newNameNotification)) {
            var errorName = {
                selectedName: "T??n kh??ng ???????c tr???ng.",
            };
            this.setState({
                errorName: errorName,
            });
        }
        if (isEmpty(this.state.newDescriptionNotification)) {
            var errorDescription = {
                selectedDescription: "M?? t??? kh??ng ???????c tr???ng.",
            };
            this.setState({
                errorDescription: errorDescription,
            });
        }
        if (this.state.newFormNotification === 0) {
            var errorForm = {
                selectedForm: "Form ????nh gi?? kh??ng ???????c tr???ng.",
            };
            this.setState({
                errorForm: errorForm,
            });
        }
        if(
            !isEmpty(this.state.newDescriptionNotification)
            &&!isEmpty(this.state.newNameNotification)
            &&(this.state.newFormNotification !==0)
        ){
            var self =  this;
            var token = localStorage.getItem('token');
            let data = new FormData();
            data.append('newNameNotification',this.state.newNameNotification);
            data.append('newDescriptionNotification',this.state.newDescriptionNotification);
            data.append('newFormNotification', this.state.newFormNotification);
            data.append('newFileNotification',this.state.newFileNotification);
            axios.post(host + "/api/system/notification/create",
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
                        isDisplayAlert:false,
                        errorName: {},
                        errorDescription: {},
                        newNameNotification: "",
                        newDescriptionNotification: "",
                        newFormNotification: 0,
                        newFileNotification: "",
                        inputKey: Date.now(),
                    });
                    setTimeout(() => {
                        self.props.close();
                        self.setState({isDisplayAlert : false});
                    }, 2000);
                    self.props.showAlert({
                        message:'T???o th??ng b??o th??nh c??ng',
                        anchorOrigin:{
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        title:'Th??nh c??ng',
                        severity:'success'
                      });
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
        this.setState({
            newFileNotification: event.target.files[0]
        });
    }
    render() {
        const {errorName} = this.state;
        const {errorDescription} = this.state;
        const {errorForm} = this.state;
        return (
        <Modal
            size="lg"
            show={this.props.showModal}
            onHide={this.props.close}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                T???o th??ng b??o
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
                    <label htmlFor="name" className="required">M?? t???</label>
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
                    <label htmlFor="exampleFormControlSelect1" className="required">Form</label>
                    <br></br>
                    <select
                        className="form-control"
                        name="newFormNotification"
                        value = {this.state.newFormNotification}
                        onChange={(event) => this.handleChange(event)}
                    >
                        <option value={0}>Ch???n Form</option>
                        {
                            Object.values(this.state.listForm).map((form, key) => {
                                return (
                                <option value={form.id} key={key}>{form.name}</option>
                                )
                            })
                        }
                    </select>
                    <div className="validation" style={{ display: "block",color: "red"}}>
                    {errorForm.selectedForm}
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleFormControlSelect1">File</label>
                    <br></br>
                    <input
                        type="file"
                        id="file-input"
                        key={this.state.inputKey}
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
export default connect(null, mapDispatchToProps)(ModalCreateNotification);