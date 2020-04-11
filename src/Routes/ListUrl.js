import React, { Component } from 'react';
import { Route } from "react-router-dom";
import LoginSystem from '../LoginSystem/Components/Login';
import Intro from '../Intro/Component/Intro';
import Register from '../Register/Components/Register';
import Alert from '../Register/Components/Alert';
import LoginCompany from '../Intro/Component/Login';
import { BrowserRouter as Router } from "react-router-dom";
import System from '../System/System'

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
                    </div>
                </Router>
                <System/>
           </>
        );
    }
}

export default ListUrl;