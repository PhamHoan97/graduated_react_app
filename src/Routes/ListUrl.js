import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Login from '../Components/LoginSystem/Login';
import Homepage from '../Components/HomeSystem/Homepage';

class ListUrl extends Component {
    render() {
        return (
            <div>
                <Route path="/system/login" exact component={Login} />
                <Route path="/system/home" exact component={Homepage} />
            </div>
        );
    }
}

export default ListUrl;