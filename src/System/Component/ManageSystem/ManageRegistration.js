import React, { Component } from "react";
import "../../Style/Account/account.css";
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";
import RejectReasonModal from "./RejectReasonModal";
import axios from 'axios';
import RegisterInformationModal from "./RegisterInformationModal";
import CreateAdminAccountModal from "./CreateAdminAccountModal";
import { connect } from "react-redux";
import host from '../../../Host/ServerDomain';
import * as actions from '../../../Alert/Action/Index';

class ManageRegistration extends Component {
    _isMounted =false;
    constructor(props) {
        super(props)
        this.state = {
            registration: "",  
            activePage: 1,
            clickedCompany: "",
            approvedCompany: "",
            rejectedCompany:"",
            loadTableData: false,
            search: '',
            initRegistration: '',
        }
    } 

    rejectCompany = (id) => {
        this.setState({rejectedCompany: id});
        document.getElementById("clone_reject"+ id).click();
    }

    approveCompany = (id) => {
        if(this.state.approvedCompany !== id ){
            var token = localStorage.getItem('token');
            var data = {
                idRegistration : id,
                tokenData: token,
            };

            axios.post(host + `/api/system/registration/approve`,data,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(res => {
                if(res.data.error != null){
                    console.log(res.data.message);
                }else{
                    this.setState({approvedCompany: id});
                    document.getElementById("clone_create_admin_account"+ id).click();
                }
            }).catch(function (error) {
            alert(error);
            })
        }
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.loadDataTable){
            this.setState({loadDataTable: nextProps.loadDataTable});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        var token = localStorage.getItem('token');
        if(!this.state.search){
            axios.get(host + `/api/system/registration`,
            {
                 headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(res => {
                if(res.data.error != null){
                    console.log(res.data.message);
                }else{
                    if(JSON.stringify(this.state.registration) !== JSON.stringify(res.data.registrations)){
                        this.setState({registration: res.data.registrations, initRegistration: res.data.registrations});
                    }
                }
            }).catch(function (error) {
              alert(error);
            })
        }
    }

    getCompanyRegisterInformation = (event, id) => {
       event.preventDefault();
       var token = localStorage.getItem('token');
       axios.get(host + `/api/system/registration/information/`+ id,
       {
           headers: { 'Authorization': 'Bearer ' + token}
       }).then(res => {
         if(res.data.error != null){
             console.log(res.data.message);
         }else{
            this.setState({clickedCompany:res.data.information});
            document.getElementById("cloneinfo"+ res.data.information.id).click();    
         }
       }).catch(function (error) {
         alert(error);
       })
    }

    handleCssPage =(e,type,currentPage)=>{
        // X??? l?? css cho n??t v??? tr?? trang 
        var btnPage = document.getElementsByClassName('paginate_button page-item page');
        for (let i = 0; i < btnPage.length; i++) {
            btnPage[i].classList.remove('active');
        }
        if(type === 0){
            e.target.parentElement.classList.add('active');
        }else{
            btnPage[currentPage-1].classList.add('active');
        }
        // ???n n??t previous 
        var btnPrevious = document.getElementsByClassName('paginate_button page-item previous');
        if(currentPage> 1){
            btnPrevious[0].classList.remove('disabled');
        }else{
            btnPrevious[0].classList.add('disabled');
        }
        // ???n n??t next
        var count = this.state.registration.length;
        var btnNext = document.getElementsByClassName('paginate_button page-item next');
        if(currentPage*8 >= count){
            btnNext[0].classList.add('disabled');
        }else{
            btnNext[0].classList.remove('disabled');
        }
    }

    // X??? l?? khi back l???i 
    handlePrevious =(e)=>{
        e.preventDefault();
        this.handleCssPage(e,1,this.state.activePage-1);
        if(this.state.activePage >1){
            this.setState({
                activePage: this.state.activePage -1
            })
        }
    }

    // X??? l?? khi next chuy???n  trang 
    handleNext = (e)=>{
        e.preventDefault();
        this.handleCssPage(e,1,this.state.activePage+1);
        var registation = this.state.registation;
        if(this.state.activePage < registation.length){
            this.setState({
                activePage: this.state.activePage + 1
            })
        }
    }

    displayNextPaging =()=>{
        var count = this.state.registration.length;
        if(count <=8){
            return  <li className="paginate_button page-item next disabled" id="dataTable_next"><a href="#4AE" aria-controls="dataTable" data-dt-idx={7} tabIndex={0} className="page-link"  onClick={(e) => this.handleNext(e)}>Sau</a></li>
        }else{
            return  <li className="paginate_button page-item next" id="dataTable_next"><a href="#4AE" aria-controls="dataTable" data-dt-idx={7} tabIndex={0} className="page-link"  onClick={(e) => this.handleNext(e)}>Sau</a></li>
        }
    }

    // H??m x??? l?? khi nh???n v??o c??c v??? tr?? c??c trang 
    handlePageChange(e,pageNumber) {
        e.preventDefault();
        var currentPage= e.target.getAttribute('data-dt-idx');
        this.handleCssPage(e,0,currentPage);
        this.getRowsOfTable(pageNumber);
        this.setState({activePage: pageNumber});
    }
        
    // H??m hi???n th??? html cho ph??n trang 
    displayPaging =()=>{
        var registration = this.state.registration;
        var count = registration.length;
        return Object.values(registration).map((value, key) => {
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

    convertWorkforceCompany = (workforce) => {
        var result;
        switch (workforce) {
            case 1:
                result = "??t h??n 50 nh??n vi??n";   
                break; 
            case 2:
                result = "T??? 50 ?????n 100 nh??n vi??n";   
                break;  
            case 3:
                result = "T??? 100 ?????n 200 nh??n vi??n";   
                break;  
            case 4:
                result = "T??? 200 ?????n 300 nh??n vi??n";   
                break;  
            case 5:
                result = "Nhi???u h??n 400 nh??n vi??n";   
                break;                                                          
            default:
                break;
        }
        return result;
    }

    getRowsOfTable = (pageNumber) => {
        var registration = this.state.registration;
        var locationStart = pageNumber * 8 - 8;
        return Object.values(registration).map((value, key) => {
            if ((key >= locationStart)&&(key<= (locationStart + 7))){
                return (
                <React.Fragment key={key}>
                <tr className="tr-shadow">
                    <td style={{ width: "5%" }}>{key+1}</td>
                    <td style={{ width: "45%" }}>{value.name}</td>
                    <td style={{ width: "15%" }}>
                        {value.contact}
                    </td>
                    <td className="desc" style={{ width: "15%" }}>{value.address}</td>
                    <td className="desc" style={{ width: "15%" }}>{value.field}</td>
                    {/* <td>
                        {this.convertWorkforceCompany(value.workforce)}
                    </td> */}
                    <td style={{ width: "5%" }}>
                        <div className="table-data-feature">
                        <button
                            id={"info" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="Th??ng tin"
                            onClick={(e) => this.getCompanyRegisterInformation(e,value.id)}
                        >
                            <i className="fas fa-eye"></i>
                        </button>
                        <button
                            id={"cloneinfo" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="Clone Information"
                            data-target="#registerinfomodal"
                            style={{display:'none'}}
                        >
                            <i className="fas fa-eye"></i>
                        </button>
                        <button
                            id={"clone_create_admin_account" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="Clone Create Admin Account"
                            data-target="#createaccountadmin"
                            style={{display:'none'}}
                        >
                            <i className="fas fa-eye"></i>
                        </button>
                        <button
                            className="item"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Ch???p nh???n"
                            onClick={this.approveCompany.bind(this,value.id)}
                        >
                            <i className="zmdi zmdi-notifications-add" />
                        </button>
                        <button
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="T??? ch???i"
                            onClick={this.rejectCompany.bind(this,value.id)}
                        >
                            <i className="zmdi zmdi-xbox" />
                        </button>
                        <button
                            id={"clone_reject" + value.id}
                            className="item"
                            data-toggle="modal"
                            data-placement="top"
                            title="reject"
                            data-target="#rejectmodal"
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
        this._isMounted = true;
        let self = this;
        var token = localStorage.getItem('token');
        axios.get(host + `/api/system/registration`,
        {
             headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => {
            if(self._isMounted){
                if(res.data.error != null){
                    console.log(res.data.message);
                }else{
                    self.setState({registration: res.data.registrations, initRegistration: res.data.registrations});
                }
            }
        }).catch(function (error) {
          alert(error);
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleSearch = event => {
        var searchValue = event.target.value;
        this.setState({search: searchValue});
    }

    searchCompanies = (e) => {
        e.preventDefault(); 
        var search = this.state.search;
        if(search){
            var token = localStorage.getItem('token');
            axios.get(host + `/api/system/search/registration/` + search ,
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
                    title:'Th???t b???i',
                    severity:'error'
                });
              }else{
                    this.props.showAlert({
                        message: res.data.message,
                        anchorOrigin:{
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        title:'Th??nh c??ng',
                        severity:'success'
                    });
                  this.setState({registration: res.data.registration})
              }
            }).catch(function (error) {
              alert(error);
            });
        }else{
            this.setState({registation: this.state.initRegistration});
        }
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
                        {/* MANAGER Company*/}
                        <div className="row">
                            <div className="col-md-12 text-left">
                            <h3 className="title-5 m-b-35 manage__company--notification">
                                Qu???n l?? ????ng k?? s??? d???ng
                            </h3>
                            <div className="table-data__tool">
                                <div className="table-data__tool-left">
                                <div className="rs-select2--light-search-company">
                                    <form className="form-search-employee">
                                        <input className="form-control" onChange={this.handleSearch} placeholder="T??m ki???m ..." />
                                        <button className="employee-btn--search__process" type="button" onClick={(e) => this.searchCompanies(e)}><i className="zmdi zmdi-search"></i></button>
                                    </form>
                                </div>
                                </div>
                            </div>
                            <div className="table-responsive table-responsive-data2">
                                <table className="table table-borderless table-data3">
                                <thead>
                                    <tr>
                                        <th style={{ width: "5%" }}>#</th>
                                        <th style={{ width: "45%" }}>T??n</th>
                                        <th style={{ width: "15%" }}>Li??n h???</th>
                                        <th style={{ width: "15%" }}>?????a ch???</th>
                                        <th style={{ width: "15%" }}>L??nh v???c</th>
                                        <th style={{ width: "5%" }}/>
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
                                        <li className="paginate_button page-item previous disabled" id="dataTable_previous"><a href="#4AE" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link" onClick={(e) => this.handlePrevious(e)}>Tr?????c</a>
                                        </li>
                                        {/** Hi???n th??? s??? l?????ng page */}
                                        {this.displayPaging()}
                                        {/** Hi???n th??? n??t next */}
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
                                Copyright ?? 2020 Colorlib. All rights reserved.
                                Template by{" "}
                                <a href="https://colorlib.com">Colorlib</a>.
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* Modal Reject Reason  */}
                        <RejectReasonModal currentCompany={this.state.rejectedCompany}/>
                    {/* End Modal Reject Reason */}
                    {/* Modal Infomation Company Register*/}
                        <RegisterInformationModal currentCompany={this.state.clickedCompany} />                    
                    {/* End Modal Information company Register*/}
                    {/* Modal create admin acount for company */}
                        <CreateAdminAccountModal currentCompany = {this.state.approvedCompany}/>
                    {/* End modal create admin acount for company */}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loadTableData: state.systemReducers.manageSystemReducer.registrationReducer.loadDataTable,
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showAlert: (properties) => {
            dispatch(actions.showMessageAlert(properties))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRegistration);
