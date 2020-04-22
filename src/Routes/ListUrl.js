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
import Organization from '../System/Component/ManageOrganization/Organization';
import ManageCompany from '../System/Component/ManageSystem/ManageCompany';
import CreateProcess from '../Process/Components/Create/CreateProcess';
import EditProcess from '../Process/Components/Create/EditProcess';
import ViewProcess from '../Process/Components/View/ViewProcess';

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
                        <Route path="/system/personal" component={Information}/>
                        <Route path="/system/process" component={Process}/>
                        <Route path="/system/registration" component={ManageRegistration}/>
                        <Route path="/system/company" component={ManageCompany}/>
                        <Route path="/system/organization" component={Organization}/>
                        <Route path="/process/new" exact component={CreateProcess} />
                        <Route path="/process/edit" exact component={EditProcess} />
                        <Route path="/process/view" exact component={ViewProcess} />
                    </div>
                </Router>
           </>
        );
    }
}

export default ListUrl;