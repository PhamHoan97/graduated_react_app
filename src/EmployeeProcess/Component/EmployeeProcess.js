import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import host from '../../Host/ServerDomain'; 

class EmployeeProcess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            processes: [],
            click: '',
            isRedirect: false,
            search: ''
        }
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
        this.setState({click:id, isRedirect:true});
    }

    renderCreator = (isAdmin) =>{
        return (isAdmin ? "Người quản trị" : "Nhân viên");
    }

    convertTypeOfProcesses(type){
        var result = '';
        switch (type) {
          case 1:
            result ="Cá nhân";
            break;
          case 2:
            result ="Chức vụ";
            break;
          case 3:
            result ="Phòng ban";
            break;
          case 4:
            result ="Công ty";
            break;
          default:
            break;
        }
        return result;
    }

    renderProcessesRow = () =>{
        var processes = this.state.processes;
        return Object.values(processes).map((value, key) => {
            if(key < 6){
                return (
                    <React.Fragment key={value.id}>
                            <tr className="tr-shadow">
                                <td>{key+1}</td>
                                <td>{value.code}</td>
                                <td>{value.name}</td>
                                <td>{this.convertTypeOfProcesses(value.type)}</td>
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
                return (<React.Fragment key={value.id}></React.Fragment>);
            }
        })
    }

    handlePageClick = page => {
        var token = localStorage.getItem('token');
        var pagePaginate = page.selected + 1;
        axios.get(host + `/api/employee/process/` + token + `/` + pagePaginate,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              this.setState({processes: res.data.processes})
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    handleSearch = event => {
        var searchValue = event.target.value;
        this.setState({search: searchValue});
    }

    searchProcesses = (e) => {
        e.preventDefault(); 
        var search = this.state.search;
        if(search){
            var token = localStorage.getItem('token');
            axios.get(host + `/api/employee/search/process/` + search ,
            {
                headers: { 'Authorization': 'Bearer ' + token}
            }).then(res => {
              if(res.data.error != null){
                  console.log(res.data.message);
              }else{
                  this.setState({processes: res.data.processes})
              }
            }).catch(function (error) {
              alert(error);
            });
        }
    }

    render() {
        if(this.state.isRedirect){
            return <Redirect to={'/view/process/' + this.state.click} />
        }
        return (
            <div className="left-content-info-process">
                <div className="card-header card-header-primary">
                <h4 className="card-title title-employee">Quy trình</h4>
                <p className="card-category title-employee">Xem quy trình được giao</p>
                </div>
                <div className="card-body">
                    <div className="employee-search-process">
                        <div className= "search-process"> 
                            <form className="form-search-employee">
                                <input className="form-control" onChange={this.handleSearch} placeholder="Tìm kiếm..." />
                                <button className="employee-btn--search__process" type="button" onClick={(e) => this.searchProcesses(e)}><i className="zmdi zmdi-search"></i></button>
                            </form>
                        </div>
                    </div>
                    <div className="table-responsive table-responsive-data2">
                        <table className="table table-borderless table-data3">
                            <thead>
                            <tr>
                                <th></th>
                                <th>mã quy trình</th>
                                <th>tên quy trình</th>
                                <th>thể loại </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderProcessesRow()}
                            </tbody>
                        </table>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <ReactPaginate
                                    previousLabel={'Trước'}
                                    nextLabel={'Sau'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                    />
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </div>
          </div>
        )
    }
}

export default EmployeeProcess;
