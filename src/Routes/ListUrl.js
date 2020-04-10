import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Login from '../LoginSystem/Components/Login';
// import System from '../System/System';
import Intro from '../Intro/Component/Intro';

class ListUrl extends Component {
    render() {
        return (
            <div>
                <Route path="/system/login" exact component={Login} />
                {/* <Route path="/system/home" exact component={System} /> */}
                <Route path="/" exact component={Intro} />
            </div>
        );
    }
}

export default ListUrl;