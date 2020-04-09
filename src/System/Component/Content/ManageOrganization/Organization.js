import React, { Component } from 'react'
import ManageDepartment from './FormManage/ManageDepartment'
import ManageUser from './FormManage/ManageUser'
import ChartOrganization from './FormDiplay/ChartOrganization';
import '../../../Style/Organization/orgChart.css'

export default class Organization extends Component {
    render() {
        return (
            <div className="main-content">
              <div className="section__content section__content--p30 content__organization">
                <div className="container-fluid">
                  <div className="row">
                    <ChartOrganization/>
                    <ManageUser/>
                  </div>
                  <div className="row">
                      <ManageDepartment/>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="copyright">
                        <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a href="https://colorlib.com">Colorlib</a>.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    }
}
