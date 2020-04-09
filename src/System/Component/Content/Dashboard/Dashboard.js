import React, { Component } from "react";
import CompanyList from "./Company/List/CompanyList";
import ProcessAllList from "./ProcessAllList/ProcessAllList";
import PopularField from "./Company/PopularField";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="section__content section__content--p30">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <h3 className="title-5 m-b-35 dashboard__title--company">
                Popular companies
              </h3>
            </div>
            <div className="col-md-7"></div>
            <div className="col-md-2">
               <PopularField/>
            </div>
          </div>
          <div className="row">
            <CompanyList/>
            <CompanyList/>
            <CompanyList/>
            <CompanyList/>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h3 className="title-5 m-b-35 dashboard__title--process">
                Process
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
                <ProcessAllList/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="copyright">
                <p>
                  Copyright © 2018 Colorlib. All rights reserved. Template by{" "}
                  <a href="https://colorlib.com">Colorlib</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}