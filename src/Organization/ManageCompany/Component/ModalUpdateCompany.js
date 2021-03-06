import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import CheckButton from "react-validation/build/button";
import { Modal } from "react-bootstrap";
import host from '../../../Host/ServerDomain'; 
import Alert from '@material-ui/lab/Alert';
import { isEmpty } from "validator";
const required = (value) => {
  if (isEmpty(value)) {
    return (
      <small className="form-text text-danger">This field is required</small>
    );
  }
};
class ModalUpdateCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlertSuccess :false,
            editNameCompany: this.props.detailCompany.name,
            editSigntureCompany: this.props.detailCompany.signature,
            editAddressCompany: this.props.detailCompany.address,
            editFieldCompany: this.props.detailCompany.field,
            editContactCompany: this.props.detailCompany.contact,
            editCeoCompany: this.props.detailCompany.ceo,
            editAvatarCompany: "",
            inputKey: Date.now()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleOnChangeFile = this.handleOnChangeFile.bind(this);
    }


    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
        [name]: value,
        });
    }

    handleOnChangeFile(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0]);
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.form.validateAll();
    };
    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
        this.setState({
            editAvatarCompany: e.target.result,
        });
        };
        reader.readAsDataURL(file);
    }

    displayAlert = () =>{
        if(this.state.isAlertSuccess){
            return <Alert severity="success">C???p nh???t th??nh c??ng !</Alert>;
        }else{
            return <div></div>
        }
    }

    saveUpdateCompany = () =>{
        var self = this;
        var token = localStorage.getItem("token");
        axios
        .post(
            host + "/api/company/information/update",
            {
                token : token,
                name: this.state.editNameCompany,
                ceo: this.state.editCeoCompany,
                signature: this.state.editSigntureCompany,
                address: this.state.editAddressCompany,
                contact: this.state.editContactCompany,
                field: this.state.editFieldCompany,
                file: this.state.editAvatarCompany,
            },
            {
            headers: { Authorization: "Bearer " + token },
            }
        )
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            } else {
                self.setState({
                    isAlertSuccess: true,
                    editNameCompany: self.state.editNameCompany,
                    editSigntureCompany: self.state.editSigntureCompany,
                    editAddressCompany: self.state.editAddressCompany,
                    editFieldCompany: self.state.editFieldCompany,
                    editContactCompany:self.state.editContactCompany,
                    editCeoCompany: self.state.editCeoCompany,
                    inputKey: Date.now(),
                });
                setTimeout(() => {
                    self.setState({isAlertSuccess : false});
                }, 5000);
                self.props.getDataOrganization()
            }
        })
        .catch(function (error) {
            console.log(error);
        });
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
                Th??ng tin chi ti???t c??ng ty
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    onSubmit={(e) => this.onSubmit(e)}
                    ref={(c) => {
                    this.form = c;
                    }}
                >
                    <div className="row form-group">
                    <div className="col col-md-3">
                        <label htmlFor="text-input" className=" form-control-label required">
                        T??n
                        </label>
                    </div>
                    <div className="col-12 col-md-9">
                        <Input
                        type="text"
                        id="name"
                        name="editNameCompany"
                        className="form-control"
                        validations={[required]}
                        value={this.state.editNameCompany}
                        onChange={(event) => this.handleChange(event)}
                        />
                    </div>
                    </div>
                    <div className="row form-group">
                    <div className="col col-md-3">
                        <label htmlFor="hf-email" className=" form-control-label required">
                        Vi???t t???t
                        </label>
                    </div>
                    <div className="col-12 col-md-9">
                        <Input
                        type="text"
                        name="editSigntureCompany"
                        className="form-control"
                        value={this.state.editSigntureCompany}
                        validations={[required]}
                        onChange={(event) => this.handleChange(event)}
                        />
                    </div>
                    </div>
                    <div className="row form-group">
                    <div className="col col-md-3">
                        <label htmlFor="hf-email" className=" form-control-label required">
                        ?????a ch???
                        </label>
                    </div>
                    <div className="col-12 col-md-9">
                        <Input
                        type="text"
                        name="editAddressCompany"
                        className="form-control"
                        validations={[required]}
                        value={this.state.editAddressCompany}
                        onChange={(event) => this.handleChange(event)}
                        />
                    </div>
                    </div>
                    <div className="row form-group">
                    <div className="col col-md-3">
                        <label htmlFor="hf-email" className=" form-control-label required">
                        L??nh v???c
                        </label>
                    </div>
                    <div className="col-12 col-md-9">
                        <Input
                        type="text"
                        name="editFieldCompany"
                        className="form-control"
                        validations={[required]}
                        value={this.state.editFieldCompany}
                        onChange={(event) => this.handleChange(event)}
                        />
                    </div>
                    </div>
                    <div className="row form-group">
                    <div className="col col-md-3">
                        <label
                        htmlFor="disabled-input"
                        className=" form-control-label required"
                        >
                        Li??n h???
                        </label>
                    </div>
                    <div className="col-12 col-md-9">
                        <Input
                        type="text"
                        name="editContactCompany"
                        className="form-control"
                        validations={[required]}
                        value={this.state.editContactCompany}
                        onChange={(event) => this.handleChange(event)}
                        />
                    </div>
                    </div>
                    <div className="row form-group">
                    <div className="col col-md-3">
                        <label htmlFor="file-input" className=" form-control-label">
                        ???nh ?????i di???n
                        </label>
                    </div>
                    <div className="col-12 col-md-9">
                        <input
                        type="file"
                        id="file-input"
                        name="file-input"
                        key={this.state.inputKey}
                        className="form-control-file"
                        onChange={(e) => this.handleOnChangeFile(e)}
                        />
                    </div>
                    </div>
                    <div className="modal-footer">
                    <CheckButton
                        type="submit"
                        className="btn btn-primary mb-2 mr-2 text-right"
                        onClick={() => this.saveUpdateCompany()}
                        ref={(c) => {
                        this.checkBtn = c;
                        }}
                    >
                        L??u
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

export default ModalUpdateCompany;
