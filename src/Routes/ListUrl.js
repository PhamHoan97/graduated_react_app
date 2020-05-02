import React, { Component } from 'react';
import { Route } from "react-router-dom";
import SystemLogin from '../LoginSystem/Components/SystemLogin';
import Intro from '../Intro/Component/Intro';
import Register from '../Register/Components/Register';
import Alert from '../Register/Components/Alert';
import CompanyLogin from '../Intro/Component/CompanyLogin';
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from '../System/Component/Dashboard/Dashboard';
import Information from '../System/Component/PersonalInformation/Information';
import Process from '../System/Component/ManageProcess/Process';
import ManageRegistration from '../System/Component/ManageSystem/ManageRegistration';
import ManageCompany from '../System/Component/ManageSystem/ManageCompany';
import CreateProcess from '../Process/Components/Create/CreateProcess';
import EditProcess from '../Process/Components/Edit/EditProcess';
import ViewProcess from '../Process/Components/View/ViewProcess';
import DetailCompany from "../System/Component/DetailCompany/DetailCompany";
import Iso from '../System/Component/ManageIso/Iso';
import EmployeePage from '../Employee/Components/EmployeePage';
import ManageEmail from '../System/Component/ManageSystem/ManageEmail';
import AccountEmployee from '../System/Component/ManageAccountEmployee/AccountEmployee';
import OrganizationContainer from '../System/Container/ManageOrganization/OrganizationContainer';
import CompanyInformation from '../System/Component/ManageInformationCompany/CompanyInformation';
import EmployeeLogin from '../LoginSystem/Components/EmployeeLogin';

class ListUrl extends Component {
    render() {
        return (
           <>
                <Router>
                    <div className="App">
                        <Route path="/system/login" exact component={SystemLogin} />
                        <Route path="/" exact component={Intro} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/newletter" exact component={Alert} />
                        <Route path="/company/login" exact component={CompanyLogin} />
                        <Route path="/system" exact component={Dashboard} />
                        <Route path="/system/dashboard" exact component={Dashboard}/>
                        <Route path="/system/personal" exact component={Information}/>
                        <Route path="/system/process" exact component={Process}/>
                        <Route path="/system/registration" component={ManageRegistration}/>
                        <Route path="/system/company" exact component={ManageCompany}/>
                        <Route path="/system/organization" exact component={OrganizationContainer}/>
                        <Route path="/system/organization/company/:id" exact component={DetailCompany}/>
                        <Route path="/process/new" exact component={CreateProcess} />
                        <Route path="/process/edit/:id" exact component={EditProcess} />
                        <Route path="/process/view" exact component={ViewProcess} />
                        <Route path="/system/employee/account" exact component={AccountEmployee} />
                        <Route path="/system/iso" exact component={Iso} />
                        <Route path="/employee/dashboard" exact component={EmployeePage} />
                        <Route path="/system/email" component={ManageEmail}/>
                        <Route path="/system/company/information" exact component={CompanyInformation} />
                        <Route path="/employee/login" exact component={EmployeeLogin} />
                    </div>
                </Router>
           </>
        );
    }
}

export default ListUrl;