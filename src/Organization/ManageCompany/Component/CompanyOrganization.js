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
  componentDidMount() {
    this.getDataOrganization();
  }
  getDataOrganization = () =>{
    this._isMounted = true;
    var self = this;
    var idCompany = localStorage.getItem('company_id');
    var token = localStorage.getItem('token');
    axios.post(host.URL_BACKEND+'/api/company/organization/chart', {
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
