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
import ManageRegistration from '../System/Component/ManageSystem/ManageRegistration';
import ManageCompany from '../System/Component/ManageSystem/ManageCompany';
import DetailCompany from "../System/Component/DetailCompany/DetailCompany";
import CreateProcess from '../Process/Components/CreateProcess';
import AccountEmployee from '../System/Component/ManageAccountEmployee/AccountEmployee';
import A from '../System/Component/ManageA/A';
import B from '../System/Component/ManageB/B';
import OrganizationContainer from '../System/Container/ManageOrganization/OrganizationContainer';
import CompanyInformation from '../System/Component/ManageInformationCompany/CompanyInformation';
import CreateTemplateForm from '../System/Component/ManageNotification/CreateTemplateForm'
import DetailCompanyNotification from "../System/Component/DetailNotification/DetailCompanyNotification";
import ListCompanyNotification from "../System/Component/DetailNotification/ListCompanyNotification";
import ManageNotification from '../System/Component/ManageNotification/ManageNotification'



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
                        <Route path="/system/process" exact component={Process}/>
                        <Route path="/system/registration" component={ManageRegistration}/>
                        <Route path="/system/company" exact component={ManageCompany}/>
                        <Route path="/system/organization" exact component={OrganizationContainer}/>
                        <Route path="/system/organization/company/:id" exact component={DetailCompany}/>
                        <Route path="/process/new" exact component={CreateProcess} />
                        <Route path="/system/employee/account" exact component={AccountEmployee} />
                        <Route path="/system/a" exact component={A} />
                        <Route path="/system/b" exact component={B} />
                        <Route path="/system/company/information" exact component={CompanyInformation} />
                        <Route path="/system/notification/template" exact component={CreateTemplateForm} />
                        <Route path="/system/notification/send" exact component={ManageNotification} />
                        <Route path="/system/company/notification/list" exact component={ListCompanyNotification} />
                        <Route path="/system/company/notification/detail/:id" exact component={DetailCompanyNotification}/>
                    </div>
                </Router>
           </>
        );
    }
}

export default ListUrl;