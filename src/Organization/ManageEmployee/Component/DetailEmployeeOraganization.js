import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/DetailEmployee.scss";
import Header from "../../Header";
import Menu from "../../Menu";
import LinkPage from "../../LinkPage";
import avatarMale from "../Image/avatar_employee1.png";
import avatarFeMale from "../Image/avatar_employee2.png";
import axios from "axios";
import host from "../../../Host/ServerDomain";
import * as actionAlerts from '../../../Alert/Action/Index';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import ModalDetailProcess from './ModalDetailProcess';
import ReactPaginate from "react-paginate";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
class DetailEmployeeOraganization extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      detailEmployee: {},
      processes: "",
      isRedirectEditProcess: false,
      idProcess: "",
      search: "",
      offset: 0,
      perPage: 7,
      currentPage: 0,
      pageCount: 0,
      initProcesses:[]
    };
  }
  convertTypeOfProcesses(type) {
    var result = "";
    switch (type) {
      case 1:
        result = "Cá nhân";
        break;
      case 2:
        result = "Chức vụ";
        break;
      case 3:
        result = "Phòng ban";
        break;
      case 4:
        result = "Công ty";
        break;
      case 5:
        result = "Kết hợp";
        break;
      default:
        break;
    }
    return result;
  }

  openDetailProcess = (e, id) => {
    e.preventDefault();
    document.getElementById("clone-view-detail-process").click();
    this.setState({ idProcess: id });
  };
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };
  getDetailEmployeeOrganization = () => {
    this._isMounted = true;
    var token = localStorage.getItem("token");
    var self = this;
    axios
      .get(
        host +
          "/api/company/organization/employee/detail/" +
          this.props.match.params.idEmployee,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (self._isMounted) {
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            var detailEmployee = JSON.parse(
              JSON.stringify(response.data.employee)
            );
            self.setState({
              detailEmployee: detailEmployee,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  getProcessEmployee = () => {
    this._isMounted = true;
    let self = this;
    var idEmployee = this.props.match.params.idEmployee;
    var token = localStorage.getItem("token");
    axios
      .get(host + `/api/company/processes/employee/` + idEmployee, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (self._isMounted) {
          if (res.data.error != null) {
            console.log(res.data.message);
          } else {
            var processesResponse = this.mergeProcesses(
              res.data.processes1,
              res.data.processes2,
              res.data.processes3,
              res.data.processes4
            );
            self.setState({
              initProcesses:processesResponse,
              processes: processesResponse,
              pageCount: Math.ceil(
                processesResponse.length / self.state.perPage
              ),
              currentPage: 0,
              offset: 0,
            });
          }
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };
  componentDidMount() {
    this.getDetailEmployeeOrganization();
    this.getProcessEmployee();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  editProcess = (e, id) => {
    e.preventDefault();
    this.setState({ isRedirectEditProcess: true, idProcess: id });
  };

  handleSearch = (event) => {
    var searchValue = event.target.value;
    console.log(searchValue ==='')
    if(searchValue ===''){
      this.setState({
          search: searchValue,
          processes:this.state.initProcesses
      });
    }else{
      this.setState({ search: searchValue });
    }
  };

  searchProcesses = (e) => {
    e.preventDefault();
    var search = this.state.search;
    var idEmployee = this.props.match.params.idEmployee;
    var token = localStorage.getItem("token");
    if (search) {
      axios
        .get(
          host +
            `/api/company/employee/` +
            idEmployee +
            `/search/process/` +
            search,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          if (res.data.error != null) {
            this.props.showAlert({
              message: 'Lỗi xóa quy trình nhân viên',
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              title: "Thất bại",
              severity: "error",
            });
          } else {
            var processesResponse = this.mergeProcesses(
              res.data.processes1,
              res.data.processes2,
              res.data.processes3,
              res.data.processes4
            );
            this.setState({ 
              processes:processesResponse,
              pageCount: Math.ceil(
                processesResponse.length / this.state.perPage
              ),
              currentPage: 0,
              offset: 0,
            });
          }
        })
        .catch(function (error) {
          alert(error);
        });
    }
  };
  submitDelete = (e,idProcess) => {
    e.preventDefault();
    confirmAlert({
      title: '',
      message: 'Bạn có chắc muốn xóa quy trình ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.removeProcess(e,idProcess)
        },
        {
          label: 'No',
          onClick: () => console.log('Click No')
        }
      ]
    })
  };
  removeProcess = (e, id) => {
    e.preventDefault();
    var self = this;
    var token = localStorage.getItem('token');
    axios.post(host + `/api/company/process/employee/delete`,
    {
      token: token,
      idProcess : id,
    },
    {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(res => {
      if(res.data.error != null){
        self.props.showAlert({
          message: 'Lỗi xóa quy trình',
          anchorOrigin:{
              vertical: 'top',
              horizontal: 'right'
          },
          title:'Lỗi',
          severity:'error'
        });
      }else{
        self.props.showAlert({
          message: res.data.message,
          anchorOrigin:{
              vertical: 'top',
              horizontal: 'right'
          },
          title:'Thành công',
          severity:'success'
        });
        self.getProcessEmployee();
      }
    }).catch(function (error) {
      alert(error);
    });
  }

  render() {
    if (this.state.isRedirectEditProcess) {
      return <Redirect to={"/process/edit/" + this.state.idProcess} />;
    }
    return (
      <div className="inner-wrapper manage-organization_template">
        <Header />
        <div
          className="page-wrapper_organization"
          style={{ transform: "none" }}
        >
          <div className="container-fluid" style={{ transform: "none" }}>
            <div className="row" style={{ transform: "none" }}>
              <div
                className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar"
                style={{
                  position: "relative",
                  overflow: "visible",
                  boxSizing: "border-box",
                  minHeight: "1px",
                }}
              >
                <Menu />
              </div>
              <div className="col-xl-9 col-lg-8  col-md-12">
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card">
                  <LinkPage linkPage="Nhân viên / Chi tiết " />
                </div>
                {/*Content Detail Employee Organization */}
                <div className="row manage-detailemployee_company text-left">
                  <div className="col-md-12 d-flex">
                    <div className="ctm-border-radius shadow-sm  card">
                      <div className="page-header">
                        <div className="row">
                          <div className="col-sm-12">
                            <h3 className="page-title_detailEmployee">
                              Chi tiết thông tin nhân viên
                            </h3>
                          </div>
                        </div>
                      </div>
                      {!isEmpty(this.state.detailEmployee) ? (
                        <div className="card mb-0">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="profile-view">
                                  <div className="profile-img-wrap">
                                    <div className="profile-img">
                                      {this.state.detailEmployee.avatar !==
                                        null &&
                                      this.state.detailEmployee.avatar !==
                                        "" ? (
                                        <img
                                          alt="avatar employee 1"
                                          src={
                                            host +
                                            this.state.detailEmployee.avatar
                                          }
                                          className="img-fluid"
                                        />
                                      ) : this.state.detailEmployee.gender ===
                                        "Nam" ? (
                                        <img
                                          alt="avataremployee 1"
                                          src={avatarMale}
                                          className="img-fluid"
                                        />
                                      ) : (
                                        <img
                                          alt="avatar employee 1"
                                          src={avatarFeMale}
                                          className="img-fluid"
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="profile-basic">
                                    <div className="row">
                                      <div className="col-md-5">
                                        <div className="profile-info-left">
                                          <h3 className="user-name m-t-0 mb-0">
                                            {this.state.detailEmployee.name}
                                          </h3>
                                          <div className="staff-id">
                                            Employee ID :{" "}
                                            {this.state.detailEmployee.id}
                                          </div>
                                          {/* <div className="staff-msg">
                                            <a
                                              className="btn btn-custom"
                                              href="chat.html"
                                            >
                                              Send Message
                                            </a>
                                          </div> */}
                                        </div>
                                      </div>
                                      <div className="col-md-7">
                                        <ul className="personal-info">
                                          <li>
                                            <div className="title">Phone:</div>
                                            <div className="text">
                                              <a href="##">
                                                {
                                                  this.state.detailEmployee
                                                    .phone
                                                }
                                              </a>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="title">Email:</div>
                                            <div className="text">
                                              <a href="##">
                                                {
                                                  this.state.detailEmployee
                                                    .email
                                                }
                                              </a>
                                            </div>
                                          </li>
                                          {/* <li>
                                            <div className="title">
                                              Birthday:
                                            </div>
                                            <div className="text">
                                            {this.state.detailEmployee.birth}
                                            </div>
                                            <br></br>
                                          </li>
                                          <li>
                                            <div className="title">
                                              Address:
                                            </div>
                                            <div className="text">
                                            {this.state.detailEmployee.address}
                                            </div>
                                            <br></br>
                                          </li> */}
                                          <li>
                                            <div className="title">Gender:</div>
                                            <div className="text">
                                              <a href="##">
                                                {" "}
                                                {
                                                  this.state.detailEmployee
                                                    .gender
                                                }
                                              </a>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="pro-edit">
                                    <a
                                      data-target="#profile_info"
                                      data-toggle="modal"
                                      className="edit-icon"
                                      href="##"
                                    >
                                      <i className="fa fa-pencil" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
                {/* End Content Detail Employee Organization */}
                <div className="card shadow-sm ctm-border-radius  manage-detailemployee_company">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title mb-0 d-inline-block">
                      Danh sách quy trình
                    </h4>
                  </div>
                  <div className="card-body align-center">
                    <div className="table-data__tool">
                      <div className="table-data__tool-left">
                        <div className="rs-select2--light-search-company">
                          <form className="form-search-employee">
                            <input
                              className="form-control"
                              name="search"
                              value={this.state.search}
                              onChange={this.handleSearch}
                              placeholder="Tìm kiếm quy trình..."
                            />
                            <button
                              className="company-btn--search__process"
                              type="button"
                              onClick={(e) => this.searchProcesses(e)}
                            >
                              <i className="zmdi zmdi-search"></i>
                            </button>
                          </form>
                        </div>
                      </div>
                      <div className="table-data__tool-right"></div>
                    </div>
                    <div className="employee-office-table">
                      <div className="table-responsive">
                        <table className="table custom-table table-hover table-process_type--employee">
                          <thead>
                            <tr>
                              <th style={{ width: "5%" }}
                                        className="cell-breakWord text-center">STT</th>
                              <th style={{ width: "15%" }}
                                        className="cell-breakWord text-center">Mã</th>
                              <th style={{ width: "15%" }}
                                        className="cell-breakWord text-center">Tên</th>
                              <th style={{ width: "45%" }}
                                      className="cell-breakWord text-center">Mô tả</th>
                              {/* <th style={{ width: "10%" }} className="text-center">Thể loại</th> */}
                              <th style={{ width: "25%" }}>
                                      </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.processes.length !== 0 ? (
                              Object.values(
                                this.state.processes.slice(
                                  this.state.offset,
                                  this.state.offset + this.state.perPage
                                )
                              ).map((process, index) => {
                                return (
                                  <tr className="tr-shadow" key={index}>
                                    <td style={{ width: "5%" }}
                                        className="cell-breakWord text-center">{index + 1}</td>
                                    <td style={{ width: "15%" }}
                                        className="cell-breakWord text-center">{process.code}</td>
                                    <td style={{ width: "15%" }}
                                        className="cell-breakWord text-center">{process.name}</td>
                                    <td style={{ width: "45%" }}
                                        className="cell-breakWord text-center">
                                      {process.description}
                                    </td>
                                    {/* <td style={{ width: "10%" }}>
                                      {this.convertTypeOfProcesses(process.type)}
                                    </td> */}
                                    <td style={{ width: "25%" }}>
                                      <div className="table-action">
                                        <a
                                          href="##"
                                          className="btn btn-sm btn-outline-success mr-2"
                                          onClick={(e) =>
                                            this.openDetailProcess(e, process.id)
                                          }
                                        >
                                          <span className="lnr lnr-pencil" />{" "}
                                          Chi tiết
                                        </a>
                                        <a
                                          href="##"
                                          id="clone-view-detail-process"
                                          data-toggle="modal"
                                          data-target="#view-detail-process"
                                          className="btn btn-sm btn-outline-success mr-2"
                                          style={{ display: "none" }}
                                        >
                                          <span className="lnr lnr-pencil" />{" "}
                                          Chi tiết
                                        </a>
                                        <a
                                          href="##"
                                          className="btn btn-sm btn-outline-warning mr-2"
                                          onClick={(e) =>
                                            this.editProcess(e, process.id)
                                          }
                                        >
                                          <span className="lnr lnr-pencil" />{" "}
                                          Sửa
                                        </a>
                                        <a
                                          href="##"
                                          className="btn btn-sm btn-outline-danger"
                                          data-toggle="modal"
                                          onClick={(e) =>
                                            this.submitDelete(e, process.id)
                                          }
                                        >
                                          <span className="lnr lnr-trash" /> Xóa
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr></tr>
                            )}
                          </tbody>
                        </table>
                        <div className="row mt-5">
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
                              subContainerClassName={
                                "pages pagination"
                              }
                              activeClassName={"active"}
                              forcePage={this.state.currentPage}
                            />
                          </div>
                          <div className="col-md-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalDetailProcess  idProcess={this.state.idProcess} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

    showAlert: (properties) => {
      dispatch(actionAlerts.showMessageAlert(properties));
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (DetailEmployeeOraganization);
