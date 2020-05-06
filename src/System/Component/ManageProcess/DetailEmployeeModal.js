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

    UNSAFE_componentWillReceiveProps(nextProps) {
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
                        Thông tin nhân viên 
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
                                    Tên nhân viên
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
                                    Địa chỉ 
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
                                    Ngày sinh
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
                                    Số điện thoại
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
                                    Phòng ban
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
                                    Vai trò
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
                    Đóng
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
