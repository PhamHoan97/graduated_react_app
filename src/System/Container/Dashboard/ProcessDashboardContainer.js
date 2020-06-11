import React, { Component } from "react";
import Process from "../../Component/Dashboard/Process/Process";
import ReactPaginate from "react-paginate";
import ProcessItem from "../../Component/Dashboard/Process/ProcessItem"
import "../../Style/Dashboard/paginate.css";
import host from '../../../Host/ServerDomain';
import axios from 'axios'
import {connect} from "react-redux";

class ProcessDashboardContainer extends Component {
    _isMounted = false;
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
                    stt={index+1}
                    id={item.id}
                    code={item.code}
                    name={item.process_name}
                    description={item.description}
                    date={item.date}
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.getListProcess(nextProps.textSearch);
    }

    componentDidMount() {
        this.getListProcess(this.props.textSearch);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    mergeProcesses(process1, process2){
        var processes = [];
        for (let index1 = 0; index1 < process1.length; index1++) {
            processes.push(process1[index1]);
        }
        for (let index2 = 0; index2 < process2.length; index2++) {
            processes.push(process2[index2]);
        }
        return processes;
    }

    getListProcess = (textSearch) => {
        // connect database to get all process
        this._isMounted = true;
        var self =  this;
        var token = localStorage.getItem('token');
        axios.post(host + '/api/system/dashboard/process',{
            textSearch:textSearch
        },{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
            } else {
                if(self._isMounted){
                    var listProcess = self.mergeProcesses(response.data.processes1, response.data.processes2);
                    self.setState({
                        listProcess: listProcess,
                        pageCount: Math.ceil(listProcess.length / self.state.perPage),
                    });
                }
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
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        textSearch : state.systemReducers.dashboardReducer.processReducer.textSearch,
    }
}
export default connect(mapStateToProps,null)(ProcessDashboardContainer)
