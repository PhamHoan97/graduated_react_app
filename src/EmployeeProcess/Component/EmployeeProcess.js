import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import axios from 'axios';
import host from '../../Host/ServerDomain'; 
import * as actionAlerts from '../../Alert/Action/Index';
import {connect} from 'react-redux';

class EmployeeProcess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            processes: [],
            click: '',
            isRedirect: false,
            search: '',
            initProcesses: [],
            activePage: 1,
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.processes){
          this.setState({
            processes: nextProps.processes, 
            initProcesses: nextProps.processes, 
          });
        }
    }

    viewProcess = (e,id) => {
        e.preventDefault();
        this.setState({click:id, isRedirect:true});
    }

    renderCreator = (isAdmin) =>{
        return (isAdmin ? "Người quản trị" : "Nhân viên");
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

    renderProcessesRow = (pageNumber) =>{
        var processes = this.state.processes;
        var locationStart = pageNumber * 8 - 8;
        return Object.values(processes).map((value, key) => {
            if ((key >= locationStart)&&(key<= (locationStart + 7))){
                return (
                    <React.Fragment key={value.id}>
                            <tr className="tr-shadow">
                                <td>{key+1}</td>
                                <td>{value.code}</td>
                                <td>{value.name}</td>
                                <td>{this.convertTypeOfProcesses(value.type)}</td>
                                <td>
                                    <div className="table-data-feature">
                                        <button
                                            id={"info" + value.id}
                                            className="item"
                                            data-toggle="modal"
                                            data-placement="top"
                                            title="Information"
                                            onClick={(e) => this.viewProcess(e,value.id)}
                                        >
                                            <i className="fas fa-eye"></i>
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
                return (<React.Fragment key={value.id}></React.Fragment>);
            }
        })
    }

    handleSearch = event => {
        var searchValue = event.target.value;
        this.setState({search: searchValue});
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

    searchProcesses = (e) => {
        e.preventDefault(); 
        var search = this.state.search;
        if(search){
            var token = localStorage.getItem('token');
            axios.get(host + `/api/employee/search/process/` + token + '/' + search ,
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
                var processesResponse = this.mergeProcesses(res.data.processes1, res.data.processes2, res.data.processes3, res.data.processes4);
                this.setState({processes: processesResponse});
                this.props.showAlert({
                    message: res.data.message,
                    anchorOrigin:{
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    title:'Thành công',
                    severity:'success'
                  });
              }
            }).catch(function (error) {
              alert(error);
            });
        }else{
            this.setState({processes: this.state.initProcesses});
        }
    }

    render() {
        if(this.state.isRedirect){
            return <Redirect to={'/view/process/' + this.state.click} />
        }
        return (
            <div className="left-content-info-process">
                <div className="card-header card-header-primary">
                <h4 className="card-title title-employee">Quy trình</h4>
                <p className="card-category title-employee">Xem quy trình được giao</p>
                </div>
                <div className="card-body">
                    <div className="employee-search-process">
                        <div className= "search-process"> 
                            <form className="form-search-employee">
                                <input className="form-control" onChange={this.handleSearch} placeholder="Tìm kiếm..." />
                                <button className="employee-btn--search__process" type="button" onClick={(e) => this.searchProcesses(e)}><i className="zmdi zmdi-search"></i></button>
                            </form>
                        </div>
                    </div>
                    <div className="table-responsive table-responsive-data2">
                        <table className="table table-borderless table-data3">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>mã quy trình</th>
                                <th>tên quy trình</th>
                                <th>thể loại </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderProcessesRow(this.state.activePage)}
                            </tbody>
                        </table>
                    </div>
                    <div className="container">
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
        dispatch(actionAlerts.showMessageAlert(properties))
      },
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps )(EmployeeProcess)
