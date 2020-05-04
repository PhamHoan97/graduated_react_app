import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';

class EmployeeProcess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            processes: '',
            activePage: 1,
            click: '',
            isRedirect: false,
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
          });
        }
    }

    viewProcess = (e,id) => {
        e.preventDefault();
        console.log(id)
        this.setState({click:id, isRedirect:true});
    }

    renderProcessesRow = (pageNumber) =>{
        var processes = this.state.processes;
        var locationStart = pageNumber * 8 - 8;
        return Object.values(processes).map((value, key) => {
            if ((key >= locationStart)&&(key<= (locationStart + 7))){
                return (
                <React.Fragment key={key}>
                        <tr className="tr-shadow">
                            <td>{value.name}</td>
                            <td>{value.description.substr(0, 30) + '...'}</td>
                            <td>{value.created_at}</td>
                            <td>Admin</td>
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
                return <tr key={key}></tr>;
            }
        })
    }

    render() {
        if(this.state.isRedirect){
            return <Redirect to={'/employee/view/process/' + this.state.click} />
        }
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                <h4 className="card-title title-employee">Process</h4>
                <p className="card-category title-employee">Show your process</p>
                </div>
                <div className="card-body">
                    <div className="employee-search-process">
                        <div className= "search-process"> 
                            <form className="form-search-employee">
                                <input className="form-control" placeholder="Search..." />
                                <button className="employee-btn--search__process" type="button"><i className="zmdi zmdi-search"></i></button>
                            </form>
                        </div>
                    </div>
                    <div className="table-responsive table-responsive-data2">
                        <table className="table table-data2">
                            <thead>
                            <tr>
                                <th>name</th>
                                <th>description</th>
                                <th>created at</th>
                                <th>assigned by</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderProcessesRow(this.state.activePage)}
                            </tbody>
                        </table>
                    </div>
                    {/* Paginate */}
                    <div className="row" style={{marginTop: "20px"}}>
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
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
                        <div className="col-md-3"></div>
                    </div>
                    {/* End Paginate */}
                </div>
          </div>
        )
    }
}

export default EmployeeProcess;
