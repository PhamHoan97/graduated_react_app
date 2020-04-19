import React, { Component } from "react";
import Process from "../../Component/Dashboard/Process/Process";
import ReactPaginate from "react-paginate";
import ProcessItem from "../../Component/Dashboard/Process/ProcessItem"
import "../../Style/Dashboard/paginate.css";
import * as host from '../../Constants/Url'
import axios from 'axios'
import {connect} from "react-redux"
class ProcessDashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        offset: 0,
        listProcess: [],
        perPage: 4,
        currentPage: 0,
        pageCount: 0,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    getListProcessPagination = () => {
        const slice = this.state.listProcess.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
        );
        var result;
        if (slice.length > 0) {
            result = slice.map((item, index) => {
                return <ProcessItem
                    key={index}
                    name={item.process_name}
                    department={item.department_name}
                    date={item.update_at}
                    company ={item.company_name}
                />;
            });
        }else{
            return (
                <tr></tr>
            )
        }
        return result;
    };

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        this.getListProcess(nextProps.textSearch);
    }

    componentWillMount() {
        // connect database and find search
        this.getListProcess(this.props.textSearch);
    }

    getListProcess = (textSearch) => {
        // connect database to get all process
        var self =  this;
        var token = localStorage.getItem('token');
        axios.post(host.URL_BACKEND+'/api/system/dashboard/process/',{
            textSearch:textSearch
        },{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
            } else {
                var listProcess = response.data.companies;
                self.setState({
                    listProcess: listProcess,
                    pageCount: Math.ceil(listProcess.length / self.state.perPage),
                });
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset,
        });
    };
    render() {
        return (
            <>
                <Process>
                    {this.getListProcessPagination()}
                </Process>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-5"></div>
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
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        textSearch : state.systemReducers.dashboardReducer.processReducer.textSearch,
    }
}
export default connect(mapStateToProps,null)(ProcessDashboardContainer)
