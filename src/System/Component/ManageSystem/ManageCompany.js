import React, { Component } from "react";
import "../../Style/Account/account.css";
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";
import CompanyInformationModal from "./CompanyInformationModal";
import axios from 'axios';
import MoreAdminAccountModal from "./MoreAdminAccountModal";

export default class ManageCompany extends Component {

    constructor(props) {
        super(props)
        this.state = {
            companies: "",  
            activePage: 1,
            clickedCompany: "",
            clickedNew: ""
        }
    } 

    newAdminAccount = (id) => {
        this.setState({clickedNew: id});
        document.getElementById('clone_create_admin_account' + id).click(); 
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
        var count = this.state.companies.length;
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
        var companies = this.state.companies;
        if(this.state.activePage < companies.length){
            this.setState({
                activePage: this.state.activePage + 1
            })
        }
    }

    displayNextPaging =()=>{
        var count = this.state.companies.length;
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
        var companies = this.state.companies;
        var count = companies.length;
        return Object.values(companies).map((value, key) => {
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
        console.log(token);
        axios.get(`http://127.0.0.1:8000/api/system/companies`,
        {
             headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              console.log(res.data);
              this.setState({companies:res.data.companies});
          }
        }).catch(function (error) {
          alert(error);
        })
    }

    convertWorkforceCompany = (workforce) => {
        var result;
        switch (workforce) {
            case 1:
                result = "Less than 50 employees";   
                break; 
            case 2:
                result = "From 50 to 100 employees";   
                break;  
            case 3:
                result = "From 100 to 200 employees";   
                break;  
            case 4:
                result = "From 200 to 300 employees";   
                break;  
            case 5:
                result = "Less More than 300 employees";   
                break;                                                          
            default:
                break;
        }
        return result;
    }

    getCompanyInformation = (event, id) => {
        event.preventDefault();
        var token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/system/company/information/`+ id,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
             this.setState({clickedCompany:res.data.information});
             document.getElementById("clone-info-company"+ res.data.information.id).click();    
          }
        }).catch(function (error) {
          alert(error);
        })
     }

    getRowsOfTable = (pageNumber) => {
        var companies = this.state.companies;
        var locationStart = pageNumber * 8 - 8;
        return Object.values(companies).map((value, key) => {
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
                    <td>
                        {value.name}
                    </td>
                    <td>
                        {value.contact}
                    </td>
                    <td className="desc">
                        {value.address}
                    </td>
                    <td className="desc">
                        {value.field}
                    </td>
                    <td>
                        {this.convertWorkforceCompany(value.workforce)}
                    </td>
                    <td>
                        <div className="table-data-feature">
                        <button
                            id={"info" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="Information"
                            onClick={(e) => this.getCompanyInformation(e,value.id)}
                        >
                            <i className="fas fa-eye"></i>
                        </button>
                        <button
                            id={"clone-info-company" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="Clone Information"
                            data-target="#info-company-modal"
                            style={{display:'none'}}
                        >
                            <i className="fas fa-eye"></i>
                        </button>
                        <button
                            id={"create" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="New admin Account"
                            onClick={this.newAdminAccount.bind(this, value.id)}
                        >
                            <i className="fas fa-plus-circle"></i>
                        </button>
                        <button
                            id={"clone_create_admin_account" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="Clone Create Admin Account"
                            data-target="#more-admin-account-modal"
                            style={{display:'none'}}
                        >
                            <i className="fas fa-eye"></i>
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
                    <tr className="spacer" ></tr>
                </React.Fragment>
                )
            }else{
                return <tr key={key}></tr>;
            }
        })
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
                            <h3 className="title-5 m-b-35 manage__company--notification">
                                Statistic
                            </h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                            <div className="statistic__item statistic__item--green">
                                <h2 className="number">10,368</h2>
                                <span className="desc">departments</span>
                                <div className="icon">
                                <i className="zmdi zmdi-account-o" />
                                </div>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="statistic__item statistic__item--orange">
                                <h2 className="number">388,688</h2>
                                <span className="desc">Members</span>
                                <div className="icon">
                                <i className="zmdi zmdi-shopping-cart" />
                                </div>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="statistic__item statistic__item--blue">
                                <h2 className="number">1,086</h2>
                                <span className="desc">Process</span>
                                <div className="icon">
                                <i className="zmdi zmdi-calendar-note" />
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* MANAGER Company*/}
                        <div className="row">
                            <div className="col-md-12">
                            <h3 className="title-5 m-b-35 manage__company--notification">
                                Manager Company
                            </h3>
                            <div className="table-data__tool">
                                <div className="table-data__tool-left">
                                <div className="rs-select2--light rs-select2--sm">
                                    <select
                                    className="js-select2 select--today__adminAccount"
                                    name="time"
                                    >
                                    <option defaultValue>Today</option>
                                    <option value>3 Days</option>
                                    <option value>1 Week</option>
                                    <option value>1 Month</option>
                                    </select>
                                    <div className="dropDownSelect2" />
                                </div>
                                <button className="au-btn-filter ml-5">
                                    <i className="zmdi zmdi-filter-list" />
                                    filters
                                </button>
                                </div>
                            </div>
                            <div className="table-responsive table-responsive-data2">
                                <table className="table table-data2">
                                <thead>
                                    <tr>
                                        <th />
                                        <th>Name</th>
                                        <th>Contact</th>
                                        <th>Address</th>
                                        <th>Field</th>
                                        <th>Workforce</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Loop to show data in table */}
                                        {this.getRowsOfTable(this.state.activePage)}                    
                                    {/* End Loop */}
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        {/*END MANAGER Company*/}
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
                                Copyright © 2020 Colorlib. All rights reserved.
                                Template by{" "}
                                <a href="https://colorlib.com">Colorlib</a>.
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* Modal add item */}
                    <MoreAdminAccountModal currentCompany = {this.state.clickedNew}/>                    
                    {/* End Modal add item */}
                    {/* Modal Infomation Company */}
                    <CompanyInformationModal currentCompany={this.state.clickedCompany} />                    
                    {/* End Modal Information company */}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}