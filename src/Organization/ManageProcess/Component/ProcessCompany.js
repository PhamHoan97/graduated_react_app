import React, { Component } from "react";
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import axios from 'axios';
import FormAddProcessModal from "./FormAddProcessModal";
import DetailEmployeeModal from "./DetailEmployeeModal";
import {connect} from 'react-redux';
import * as actions from '../Actions/Index';
import DepartmentOptionSearch from "./DepartmentOptionSearch";
import '../Css/ManagerProcess.css';

class ProcessCompany extends Component {
  _isMounted = false;
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
    this._isMounted = true;
    var token = localStorage.getItem('token');
    var company_id = localStorage.getItem('company_id');
    axios.get(`http://127.0.0.1:8000/api/company/`+ company_id + `/employee/role`,
    {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(res => {
      if(res.data.error != null){
          console.log(res.data.message);
      }else{
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
                        <td className="desc">{value.name}</td>
                        <td className="desc">{value.department_name}</td>
                        <td className="desc">{value.role_name}</td>
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
      axios.get(`http://127.0.0.1:8000/api/company/department/`+ nextProps.idDepartmentSearch + `/employee/role`,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
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

  
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
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
                   <LinkPage linkPage=" Tạo quy trình"/>
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
                          <button
                            className="au-btn au-btn-icon au-btn--green au-btn--small"
                            data-toggle="modal"
                            onClick={(e) => this.handleOpenAddNewProcessModal(e)}
                          >
                            <i className="zmdi zmdi-plus" />
                            Thêm quy trình
                          </button>
                          <button
                            id="clone-button-add-new-process"
                            className="au-btn au-btn-icon au-btn--green au-btn--small"
                            data-toggle="modal"
                            data-target="#form-add-new-process"
                            style={{display:"none"}}
                          >
                            <i className="zmdi zmdi-plus" />
                            Thêm quy trình
                          </button>
                        </div>
                      </div>
                        <div className="employee-office-table">
                            <div className="table-responsive">
                              <table className="table custom-table table-hover table-department_organization">
                                <thead>
                                <tr>
                                  <th className="text-center">tên</th>
                                  <th className="text-center">phòng ban</th>
                                  <th className="text-center">vai trò</th>
                                  <th className="text-center">địa chỉ</th>
                                  <th className="text-center">số điện thoại</th>
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
              <DetailEmployeeModal currentEmployee={this.state.currentEmployee} />
              <FormAddProcessModal />
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
    idDepartmentSearch: state.addProcessReducers.changeDepartmentSearchReducer.idDepartment,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetProcessInformation: () => {
      dispatch(actions.resetProcessInformation());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProcessCompany);
