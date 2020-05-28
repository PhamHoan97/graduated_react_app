import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import host from '../../../Host/ServerDomain'; 

class ModalDetailProcess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            process: '',
        }
    }

    renderLinkDownloadDocument(document) {
        if(document){
            return (<a className="link-download-document" href={host + '/' + document}> Tải file ở đây</a>);
        }else{
            return (<></>)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.idProcess){
            var token = localStorage.getItem('token');
            axios.get(host + `/api/company/process/information/` + nextProps.idProcess,
            {
                headers: { 'Authorization': 'Bearer ' + token}
            }).then(res => {
              if(res.data.error != null){
                  console.log(res.data.message);
              }else{
                  console.log(res.data.process)
                this.setState({process: res.data.process});
              }
            }).catch(function (error) {
              alert(error);
            });
        }
    }

    renderAssign = (employees, roles) => {
        var content = '';
        if(employees){
            for (let index = 0; index < employees.length; index++) {
                content += employees[index].name + ', ';
            }
        }
        if(roles){
            for (let index = 0; index < roles.length; index++) {
                content += roles[index].name + ', ';
            }
        }
        return content;
    }
    
    render() {
        return (
            <div
            className="modal fade"
            id="view-detail-process"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="scrollmodalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="scrollmodalLabel">
                    Thông tin quy trình
                  </h5>
                  <button
                    id="close-modal-detail-process"
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="card">
                    <div className="card-body card-block form-add-process">
                      <Form
                        encType="multipart/form-data"
                        className="form-horizontal"
                      >
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label>Tên quy trình</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <span className="">{this.state.process.name}</span>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label>Mô tả ngắn</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <span className="">{this.state.process.description}</span>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label>Thời gian</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <span className="">{this.state.process.update_at}</span>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label>Deadline</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <span className="">{this.state.process.deadline}</span>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="disabled-input"
                              className=" form-control-label"
                            >
                              Giao cho
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <span className="">{this.renderAssign(this.state.process.employees, this.state.process.roles)}</span> 
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="disabled-input"
                              className=" form-control-label"
                            >
                                Tài liệu
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <span className="">{this.renderLinkDownloadDocument(this.state.process.document)}</span>
                          </div>
                        </div>

                      </Form>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default ModalDetailProcess
