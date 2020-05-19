import React, { Component } from 'react';
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";
import axios from 'axios';
import EmailInformationModal from './EmailInformationModal'

class ManageEmail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activePage: 1, 
            email: '',
            clickedEmail: '',  
            reload: '',
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
        var count = this.state.email.length;
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
        var email = this.state.email;
        if(this.state.activePage < email.length){
            this.setState({
                activePage: this.state.activePage + 1
            })
        }
    }

    displayNextPaging =()=>{
        var count = this.state.email.length;
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
        this.getRowsOfTable(pageNumber);
        this.setState({activePage: pageNumber});
    }
        
    // Hàm hiện thị html cho phân trang 
    displayPaging =()=>{
        var email = this.state.email;
        var count = email.length;
        return Object.values(email).map((value, key) => {
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

    getEmailInformation = (event,id)=>{
        event.preventDefault();
        var token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/system/email/information/`+ id,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              console.log(res.data);
             this.setState({clickedEmail:res.data.email});
             document.getElementById("clonedetail"+ res.data.email.id).click();    
          }
        }).catch(function (error) {
          alert(error);
        })
    }

    resendEmail = (event, id) => {
        event.preventDefault();
        var token = localStorage.getItem('token');
        axios.post(`http://127.0.0.1:8000/api/system/email/resend`,
        {
            idEmail: id,
            tokenData: token
        },
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              console.log(res.data); 
              this.setState({reload:true});
          }
        }).catch(function (error) {
          alert(error);
        })
    }

    convertStatusEmail(status){
        return (status === 1) ? "Sent" : "Error";
    }

    getRowsOfTable = (pageNumber) => {
        var email = this.state.email;
        var locationStart = pageNumber * 8 - 8;
        return Object.values(email).map((value, key) => {
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
                    <td className="desc">{value.type}</td>
                    <td className="desc">
                        {value.to}
                    </td>
                    <td className="desc">{value.sender.username}</td>
                    <td className="desc">{this.convertStatusEmail(value.status)}</td>
                    <td className="desc">
                        {value.created_at}
                    </td>
                    <td className="desc">
                        {value.updated_at}
                    </td>
                    <td>
                        <div className="table-data-feature">
                        <button
                            id={"detail" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="Detail"
                            onClick={(e) => this.getEmailInformation(e,value.id)}
                        >
                            <i className="fas fa-eye"></i>
                        </button>
                        <button
                            id={"resend" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="Resend"
                            onClick={(e) => this.resendEmail(e,value.id)}
                        >
                            <i className="fas fa-envelope"></i>
                        </button>
                        <button
                            id={"clonedetail" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="Clone Email"
                            data-target="#emailinformation"
                            style={{display:'none'}}
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
                    <tr className="spacer" ></tr>
                </React.Fragment>
                )
            }else{
                return <tr key={key}></tr>;
            }
        })
    }
    
    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/system/email`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => {
            if(res.data.error != null){
                console.log(res.data.message);
            }else{
                console.log(res.data);
                this.setState({email:res.data.email});
            }
        }).catch(function (error) {
          alert(error);
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
                        {/* MANAGER email*/}
                        <div className="row">
                            <div className="col-md-12">
                            <h3 className="title-5 m-b-35 manage__company--notification">
                                Quản lý email
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
                                    Lọc
                                </button>
                                </div>
                            </div>
                            <div className="table-responsive table-responsive-data2">
                                <table className="table table-data2">
                                <thead>
                                    <tr>
                                    <th />
                                    <th>Loại</th>
                                    <th>Người nhận</th>
                                    <th>Người gửi</th>
                                    <th>Trạng thái</th>
                                    <th>Tạo lúc </th>
                                    <th>Cập nhật  </th>
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
                        {/*END MANAGER Company*/}
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
                    <EmailInformationModal currentEmail={this.state.clickedEmail} />  
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default ManageEmail
