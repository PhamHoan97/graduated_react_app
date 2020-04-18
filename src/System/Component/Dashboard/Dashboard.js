import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVerticalDashboardContainer from "../../Container/Dashboard/MenuVerticalDashboardContainer";
import CompanyContainer from "../../Container/Dashboard/CompanyContainer";
import ProcessDashboardContainer from "../../Container/Dashboard/ProcessDashboardContainer";

export default class Dashboard extends Component {
  render() {
    console.log('render dashboard');
    return (
      <div className="page-wrapper">
        <MenuHorizontal/>
        <div className="page-container">
          <MenuVerticalDashboardContainer/>
          <div className="main-content">
            <div className="section__content section__content--p30">
              <div className="container-fluid">
                <CompanyContainer/>
                <div className="row text-left">
                  <div className="col-md-12">
                    <h3 className="title-5 m-b-35 dashboard__title--process">
                      Process
                    </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                     <ProcessDashboardContainer/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="copyright">
                      <p>
                        Copyright © 2018 Colorlib. All rights reserved. Template
                        by <a href="https://colorlib.com">Colorlib</a>.
                      </p>
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
