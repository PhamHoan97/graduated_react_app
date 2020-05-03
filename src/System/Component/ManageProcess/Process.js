import React, { Component } from "react";
import "../../Style/Process/process.css";
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";
import DepartmentOptionSearch from "./DepartmentOptionSearch";
import axios from 'axios';
import FormAddProcessModal from "./FormAddProcessModal";
import DetailEmployeeModal from "./DetailEmployeeModal";
import {connect} from 'react-redux';
import * as actions from '../../Action/System/Index';

class Process extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        employees: '',
        activePage: 1,
        currentEmployee: '',
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
      var employees = this.state.employees;
      if(this.state.activePage < employees.length){
          this.setState({
              activePage: this.state.activePage + 1
          })
      }
  }

  displayNextPaging =()=>{
      var count = this.state.employees.length;
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
      var employees = this.state.employees;
      var count = employees.length;
      return Object.values(employees).map((value, key) => {
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
    var token = localStorage.getItem('token');
    var company_id = localStorage.getItem('company_id');
    axios.get(`http://127.0.0.1:8000/api/system/organization/company/`+ company_id + `/employee`,
    {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(res => {
      if(res.data.error != null){
          console.log(res.data.message);
      }else{
          console.log(res.data);
          this.setState({employees: res.data.employees});
      }
    }).catch(function (error) {
      alert(error);
    });
  }

  OpenModalDetailEmployee = (e, id_employee) => {
    e.preventDefault();
    var token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/api/system/organization/employee/detail/` + id_employee,
    {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(res => {
      if(res.data.error != null){
          console.log(res.data.message);
      }else{
          console.log(res.data); 
          this.setState({currentEmployee: res.data.employee});
      }
    }).catch(function (error) {
      alert(error);
    });
  }

  renderTableRow = (pageNumber) => {
    var employees = this.state.employees;
    var locationStart = pageNumber * 8 - 8;
    return Object.values(employees).map((value, key) => {
        if ((key >= locationStart)&&(key<= (locationStart + 7))){
            return (
            <React.Fragment key={key}>
                       <tr className="tr-shadow">
                        <td>
                            <label className="au-checkbox">
                            <input type="checkbox" />
                            <span className="au-checkmark" />
                            </label>
                        </td>
                        <td className="desc">{value.name}</td>
                        <td className="desc">{value.department_name}</td>
                        <td className="desc">{value.role}</td>
                        <td className="desc">{value.address}</td>
                        <td className="desc">{value.phone}</td>
                        <td >
                          <div className="table-data-feature">
                            <button
                              className="item"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Detail"
                              onClick={(e) => this.OpenModalDetailEmployee(e, value.id_employee)}
                            >
                              <i className="zmdi zmdi-file" />
                            </button>
                            <button
                              className="item"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Process"
                            >
                              <i className="fas fa-sitemap"></i>
                            </button>
                            <button
                              className="item"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Block"
                            >
                              <i className="zmdi zmdi-delete" />
                            </button>
                            <button
                              className="item"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="More"
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
    if(nextProps.idDepartmentSearch){
      var token = localStorage.getItem('token');
      console.log(nextProps.idDepartmentSearch)
      axios.get(`http://127.0.0.1:8000/api/company/department/`+ nextProps.idDepartmentSearch + `/employee`,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
            console.log(res.data); 
            this.setState({employees: res.data.employees});
        }
      }).catch(function (error) {
        alert(error);
      });
    }
  }

  handleOpenAddNewProcessModal = (e) => {
    e.preventDefault();
    this.props.resetProcessInformation();
    document.getElementById('clone-button-add-new-process').click();
  }

  render() {
    return (
      <div className="page-wrapper">
        <MenuHorizontal />
        <div className="page-container">
          <MenuVertical />
          <div className="main-content">
            <div>
              <div className="section__content section__content--p30">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      {/* DATA TABLE*/}
                      <section className="p-t-20">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              <h3 className="title-5 m-b-35 manage__process--title">
                                Manager Process
                              </h3>
                              <div className="table-data__tool">
                                <div className="table-data__tool-left">
                                  <div className="rs-select2--light rs-select2--md">
                                    <DepartmentOptionSearch />
                                    <div className="dropDownSelect2" />
                                  </div>
                                  <div className="rs-select2--light rs-select2--sm">
                                    <select
                                      className="js-select2 select--today__process"
                                      name="time"
                                    >
                                      <option value>Today</option>
                                      <option value>3 Days</option>
                                      <option value>1 Week</option>
                                    </select>
                                    <div className="dropDownSelect2" />
                                  </div>
                                  <button className="au-btn-filter ml-5">
                                    <i className="zmdi zmdi-filter-list" />
                                    filters
                                  </button>
                                </div>
                                <div className="table-data__tool-right">
                                  <button
                                    className="au-btn au-btn-icon au-btn--green au-btn--small"
                                    data-toggle="modal"
                                    onClick={(e) => this.handleOpenAddNewProcessModal(e)}
                                  >
                                    <i className="zmdi zmdi-plus" />
                                    add process
                                  </button>
                                  <button
                                    id="clone-button-add-new-process"
                                    className="au-btn au-btn-icon au-btn--green au-btn--small"
                                    data-toggle="modal"
                                    data-target="#form-add-new-process"
                                    style={{display:"none"}}
                                  >
                                    <i className="zmdi zmdi-plus" />
                                    add item
                                  </button>
                                </div>
                              </div>
                              <div className="table-responsive table-responsive-data2">
                                <table className="table table-data2">
                                  <thead>
                                    <tr>
                                      <th>
                                        <label className="au-checkbox">
                                          <input type="checkbox" />
                                          <span className="au-checkmark" />
                                        </label>
                                      </th>
                                      <th>name</th>
                                      <th>department</th>
                                      <th>role</th>
                                      <th>address</th>
                                      <th>phone</th>
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
                      </section>
                      {/* END DATA TABLE*/}
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
                          Copyright © 2018 Colorlib. All rights reserved.
                          Template by{" "}
                          <a href="https://colorlib.com">Colorlib</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DetailEmployeeModal currentEmployee={this.state.currentEmployee} />
              <FormAddProcessModal />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
const mapStateToProps = (state, ownProps) => {
  return {
    idDepartmentSearch: state.systemReducers.manageSystemReducer.changeDepartmentSearchReducer.idDepartment,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetProcessInformation: () => {
      dispatch(actions.resetProcessInformation());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Process)
