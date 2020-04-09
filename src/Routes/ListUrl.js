import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Login from '../LoginSystem/Components/Login';
import System from '../System/System';
import Intro from '../Intro/Component/Intro';
import Register from '../Register/Components/Register';
import Alert from '../Register/Components/Alert';

class ListUrl extends Component {
    render() {
        return (
            <div>
                <Route path="/system/login" exact component={Login} />
                <Route path="/system/home" exact component={System} />
                <Route path="/" exact component={Intro} />
                <Route path="/register" exact component={Register} />
                <Route path="/newletter" exact component={Alert} />
            </div>
        );
    }
}

export default ListUrl;