import React, { Component } from 'react';
import { Route } from "react-router-dom";
import LoginSystem from '../LoginSystem/Components/Login';
import Intro from '../Intro/Component/Intro';
import Register from '../Register/Components/Register';
import Alert from '../Register/Components/Alert';
import LoginCompany from '../Intro/Component/Login';
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from '../System/Component/Dashboard/Dashboard';
import Information from '../System/Component/PersonalInformation/Information';
import Process from '../System/Component/ManageProcess/Process';
import ManageAccount from '../System/Component/ManageSystem/ManageAccount';
import Organization from '../System/Component/ManageOrganization/Organization';
import ManageCompany from '../System/Component/ManageSystem/ManageCompany';
import DetailCompany from "../System/Component/DetailCompany/DetailCompany";
import CreatFormEvaluate from '../System/Component/ManageFormEvaluate/CreatFormEvaluate';

class ListUrl extends Component {
    render() {
        return (
           <>
                <Router>
                    <div className="App">
                        <Route path="/system/login" exact component={LoginSystem} />
                        <Route path="/" exact component={Intro} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/newletter" exact component={Alert} />
                        <Route path="/company/login" exact component={LoginCompany} />

                        <Route path="/system" exact component={Dashboard} />
                        <Route path="/system/dashboard" exact component={Dashboard}/>
                        <Route path="/system/personal" exact component={Information}/>
                        <Route path="/system/evaluate" exact component={CreatFormEvaluate}/>
                        <Route path="/system/process" exact component={Process}/>
                        <Route path="/system/registration" exact component={ManageAccount}/>
                        <Route path="/system/company" exact component={ManageCompany}/>
                        <Route path="/system/organization" exact component={Organization}/>
                        <Route path="/system/organization/company/:id" exact component={DetailCompany}/>
                    </div>
                </Router>
           </>
        );
    }
}

export default ListUrl;