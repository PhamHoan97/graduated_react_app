import React, { Component } from 'react';
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import axios from 'axios';
import '../../Style/ProcessTemplate/Field.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  { Redirect } from 'react-router-dom';

class ProcessTemplate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openModal : false,
            fieldName: '',
            fieldDescription: '',
            fields: '',
            activePage: 1,
            isRedirectCreateProcess: false,
            idField: '',
        }
    }

    handleCssPage =(e,type,currentPage)=>{
      // Xử lí css cho nút vị trí trang 
      var btnPage = document.getElementsByClassName('paginate_button page-item page');
      for (let i = 0; i < btnPage.length; i++) {
          btnPage[i].classList.remove('active');
      }
      if(type === 0){
          e.target.parentElement.classList.add('active');
      }else{
          btnPage[currentPage-1].classList.add('active');
      }
      // Ẩn nút previous 
      var btnPrevious = document.getElementsByClassName('paginate_button page-item previous');
      if(currentPage> 1){
          btnPrevious[0].classList.remove('disabled');
      }else{
          btnPrevious[0].classList.add('disabled');
      }
      // Ẩn nút next
      var count = this.state.fields.length;
      var btnNext = document.getElementsByClassName('paginate_button page-item next');
      if(currentPage*8 >= count){
          btnNext[0].classList.add('disabled');
      }else{
          btnNext[0].classList.remove('disabled');
      }
    }
  
    // Xử lí khi back lại 
    handlePrevious =(e)=>{
        e.preventDefault();
        this.handleCssPage(e,1,this.state.activePage-1);
        if(this.state.activePage >1){
            this.setState({
                activePage: this.state.activePage -1
            })
        }
    }
  
    // Xử lí khi next chuyển  trang 
    handleNext = (e)=>{
        e.preventDefault();
        this.handleCssPage(e,1,this.state.activePage+1);
        var fields = this.state.fields;
        if(this.state.activePage < fields.length){
            this.setState({
                activePage: this.state.activePage + 1
            })
        }
    }
  
    displayNextPaging =()=>{
        var count = this.state.fields.length;
        if(count <=8){
            return  <li className="paginate_button page-item next disabled" id="dataTable_next"><a href="#4AE" aria-controls="dataTable" data-dt-idx={7} tabIndex={0} className="page-link"  onClick={(e) => this.handleNext(e)}>Next</a></li>
        }else{
            return  <li className="paginate_button page-item next" id="dataTable_next"><a href="#4AE" aria-controls="dataTable" data-dt-idx={7} tabIndex={0} className="page-link"  onClick={(e) => this.handleNext(e)}>Next</a></li>
        }
    }
  
    // Hàm xử lí khi nhấn vào các vị trí các trang 
    handlePageChange(e,pageNumber) {
        e.preventDefault();
        var currentPage= e.target.getAttribute('data-dt-idx');
        this.handleCssPage(e,0,currentPage);
        this.getRowsOfTable(pageNumber);
        this.setState({activePage: pageNumber});
    }
  
    // Hàm hiện thị html cho phân trang 
    displayPaging =()=>{
        var fields = this.state.fields;
        var count = fields.length;
        return Object.values(fields).map((value, key) => {
            if(key<(count/8)){
                if(key===0){
                    return (
                        <li key={key+1} className="paginate_button page-item page active"><a href="#4AE" aria-controls="dataTable" data-dt-idx={key+1} tabIndex={key} className="page-link" onClick={(e)=>{this.handlePageChange(e,key+1)}}>{key+1}</a></li>
                    );
                }else{
                    return (
                        <li key={key+1} className="paginate_button page-item page "><a href="#4AE" aria-controls="dataTable" data-dt-idx={key+1} tabIndex={key} className="page-link" onClick={(e)=>{this.handlePageChange(e,key+1)}}>{key+1}</a></li>
                    );
                }
            }
            return '';
        });
    }

    handleOpenAddNewFieldModal = (e) => {
        e.preventDefault();
        this.setState({openModal:true});
    }

    handleCloseModal = () => {
        this.setState({openModal:false});
    }

    handleChangeFieldName = event => {
        event.preventDefault();
        this.setState({fieldName: event.target.value});
    }

    handleChangeFieldDescription = event => {
        event.preventDefault();
        this.setState({fieldDescription: event.target.value});
    }

    handleSubmitFieldForm = (e) => {
        e.preventDefault();
        var data = {
            name: this.state.fieldName,
            description: this.state.fieldDescription,
        }
        var token = localStorage.getItem('token');
        axios.post(`http://127.0.0.1:8000/api/system/field/new`, data,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.error);
          }else{ 
            this.setState({openModal:false});
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    redirectToCreateProcess = (e,id) =>{
      e.preventDefault();
      this.setState({isRedirectCreateProcess : true, idField: id});
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/system/field`,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.error);
          }else{ 
            console.log(res.data)
            this.setState({fields:res.data.fields});
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    renderTableRow = (pageNumber) => {
      var fields = this.state.fields;
      var locationStart = pageNumber * 8 - 8;
      return Object.values(fields).map((value, key) => {
          if ((key >= locationStart)&&(key<= (locationStart + 7))){
              return (
              <React.Fragment key={key}>
                         <tr className="tr-shadow">
                          <td className="desc">{value.name}</td>
                          <td className="desc">{value.description}</td>
                          <td >
                            <div className="table-data-feature">
                              <button
                                className="item"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Tạo quy trình"
                                onClick={(e) => this.redirectToCreateProcess(e,value.id)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                              <button
                                className="item"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Quy trình"
                              >
                                <i className="fas fa-sitemap"></i>
                              </button>
                              <button
                                className="item"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Hành động"
                              >
                                <i className="zmdi zmdi-more" />
                              </button>
                            </div>
                          </td>
                      </tr>
                      <tr className="spacer" />
              </React.Fragment>
              )
          }else{
              return <tr key={key}></tr>;
          }
      })
    }

    render() {
        if(this.state.isRedirectCreateProcess){
          return <Redirect to={'/system/create/template/' + this.state.idField} />;
        }
        return (
          <div className="page-wrapper">
            <MenuHorizontal/>
            <div className="page-container">
              <MenuVertical />
              <div className="main-content">
                <div className="section__content section__content--p30">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="title-field">Danh sách các lĩnh vực </h3>
                        </div>
                    </div>
                    <div className="row field-form">
                        <div className="card-body">
                            <div className="table-data__tool">
                                <div className="table-data__tool-left">
                                <div className="rs-select2--light rs-select2--md">
        
                                </div>
                                </div>
                                <div className="table-data__tool-right">
                                <button
                                    className="au-btn au-btn-icon au-btn--green au-btn--small"
                                    data-toggle="modal"
                                    onClick={(e) => this.handleOpenAddNewFieldModal(e)}
                                >
                                    <i className="zmdi zmdi-plus" />
                                    Thêm lĩnh vực
                                </button>
                                </div>
                            </div>
                            <div className="employee-office-table">
                                <div className="table-responsive table-responsive-data2">
                                <table className="table table-data2">
                                    <thead>
                                    <tr>
                                    <th className="text-center">Tên lĩnh vực</th>
                                    <th className="text-center">Mô tả</th>
                                    <th className="text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {this.renderTableRow(this.state.activePage)}
                                </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Paginate */}
                      <div className="row">
                      <div className="col-sm-12 col-md-3"></div>
                      <div className="col-sm-12 col-md-6">
                          <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                              <ul className="pagination">
                                  <li className="paginate_button page-item previous disabled" id="dataTable_previous"><a href="#4AE" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link" onClick={(e) => this.handlePrevious(e)}>Previous</a>
                                  </li>
                                  {/** Hiện thị số lượng page */}
                                  {this.displayPaging()}
                                  {/** Hiện thị nút next */}
                                  {this.displayNextPaging()}
                              </ul>
                          </div>
                      </div>
                      <div className="col-sm-12 col-md-3"></div>
                    </div>
                    {/* End Paginate */}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="copyright">
                          <p>
                            Copyright © 2020 Colorlib. All rights reserved. Template
                            by <a href="https://colorlib.com">Colorlib</a>.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* modal */}
                    <Modal show={this.state.openModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Thêm lĩnh vực</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => this.handleSubmitFieldForm(e)}>
                                <Form.Group controlId="formGroupPassword1">
                                    <Form.Label>Tên lĩnh vực</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChangeFieldName} required placeholder="Tên lĩnh vực" />
                                </Form.Group>
                                <Form.Group controlId="formGroupEmail-updateaccount">
                                    <Form.Label>Mô tả ngắn</Form.Label>
                                    <textarea className="form-control" rows={"5"} onChange={this.handleChangeFieldDescription} required></textarea>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Thêm mới
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button id="button-close-update-account" variant="secondary" onClick={this.handleCloseModal}>
                            Đóng
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* end modal */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default ProcessTemplate

