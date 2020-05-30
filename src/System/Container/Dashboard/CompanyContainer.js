import React, { Component } from 'react'
import Company from '../../Component/Dashboard/Company/Company'
import ReactPaginate from 'react-paginate';
import '../../Style/Dashboard/paginate.css'
import CompanyItem from '../../Component/Dashboard/Company/CompanyItem';
import axios from 'axios'
import host from '../../../Host/ServerDomain';

export default class CompanyContainer extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          offset: 0,
          listCompany: [],
          perPage: 4,
          currentPage: 0,
          pageCount: 0
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    getListCompanyPagination =() =>{
        const slice = this.state.listCompany.slice(this.state.offset, this.state.offset + this.state.perPage)
        var result = "";
        if(slice.length > 0){
            result = slice.map((item,index)=>{
                return (
                    <CompanyItem
                        key={index}
                        id = {item.id}
                        name={item.name}
                        field={item.field}
                        address={item.address}
                        avatar={item.avatar}
                        // img={item.img}
                    />
                )
            })
        }
        return result;
    }

    componentDidMount() {
        this.getListCompany()
    }

    getListCompany =()=>{
        this._isMounted = true;
        var self =  this;
        var token = localStorage.getItem("token");
        axios.get(host + '/api/system/dashboard/company',{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
            } else {
                if(self._isMounted){
                    var listCompany = response.data.companies;
                    self.setState({
                        listCompany: listCompany,
                        pageCount: Math.ceil(listCompany.length / self.state.perPage),
                    });
                }   
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        console.log(selectedPage);
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        },);

    };
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-md-3">
                    <h3 className="title-5 m-b-35 dashboard__title--company">
                        Danh sách công ty
                    </h3>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-3 text-center">
                        {/* <PopularField /> */}
                    </div>
                </div>
                <Company>
                    {
                        this.getListCompanyPagination()
                    }
                </Company>
                <div className="row justify-content-center">
                    <div className="col-md-3 text-center">
                        <ReactPaginate
                            previousLabel={"Trước"}
                            nextLabel={"Sau"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                </div>
            </>
        )
    }
}
