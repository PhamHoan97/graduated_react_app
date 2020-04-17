import React, { Component } from "react";
import Process from "../../Component/Dashboard/Process/Process";
import ReactPaginate from "react-paginate";
import ProcessItem from "../../Component/Dashboard/Process/ProcessItem"
import "../../Style/Dashboard/paginate.css";
import procesData from "../../Style/Dashboard/process.json"
class ProcessDashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        offset: 0,
        data: [],
        perPage: 4,
        currentPage: 0,
        pageCount: 0,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    receivedProcesstoDisplay = () => {
        const slice = this.state.data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
        );
        var result = "Không có phong ban nào";
        if (slice.length > 0) {
            result = slice.map((item, index) => {
                return <ProcessItem
                    key={index}
                    name={item.name}
                    department={item.department}
                    date={item.date}
                    company ={item.company}
                />;
            });
        }
        return result;
    };

    componentWillMount() {
        // connect database and find search
        this.getListProcess();
    }

    getListProcess = () => {
        // connect database to get all process
        this.setState({
            data: procesData,
            pageCount: Math.ceil(procesData.length / this.state.perPage),
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
                    {this.receivedProcesstoDisplay()}
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

export default ProcessDashboardContainer;
