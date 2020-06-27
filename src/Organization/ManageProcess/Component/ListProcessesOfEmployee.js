import React, { Component } from 'react';
import axios from 'axios';
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import ModalDetailProcess from './ModalDetailProcess'; 
import { Redirect } from 'react-router-dom';
import host from '../../../Host/ServerDomain'; 
import * as actionAlerts from '../../../Alert/Action/Index';
import {connect} from 'react-redux';
import "../Style/Process.scss";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
class ListProcessesOfEmployee extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
            processes : '', 
            activePage: 1, 
            employee: '',
            isRedirectEditProcess: false,
            idProcess: '', 
            search: '',  
            initProcesses: '',
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
        var count = this.state.processes.length;
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
              return  <li className="paginate_button page-item next disabled" id="dataTable_next"><a href="#4AE" aria-controls="dataTable" data-dt-idx={7} tabIndex={0} className="page-link"  onClick={(e) => this.handleNext(e)}>Sau</a></li>
          }else{
              return  <li className="paginate_button page-item next" id="dataTable_next"><a href="#4AE" aria-controls="dataTable" data-dt-idx={7} tabIndex={0} className="page-link"  onClick={(e) => this.handleNext(e)}>Sau</a></li>
          }
      }
    
      // Hàm xử lí khi nhấn vào các vị trí các trang 
      handlePageChange(e,pageNumber) {
          e.preventDefault();
          var currentPage= e.target.getAttribute('data-dt-idx');
          this.handleCssPage(e,0,currentPage);
          this.renderTableRow(pageNumber);
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
      var result = '';
      switch (type) {
        case 1:
          result ="Cá nhân";
          break;
        case 2:
          result ="Chức vụ";
          break;
        case 3:
          result ="Phòng ban";
          break;
        case 4:
          result ="Công ty";
          break;
        case 5:
          result ="Kết hợp";
          break;
        default:
          break;
      }
      return result;
    }

    openDetailProcess = (e, id) => {
        e.preventDefault();
        document.getElementById('clone-view-detail-process').click();
        this.setState({idProcess: id});
    }

    submitDelete = (e,idProcess) => {
      e.preventDefault();
      confirmAlert({
        title: '',
        message: 'Bạn có chắc muốn xóa quy trình ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.removeProcess(e,idProcess)
          },
          {
            label: 'No',
            onClick: () => console.log('Click No')
          }
        ]
      })
    };
    removeProcess = (e, id) => {
      e.preventDefault();
      var token = localStorage.getItem('token');
      axios.post(host + `/api/company/process/remove`,
      {
        token: token,
        idProcess : id,
      },
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(res.data.error != null){
          this.props.showAlert({
            message: res.data.message,
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Thành công',
            severity:'error'
          });
        }else{
          var processesResponse = this.mergeProcesses(res.data.processes1, res.data.processes2, res.data.processes3, res.data.processes4);
          this.props.showAlert({
            message: res.data.message,
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Thành công',
            severity:'success'
          });
          this.setState({processes: processesResponse});
        }
      }).catch(function (error) {
        alert(error);
      });
    }

  mergeProcesses(process1, process2, process3, process4){
    var processes = [];
    for (let index1 = 0; index1 < process1.length; index1++) {
      processes.push(process1[index1]);
    }
    for (let index2 = 0; index2 < process2.length; index2++) {
      processes.push(process2[index2]);
    }
    for (let index3 = 0; index3 < process3.length; index3++) {
      processes.push(process3[index3]);
    }
    for (let index4 = 0; index4 < process4.length; index4++) {
      processes.push(process4[index4]);
    }
    return processes;
  }

  componentDidMount() {
      this._isMounted = true;
      let self = this;
      var idEmployee = this.props.match.params.id;
      var token = localStorage.getItem('token');
      axios.get(host + `/api/company/processes/employee/`+ idEmployee,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(self._isMounted){
          if(res.data.error != null){
            console.log(res.data.message);
          }else{
            var processesResponse = this.mergeProcesses(res.data.processes1, res.data.processes2, res.data.processes3, res.data.processes4);
            self.setState({processes: processesResponse, employee: res.data.employee, initProcesses: processesResponse});
          }
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    componentWillUnmount(){
      this._isMounted = false;
    }

    editProcess = (e, id) => {
      e.preventDefault();
      this.setState({isRedirectEditProcess: true, idProcess: id});
    }

    renderTableRow = (pageNumber) => {
        var processes = this.state.processes;
        var locationStart = pageNumber * 8 - 8;
        return Object.values(processes).map((value, key) => {
        if ((key >= locationStart)&&(key<= (locationStart + 7))){
            return (
            <React.Fragment key={key}>
                        <tr className="tr-shadow">
                        <td className="desc left-text" style={{width: "2%"}}>{key+1}</td>
                        <td className="desc left-text cell-breakWord" style={{width: "15%"}}>{value.code}</td>
                        <td className="desc left-text cell-breakWord" style={{width: "20%"}}>{value.name}</td>
                        <td className="desc left-text cell-breakWord" style={{width: "35%"}}>{value.description.substring(0,400) + '...' }</td>
                        <td className="desc left-text cell-breakWord" style={{width: "8%"}}>{this.convertTypeOfProcesses(value.type)}</td>
                        <td style={{width: "20%"}}>
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
                                onClick={(e) =>
                                  this.submitDelete(
                                    e,value.id
                                  )
                                }
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

    handleSearch = event => {
      var searchValue = event.target.value;
      this.setState({search: searchValue});
    }
  
    searchProcesses = (e) => {
      e.preventDefault(); 
      var search = this.state.search;
      var idEmployee = this.props.match.params.id;
      var token = localStorage.getItem('token');
      if(!search){
        this.setState({processes: this.state.initProcesses});
      }else{
        axios.get(host + `/api/company/employee/`+ idEmployee +`/search/process/` + search ,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              this.props.showAlert({
                message: res.data.message,
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'right'
                },
                title:'Thất bại',
                severity:'error'
              });
          }else{
            this.props.showAlert({
              message: res.data.message,
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thành công',
              severity:'success'
            });
            var processesResponse = this.mergeProcesses(res.data.processes1, res.data.processes2, res.data.processes3, res.data.processes4);
            this.setState({processes: processesResponse});
          }
        }).catch(function (error) {
          alert(error);
        });
      }
    }

    render() {
        if(this.state.isRedirectEditProcess){
          return <Redirect to={'/process/edit/' + this.state.idProcess} />
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
                       <LinkPage linkPage=" Quy trình của nhân viên"/>
                    </div>
                    <div className="row manage-process--company_organization">
                      <div className="col-md-12 d-flex">
                        <div className="card ctm-border-radius shadow-sm flex-fill ">
                          <div className="card-header">
                            <h4 className="card-title mb-0">Quy trình của nhân viên <span className="text-danger">{this.state.employee.name} </span>
                            </h4>
                          </div>
                          <div className="card-body">
                          <div className="table-data__tool">
                            <div className="table-data__tool-left">
                              <div className="rs-select2--light-search-company">
                                  <form className="form-search-employee">
                                      <input className="form-control" onChange={this.handleSearch} placeholder="Tìm kiếm quy trình..." />
                                      <button className="company-btn--search__process" type="button" onClick={(e) => this.searchProcesses(e)}><i className="zmdi zmdi-search"></i></button>
                                  </form>
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
                                      <th className="text-left" style={{width: "2%"}}>#</th>
                                      <th className="text-left cell-breakWord" style={{width: "15%"}}>mã quy trình</th>
                                      <th className="text-left cell-breakWord" style={{width: "20%"}}>tên quy trình</th>
                                      <th className="text-left cell-breakWord" style={{width: "35%"}}>mô tả ngắn</th>
                                      <th className="text-left cell-breakWord" style={{width: "8%"}}>thể loại</th>
                                      <th style={{width: "20%"}} />
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
                    <div className="row justify-content-center">
                        <div className="col-md-3 text-center">
                            <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                <ul className="pagination">
                                    <li className="paginate_button page-item previous disabled" id="dataTable_previous"><a href="#4AE" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link" onClick={(e) => this.handlePrevious(e)}>Trước</a>
                                    </li>
                                    {/** Hiện thị số lượng page */}
                                    {this.displayPaging()}
                                    {/** Hiện thị nút next */}
                                    {this.displayNextPaging()}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* End Paginate */}
                    <ModalDetailProcess  idProcess={this.state.idProcess} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

    showAlert: (properties) => {
      dispatch(actionAlerts.showMessageAlert(properties));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ListProcessesOfEmployee);

