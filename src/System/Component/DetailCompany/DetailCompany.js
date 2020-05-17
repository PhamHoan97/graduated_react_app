import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import '../../Style/DetailCompany/detailcompany.css'
import ContactCompanyContainer from "../../Container/DetailCompany/ContactCompanyContainer";
import ProcessDetailCompanyContainer from "../../Container/DetailCompany/ProcessDetailCompanyContainer";

export default class DetailCompany extends Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <div className="page-wrapper">
        <MenuHorizontal/>
        <div className="page-container">
          <MenuVertical />
          <div className="main-content">
            <div className="section__content section__content--p30">
              <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-8">
                        <ProcessDetailCompanyContainer idCompany = {this.props.match.params.idCompany} />
                    </div>
                    <div className="col-xl-4">
                        <ContactCompanyContainer idCompany = {this.props.match.params.idCompany} />
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
