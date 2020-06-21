import React, { Component } from "react";
import DepartmentItemCompany from "../../Component/DetailCompany/Process/DepartmentItemCompany";
import ProcessItemCompany from "../../Component/DetailCompany/Process/ProcessItemCompany";
import host from "../../../Host/ServerDomain";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Select from 'react-select';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export default class ProcessDetailCompanyContainer extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      listProcessDepartmentCompany: [],
      idChooseType: 0,
      offset: 0,
      perPage: 7,
      currentPage: 0,
      pageCount: 0,
      searchText: "",
    };
    this.handleChangeSelectType = this.handleChangeSelectType.bind(this);
    this.handleChangeSearchProcesses = this.handleChangeSearchProcesses.bind(
      this
    );
  }
  convertToOptionsSelect(){
    var options = [
      {value: 0, label: 'Thể loại'},
      {value: 5, label: 'Kết hợp'},
      {value: 4, label: 'Công ty'},
      {value: 3, label: 'Phòng ban'},
      {value: 2, label: 'Chức vụ'},
      {value: 1, label: 'Nhân viên'},
    ];
    return options;
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };
  componentDidMount() {
    this.getListProcessDepartmentCompany();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChangeSearchProcesses(event) {
    const searchText = event.target.value;
    console.log(searchText);
    this.setState({
      searchText: searchText,
    });
  }
  submitSearchProcesses(event) {
    event.preventDefault();
    // call api to get processes with text
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/system/company/detail/search",
        {
          searchText: this.state.searchText,
          idCompany: this.props.idCompany,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        self.setState({
          listProcessDepartmentCompany: response.data.processes,
          pageCount: Math.ceil(
            response.data.processes.length / self.state.perPage
          ),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChangeSelectType(event) {
    const name = event.label;
    const value = event.value;
    // call api to fiter with type processes
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/system/company/detail/type/filter",
        {
          type: value,
          idCompany: this.props.idCompany,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        self.setState({
          listProcessDepartmentCompany: response.data.processes,
          pageCount: Math.ceil(
            response.data.processes.length / self.state.perPage
          ),
          [name]: value,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  mergeProcesses(process1, process2, process3, process4) {
    var processes = [];
    for (let index1 = 0; index1 < process1.length; index1++) {
      processes.push(process1[index1]);
    }
    for (let index2 = 0; index2 < process2.length; index2++) {
      processes.push(process2[index2]);
    }
    for (let index3 = 0; index3 < process3.length; index3++) {
      processes.push(process3[index3]);
    }
    for (let index4 = 0; index4 < process4.length; index4++) {
      processes.push(process4[index4]);
    }
    return processes;
  }

  getListProcessDepartmentCompany = () => {
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .get(
        host + "/api/system/dashboard/process/company/" + this.props.idCompany,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        var prosesses = self.mergeProcesses(
          response.data.processes1,
          response.data.processes2,
          response.data.processes3,
          response.data.processes4
        );
        self.setState({
          listProcessDepartmentCompany: prosesses,
          pageCount: Math.ceil(prosesses.length / self.state.perPage),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  showProcesseDepartmentCompany = () => {
    var listProcessDepartmentCompany = this.state.listProcessDepartmentCompany;
    if (listProcessDepartmentCompany.length > 0) {
        var result = listProcessDepartmentCompany
        .slice(this.state.offset, this.state.offset + this.state.perPage)
        .map((process, index) => {
          return (
            <ProcessItemCompany
              key={index}
              stt={index + 1}
              id={process.id}
              code={process.code}
              date={process.date}
              description={process.description}
              name={process.name}
              deadline={process.deadline}
              type={process.type}
            />
          );
        });
        return result;
    } else {
      return (
        <tr>
          <td>Không có dữ liệu</td>
        </tr>
      );
    }
  };

  showDepartmentCompany = () => {
    var listDepartmentCompany = this.state.listDepartmentCompany;
    if (listDepartmentCompany.length > 0) {
      var result = listDepartmentCompany.map((department, index) => {
        return (
          <DepartmentItemCompany
            key={index}
            name={department.name}
            value={department.id}
          />
        );
      });
      return result;
    } else {
      return <option></option>;
    }
  };

  render() {
    return (
      <div className="user-data m-b-40">
        <h3 className="title-3 m-b-30 detail--company__title">
          <i className="zmdi zmdi-account-calendar" />
          Danh sách quy trình
        </h3>
        <div className="filters m-b-45">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="rs-select2--dark rs-select2--md m-r-10 rs-select2--border">
                <Select
                  options={this.convertToOptionsSelect()}
                  formatGroupLabel={formatGroupLabel}
                  onChange={(e) => this.handleChangeSelectType(e)}
                  placeholder=""
                />
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-7">
                <div className="table-data__tool-right">
                  <div className="rs-select2--light-search-company">
                    <form className="form-search-employee">
                      <input
                        onChange={(e) => this.handleChangeSearchProcesses(e)}
                        className="form-control"
                        placeholder="Tìm kiếm quy trình..."
                      />
                      <button
                        className="company-btn--search__process"
                        type="button"
                        onClick={(e) => this.submitSearchProcesses(e)}
                      >
                        <i className="zmdi zmdi-search"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive table-data">
          <table className="table">
            <thead>
              <tr>
                <td></td>
                <td>Mã quy trình</td>
                <td>Quy trình</td>
                <td>Hạn</td>
                <td>Thể loại</td>
                <td></td>
              </tr>
            </thead>
            <tbody>{this.showProcesseDepartmentCompany()}</tbody>
          </table>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 text-center">
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
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    );
  }
}
