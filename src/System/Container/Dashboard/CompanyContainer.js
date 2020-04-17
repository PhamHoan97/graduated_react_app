import React, { Component } from 'react'
import Company from '../../Component/Dashboard/Company/Company'
import PopularField from '../../Component/Dashboard/Company/PopularField'
import ReactPaginate from 'react-paginate';
import '../../Style/Dashboard/paginate.css'
import companyData from '../../Style/Dashboard/company.json'
import CompanyItem from '../../Component/Dashboard/Company/CompanyItem';
export default class CompanyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          offset: 0,
          data: [],
          perPage: 4,
          currentPage: 0,
          pageCount: 0
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    receivedDatatoDisplay =() =>{
        const slice = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        var result = "Không có phong ban nào";
        if(slice.length > 0){
            result = slice.map((item,index)=>{
                return (
                    <CompanyItem
                        key={index}
                        name={item.name}
                        field={item.field}
                        description={item.description}
                        img={item.img}
                    />
                )
            })
        }
        return result;
    }

    componentWillMount() {
        this.getListCompany()
    }

    getListCompany =()=>{
        // get field from store
        // connect database to get all company
        this.setState({
            data:companyData,
            pageCount: Math.ceil(companyData.length / this.state.perPage),
        })
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
                        Popular companies
                    </h3>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-3 text-center">
                        <PopularField />
                    </div>
                </div>
                <Company>
                    {
                        this.receivedDatatoDisplay()
                    }
                </Company>
                <div className="row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-5">
                    </div>
                    <div className="col-md-4 text-center">
                        <ReactPaginate
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
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
