import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/DetailCompany.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import CompanyInformation from "./CompanyInformation";
import ChartOrganization from "./ChartOrganization";
import axios from "axios";
import * as host from "../../Url";
export default class CompanyOrganization extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataChart:[]
    }
  }
  
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    this.getDataOrganization();
  }
  getDataOrganization = () =>{
    this._isMounted = true;
    var self = this;
    var idCompany = localStorage.getItem('company_id');
    var token = localStorage.getItem('token');
    axios.post(host.URL_BACKEND+'/api/system/organization/chart', {
        idCompany:idCompany
    },{
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
      if (self._isMounted) {
        if(response.data.error != null){
          console.log(response.data.error);
        }else{
          self.setState({
            dataChart:response.data.dataOrganization,
            showModalDepartment: false,
            showModalRole: false,
            showModalUser: false,
          })
        }
      }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
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
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="card dash-widget ctm-border-radius shadow-sm ">
                      <div className="card-body">
                        <div className="card-icon bg-primary">
                          <i className="fa fa-users" aria-hidden="true" />
                        </div>
                        <div className="card-right">
                          <h4 className="card-title">Nhân viên</h4>
                          <p className="card-text">700</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-sm-6 col-12">
                    <div className="card dash-widget ctm-border-radius shadow-sm ">
                      <div className="card-body">
                        <div className="card-icon bg-warning">
                          <i className="fa fa-building-o" />
                        </div>
                        <div className="card-right">
                          <h4 className="card-title">Phòng ban</h4>
                          <p className="card-text">30</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                    <div className="card dash-widget ctm-border-radius shadow-sm ">
                      <div className="card-body">
                        <div className="card-icon bg-danger">
                          <i className="fa fa-suitcase" aria-hidden="true" />
                        </div>
                        <div className="card-right">
                          <h4 className="card-title">Vai trò</h4>
                          <p className="card-text">3</p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-xl-4 col-lg-6 col-sm-6 col-12">
                    <div className="card dash-widget ctm-border-radius shadow-sm ">
                      <div className="card-body">
                        <div className="card-icon bg-success">
                          <i className="fa fa-bell-o" aria-hidden="true" />
                        </div>
                        <div className="card-right">
                          <h4 className="card-title">Thông báo</h4>
                          <p className="card-text">6</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CompanyInformation />
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card ctm-border-radius shadow-sm flex-fill ">
                      <div className="card-header">
                        <h4 className="card-title mb-0">Hình vẽ cơ cấu tổ chức</h4>
                      </div>
                      <div className="card-body">
                        <ChartOrganization nodes={this.state.dataChart}/>
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
