import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Alert from '@material-ui/lab/Alert';
import { isEmpty } from 'validator';
import axios from "axios";
import host from '../../../Host/ServerDomain';
import Validator from '../../Utils/Validator';
export default class ModalTypeTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayAlert : false,
            errors: {},
            newNameTypeTemplate :"",
            newDescriptionTypeTemplate :"",
        }
        const rules = [
            {
              field: 'newNameTypeTemplate',
              method: 'isEmpty',
              validWhen: false,
              message: 'Tên của thể loại template là bắt buộc',
            },
            {
                field: 'newDescriptionTypeTemplate',
                method: 'isEmpty',
                validWhen: false,
                message: 'Miêu tả thể loại template là bắt buộc',
            }
          ];
        this.validator = new Validator(rules);
        this.handleChange = this.handleChange.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            errors: {},
        })
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        });
    }
    saveNewTypeTemplate = (e) =>{
        e.preventDefault();
        if(
            isEmpty(this.state.newNameTypeTemplate)
            ||isEmpty(this.state.newDescriptionTypeTemplate)
            )
        {
            this.setState({
                errors: this.validator.validate(this.state),
            });
        }else{
            var self = this;
            var token = localStorage.getItem('token');
            axios.post(host + '/api/system/notification/type/create', {
                newNameTypeTemplate: this.state.newNameTypeTemplate,
                newDescriptionTypeTemplate: this.state.newDescriptionTypeTemplate,
                token: token,
            },{
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null) {
                    console.log(response.data.error);
                }else{
                    self.setState({
                        newNameTypeTemplate:"",
                        newDescriptionTypeTemplate:"",
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
    }
    displayAlert = () =>{
        if(this.state.isDisplayAlert){
            return <Alert severity="success">Lưu thành công</Alert>;
        }else{
            return <div></div>
        }
    }
    render() {
        const {errors} = this.state;
        return (
            <Modal
                size="lg"
                show={this.props.showModal}
                onHide={this.props.close}
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Tạo mới thể loại template
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                name="newNameTypeTemplate"
                                value = {this.state.newNameTypeTemplate}
                                onChange={(event) => this.handleChange(event)}
                            />
                            {errors.newNameTypeTemplate && <div className="validation" style={{display: 'block',color:'red'}}>{errors.newNameTypeTemplate}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Miêu tả</label>
                            <textarea
                                className="form-control"
                                name="newDescriptionTypeTemplate"
                                value = {this.state.newDescriptionTypeTemplate}
                                onChange={(event) => this.handleChange(event)}
                                id="exampleFormControlTextarea1"
                                rows="3"
                            />
                            {errors.newDescriptionTypeTemplate && <div className="validation" style={{display: 'block',color:'red'}}>{errors.newDescriptionTypeTemplate}</div>}
                        </div>
                        <div className="form-group text-left">
                        <button
                            type="submit"
                            className="btn btn-primary mb-2 mr-2"
                            onClick={(e) => this.saveNewTypeTemplate(e)}
                        >
                            Lưu
                        </button>
                        </div>
                    </form>
                    {
                        this.displayAlert()
                    }
                </Modal.Body>
            </Modal>
        );
    }
}
