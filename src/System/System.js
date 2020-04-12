import React, { Component } from "react";
import Dashboard from './Component/Dashboard/Dashboard'
import Organization from './Component/ManageOrganization/Organization'
import Process from './Component/ManageProcess/Process'
import ManageAccount from './Component/ManageSystem/ManageAccount'
import Information from "./Component/PersonalInformation/Information";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import DetailCompany from "./Component/DetailCompany/DetailCompany";
export default class System extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route path="/system" exact component={Dashboard}/>
                <Route path="/system/dashboard" exact component={Dashboard}/>
                <Route path="/system/personal" component={Information}/>
                <Route path="/system/process" component={Process}/>
                <Route path="/system/company/:id" component={DetailCompany}/>
                <Route path="/system/account/notification" component={ManageAccount}/>
                <Route path="/system/organization" component={Organization}/>
            </div>
        </Router>
    );
  }
}
