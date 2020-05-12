import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/DetailCompany.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import CompanyInformation from "./CompanyInformation";
export default class CompanyOrganization extends Component {
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
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card grow">
                   <LinkPage linkPage=""/>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="card dash-widget ctm-border-radius shadow-sm grow">
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
                    <div className="card dash-widget ctm-border-radius shadow-sm grow">
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
                    <div className="card dash-widget ctm-border-radius shadow-sm grow">
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
                    <div className="card dash-widget ctm-border-radius shadow-sm grow">
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
                    <div className="card ctm-border-radius shadow-sm flex-fill grow">
                      <div className="card-header">
                        <h4 className="card-title mb-0">Hình vẽ cơ cấu tổ chức</h4>
                      </div>
                      <div className="card-body">
                        <div className="chartjs-size-monitor">
                          <div className="chartjs-size-monitor-expand">
                            <div />
                          </div>
                          <div className="chartjs-size-monitor-shrink">
                            <div />
                          </div>
                        </div>
                        <canvas
                          id="pieChart"
                          style={{
                            display: "block",
                            width: "423px",
                            height: "211px",
                          }}
                          width={423}
                          height={211}
                          className="chartjs-render-monitor"
                        />
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
