import React, { Component } from 'react';
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import axios from 'axios';
import DepartmentOptionSearch from "./DepartmentOptionSearch";
import  { Redirect } from 'react-router-dom';
import ModalDetailProcess from './ModalDetailProcess'; 

class ListProcessesOfCompany extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
          processes: '',
          activePage: 1,
          isRedirectEdit: false,
          idEdit: '',
          idProcess: ''
        }
    }

    mergeProcesses(process1, process2){
      var processes = [];
      for (let index1 = 0; index1 < process1.length; index1++) {
        processes.push(process1[index1]);
      }
      for (let index2 = 0; index2 < process2.length; index2++) {
        processes.push(process2[index2]);
      }
      return processes;
    }

    componentDidMount() {
      this._isMounted = true;
      var token = localStorage.getItem('token');
      axios.get(`http://127.0.0.1:8000/api/company/processes/`+ token,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
          var processesResponse = this.mergeProcesses(res.data.processes1, res.data.processes2);
          this.setState({processes: processesResponse});
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
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
      var count = this.state.employees.length;
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
        var processes = this.state.processes;
        if(this.state.activePage < processes.length){
            this.setState({
                activePage: this.state.activePage + 1
            })
        }
    }
  
    displayNextPaging =()=>{
        var count = this.state.processes.length;
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
        var processes = this.state.processes;
        var count = processes.length;
        return Object.values(processes).map((value, key) => {
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
    
    convertTypeOfProcesses(type){
      return type === 1 ? "Cá nhân" : "Chức vụ";
    }

    editProcess = (e, id) =>{
      e.preventDefault();
      this.setState({isRedirectEdit: true, idEdit: id});
    } 

    openDetailProcess = (e, id) => {
      e.preventDefault();
      document.getElementById('clone-view-detail-process').click();
      this.setState({idProcess: id});
    }

    renderTableRow = (pageNumber) => {
      var processes = this.state.processes;
      var locationStart = pageNumber * 8 - 8;
      return Object.values(processes).map((value, key) => {
          if ((key >= locationStart)&&(key<= (locationStart + 7))){
              return (
              <React.Fragment key={key}>
                         <tr className="tr-shadow">
                          <td className="desc">{value.name}</td>
                          <td className="desc">{value.description.substring(0,30) + '...' }</td>
                          <td className="desc">{this.convertTypeOfProcesses(value.type)}</td>
                          <td className="desc">{value.created_at}</td>
                          <td >
                          <div className="table-action">
                              <a
                                href="##"
                                className="btn btn-sm btn-outline-success mr-2"
                                onClick={(e) => this.openDetailProcess(e, value.id)}
                              >
                                <span className="lnr lnr-pencil" />{" "}
                                Chi tiết
                              </a>
                              <a
                                href="##"
                                id="clone-view-detail-process"
                                data-toggle="modal"
                                data-target="#view-detail-process"
                                className="btn btn-sm btn-outline-success mr-2"
                                style={{display:"none"}}
                              >
                                <span className="lnr lnr-pencil" />{" "}
                                Chi tiết
                              </a>
                              <a
                                href="##"
                                className="btn btn-sm btn-outline-warning mr-2" 
                                onClick={(e) => this.editProcess(e,value.id)}
                              >
                                <span className="lnr lnr-pencil" />{" "}
                                Sửa
                              </a>
                              <a
                                href="##"
                                className="btn btn-sm btn-outline-danger"
                                data-toggle="modal"
                              >
                                <span className="lnr lnr-trash" />{" "}
                                Xóa
                              </a>
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
        if(this.state.isRedirectEdit){
          return <Redirect to={'/process/edit/' + this.state.idEdit} />;
        }
        return (
            <div className="inner-wrapper manage-organization_template">
              <Header />
              <div
                className="page-wrapper_organization"
                style={{ transform: "none" }}
              >
                <div className="container-fluid" style={{ transform: "none" }}>
                  <div className="row" style={{ transform: "none" }}>
                    <div
                      className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar"
                      style={{
                        position: "relative",
                        overflow: "visible",
                        boxSizing: "border-box",
                        minHeight: "1px",
                      }}
                    >
                      <Menu/>
                    </div>
                    <div className="col-xl-9 col-lg-8  col-md-12">
                      <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card ">
                         <LinkPage linkPage=" Quản lí quy trình"/>
                      </div>
                      <div className="row">
                        <div className="col-md-12 d-flex">
                          <div className="card ctm-border-radius shadow-sm flex-fill ">
                            <div className="card-header">
                              <h4 className="card-title mb-0">Quản lí quy trình</h4>
                            </div>
                            <div className="card-body">
                            <div className="table-data__tool">
                              <div className="table-data__tool-left">
                                <div className="rs-select2--light rs-select2--md">
                                  <DepartmentOptionSearch />
                                  <div className="dropDownSelect2" />
                                </div>
                              </div>
                              <div className="table-data__tool-right">
                   
                              </div>
                            </div>
                              <div className="employee-office-table">
                                  <div className="table-responsive">
                                    <table className="table custom-table table-hover table-department_organization">
                                      <thead>
                                      <tr>
                                        <th className="text-center">tên quy trình</th>
                                        <th className="text-center">mô tả ngắn</th>
                                        <th className="text-center">thể loại</th>
                                        <th className="text-center">Tạo lúc</th>
                                        <th />
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
                    <ModalDetailProcess  idProcess={this.state.idProcess} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    }
}

export default ListProcessesOfCompany
