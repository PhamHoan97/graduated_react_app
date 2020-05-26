import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as host from "../../../System/Constants/Url"; 

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

    renderAvatar = () => {
        if(this.props.currentEmployee && this.props.currentEmployee.avatar){
            return (<img src={host.URL_BACKEND + this.props.currentEmployee.avatar} alt="Avatar" />);
        }else{
            return (<img src="/system/images/user-avatar-default.jpg" alt="Avatar" />);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.currentEmployee){
            this.setState({show: true});
        }
    }

    convertBirth(str){
        var date = new Date(str);
        var yyyy = date.getFullYear();
        var dd = date.getDate();
        var mm = (date.getMonth() + 1);
        if (dd < 10){
          dd = "0" + dd;
        }
        if (mm < 10){
          mm = "0" + mm;
        }
        var result = dd + "-" + mm + "-" + yyyy;
        return result;
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
                                    <p>{this.convertBirth(this.props.currentEmployee.birth)}</p>
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
                                    <p>{this.props.currentEmployee.department_name}</p>
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
                                    <p>{this.props.currentEmployee.role_name}</p>
                                    <small className="form-text text-muted">
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-3"> 
                            {this.renderAvatar()}
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
