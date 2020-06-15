import React, { Component } from "react";
import DepartmentItemCompany from "../../Component/DetailCompany/Process/DepartmentItemCompany";
import ProcessItemCompany from "../../Component/DetailCompany/Process/ProcessItemCompany";
import host from "../../../Host/ServerDomain";
import axios from "axios";

export default class ProcessDetailCompanyContainer extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      listProcessDepartmentCompany: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getListProcessDepartmentCompany();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
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
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  showProcesseDepartmentCompany = () => {
    var listProcessDepartmentCompany = this.state.listProcessDepartmentCompany;
    if (listProcessDepartmentCompany.length > 0) {
      var result = listProcessDepartmentCompany.map((process, index) => {
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
                  <select
                    className="js-select2 select--department__detail_company"
                    name="idChooseType"
                    onChange={(e) => this.handleChange(e)}
                  >
                    <option value="0">Thể loại</option>
                    <option value="4">Công ty</option>
                    <option value="3">Phòng ban</option>
                    <option value="2">Chức vụ</option>
                    <option value="1">Nhân viên</option>
                  </select>
                  <div className="dropDownSelect2" />
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-7">
                <div className="table-data__tool-right">
                  <div className="rs-select2--light-search-company">
                    <form className="form-search-employee">
                      <input
                        className="form-control"
                        placeholder="Tìm kiếm quy trình..."
                      />
                      <button
                        className="company-btn--search__process"
                        type="button"
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
        </div>
      </div>
    );
  }
}
