import React, { Component } from 'react';
import { Route } from "react-router-dom";
import SystemLogin from '../LoginSystem/Components/SystemLogin';
import Intro from '../Intro/Component/Intro';
import Register from '../Register/Components/Register';
import Alert from '../Register/Components/Alert';
import CompanyLogin from '../Intro/Component/CompanyLogin';
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from '../System/Component/Dashboard/Dashboard';
import ManageRegistration from '../System/Component/ManageSystem/ManageRegistration';
import ManageCompany from '../System/Component/ManageSystem/ManageCompany';
import CreateProcess from '../Process/Components/Create/CreateProcess';
import EditProcess from '../Process/Components/Edit/EditProcess';
import ViewProcess from '../Process/Components/View/ViewProcess';
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
import NotificationCompany from '../Organization/ManageNotificationCompany/Component/NotificationCompany';
import DetailNotificationCompany from '../Organization/ManageNotificationCompany/Component/DetailNotificationCompany';
import CreateNotification from '../Organization/ManageCreateNotification/Component/CreateNotification';
import NotificationEmployee from '../EmployeeProcess/Component/NotificationEmployee'
import DashboardEmployee from '../EmployeeProcess/Component/DashboardEmployee'
import DetailNotificationSystemEmployee from '../EmployeeProcess/Component/DetailNotificationSystemEmployee';
import DetailNotificationCompanyEmployee from '../EmployeeProcess/Component/DetailNotificationCompanyEmployee';
import ForgetPasswordEmployee from '../Employee/Components/ForgetPasswordEmployee';
import FormResetPasswordEmployee from '../Employee/Components/FormResetPasswordEmployee';
import ListProcessesOfCompany from '../Organization/ManageProcess/Component/ListProcessesOfCompany';
import ListProcessesOfEmployee from '../Organization/ManageProcess/Component/ListProcessesOfEmployee';
import DetailCompany from '../System/Component/DetailCompany/DetailCompany';
import ProcessTemplate from '../System/Component/Template/ProcessTemplate';
import CreateTemplate from '../System/Component/Template/CreateTemplate';
import EditTemplate from '../System/Component/Template/EditTemplate';
import CreateTemplateForm from '../System/Component/ManageNotification/CreateTemplateForm';
import ManageFormSend from '../System/Component/ManageNotification/ManageFormSend';
import ManageNotification from '../System/Component/ManageNotification/ManageNotification';
import TemplateOfField from '../System/Component/Template/TemplateOfField';
import ViewProcessTemplate from '../Organization/ManageDashboard/Component/ViewProcessTemplate';
import SystemViewProcess from '../Process/Components/View/SystemViewProcess';
import ForgetPasswordCompany from '../Company/Components/ForgetPasswordCompany';
import FormResetPasswordCompany from '../Company/Components/FormResetPasswordCompany';

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
                        <Route path="/system/registration" component={ManageRegistration}/>
                        <Route path="/system/company" exact component={ManageCompany}/>
                        <Route path="/system/company/detail/:idCompany" exact component={DetailCompany}/>
                        <Route path="/process/new" exact component={CreateProcess} />
                        <Route path="/process/edit/:id" exact component={EditProcess} />
                        <Route path="/system/email" component={ManageEmail}/>
                        <Route path="/system/notification/template" component={CreateTemplateForm}/>
                        <Route path="/system/notification/form" component={ManageFormSend}/>
                        <Route path="/system/notification/send" component={ManageNotification}/>
                        <Route path="/employee/login" exact component={EmployeeLogin} />
                        <Route path="/view/process/:id" exact component={ViewProcess} />
                        <Route path="/company/login" exact component={CompanyLogin} />
                        <Route path="/company/" exact component={DashboardCompany} />
                        <Route path="/company/dashboard" exact component={DashboardCompany} />
                        <Route path="/company/process" exact component={ProcessCompany} />
                        <Route path="/company/detail" exact component={CompanyOrganization} />
                        <Route path="/company/personal/information" exact component={PersonalInformation} />
                        <Route path="/company/organization/employee" exact component={EmployeeOrganization} />
                        <Route path="/company/organization/employee/:idEmployee" exact component={DetailEmployeeOraganization} />
                        <Route path="/company/organization/department" exact component={DepartmentOrganization} />
                        <Route path="/company/organization/department/:id" exact component={DetailDepartmentOraganization} />
                        <Route path="/company/organization/role" exact component={RoleOraganization} />
                        <Route path="/company/organization/role/:idRole" exact component={DetailRole} />
                        <Route path="/company/template" exact component={Template} />
                        <Route path="/company/organization/account" exact component={Account} />
                        <Route path="/company/notification" exact component={Notification} />
                        <Route path="/company/notification/system" exact component={NotificationCompany} />
                        <Route path="/company/notification/create" exact component={CreateNotification} />
                        <Route path="/company/form" exact component={Form} />
                        <Route path="/company/notification/detail/:id" exact component={DetailNotificationCompany} />
                        <Route path="/employee/notification" exact component={NotificationEmployee} />
                        <Route path="/employee/" exact component={DashboardEmployee} />
                        <Route path="/employee/reset/password" exact component={ForgetPasswordEmployee} />
                        <Route path="/employee/form/reset/password/:id" exact component={FormResetPasswordEmployee} />
                        <Route path="/employee/notification/system/detail/:id" exact component={DetailNotificationSystemEmployee} />
                        <Route path="/employee/notification/company/detail/:id" exact component={DetailNotificationCompanyEmployee} />
                        <Route path="/company/manage/process" exact component={ListProcessesOfCompany} />
                        <Route path="/company/manage/process/employee/:id" exact component={ListProcessesOfEmployee} />
                        <Route path="/system/template" exact component={ProcessTemplate} />
                        <Route path="/system/create/template/:id" exact component={CreateTemplate} />
                        <Route path="/system/edit/template/:id" exact component={EditTemplate} />
                        <Route path="/system/template/field/:id" exact component={TemplateOfField} />
                        <Route path="/company/template/process/:id" exact component={ViewProcessTemplate} />
                        <Route path="/system/view/process/:id" exact component={SystemViewProcess} />
                        <Route path="/company/reset/password" exact component={ForgetPasswordCompany} />
                        <Route path="/company/form/reset/password/:id" exact component={FormResetPasswordCompany} />
                    </div>
                </Router>
           </>
        );
    }
}

export default ListUrl;