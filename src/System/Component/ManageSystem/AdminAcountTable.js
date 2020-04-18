import React, { Component } from 'react'
import axios from "axios";
import {connect} from 'react-redux';


class AdminAcountTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            admins: '',
            currentCompany: '',
            activePage: 1,
            clickCreate: 0,
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
        var count = this.state.admins.length;
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
        var admins = this.state.admins;
        if(this.state.activePage < admins.length){
            this.setState({
                activePage: this.state.activePage + 1
            })
        }
    }

    displayNextPaging =()=>{
        var count = this.state.admins.length;
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
        var admins = this.state.admins;
        var count = admins.length;
        return Object.values(admins).map((value, key) => {
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

    componentWillReceiveProps(nextProps) {
        var idCompany = nextProps.currentCompany;
        var initCompany = nextProps.initCompany;
        if(idCompany || initCompany){
            if(!idCompany){
                idCompany = initCompany;
            }

            var token = localStorage.getItem('token');
            axios.get(`http://127.0.0.1:8000/api/system/company/`+ idCompany + `/admin/accounts`,
            {
                headers: { 'Authorization': 'Bearer ' + token}
            }).then(res => {
            if(res.data.error != null){
                console.log(res.data.message);
            }else{
                console.log(res.data);
                this.setState({admins:res.data.admins, currentCompany: idCompany});
            }
            }).catch(function (error) {
            alert(error);
            })
        }
    }
    
    sendEmailHandle = (id) => {
        var token = localStorage.getItem('token');
        console.log("send");
        axios.post(`http://127.0.0.1:8000/api/system/send/email/admin/account`, 
        {
            idAdmin: id,
            tokenData:token
        },
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
            console.log(res.data);
        }
        }).catch(function (error) {
            alert(error);
        })
    }

    renderAcountTableRow = (pageNumber) =>{
        var admins = this.state.admins;
        var locationStart = pageNumber * 8 - 8;
        return Object.values(admins).map((value, key) => {
            console.log(value);
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
                            <td>{value.username}</td>
                            <td>{value.password.substr(0, 15) + '...'}</td>
                            <td className="desc">{value.updated_at}</td>
                            <td className="desc">
                                <button onClick={this.sendEmailHandle.bind(this,value.id)} type="button" className="btn btn-danger">Send Email</button>
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
        return (
        <div className="col col-md-12">
            <div className="table-responsive table-responsive-data2">
                <table className="table table-data2">
                    <thead>
                        <tr>
                            <th/>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Updated At</th>
                            <th>Action</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAcountTableRow(this.state.activePage)}
                    </tbody>
                </table>
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
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        idCompany: state.systemReducers.manageSystemReducer.registrationReducer.idCompany,
        clickCreate: state.systemReducers.manageSystemReducer.registrationReducer.clickCreate
    }
}

export default connect(mapStateToProps)(AdminAcountTable)
