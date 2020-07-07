import React, { Component } from "react";
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import SelectFieldToFilter from "./SelectFieldToFilter";
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import host from '../../../Host/ServerDomain';
import "../Style/TemplateSystemCompany.scss";
import * as actions from "../../../Alert/Action/Index";

class DashboardCompany extends Component {
  _isMounted = true;
  constructor(props) {
    super(props);
    this.state = {
      processes: '',
      activePage: 1,
      isRedirectToViewProcess: false,
      idProcess: '',
      search: '',
      idField: '',
      initProcesses: '',
    } 
  }
  
  handleCssPage =(e,type,currentPage)=>{
    var btnPage = document.getElementsByClassName('paginate_button page-item page');
    for (let i = 0; i < btnPage.length; i++) {
        btnPage[i].classList.remove('active');
    }
    if(type === 0){
        e.target.parentElement.classList.add('active');
    }else{
        btnPage[currentPage-1].classList.add('active');
    }
    var btnPrevious = document.getElementsByClassName('paginate_button page-item previous');
    if(currentPage> 1){
        btnPrevious[0].classList.remove('disabled');
    }else{
        btnPrevious[0].classList.add('disabled');
    }
    var count = this.state.processes.length;
    var btnNext = document.getElementsByClassName('paginate_button page-item next');
    if(currentPage*8 >= count){
        btnNext[0].classList.add('disabled');
    }else{
        btnNext[0].classList.remove('disabled');
    }
  }

  handlePrevious =(e)=>{
      e.preventDefault();
      this.handleCssPage(e,1,this.state.activePage-1);
      if(this.state.activePage >1){
          this.setState({
              activePage: this.state.activePage -1
          })
      }
  }

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

  handlePageChange(e,pageNumber) {
      e.preventDefault();
      var currentPage= e.target.getAttribute('data-dt-idx');
      this.handleCssPage(e,0,currentPage);
      this.getRowsOfTable(pageNumber);
      this.setState({activePage: pageNumber});
  }

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

  componentDidMount() {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem('token');
    axios.get(host + `/api/company/template/processes`,
    {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(res => {
      if(self._isMounted){
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
          self.setState({processes: res.data.processes, initProcesses: res.data.processes});
        }
      }
    }).catch(function (error) {
      alert(error);
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  viewProcessTemplate = (e,id) =>{
    e.preventDefault();
    this.setState({isRedirectToViewProcess: true, idProcess: id});
  } 

  renderTableRow = (pageNumber) => {
    var processes = this.state.processes;
    var locationStart = pageNumber * 8 - 8;
    return Object.values(processes).map((value, key) => {
        if ((key >= locationStart)&&(key<= (locationStart + 7))){
            return (
            <React.Fragment key={key}>
                       <tr className="tr-shadow">
                        <td className="cell-breakWord left-text"  style={{ width: "5%" }} >{key+1}</td>
                        <td className="cell-breakWord left-text"  style={{ width: "15%" }} >{value.name}</td>
                        <td className="cell-breakWord left-text"  style={{ width: "50%" }}>{value.description}</td>
                        <td className="cell-breakWord left-text"  style={{ width: "20%" }}>{value.field.name}</td>
                        <td style={{ width: "10%" }}>
                          <div className="table-data-feature">
                            <button
                              className="item"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Chi tiết"
                              onClick={(e) => this.viewProcessTemplate(e, value.id)}
                            >
                              <i className="zmdi zmdi-file" />
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
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.idField){
      var token = localStorage.getItem('token');
      axios.get(host + `/api/company/template/processes/field/` + nextProps.idField,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
          this.setState({processes: res.data.processes, idField: nextProps.idField});
        }
      }).catch(function (error) {
        alert(error);
      });
    }else{
      this.setState({processes: this.state.initProcesses});
    }
  }

  handleSearch = event => {
    var searchValue = event.target.value;
    this.setState({search: searchValue});
  }

  searchTemplates = (e) => {
      e.preventDefault(); 
      var search = this.state.search;
      var idField = this.state.idField;
      var token = localStorage.getItem('token');
      if(search){
          if(!idField){
            axios.get(host + `/api/company/search/template/` + search ,
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
                  this.setState({processes: res.data.processes})
              }
            }).catch(function (error) {
              alert(error);
            });
          }else{
            axios.get(host + `/api/company/search/template/` + idField +'/' + search ,
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
                  this.setState({processes: res.data.processes})
              }
            }).catch(function (error) {
              alert(error);
            });
          }
      }else{
        this.setState({processes: this.state.initProcesses});
      }
  }

  render() {
    if(this.state.isRedirectToViewProcess){
      return <Redirect to={'/company/template/process/' + this.state.idProcess} />
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
                   <LinkPage linkPage=""/>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex text-left">
                    <div className="card ctm-border-radius shadow-sm flex-fill manage-template_system-company">
                      <div className="card-header">
                        <h4 className="card-title mb-0">Quy trình mẫu</h4>
                      </div>
                      <div className="card-body">
                        <div className="table-data__tool">
                          <div className="table-data__tool-left">
                            <div className="rs-select2--light rs-select2--md">
                              <SelectFieldToFilter />
                              <div className="dropDownSelect2" />
                            </div>
                          </div>
                          <div className="table-data__tool-left">
                            <div className="rs-select2--light-search-company">
                                <form className="form-search-employee">
                                    <input className="form-control" onChange={this.handleSearch} placeholder="Tìm kiếm quy trình mẫu..." />
                                    <button className="company-btn--search__process" type="button" onClick={(e) => this.searchTemplates(e)}><i className="zmdi zmdi-search"></i></button>
                                </form>
                            </div>

                          </div>
                        </div>
                        <div className="employee-office-table">
                          <div className="table-responsive">
                            <table className="table custom-table table-hover table-template_system">
                              <thead>
                              <tr>
                              <th className="cell-breakWord"  style={{ width: "5%", textAlign:"left"}} >#</th>
                                <th className="cell-breakWord"  style={{ width: "15%", textAlign:"left"}} >tên</th>
                                <th className="cell-breakWord" style={{ width: "50%", textAlign:"left"}} >mô tả ngắn</th>
                                <th className="cell-breakWord" style={{ width: "20%", textAlign:"left"}} >lĩnh vực</th>
                                <th style={{ width: "10%" }}/>
                              </tr>
                            </thead>
                            <tbody>
                              {this.renderTableRow(this.state.activePage)}
                            </tbody>
                          </table>
                          </div>
                        </div>
                        {/* Paginate */}
                        <div className="row justify-content-center" style={{marginTop: "20px"}}>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    idField: state.fieldIdSelectReducers.idField,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      showAlert: (properties) => {
          dispatch(actions.showMessageAlert(properties))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCompany)
