import React, { Component } from 'react';
import { Route } from "react-router-dom";
import LoginSystem from '../LoginSystem/Components/Login';

import Intro from '../Intro/Component/Intro';
import Register from '../Register/Components/Register';
import Alert from '../Register/Components/Alert';
import LoginCompany from '../Intro/Component/Login';

class ListUrl extends Component {
    render() {
        return (
            <div>
                <Route path="/system/login" exact component={LoginSystem} />

                <Route path="/" exact component={Intro} />
                <Route path="/register" exact component={Register} />
                <Route path="/newletter" exact component={Alert} />
                <Route path="/company/login" exact component={LoginCompany} />
            </div>
        );
    }
}

export default ListUrl;