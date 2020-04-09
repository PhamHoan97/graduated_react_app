import React, { Component } from "react";
import MenuHorizontal from "./Component/Menu/MenuHorizontal";
import MenuVertical from "./Component/Menu/MenuVertical";
import Dashboard from './Component/Content/Dashboard/Dashboard'
import Organization from './Component/Content/ManageOrganization/Organization'
import Process from './Component/Content/ManageProcess/Process'
import ManageAccount from './Component/Content/ManageSystem/ManageAccount'
import Information from "./Component/Content/PersonalInformation/Information";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
export default class System extends Component {
  render() {
    return (
        <Router>
            <div className="page-wrapper">
                <MenuHorizontal/>
                <div className="page-container">
                    <MenuVertical />
                    <div className="main-content">
                        <Route path="/system" exact component={Dashboard}/>
                        <Route path="/system/organization" component={Organization}/>
                        <Route path="/system/process" component={Process}/>
                        <Route path="/system/account/notification" component={ManageAccount}/>
                        <Route path="/system/personal" component={Information}/>
                    </div>
                </div>
            </div>
        </Router>
    );
  }
}
