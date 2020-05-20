import React, { Component } from "react";
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import SelectFieldToFilter from "./SelectFieldToFilter";
import axios from 'axios';

class DashboardCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: '',
      activePage: 1,
    } 
  }
  
  componentDidMount() {
    var token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/api/company/template/processes`,
    {
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(res => {
      if(res.data.error != null){
          console.log(res.data.message);
      }else{
        this.setState({processes: res.data.processes});
      }
    }).catch(function (error) {
      alert(error);
    });
  }

  renderTableRow = (pageNumber) => {
    var processes = this.state.processes;
    var locationStart = pageNumber * 8 - 8;
    return Object.values(processes).map((value, key) => {
        if ((key >= locationStart)&&(key<= (locationStart + 7))){
            return (
            <React.Fragment key={key}>
                       <tr className="tr-shadow">
                        <td className="desc">{value.name}</td>
                        <td className="desc">{value.description}</td>
                        <td className="desc">{value.field.name}</td>
                        <td >
                          <div className="table-data-feature">
                            <button
                              className="item"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Chi tiết"
                            >
                              <i className="zmdi zmdi-file" />
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
                <Menu/>
              </div>
              <div className="col-xl-9 col-lg-8  col-md-12">
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card ">
                   <LinkPage linkPage=""/>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card ctm-border-radius shadow-sm flex-fill ">
                      <div className="card-header">
                        <h4 className="card-title mb-0">Quy trình mẫu</h4>
                      </div>
                      <div className="card-body">
                        <div className="table-data__tool">
                          <div className="table-data__tool-left">
                            <div className="rs-select2--light rs-select2--md">
                              <SelectFieldToFilter />
                              <div className="dropDownSelect2" />
                            </div>
                          </div>
                        </div>
                        <div className="employee-office-table">
                          <div className="table-responsive">
                            <table className="table custom-table table-hover table-department_organization">
                              <thead>
                              <tr>
                                <th className="text-center">tên</th>
                                <th className="text-center">mô tả ngắn</th>
                                <th className="text-center">lĩnh vực</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {this.renderTableRow(this.state.activePage)}
                            </tbody>
                          </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardCompany;
