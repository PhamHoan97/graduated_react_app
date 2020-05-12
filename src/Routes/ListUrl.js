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
import EmployeePage from '../Employee/Components/EmployeePage';
import ManageEmail from '../System/Component/ManageSystem/ManageEmail';
import EmployeeLogin from '../LoginSystem/Components/EmployeeLogin';
import CompanyOrganization from '../Organization/ManageCompany/Component/CompanyOrganization';
import DashboardCompany from '../Organization/ManageDashboard/Component/DashboardCompany';
import EmployeeOrganization from '../Organization/ManageEmployee/Component/EmployeeOrganization';
import DetailEmployeeOraganization from '../Organization/ManageEmployee/Component/DetailEmployeeOraganization';
import DepartmentOrganization from '../Organization/ManageDepartment/Component/DepartmentOrganization';
import DetailDepartmentOraganization from '../Organization/ManageDepartment/Component/DetailDepartmentOraganization';
import RoleOraganization from '../Organization/ManageRole/Component/RoleOraganization';
import DetailRole from '../Organization/ManageRole/Component/DetailRole';
import Notification from '../Organization/ManageNotification/Component/Notification';
import Template from '../Organization/ManageNotification/Component/Template';
import Account from '../Organization/ManageAccount/Component/Account';
import Form from '../Organization/ManageFormNotification/Component/Form';
import ProcessCompany from '../Organization/ManageProcess/Component/ProcessCompany';
import PersonalInformation from '../Organization/ManageInformation/Component/PersonalInformation';




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
                        <Route path="/system" exact component={Dashboard} />
                        <Route path="/system/dashboard" exact component={Dashboard}/>
                        <Route path="/system/personal" exact component={Information}/>
                        <Route path="/system/process" exact component={Process}/>
                        <Route path="/system/registration" component={ManageRegistration}/>
                        <Route path="/system/company" exact component={ManageCompany}/>
                        <Route path="/process/new" exact component={CreateProcess} />
                        <Route path="/process/edit/:id" exact component={EditProcess} />
                        <Route path="/process/view" exact component={ViewProcess} />
                        <Route path="/employee/dashboard" exact component={EmployeePage} />
                        <Route path="/system/email" component={ManageEmail}/>
                        <Route path="/employee/login" exact component={EmployeeLogin} />
                        <Route path="/employee/view/process/:id" exact component={ViewProcess} />
                        <Route path="/company/login" exact component={CompanyLogin} />
                        <Route path="/company/" exact component={DashboardCompany} />
                        <Route path="/company/dashboard" exact component={DashboardCompany} />
                        <Route path="/company/process" exact component={ProcessCompany} />
                        <Route path="/company/detail" exact component={CompanyOrganization} />
                        <Route path="/company/personal/information" exact component={PersonalInformation} />
                        <Route path="/company/organization/employee" exact component={EmployeeOrganization} />
                        <Route path="/company/organization/department/:idDepartment/role/:idRole/employee/:idEmployee" exact component={DetailEmployeeOraganization} />
                        <Route path="/company/organization/department" exact component={DepartmentOrganization} />
                        <Route path="/company/organization/department/:id" exact component={DetailDepartmentOraganization} />
                        <Route path="/company/organization/role" exact component={RoleOraganization} />
                        <Route path="/company/organization/department/:idDepartment/role/:idRole" exact component={DetailRole} />
                        <Route path="/company/template" exact component={Template} />
                        <Route path="/company/organization/account" exact component={Account} />
                        <Route path="/company/notification" exact component={Notification} />
                        <Route path="/company/form" exact component={Form} />
                    </div>
                </Router>
           </>
        );
    }
}

export default ListUrl;