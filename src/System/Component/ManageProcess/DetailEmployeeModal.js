import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class DetailEmployeeModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: true,              
        }
    }

    handleClose = () => {
        this.setState({show: false});
    };
    
    handleShow = () => {
        this.setState({show: true});
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentEmployee){
            this.setState({show: true});
        }
    }

    render() {
        if(this.props.currentEmployee){
            return (
                <Modal show={this.state.show} size={'lg'} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h5 className="modal-title" id="scrollmodalLabel">
                        Information 
                    </h5>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col col-md-9"> 
                            <div className="row form-group">
                                <div className="col col-md-3">
                                <label
                                    htmlFor="text-input"
                                    className=" form-control-label"
                                >
                                    Name
                                </label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p>{this.props.currentEmployee.name}</p>
                                    <small className="form-text text-muted">
                                    </small>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-3">
                                <label
                                    htmlFor="text-input"
                                    className=" form-control-label"
                                >
                                    Address
                                </label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p>{this.props.currentEmployee.address}</p>
                                    <small className="form-text text-muted">
                                    </small>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-3">
                                <label
                                    htmlFor="text-input"
                                    className=" form-control-label"
                                >
                                    Birth
                                </label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p>{this.props.currentEmployee.birth}</p>
                                    <small className="form-text text-muted">
                                    </small>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-3">
                                <label
                                    htmlFor="text-input"
                                    className=" form-control-label"
                                >
                                    Phone
                                </label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p>{this.props.currentEmployee.phone}</p>
                                    <small className="form-text text-muted">
                                    </small>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-3">
                                <label
                                    htmlFor="text-input"
                                    className=" form-control-label"
                                >
                                    Department
                                </label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p></p>
                                    <small className="form-text text-muted">
                                    </small>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-3">
                                <label
                                    htmlFor="text-input"
                                    className=" form-control-label"
                                >
                                    Role
                                </label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p></p>
                                    <small className="form-text text-muted">
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-3"> 
                                <img src="/system/images/user-avatar-default.jpg" alt="Avatar" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )
        }else{
            return (<div></div>)
        }
    }
}

export default DetailEmployeeModal
