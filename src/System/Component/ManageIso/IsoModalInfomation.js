import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class IsoModalInfomation extends Component {
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
        if(nextProps.currentIso){
            this.setState({show: true});
        }
    }

    downloadDocumentFile = (e, nameFile) => {
        e.preventDefault();
        var token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/system/iso/download/` + nameFile,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
            if(res.data.error != null){
                console.log(res.data.message);
            }else{
                console.log(res);
                var url = window.URL.createObjectURL(new Blob([res.data]));
                var linkTag = document.createElement('a');
                linkTag.href = url;
                linkTag.setAttribute('download', nameFile);
                document.body.appendChild(linkTag);
                linkTag.click();
            }
        }).catch(function (error) {
          alert(error);
        });
    }

    render() {
        if(this.props.currentIso){
            return (
                <Modal show={this.state.show} size={'lg'} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h5 className="modal-title" id="scrollmodalLabel">
                        Standard 
                    </h5>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div className="row form-group">
                            <div className="col col-md-3">
                            <label
                                htmlFor="text-input"
                                className=" form-control-label"
                            >
                                Name
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p>{this.props.currentIso.name}</p>
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
                                Year
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p>{this.props.currentIso.year}</p>
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
                                Content
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p>{this.props.currentIso.content}</p>
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
                                Download
                            </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p><a href="/" onClick={(e)=> this.downloadDocumentFile(e, this.props.currentIso.name_download)} >Click Here</a></p>
                                <small className="form-text text-muted">
                                </small>
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

export default IsoModalInfomation
